import Rapp from '../../../vendor/relast.js';

export default class Main_menu extends Rapp
{
    constructor(args)
    {
        super(args);
    };
    run = function(props)
    {
        // THIS METHOD RUN WHEN THE RENDER FINISH
        const session_comp = this.looking_comp(`${this._main._name}/Session`);
        if(session_comp)
        {
            this.state('first_name', session_comp.state('user_data').first_name);
            this.state('last_name', session_comp.state('user_data').last_name);
            this.state('email', session_comp.state('user_data').email);
        }
    };
    states = function(props)
    {
        this.state('first_name', 'unknow');
        this.state('last_name', 'unknow');
        this.state('email', 'unknow');
    };
    actions = function(props)
    {
        this.action('dashboard', ()=>{ 
            this.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Dashboard');
            this.nav('/dashboard');
            this.call_action('toggle_menu');
        });
        this.action('products', ()=>{ 
            this.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Products Management');
            this.nav('/products');
            this.call_action('toggle_menu');
        });
        this.action('sales', ()=>{ 
            this.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Sales Management');
            this.nav('/sales');
            this.call_action('toggle_menu');
        });
        this.action('users', ()=>{ 
            this.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Users Management');
            this.nav('/users');
            this.call_action('toggle_menu');
        });
        this.action('settings', ()=>{ 
            this.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Settings');
            this.nav('/settings');
            this.call_action('toggle_menu');
        });
        this.action('toggle_menu', ()=>
            {
                const menu = this._parent._wrappers.ids[`Main-menu`];
                menu.classList.toggle('Template-main-menu-mobile-hidden');
            });
        this.action('logout', ()=>{
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            this._main.call_action('show_intro');
            MyAPI.logout({
                id: session_comp.state('id'),
                token: session_comp.state('token')
            }, (resp)=>{
                session_comp.call_action('check_session');
            });
        });
    };
    draw = function(props)
    {
        //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

        this.dom('main', ()=>
        {
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            const mobile_button = `<div class='mobile-button'>
                <button onclick='toggle_menu'>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            </div>`;
            const user_manager_btn = `<hr/>
                <button onclick='users'>User Management</button>`;
            return (
                `<section>
                    ${Rapp.isMobile() ? mobile_button : ''}
                    <div class='menu-container'>
                        <p class='user-name'>[state:first_name] [state:last_name]</p>
                        <p class='user-email'>[state:email]</p>
                    </div>
                    <div class='menu-container'>
                        <button onclick='dashboard'>Mashups</button>
                        <hr/>
                        <button onclick='products'>Stock Management</button>
                        <button onclick='sales'>Sales and Invoicing</button>
                        ${session_comp.state('user_data')['USER-TYPE'] === '0' ? user_manager_btn : ''}
                        <hr/>
                        <!--button onclick='settings'>Settings</button-->
                        <button onclick='logout' class='btn-link'>Logout</button>
                    </div>
                </section>`
            );
        });
    }
}