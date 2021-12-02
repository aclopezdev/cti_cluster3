exports.Signup = new Class(
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
            this.action('signup-submit', ()=>
            {
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.main = (
                `<section>
                    <form onsubmit='signup-submit'>
                        <p>First name</p>
                        <div><input type='text' /></div>
                        <p>Last name</p>
                        <div><input type='text' /></div>
                        <div>
                            <input type='reset' value='Reset' />
                            <input type='submit' value='Sign-up' />
                        </div>
                    </form>
                </section>`
            );
        }
    }
);