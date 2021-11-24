exports.Users = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            this.call_action('show_users_list');
            this.call_action('load_users');
        },
        states: function(props)
        {
            this.state('new_user_response', '');
            this.state('first_name', '');
            this.state('last_name', '');
            this.state('user_email', '');
            this.state('user_type', '');
        },
        actions: function(props)
        {
            this.action('load_users', ()=>
            {
                this.render({
                    dom: 'loading',
                    bbox: 'user-list-section',
                    params: 'Loading users...'
                });
                this.state('users_loaded', false);
                MyAPI.get_users({}, (res)=>
                {
                    this.call_action('bind_users', res);
                });
            });
            //  ||||||||||||||||||||||||||
            this.action('bind_users', (args)=>
            {
                const data = [];
                const titles = [];
                
                this.render({
                    dom: 'users_table',
                    bbox: 'user-list-section'
                });

                titles.push({title: 'ID'});
                titles.push({title: 'First name'});
                titles.push({title: 'Last name'});
                titles.push({title: 'Email'});
                titles.push({title: 'Status'});
                titles.push({title: 'Date creation'});
                titles.push({title: ''});
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
                    buffer.push(`${ this._dom['edit_btn'](u['uid']) } ${ this._dom['remove_btn'](u['uid']) }`);
                    data.push(buffer);
                }
                this.state('users_loaded', true);
                
                $('#Users_list').DataTable({
                    data: data,
                    columns: titles
                });

                const edit_btns = document.getElementsByClassName('user-edit-btn');
                const remove_btns = document.getElementsByClassName('user-remove-btn');
                
                for(let btn of edit_btns)
                {
                    btn.onclick = ()=>
                    {
                        this.call_action('edit_user', btn.getAttribute('key'));
                    }
                }
                for(let btn of remove_btns)
                {
                    btn.onclick = ()=>
                    {
                        this.call_action('toggle_user', btn.getAttribute('key'));
                    }
                }
            });
            //  ||||||||||||||||||||||||||
            this.action('edit_user', (args)=>
            {
                this.render({
                    dom: 'loading',
                    bbox: 'user-list-section',
                    params: 'Editing...'
                });
                MyAPI.get_user_data({id: args}, (res)=>
                {
                    this.state('first_name', res.users[0].first_name);
                    this.state('last_name', res.users[0].last_name);
                    this.state('user_email', res.users[0].email);
                    this.render({
                        dom: 'edit_user_form',
                        bbox: 'user-list-section'
                    });
                    console.log(res);
                });
            });
            //  ||||||||||||||||||||||||||
            this.action('toggle_user', (args)=>
            {
                console.log(args);
            });
            //  ||||||||||||||||||||||||||
            this.action('new_user_form', ()=>
            {
                let first_name = this.state('first_name');
                let last_name = this.state('last_name');
                let user_email = this.state('user_email');
                let user_type = this.state('user_type');

                if(first_name.trim() === '')
                {
                    this.state('new_user_response', 'Write a correctly the "First Name" field and try again.');
                    return;
                }
                if(last_name.trim() === '')
                {
                    this.state('new_user_response', 'Write a correctly the "Last Name" field and try again.');
                    return;
                }
                if(user_email.trim() === '')
                {
                    this.state('new_user_response', 'Write a correctly the "E-mail" field and try again.');
                    return;
                }else{
                    const email_check = user_email.match(/([\w|0-9|\W])+@([\w|\W])+[.]([\w])+([.]+[\w])?/g);
                    if(!email_check)
                        return this.state('new_user_response', 'Your E-mail does not have the correct format');
                    if(email_check)
                        if(email_check.length === 0)
                            return this.state('new_user_response', 'Your E-mail does not have the correct format');
                }
                if(user_type.trim() === '')
                {
                    this.state('new_user_response', 'Select one type of user and try again.');
                    return;
                }

                this.render({
                    dom: 'loading',
                    bbox: 'new_user_form',
                    params: 'Sending data...'
                });
                MyAPI.new_user({
                    first_name: first_name,
                    last_name: last_name,
                    email: user_email,
                    type: user_type
                }, (res)=>
                {
                    this.render({
                        dom: 'new_user_form',
                        bbox: 'new_user_form'
                    });
                });
            });
            //  ||||||||||||||||||||||||||
            this.action('show_users_list', ()=>
            {
                this.render({
                    dom: 'show_users_list',
                    bbox: 'users-content'
                });
                this.call_action('load_users');
            });
            //  ||||||||||||||||||||||||||
            this.action('show_new_user_form', ()=>
            {
                this.state('first_name', '');
                this.state('last_name', '');
                this.state('user_email', '');
                this.state('user_type', '');
                this.render({
                    dom: 'new_user',
                    bbox: 'users-content'
                });
                this.render({
                    dom: 'new_user_form',
                    bbox: 'new_user_form'
                });
            });
            // |||||||||||||||||||||||||||
            this.action('set_first_name', (e)=>
            {
                this.state('first_name', e.target.value);
            });
            // |||||||||||||||||||||||||||
            this.action('set_last_name', (e)=>
            {
                this.state('last_name', e.target.value);
            });
            // |||||||||||||||||||||||||||
            this.action('set_user_email', (e)=>
            {
                this.state('user_email', e.target.value);
            });
            // |||||||||||||||||||||||||||
            this.action('set_user_type', (e)=>
            {
                this.state('user_type', e.target.value);
            });
        },
        draw: function(props)
        {
            this._dom.green_flag = `<div class='green-flag'></div>`;
            this._dom.red_flag = `<div class='red-flag'></div>`;

            this.dom('edit_btn', (id) =>
            {
                return `<button key='${id}' class='user-edit-btn'>Edit</button>`;
            });
            this.dom('remove_btn', (id) =>
            {
                return `<button key='${id}' class='user-remove-btn'>Toggle</button>`;
            });

            this.dom('loading', (message='Loading...')=>
            {
                return `<div class='data_loader'><p>${message}</p><img src='assets/preloaders/windows8_2.svg' /></div>`;
            });
            this.dom('users_table', ()=>
            {
                return `<table id='Users_list'></table>`;
            });
            this.dom('show_users_list', ()=>
            {
                return (
                    `<div class='capsule'>
                        <h1>Users list</h1>
                        <div id='user-list-section'></div>
                    </div>`
                );
            });
            this.dom('new_user', ()=>
            {
                return (
                    `<div class='capsule'>
                        <h1>New user</h1>
                        <div id='new_user_form'></div>
                    </div>`
                );
            });
            this.dom('new_user_form', ()=>
            {
                return (
                    `<p>[state:new_user_response]</p>
                    <form onsubmit='new_user_form'>
                        <p>First name:</p>
                        <input type='text' value='[state:first_name]' onkeyup='set_first_name' />
                        <p>Last name:</p>
                        <input type='text' value='[state:last_name]' onkeyup='set_last_name' />
                        <p>E-mail:</p>
                        <input type='text' value='[state:user_email]' onkeyup='set_user_email' />
                        <p>Type of user:</p>
                        <select value='[state:user_type]' onchange='set_user_type'>
                            <option value='' disabled selected>Select...</option>
                            <option value='admin'>Admin</option>
                            <option value='seller'>Seller</option>
                        </select>
                        <div style='text-align:right'>
                            <input type='reset' value='Clear' />
                            <input type='submit' value='Save' />
                        </div>
                    </form>`
                );
            });
            this.dom('edit_user_form', ()=>
            {
                return (
                    `<p>[state:new_user_response]</p>
                    <form onsubmit='edit_user_form'>
                        <p>First name:</p>
                        <input type='text' value='[state:first_name]' onkeyup='set_first_name' />
                        <p>Last name:</p>
                        <input type='text' value='[state:last_name]' onkeyup='set_last_name' />
                        <p>E-mail:</p>
                        <input type='text' value='[state:user_email]' onkeyup='set_user_email' />
                        <p>Type of user:</p>
                        <select value='[state:user_type]' onchange='set_user_type'>
                            <option value='' disabled selected>Select...</option>
                            <option value='admin'>Admin</option>
                            <option value='seller'>Seller</option>
                        </select>
                        <div style='text-align:right'>
                            <input type='reset' value='Clear' />
                            <input type='submit' value='Save' />
                        </div>
                    </form>`
                );
            });

            this.dom('main', ()=>
            {
                return (
                    `<section class='content'>
                        <div class='tool-box'>
                            <button onclick='show_users_list'>Users</button>
                            <button onclick='show_new_user_form'>New user</button>
                        </div>
                        <div id='users-content'></div>
                    </section>`
                );
            });
        }
    }
);