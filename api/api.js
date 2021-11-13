const MyAPI = 
{
    init: ()=>
    {
    },
    check_session: (cback)=>
    {
        MyNet.fetch('session', 'checker', (res)=>
        {
            res['error'] = false;
            if(cback)
                cback(res);
        }, ()=>
        {
            if(cback)
                cback({error: true});
        });
    },
    login: (args)=>
    {
        console.log(args);
    }
}

MyAPI.debug = true;
MyAPI.REQUEST_ENUM = {
    XHR: 'xmlhttp',
    FETCH: 'fetch'
}
MyAPI.backend = MyAPI.REQUEST_ENUM.FETCH;



const MyNet = 
{
    uri: MyAPI.debug ? 'http://localhost/CTI/cti_cluster3/back/api/' : '',
    fetch: function(mod, cmd, cback, cback_error, args={})
    {
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const output = {
            mod: mod,
            cmd: cmd,
            args: args
        };
        headers['Access-Control-Allow-Credentials'] = true;
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept;';
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE';
        if(MyAPI.backend === MyAPI.REQUEST_ENUM.FETCH)
        {
            const data =
            {
                method: 'POST',
                headers: headers,
                body: `input=${JSON.stringify(output)}`
            }
            fetch(this.uri, data).then(res=>
            {
                if(res.status !== 200)
                {
                    if(cback_error)
                        cback_error();
                    return;
                }
                res.json().then(resp=>
                    {
                        if(cback)
                            cback(resp);
                    });
            });
        }else if(MyAPI.backend === MyAPI.REQUEST_ENUM.XHR)
        {
            const http = new XMLHttpRequest()
            http.open('POST', this.uri, true);
            for(h in headers)
                if(headers.hasOwnProperty(h))
                    http.setRequestHeader(h, headers[h]);
            http.send(`input=${JSON.stringify(output)}`);
            http.onload = function() {
                if(MyNet.debug)
                    console.log(http.responseText);
            }
            http.onreadystatechange = function(res)
            {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) 
                {
                    if(cback)
                        cback(JSON.parse(this.responseText));
                }else{
                    if(cback_error)
                        cback_error();
                }
            }
        }
    }
}

MyNet.debug = true;