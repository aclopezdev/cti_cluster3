const Data_table = require('../../components/data_table/data_table').Data_table;
// const Data_table = require('../../components/data_table/index').Data_table;

exports.Users = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);

            this.add_comp('Users_list', Data_table);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            MyAPI.get_users({}, (res)=>
            {
                this._comps['Users_list'].call_action('set_data', 
                { 
                    key: 'uid',
                    data: res.users, 
                    header: 
                    { 
                        uid: 'ID', 
                        date_crea: 'Date create', 
                        first_name: 'First Name', 
                        last_name: 'Last Name', 
                        email: 'E-mail', 
                        status: '' 
                    } 
                });
            });
        },
        states: function(props)
        {
        },
        actions: function(props)
        {
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.main = (
                `<section>
                    <h1>Users</h1>
                    <section id='Users_list'></section>
                </section>`
            );
        }
    }
);