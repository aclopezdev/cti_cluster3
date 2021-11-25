const invoicing = require('./invoicing.js').Invoicing;
const clients = require('./clients.js').Clients;

exports.Sales_Invoice = new Class({
    Extends: Rapp,
    initialize: function(args)
    {
        this.parent(args, this);

        this.add_comp('Invoicing', invoicing);
        this.add_comp('Clients', clients);
    },
    run: function(props)
    {
    },
    states: function(props)
    {
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
                    <h1 class='subtitle-section'>Clients Management</h1>
                    <div id='Clients'></div>
                    <h1 class='subtitle-section'>Invoices Management</h1>
                    <div id='Invoicing'></div>
                </section>`
            );
        });
    }
});