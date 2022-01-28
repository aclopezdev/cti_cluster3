import Rapp from '../../../vendor/relast.js';
import MD5 from '../../../vendor/md5.min.js';
import './main.css';

export default class Login extends Rapp
{
    constructor(args)
    {
        super(args);
    };
    run = function(props)
    {
        // THIS METHOD RUN WHEN THE RENDER FINISH
    };
    states = function(props)
    {
        this.state('email', '');
        this.state('pass', '');
        this.state('messages', []);
        this.state('response_toggle', 'hide');
        this.state('button_active', '');
        this.state('button_label', 'Login');
    };
    actions = function(props)
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
            this.call_action('clear_messages');
            this.call_action('submit_checker');
            if(this.state('messages').length > 0) return;
        });
        this.action('submit_checker', ()=>
        {
            this.state('button_active', 'disabled');
            this.state('button_label', 'Waiting response...');
            this.state('response_toggle', 'hide');
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
                this.render({
                    dom: 'messages',
                    bbox: `${this._name}-messages-bbox`
                });
                this.state('response_toggle', 'show');
                this.state('button_active', '');
                this.state('button_label', 'Login');
                return;
            }
            MyAPI.login({
                email: username,
                password: MD5(pass)
            }, (resp)=>{
                this.state('button_active', '');
                this.state('button_label', 'Login');
                if(!resp.error)
                {
                    for(let m of resp.log)
                        this.call_action('add_message', m);

                    if(this.state('messages').length > 0)
                    {
                        this.render({
                            dom: 'messages',
                            bbox: `${this._name}-messages-bbox`
                        });
                        this.state('response_toggle', 'show');
                    }else{
                        this._parent.call_action('show_intro');
                        if(this._props.Session)
                            this._parent.get_comp(props.Session).call_action('check_session');
                    }
                }
            })
        });
    };
    draw = function(props)
    {
        this._dom.style = `<style>
            .${this._name}-login-bbox-hide
            {
                display: none;
            }
            .${this._name}-login-bbox-show
            {
                display: block;
            }
            .${this._name}-login-response-hide
            {
                display: none;
            }
            .${this._name}-login-response-show
            {
                display: block;
            }
        </style>`;

        this.dom('messages', ()=>{
            const buffer = this.state('messages');
            let message = ``;
            for(let m of buffer)
            {
                message += `<li>${m.message}</li>`;
            }
            return message;
        });

        this.dom('main', ()=>
        {
            return (
                `<section class='login-bbox'>
                    <div>
                        <div>
                            <img src='assets/images/logo.svg' />
                        </div>
                        <p>Technologic Shop</p>
                    </div>
                    <form onsubmit='login-submit'>
                        <p>Write your user data to Sign In.</p>
                        <div class='${this._name}-login-response-[state:response_toggle] error-messages'>
                            <ul id='${this._name}-messages-bbox'></ul>
                        </div>
                        <p>E-mail</p>
                        <div><input type='text' value='[state:email]' onchange='input_email' /></div>
                        <p>Password</p>
                        <div><input type='password' value='[state:pass]' onchange='input_pass' /></div>
                        <div>
                            <input type='submit' value='[state:button_label]' [state:button_active] />
                        </div>
                    </form>
                </section>`
            );
        });
    }
}