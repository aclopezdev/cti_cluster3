exports.Products = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
            this.call_action('load_stock');
        },
        states: function(props)
        {
            this.state('response', '');
            this.state('stock_name', '');
            this.state('stock_desc', '');
            this.state('stock_price', '');
            this.state('stock_stock', '');
        },
        actions: function(props)
        {
            this.action('load_stock', ()=>
            {
                this.render({
                    dom: 'show_stock',
                    bbox: 'stock-content'
                });
                this.render({
                    dom: 'loading',
                    bbox: 'stock-section',
                    params: 'Loading stock...'
                });
                
                MyAPI.get_stock({}, (res)=>
                {
                    this.render({
                        dom: 'stock_list_section',
                        bbox: 'stock-section'
                    });
                    const titles = [{title: 'ID'}, {title: 'Name'}, {title: 'Description'}, {title: 'Price'}, {title: 'Stock'}, {title: 'Status'}, {title: 'Date creation'}, {title: 'Creator'}, {title: ''}];
                    const data = [];
                    for(let s of res.stock)
                    {
                        const buffer = [];
                        for(let f in s)
                        {
                            if(!s.hasOwnProperty(f)) continue;
                            let value = s[f];
                            if(f === 'Status')
                                value = value === '1' ? this._dom['green_flag'] : this._dom['red_flag'];
                            buffer.push(value);
                        }
                        buffer.push(`${this._dom['edit_btn']()} ${this._dom['remove_btn']()}`);
                        data.push(buffer);
                    }
                    
                    $('#table-stock').DataTable({
                        data: data,
                        columns: titles
                    });
                });
            });
            this.action('show_stock_list', ()=>
            {
                this.call_action('load_stock');
            });

            this.action('show_new_product_form', ()=>
            {
                this.render({
                    dom: 'new-stock-section',
                    bbox: 'stock-section'
                });
            });

            this.action('new_stock_submit', ()=>
            {
                this.render({
                    dom: 'loading',
                    bbox: 'stock-section',
                    params: 'Sending data...'
                });
                const data = {
                    name: this.state('stock_name'),
                    desc: this.state('stock_desc'),
                    price: this.state('stock_price'),
                    stock: this.state('stock_stock')
                };
                MyAPI.new_stock(data, (res)=>
                {
                    if(res.error)
                    {
                        this.render({dom: 'new-stock-section', bbox: 'stock-section'});
                        this.state('response', 'Check the fields values and try again.');
                        return;
                    }
                    this.state('stock_name', '');
                    this.state('stock_desc', '');
                    this.state('stock_price', '');
                    this.state('stock_stock', '');
                    this.call_action('load_stock');
                });
            });

            
            this.action('set_stock_name', (e)=>
            {
                this.state('stock_name', e.target.value);
            });
            this.action('set_stock_desc', (e)=>
            {
                this.state('stock_desc', e.target.value);
            });
            this.action('set_stock_price', (e)=>
            {
                this.state('stock_price', e.target.value);
            });
            this.action('set_stock_stock', (e)=>
            {
                this.state('stock_stock', e.target.value);
            });
        },
        draw: function(props)
        {
            this._dom.green_flag = `<div class='green-flag'></div>`;
            this._dom.red_flag = `<div class='red-flag'></div>`;
            

            this.dom('edit_btn', (id) =>
            {
                return `<button key='${id}' class='user-edit-btn'>Edit</button>`;
            });
            this.dom('remove_btn', (id) =>
            {
                return `<button key='${id}' class='user-remove-btn'>Toggle</button>`;
            });

            this.dom('loading', (message='Loading...')=>
            {
                return `<div class='data_loader'><p>${message}</p><img src='assets/preloaders/windows8_2.svg' /></div>`;
            });

            this.dom('show_stock', ()=>
            {
                return (
                    `<div class='capsule'>
                        <h1>Stock</h1>
                        <div id='stock-section'></div>
                    </div>`
                );
            });

            this.dom('new-stock-section', ()=>
            {
                return (
                    `<p>[state:response]</p>
                    <form onsubmit='new_stock_submit'>
                        <p>Name:</p>
                        <input type='text' value='[state:stock_name]' onkeyup='set_stock_name' />
                        <p>Description:</p>
                        <textarea value='[state:stock_desc]' onkeyup='set_stock_desc'>[state:stock_desc]</textarea>
                        <p>Price:</p>
                        <input type='text' value='[state:stock_price]' onkeyup='set_stock_price' />
                        <p>Stock:</p>
                        <input type='text' value='[state:stock_stock]' onkeyup='set_stock_stock' />
                        <div style='text-align: right'>
                            <input type='reset' value='Clear' />
                            <input type='submit' value='Save' />
                        </div>
                    </form>`
                );
            });

            this.dom('stock_list_section', ()=>
            {
                return (
                    `<table id='table-stock'></table>`
                );
            });

            this.dom('main', ()=>
            {
                return (
                    `<section class='content'>
                        <div class='tool-box'>
                            <button onclick='show_stock_list'>Stock</button>
                            <button onclick='show_new_product_form'>Add product</button>
                        </div>
                        <div id='stock-content'></div>
                    </section>`
                );
            });
        }
    }
);