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
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.main = (
                `<section>
                    <div>
                        <p>[state:first_name] [state:last_name]</p>
                        <p>[state:email]</p>
                    </div>
                    <div>
                        <button>Dashboard</button>
                        <button>Products</button>
                        <hr/>
                        <button class='btn-link'>Logout</button>
                    </div>
                </section>`
            );
        }
    }
);