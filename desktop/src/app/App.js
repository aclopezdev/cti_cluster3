const session = require('./components/session/index').Session;
const login = require('./components/login/index').Login;
const main = require('./view/templates/default/index').Default;

exports.App = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);

            this.add_comp('Session', session, {props:{response: 'session_response'}});
            this.add_comp('Login', login, {css: 'components/login/main.css', props: {response: 'session_response', Session:'Session'}});
            this.add_comp('Template', main, {css: 'view/templates/default/main.css', props:{Session:'Session'}});
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
        },
        states: function(props)
        {
            this.state('logged', false);
        },
        actions: function(props)
        {
            this.action('session_response', (args)=>
            {
                this.state('logged', args);
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.no_logged = (
                `<section id='Login'></section>`
            );

            this._dom.logged = (
                `<section id='Template'></section>`
            );

            this._dom.main = (
                `<section>
                    <div id='Session'></div>
                    <div if='[logged === true:logged:no_logged]'></div>
                </section>`
            );
        }
    }
);