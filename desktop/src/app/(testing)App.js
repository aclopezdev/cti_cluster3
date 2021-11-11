exports.App = new Class(
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
            this.state('state1', 'andres camilo');
            this.state('state2', 'lopez duque');
            this.state('state3', false);
            this.state('buffer1', [{k: 0, p0: 1, p1: 2, p10: 30}, {k: 1, p0: 1, p1: 2, p10: 30}, {k: 2, p0: 1, p1: 2, p10: 30}, {k: 3, p0: 1, p1: 2, p10: 30}, {k: 4, p0: 1, p1: 2, p10: 30}]);
            this.state('loop1_min', 0);
            this.state('loop1_max', 10);
        },
        actions: function(props)
        {
            this.action('kupState1', (args)=>
            {
                this.state('state1', args.target.value);
            });
            this.action('kupState2', (args)=>
            {
                this.state('state2', args.target.value);
            });
            this.action('action1', (args)=>
            {
                this.state('buffer1', [...this.state('buffer1'), {k: this.state('buffer1').length - 1, p0: 1, p1: 2, p10: 30}])
                this.state('state3', !this.state('state3'));
            });
        },
        draw: function(props)
        {
            this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;
            this._dom.iterator.buffer1_test = `<a href='javascript:;'>item [k] [p0] [p1] [p10]</a>`;

            this._dom.print_true = `<h1>This is true</h1>`;
            this._dom.print_false = `<h1>This is false</h1>`;

            this._dom.main = (
                `<section>
                    <h1>Hello App</h1>
                    <div id='aaaaaa' class='aaaaa [state:state1]' state='state1'>aaaaa</div>
                    <input type='text' value='[state:state1]' onkeyup='kupState1' />
                    <input type='text' value='[state:state2]' onkeyup='kupState2' />
                    <button onclick='action1'>sdfasdf</button>
                </section>
                <section if='[state3 === true:print_true:print_false]'></section>
                <section foreach='[buffer1:buffer1_test]'></section>
                <section for='[loop1_min:loop1_max:test]'></section>
                <section for='[loop1_min:30:test]'></section>
                <div>rgfrewge [state:state1] [state:state2] [state:state3]</div>`
            );
        }
    }
);