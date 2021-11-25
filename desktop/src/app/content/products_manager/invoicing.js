exports.Invoicing = new Class({
    Extends: Rapp,
    initialize: function(args)
    {
        this.parent(args, this);
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
                `<section class='content'>
                    <div class='tool-box'>
                        <button onclick='show_invoice_list'>Invoices</button>
                    </div>
                    <div id='invoice-content'></div>
                </section>`
            );
        });
    }
});