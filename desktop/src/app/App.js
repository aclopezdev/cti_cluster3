const session = require('./components/session/index').Session;
const login = require('./components/login/index').Login;
const main = require('./view/templates/default/index').Default;

// NAVIGATION
const Dashboard = require('./content/dashboard/index').Dashboard;
const Products = require('./content/products_manager/stock').Products;
const Sales = require('./content/products_manager/index').Sales_Invoice;
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
            this.set_nav('/products', { name: 'Products', title: 'Stock Management', mod: Products });
            this.set_nav('/sales', { name: 'Sales', title: 'Sales and Invoicing', mod: Sales });
            this.set_nav('/users', { name: 'Users', title: 'Users Management', mod: Users });
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            this.render({
                dom: 'loading',
                bbox: 'main-loader'
            });
            this.render({
                dom: 'no_logged',
                bbox: 'main-content'
            });
            // this.get_comp('Session').call_action('check_session');
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
                this.reset('main-loader');
                if(args)
                {
                    this.render({
                        dom: 'logged',
                        bbox: 'main-content'
                    });
                }
                this.state('loaded', true);
                this.state('logged', args);
            });
        },
        draw: function(props)
        {
            this.dom('loading', ()=>
            {
                return (
                    `<div class='loading-lbox'>
                        <div>
                            <img src='./assets/preloaders/points.gif' />
                            <p>Loading...</p>
                        </div>
                    </div>`
                );
            });
            
            this.dom('no_logged', ()=>
            {
                return (`<section id='Login'></section>`);
            });

            this.dom('logged', ()=>
            {
                return (`<section id='Template'></section>`);
            });

            this._dom.main = () =>
            {
                return (
                    `<section>
                        <div id='Session'></div>
                        <div id='main-content' class='main-content'></div>
                        <div id='main-loader'></div>
                    </section>`
                );
            }
        }
    }
);