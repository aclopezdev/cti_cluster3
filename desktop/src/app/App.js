const session = require('./components/session/index').Session;
const login = require('./components/login/index').Login;
const main = require('./view/templates/default/index').Default;

// NAVIGATION
const Dashboard = require('./content/dashboard/index').Dashboard;
const Products = require('./content/products_manager/index').Products;
const Users = require('./content/users_manager/index').Users;
// NAVIGATION

exports.App = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);

            this.add_comp('Session', session, {props:{response: 'session_response'}});
            this.add_comp('Login', login, {css: 'components/login/main.css', props: {response: 'session_response', Session:'Session'}});
            this.add_comp('Template', main, {css: 'view/templates/default/main.css', props:{Session:'Session'}});

            this.set_nav('/dashboard', { name: 'Dashboard', title: 'Dashboard', mod: Dashboard });
            this.set_nav('/products', { name: 'Products', title: 'Products Manager', mod: Products });
            this.set_nav('/users', { name: 'Users', title: 'Users Manager', mod: Users });
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
        },
        states: function(props)
        {
            this.state('logged', false);
            this.state('loaded', false);
        },
        actions: function(props)
        {
            this.action('session_response', (args)=>
            {
                this.state('loaded', true);
                this.state('logged', args);
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.loading = (
                `<div class='loading-lbox'>
                    <div>
                        <img src='./assets/preloaders/points.gif' />
                        <p>Loading...</p>
                    </div>
                </div>`
            );

            this._dom.loaded = (`<div></div>`);

            this._dom.no_logged = (
                `<section id='Login'></section>`
            );

            this._dom.logged = (
                `<section id='Template'></section>`
            );

            this._dom.main = (
                `<section>
                    <div id='Session'></div>
                    <div if='[logged === true:logged:no_logged]' class='main-content'></div>
                    <div if='[loaded === false:loading:loaded]'></div>
                </section>`
            );
        }
    }
);