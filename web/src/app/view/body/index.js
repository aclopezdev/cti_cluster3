import Rapp from '../../../vendor/relast.js';

export default class Body extends Rapp
{
    constructor(args)
    {
        super(args);
    };
    run = function(props)
    {
        // THIS METHOD RUN WHEN THE RENDER FINISH
    };
    states = function(props)
    {
        this.state('title', '');
    };
    actions = function(props)
    {
        this.action('set_title', (args)=>
        {
            this.state('title', args);
        });
    };
    draw = function(props)
    {
        this.dom('main', ()=>
        {
            return (
                `<section>
                    <h1 class='title'>[state:title]</h1>
                    <div class='content-bbox'>
                        <section id='Body-content'></section>
                    </div>
                </section>`
            );
        });
    }
}