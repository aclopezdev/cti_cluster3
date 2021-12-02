import Rapp from '../../../vendor/relast';

export default Session = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            this.call_action('check_session');
        },
        states: function(props)
        {
            this.state('user_data', {});
        },
        actions: function(props)
        {
            this.action('check_session', ()=>
            {
                MyAPI.check_session((res)=>
                {
                    this.call_action('set_session', res);
                });
            });
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
            this.dom('main', ()=>
            {
                return (
                    `<section></section>`
                );
            });
        }
    }
);