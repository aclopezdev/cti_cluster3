exports.Main_menu = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            if(session_comp)
            {
                this.state('first_name', session_comp.state('user_data').first_name);
                this.state('last_name', session_comp.state('user_data').last_name);
                this.state('email', session_comp.state('user_data').email);
            }
        },
        states: function(props)
        {
            this.state('first_name', 'unknow');
            this.state('last_name', 'unknow');
            this.state('email', 'unknow');
        },
        actions: function(props)
        {
            this.action('dashboard', ()=>{ this._parent.call_action('nav', '/dashboard') });
            this.action('products', ()=>{ this._parent.call_action('nav', '/products') });
            this.action('users', ()=>{ this._parent.call_action('nav', '/users') });
            this.action('settings', ()=>{ this._parent.call_action('nav', '/settings') });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this.dom('main', ()=>
            {
                return (
                    `<section>
                        <div class='menu-container'>
                            <p class='user-name'>[state:first_name] [state:last_name]</p>
                            <p class='user-email'>[state:email]</p>
                        </div>
                        <div class='menu-container'>
                            <button onclick='dashboard'>Dashboard</button>
                            <button onclick='products'>Products</button>
                            <button onclick='users'>Users</button>
                            <button onclick='settings'>Settings</button>
                            <hr/>
                            <button class='btn-link'>Logout</button>
                        </div>
                    </section>`
                );
            });
        }
    }
);