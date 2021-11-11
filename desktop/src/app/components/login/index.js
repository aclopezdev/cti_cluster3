exports.Login = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
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
            this.action('login-submit', ()=>
            {
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.main = (
                `<section class='login-bbox'>
                    <form onsubmit='login-submit'>
                        <p>User name</p>
                        <div><input type='text' /></div>
                        <p>Password</p>
                        <div><input type='password' /></div>
                        <div>
                            <input type='submit' value='Login' />
                        </div>
                    </form>
                </section>`
            );
        }
    }
);