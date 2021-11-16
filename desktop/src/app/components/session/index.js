exports.Session = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            MyAPI.check_session((res)=>
            {
                this.call_action('set_session', res);
            });
        },
        states: function(props)
        {
            this.state('user_data', {});
        },
        actions: function(props)
        {
            this.action('set_session', (args)=>
            {
                let logged = false;
                if(args){
                    if(args.user)
                    {
                        logged = args.user.logged;
                        this.state('user_data', args.user);
                    }
                }
                if(props.response)
                    this._parent.call_action(props.response, logged);
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.main = (
                `<section></section>`
            );
        }
    }
);