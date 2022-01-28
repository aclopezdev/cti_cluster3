import Rapp from '../../../vendor/relast.js';
import Invoicing from './invoicing.js';
import Clients from './clients.js';

export default class Sales_Invoice extends Rapp
{
    constructor(args)
    {
        super(args);

        this.add_comp('Invoicing', Invoicing);
        this.add_comp('Clients', Clients);
    };
    run = function(props)
    {
    };
    states = function(props)
    {
    };
    actions = function(props)
    {
    };
    draw = function(props)
    {
        this.dom('main', ()=>
        {
            return (
                `<section>
                    <h1 class='subtitle-section'>Invoices Management</h1>
                    <div id='Invoicing'></div>
                    <h1 class='subtitle-section'>Clients Management</h1>
                    <div id='Clients'></div>
                </section>`
            );
        });
    }
}