'use strict';

const Rapp = new Class(
    {
        _id: '',
        _name: '',
        _visible: true,
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
        _nav: {},
        initialize: function(args, self)
        {
            this._name = args.name;
            this._bbox = this.eval_bbox(args.bbox);
            this._electron = args.electron;
            this._self = self;
            this._parent = args.parent || self;
            this._main = args.main || this._parent || self; 
            this._visible = args.visible || this._visible;

            if(this._main === this)
                this._nav['/'] = { mod: this._self, title: '', name: '' };
        },
        get_DOM_id: function(id)
        {
            if(!id) return null;
            if(typeof(id) !== 'string') return null;
            return this._wrappers.ids[id];
        },
        get_comp: function(k)
        {
            if(!k) return;
            if(typeof(k) !== 'string') return;
            if(this._comps[k])
                if(this._comps[k]._visible)
                    return this._comps[k];
            return null;
        },
        looking_comp: function(path)
        {
            if(!path) return;
            if(typeof(path) !== 'string') return;

            const split_path = path.split('/');
            let aux = this._main;
            for(let comp of split_path)
            {
                if(aux._comps[comp])
                {
                    aux = aux._comps[comp];
                }else
                    continue;
            }
            return aux._visible ? aux : null;
        },
        set_nav: function(path, conf, options={})
        {
            this._main._nav[path] = { path: path,  mod: conf.mod, title: conf.title, name: conf.name };
        },
        navigate: function(path, bbox, options={})
        {
            if(!path || !bbox) return;
            if(typeof(path) !== 'string') return;
            bbox = typeof(bbox) === 'string' ? this._wrappers.ids[bbox] : bbox;
            if(!bbox) return;
            const obj = this._main._nav[path];
            if(!obj) return;
            if(!this._main._comps[obj.name])
            {
                this._main.add_comp(obj.name, obj.mod, options);
                if(!this._main._comps[obj.name]) return;
                this._main._comps[obj.name]._bbox = bbox;
                this._main._comps[obj.name].start(options);
            }
            this._main._comps[obj.name].render();
            return obj;
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
            this._bbox.innerHTML = '';
            
            this._self.draw(this._props);

            const doms = this.print(this._dom.main);
            this.set_bbox_classes(doms);
            for(let c in doms.visual.childNodes)
            {
                if(!doms.visual.childNodes.hasOwnProperty(c)) continue;
                const child = doms.visual.childNodes[c];
                this._bbox.appendChild(child);
            }

            if(this._dom.style)
            {
                if(this._dom.style.trim() !== '')
                {
                    let style = `<style>${this._dom.style}</style>`;
                    if(this._dom.style.includes('<style>'))
                        style = this._dom.style;
                    const style_node = document.createElement('div');
                    style_node.innerHTML = style;
                    this._bbox.appendChild(style_node);
                }
            }

            this.update_states();
            if(this._self.run)
                this._self.run(this._props);
        },
        insert: function(k, bbox)
        {
            if(!bbox) return;
            if(!k) return;
            if(!this._dom[k]) return;

            if(typeof(bbox) === 'string')
            {
                if(this._wrappers.indexers[bbox])
                    bbox = this._wrappers.indexers[bbox];
                else 
                if(document.getElementById(bbox))
                {
                    console.log(document.getElementById(bbox));
                    bbox = document.getElementById(bbox);
                }
            }
            if(!bbox) return;
            bbox.innerHTML = '';

            const doms = this.print(this._dom[k]);
            this.set_bbox_classes(doms);
            for(let c in doms.visual.childNodes)
            {
                if(!doms.visual.childNodes.hasOwnProperty(c)) continue;
                const child = doms.visual.childNodes[c];
                bbox.appendChild(child);
            }

            if(this._dom.style)
            {
                if(this._dom.style.trim() !== '')
                {
                    let style = `<style>${this._dom.style}</style>`;
                    if(this._dom.style.includes('<style>'))
                        style = this._dom.style;
                    const style_node = document.createElement('div');
                    style_node.innerHTML = style;
                    bbox.appendChild(style_node);
                }
            }

            this.update_states();
        },
        print: function(html)
        {
            let base = 'div';
            if(html.substr(0, 3).trim() === '<td' || html.substr(0, 3).trim() === '<th')
                base = 'tr';
            const vir_dom = document.createElement(base);
            const vis_dom = document.createElement(base);
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
                    if(aux2)
                        aux2 = aux2.nextSibling;
                }
                if(has_childs_buffer.length === 0) break;
                
                aux = has_childs_buffer[0].childNodes[0];
                has_childs_buffer.splice(0, 1);

                if(has_childs_buffer2[0])
                {
                    aux2 = has_childs_buffer2[0].childNodes[0];
                    has_childs_buffer2.splice(0, 1);
                }
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
                    {
                        this._wrappers.ids[a.value] = node;
                        if(this._comps[a.value] !== null && this._comps[a.value] !== undefined)
                        {
                            this._comps[a.value]._bbox = this._comps[a.value].eval_bbox(node);
                            this._comps[a.value].render();
                        }
                    }

                    if(a.name === 'key')
                        node['key'] = a.value;

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
                    if(a.name !== 'class' && 
                        a.name !== 'classComp' && 
                        a.name !== 'href' && 
                        a.name !== 'type' && 
                        a.name !== 'value' &&
                        a.name !== 'src' &&
                        a.name !== 'style'
                    )
                    {
                        if(jQuery)
                            if(a.name === 'id')
                                continue;
                        node.removeAttributeNode(a);
                    }
                }

            }else if(node.nodeType === 3)
            {
                if(!this.has_textual_state(node.nodeValue)) return;
                this.index_textual_states(node, base_node, 'text', node.nodeValue, token);
            }
        },
        set_bbox_classes: function(doms)
        {
            if(this._bbox.hasAttribute('class') || this._bbox.hasAttribute('classComp'))
            {
                let classes = '';
                if(this._bbox.hasAttribute('classComp'))
                {
                    const val = this._bbox.getAttribute('classComp').split(' ');
                    for(let cl of val)
                        classes += `${this._parent._name}-${cl}`;
                }

                if(this._bbox.hasAttribute('class'))
                    for(let cl of this._bbox.classList)
                        classes += ` ${cl} `;
                        
                this._bbox.setAttribute('class', `${this._name}-main ${classes}`);
            }else
            {
                this._bbox.setAttribute('class', `${this._name}-main`);
            }
            this._bbox.removeAttribute('classComp');
            this.set_bbox_classes_node(doms.visual);
        },
        set_bbox_classes_node: function(root)
        {
            for(let c in root.childNodes)
            {
                if(!root.childNodes.hasOwnProperty(c)) continue;
                const child = root.childNodes[c];
                let classes = '';
                if(child.hasAttribute('classComp'))
                {
                    const val = child.getAttribute('classComp').split(' ');
                    for(let cl of val)
                        if(child.hasAttribute('classComp'))
                            classes += `${this._parent._name}-${cl}`;
                }
                if(child.hasAttribute('class'))
                {
                    for(let cl of child.classList)
                        if(child.hasAttribute('classComp'))
                            classes += ` ${cl} `;
                }
                child.setAttribute('class', `${this._name}-main ${classes}`);
                child.removeAttribute('classComp');
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
                console.log(node.parentNode);
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
                if(data.base_node)
                {
                    if(data.type === 'text')
                        value = data.base_node.nodeValue;
                    else if(data.type === 'text_attr')
                        value = data.base_node.attributes[data.addons.attr].value;
                    else if(data.type === 'if' || data.type === 'foreach' || data.type === 'for'){
                        data.final_node.innerHTML = '';
                    }
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
                                // if(item.includes('foreach'))
                                // {
                                    
                                // }
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
                    if(doms)
                    {
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
        },
        call_extAction: function(path, action, args={})
        {
            if(!path || !action) return;
            if(typeof(path) !== 'string' || typeof(action) !== 'string') return;

            const comp = this.looking_comp(path);
            if(comp)
                comp.call_action(action, args);
        },
        add_comp: function(k, comp, options={})
        {
            if(!k && !comp) return;
            if(typeof(k) !== 'string') return;
            if(typeof(comp) !== 'function') return;
            const args = {
                name: k,
                electron: this._electron,
                parent: this,
                main: this._main,
                visible: true
            }
            if(options.visible !== undefined || options.visible !== null)
                args.visible = options.visible;
            const props = options.props || {};
            this._comps[k] = new comp(args);
            this._comps[k]._self = this._comps[k];
            if(this._comps[k].start)
                this._comps[k].start(props);
            if(options.css)
                if(options.css.trim() !== '')
                    this.load_css(options.css);
            return this;
        },
        load_css: function(file)
        {
            if(!file) return;
            if(typeof(file) !== 'string') return;

            const tag = document.createElement('link');
            tag.setAttribute('rel', 'stylesheet');
            tag.href = `app/${file}`;
            document.head.appendChild(tag);

            return this;
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

