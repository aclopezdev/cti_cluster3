const login = require('./components/login/index').Login;
const signup = require('./components/signup/index').Signup;

exports.App = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);

            this.add_comp('Login', login, 'components/login/main.css');
            this.add_comp('Signup', signup, 'components/signup/main.css');
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
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
                    <h1>Hello App</h1>
                    <section id='Login'></section>
                    <section id='Signup'></section>
                </section>`
            );
        }
    }
);