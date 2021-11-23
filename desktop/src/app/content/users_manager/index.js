// const Data_table = require('../../components/data_table/data_table').Data_table;
// const Data_table = require('../../components/data_table/index').Data_table;

exports.Users = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);

            // this.add_comp('Users_list', Data_table);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            this.call_action('load_users');
        },
        states: function(props)
        {
            this.state('users_loaded', false);
            this.state('show_new_user_form', false);
            this.state('new_user_send', false);
        },
        actions: function(props)
        {
            this.action('load_users', ()=>
            {
                this.state('users_loaded', false);
                MyAPI.get_users({}, (res)=>
                {
                    this.call_action('bind_users', res);
                });
            });
            this.action('bind_users', (args)=>
            {
                const data = [];
                const titles = [];
                
                if(args.users.length > 0)
                {
                    for(let f in args.users[0])
                    {
                        if(!args.users[0].hasOwnProperty(f)) continue;
                        titles.push({title: f});
                    }
                }
                for(let u of args.users)
                {
                    const buffer = [];
                    for(let f in u)
                    {
                        if(!u.hasOwnProperty(f)) continue;
                        let content = u[f];
                        if(f === 'status')
                        {
                            if(content === '1')
                                content = this._dom.green_flag;
                            else
                                content = this._dom.red_flag;
                        }
                        buffer.push(content);
                    }
                    data.push(buffer);
                }
                this.state('users_loaded', true);
                
                $('#Users_list').DataTable({
                    data: data,
                    columns: titles
                });
            });
            this.action('new_user_form', ()=>
            {
                console.log(1111);
                this.state('new_user_send', true);
            });
            this.action('show_new_user_form', ()=>
            {
                this.state('show_new_user_form', !this.state('show_new_user_form'));
                this.insert('new_user_form', 'new_user_form');
                this.call_action('load_users');
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;
            this._dom.green_flag = `<div class='green-flag'></div>`;
            this._dom.red_flag = `<div class='red-flag'></div>`;
            this._dom.loading = `<div class='data_loader'><p>Loading users...</p><img src='assets/preloaders/windows8_2.svg' /></div>`;
            this._dom.users_table = `<table id='Users_list'></table>`;
            this._dom.new_user = (
                `<div class='capsule'>
                    <h1>New user</h1>
                    <div id='new_user_form'></div>
                </div>`
            );
            this._dom.new_user_form = (
                `<form onsubmit='new_user_form'>
                    <p>First name:</p>
                    <input type='text' />
                    <p>Last name:</p>
                    <input type='text' />
                    <p>E-mail:</p>
                    <input type='text' />
                    <p>Type of user:</p>
                    <select>
                        <option value='admin'>Admin</option>
                        <option value='seller'>Seller</option>
                    </select>
                    <div style='text-align:right'>
                        <input type='reset' value='Clear' />
                        <input type='submit' value='Save' />
                    </div>
                </form>`
            );
            this._dom.empty = `<div></div>`;

            this._dom.main = (
                `<section class='content'>
                    <div class='tool-box'>
                        <button onclick='show_new_user_form'>New user</button>
                    </div>
                    <div class='capsule'>    
                        <h1>Users list</h1>
                        <div if='[users_loaded === false:loading:users_table]'></div>
                    </div>
                    <div if='[show_new_user_form === true:new_user:empty]'></div>
                </section>`
            );
        }
    }
);