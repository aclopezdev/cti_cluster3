exports.Dashboard = new Class(
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
            this.state('aaa', 11);
        },
        actions: function(props)
        {
        },
        draw: function(props)
        {
            this.dom('main', ()=>
            {
                return (
                    `<section>
                        <h1>Hello Dashboard [state:aaa]</h1>
                    </section>`
                );
            });
        }
    }
);