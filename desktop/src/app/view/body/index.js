exports.Body = new Class(
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
            this.state('title', '');
        },
        actions: function(props)
        {
            this.action('set_title', (args)=>
            {
                this.state('title', args);
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.main = (
                `<section>
                    <h1 class='title'>[state:title]</h1>
                    <div class='content-bbox'>
                        <section id='Body-content'></section>
                    </div>
                </section>`
            );
        }
    }
);