import Rapp from '../../../vendor/relast.js';
import Router from '../../../vendor/relast_router.js';

export default class Dashboard extends Rapp
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
        this.state('aaa', 11);
    };
    actions = function(props)
    {
    };
    draw = function(props)
    {
        this._dom.main = ()=>
        {
            return (
                `<section>
                    <h1>Hello Dashboard [state:aaa]</h1>
                </section>`
            );
        };
    };
}