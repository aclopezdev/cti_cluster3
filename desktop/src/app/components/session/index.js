exports.Session = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            MyAPI.check_session((res)=>
            {
                console.log(111, res);
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
                    <h1>Hello Session</h1>
                </section>`
            );
        }
    }
);