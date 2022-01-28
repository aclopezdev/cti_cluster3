import Rapp from '../../../vendor/relast.js';

export default class Header extends Rapp
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
    };
    actions = function(props)
    {
    };
    draw = function(props)
    {
        //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

        this.dom('main', ()=>
        {
            return (
                `<section class='dflex dflex-wrap justifyc-center'>
                    <img src='assets/images/logo.svg' class='header-logo' />
                </section>`
            );
        });
    }
}