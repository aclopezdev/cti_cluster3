exports.Login = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
        },
        states: function(props)
        {
            this.state('email', '');
            this.state('pass', '');
            this.state('messages', []);
            this.state('response_toggle', 'hide');
        },
        actions: function(props)
        {
            this.action('input_email', (args)=>
            {
                this.state('email', args.target.value);
            });
            this.action('input_pass', (args)=>
            {
                this.state('pass', args.target.value);
            });
            this.action('add_message', (args)=>
            {
                const message = {message: args};
                this.state('messages', [...this.state('messages'), message]);
            });
            this.action('clear_messages', ()=>
            {
                this.state('messages', []);
            });
            this.action('login-submit', ()=>
            {
                this.state('response_toggle', 'hide');
                this.call_action('clear_messages');
                this.call_action('submit_checker');
                if(this.state('messages').length > 0) return;
            });
            this.action('submit_checker', ()=>
            {
                const username = this.state('email');
                const pass = this.state('pass');
                if(username.trim() === '')
                    this.call_action('add_message', 'Write your E-mail, please and try again.');
                else{
                    const email_check = username.match(/([\w|0-9|\W])+@([\w|\W])+[.]([\w])+([.]+[\w])?/g);
                    if(!email_check)
                        this.call_action('add_message', 'Your E-mail does not have the correct format');
                    if(email_check)
                        if(email_check.length === 0)
                            this.call_action('add_message', 'Your E-mail does not have the correct format');
                }
                if(pass.trim() === '')
                    this.call_action('add_message', 'Write your password, please and try again.');

                if(this.state('messages').length > 0)
                {
                    this.state('response_toggle', 'show');
                    return;
                }

                MyAPI.login({
                    email: username,
                    password: MD5(pass)
                })
            });
        },
        draw: function(props)
        {
            this._dom.style = `<style>
                ${this._name}-login-bbox-hide
                {
                    display: none;
                }
                ${this._name}-login-bbox-show
                {
                    display: block;
                }
            </style>`;

            this.dom('main', ()=>
            {
                return (
                    `<section class='login-bbox'>
                        <form onsubmit='login-submit'>
                            <div class='login-response-${this.state('response_toggle')}'>
                                <ul foreach='[messages:messages]'></ul>
                            </div>
                            <p>E-mail</p>
                            <div><input type='text' value='[state:email]' onchange='input_email' /></div>
                            <p>Password</p>
                            <div><input type='password' value='[state:pass]' onchange='input_pass' /></div>
                            <div>
                                <input type='submit' value='Login' />
                            </div>
                        </form>
                    </section>`
                );
            });
        }
    }
);