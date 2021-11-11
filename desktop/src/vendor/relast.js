'use strict';

const Rapp = new Class(
    {
        _id: '',
        _name: '',
        _bbox: null,
        _electron: null,
        _main: null,
        _parent: null,
        _self: null,
        _props: {},
        _comps: {},
        _states: {},
        _actions: {},
        _wrappers: {ids: {}, indexers: {}},
        _dom: { main: ``, iterator: {} },
        initialize: function(args, self)
        {
            this._name = args.name;
            this._bbox = this.eval_bbox(args.bbox);
            this._electron = args.electron;
            this._self = self;
            this._parent = args.parent || self;
            this._main = this._parent || self; 
        },
        eval_bbox: (bbox) =>
        {
            if(bbox)
                if(typeof(bbox) === 'string')
                    return document.getElementById(bbox);
                else if(typeof(bbox) === 'object')
                    return bbox;
            return null;
        },
        start: function(props)
        {
            if(this._self)
            {
                this._props = props;
                if(this._self.states)
                    this._self.states(props);
                if(this._self.actions)
                    this._self.actions(props);
                return this._self;
            }
            return this;
        },
        render: function()
        {
            if(!this._bbox) return;
            if(!this._self) return;
            if(!this._self.draw) return;
            
            this._self.draw(this._props);

            const doms = this.print(this._dom.main);
            this._bbox.appendChild(doms.visual);

            this.update_states();
            if(this._self.run)
                this._self.run(this._props);
        },
        print: function(html)
        {
            const vir_dom = document.createElement('div');
            const vis_dom = document.createElement('div');
            // html = html.replace(/(>)+[\s]+(<)+/g, '><');
            vir_dom.innerHTML = html;
            vis_dom.innerHTML = html;

            if(!vir_dom.hasChildNodes()) return;

            let aux = vis_dom.childNodes[0];
            let aux2 = vir_dom.childNodes[0];
            let has_childs_buffer = [];
            let has_childs_buffer2 = [];
            while(aux !== null && aux !== undefined)
            {
                while(aux !== null)
                {
                    this.check_node(aux, aux2);
                    if(aux.hasChildNodes())
                    {
                        has_childs_buffer.push(aux);
                        has_childs_buffer2.push(aux2);
                    }
                    aux = aux.nextSibling;
                    aux2 = aux2.nextSibling;
                }
                if(has_childs_buffer.length === 0) break;
                
                aux = has_childs_buffer[0].childNodes[0];
                has_childs_buffer.splice(0, 1);

                aux2 = has_childs_buffer2[0].childNodes[0];
                has_childs_buffer2.splice(0, 1);
            }
            
            return {virtual: vir_dom, visual: vis_dom};
        },
        check_node: function(node, base_node)
        {
            if(!node) return null;
            if(node.nodeType === 8) return null;

            const token = Rapp.uuid();

            if(node.nodeType === 1)
            {
                const attrs = node.attributes;
                for(let a of attrs)
                {
                    if(a.name === 'id')
                        this._wrappers.ids[a.value] = node;

                    if(a.name === 'state')
                        this.index_state(a.value.trim(), node, base_node, 'attr', token, {attr: a.name});
                    
                    if(this.has_events_listener(`${a.name}='${a.value}'`))
                    {
                        const event = a.name.replace('on', '');
                        const action = a.value.trim();
                        node.addEventListener(event, (e)=>
                        {
                            if(node.tagName.toLowerCase() === 'form')
                                e.preventDefault();
                            this.call_action(action, {ev: e, target: e.target, node: node});
                        });
                    }
                    if(this.has_textual_state(a.value))
                        this.index_textual_states(node, base_node, 'text_attr', a.value, token, {attr: a.name});
                    
                    if(a.name.toLowerCase().trim() === 'if')
                    {
                        const cond = a.value.substr(1, a.value.length - 2).replace(/\s/g, '');
                        const split = cond.split(':');
                        let condition = split[0];
                        this.index_conditional_states(node, base_node, 'if', split[0], token, {yes: split[1].trim(), no: split[2].trim()});
                    }else if(a.name.toLowerCase().trim() === 'foreach')
                    {
                        const cond = a.value.substr(1, a.value.length - 2).replace(/\s/g, '');
                        const split = cond.split(':');
                        let condition = split[0];
                        this.index_foreach_states(node, base_node, 'foreach', split[0], token, {iterator: split[1].trim()});
                    }else if(a.name.toLowerCase().trim() === 'for')
                    {
                    }
                }
                for(let a of attrs)
                {
                    if(a.name !== 'class' && a.name !== 'href')
                        node.removeAttributeNode(a);
                }

            }else if(node.nodeType === 3)
            {
                if(!this.has_textual_state(node.nodeValue)) return;
                this.index_textual_states(node, base_node, 'text', node.nodeValue, token);
            }
        },
        has_events_listener: function(v)
        {
            return v.match(/on[\w]+[\s|=]*[\s|\'][\w|\W]*[\s|\']+/g) !== null;
        },
        get_events_listener: function(v)
        {
            return v.match(/on[\w]+[\s|=]*[\s|\'][\w|\W]*[\s|\']+/g);
        },
        extract_event_listener: function(v)
        {
            const replace = v.replace('on', '');
            const split = replace.split('=');
            if(split.length === 0) return null;
            let remove_quotes = split[1].replace('\'');
            remove_quotes = remove_quotes.substr(1, remove_quotes.length - 1);
            return {event: split[0], action: remove_quotes};
        },
        has_textual_state: function(v)
        {
            return v.trim().match(/(\[)+state:[\w|_|-]+(\])+/g) !== null;
        },
        get_textual_states: function(v)
        {
            return v.trim().match(/(\[)+state:[\w|_|-]+(\])+/g);
        },
        extract_textual_state: function(v)
        {
            return v.replace('[state:', '').replace(']', '');
        },
        index_state: function(state, node, base_node, type, token, addons={})
        {
            if(!this._wrappers.indexers[token])
            {
                this._wrappers.indexers[token] = {
                    final_node: node,
                    base_node: base_node,
                    type: type,
                    states: [],
                    addons: addons
                }
            }
            if(!this._wrappers.indexers[token].states.includes(state))
                this._wrappers.indexers[token].states.push(state);
        },
        index_textual_states: function(node, base_node, type, value_eval, token, addons={})
        {
            const states = this.get_textual_states(value_eval);
            for(let s of states)
            {
                const state = this.extract_textual_state(s);
                this.index_state(state, node, base_node, type, token, addons);
            }
        },
        index_conditional_states: function(node, base_node, type, condition, token, addons={})
        {
            for(let s in this._states)
            {
                const regexp = new RegExp(s.trim(), 'g');
                if(condition.match(regexp) !== null)
                {
                    this.index_state(s.trim(), node, condition, type, token, addons);
                }
            }
        },
        index_foreach_states: function(node, base_node, type, condition, token, addons={})
        {
            for(let s in this._states)
            {
                const regexp = new RegExp(s.trim(), 'g');
                if(condition.match(regexp) !== null)
                {
                    this.index_state(s.trim(), node, condition, type, token, addons);
                }
            }
        },
        state: function(k, v=null)
        {
            if(v === null)
                return this._states[k];

            this._states[k] = v;
            this.update_states();
        },
        update_states: function() 
        {
            const indexers = this._wrappers.indexers;
            for(let i in indexers)
            {
                if(!indexers.hasOwnProperty(i)) continue;
                const token = i;
                const data = indexers[i];
                let value = '';
                if(data.type === 'text')
                    value = data.base_node.nodeValue;
                else if(data.type === 'text_attr')
                    value = data.base_node.attributes[data.addons.attr].value;
                else if(data.type === 'if' || data.type === 'foreach' || data.type === 'for'){
                    data.final_node.innerHTML = '';
                }
                
                for(let s of data.states)
                {
                    if(data.type === 'text' || data.type === 'text_attr')
                        value = value.replace(`[state:${s}]`, this._states[s] !== undefined || this._states[s] !== null ? this._states[s] : '[no-value]');
                    else if(data.type === 'attr')
                        value = this._states[s] || '[no-value]';
                    else if(data.type === 'if')
                    {
                        const regexp = new RegExp(s, 'g');
                        value = data.base_node.replace(regexp, this._states[s]);
                    }
                    else if(data.type === 'foreach')
                    {
                        const buffer = this._states[s];
                        if(typeof(buffer) === 'object' && Array.isArray(buffer))
                        {
                            for(let i of buffer)
                            {
                                let item = this._dom.iterator[data.addons.iterator];
                                for(let p in i)
                                {
                                    if(!i.hasOwnProperty(p)) continue;
                                    const regexp = new RegExp(`\\[${p}\\]`, 'g');
                                    item = item.replace(regexp, i[p]);
                                }
                                value += item;
                            }
                        }
                    }
                }

                
                if(data.type === 'text')
                    data.final_node.nodeValue = value;
                if(data.type === 'text_attr')
                {
                    if(data.final_node.attributes[data.addons.attr])
                        data.final_node.attributes[data.addons.attr].value = value;
                    else if(data.addons.attr.toLowerCase() === 'value')
                        data.final_node.value = value;
                }else if(data.type === 'attr')
                    data.final_node.setAttribute(data.addons.attr, value);
                else if(data.type === 'if')
                {
                    const result = eval(value) ? data.addons.yes : (data.addons.no ? data.addons.no : null);
                    if(result)
                    {
                        const doms = this.print(this._dom[result]);
                        for(let c of doms.visual.childNodes)
                            data.final_node.appendChild(c);
                    }
                }else if(data.type === 'foreach')
                {
                    const doms = this.print(value);
                    console.log(doms.visual);
                    const buffer = [];
                    for(let i = 0; i < doms.visual.childNodes.length; i++)
                    {
                        const item = doms.visual.childNodes[i];
                        buffer.push(item);
                    }
                    for(let c of buffer)
                        data.final_node.appendChild(c);
                }
            }
        },
        action: function(k, action)
        {
            if(!k || !action) return;
            if(k.trim() == '') return;
            this._actions[k] = action;
        },
        call_action: function(k, args)
        {
            if(!k) return;
            if(k.trim() == '') return;
            if(this._actions[k])
                this._actions[k](args);
        }
    }
);



















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Rapp.uuid = ()=> {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16).toUpperCase();
    });
}

Rapp.MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
 
    function AddUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
            } else {
                    return (lResult ^ lX8 ^ lY8);
            }
    }
 
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
 
    function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
    };
 
    function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
    };
 
    function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
 
            for (var n = 0; n < string.length; n++) {
 
                    var c = string.charCodeAt(n);
 
                    if (c < 128) {
                            utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                    }
 
            }
 
            return utftext;
    };
 
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
 
    string = Utf8Encode(string);
 
    x = ConvertToWordArray(string);
 
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
    for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
            }
 
        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
        return temp.toLowerCase();
 }