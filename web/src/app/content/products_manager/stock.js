import Rapp from '../../../vendor/relast.js';


export default class Products extends Rapp
{
    constructor(args)
    {
        super(args);
    };
    run = function(props)
    {
        // THIS METHOD RUN WHEN THE RENDER FINISH
        this.call_action('load_stock');
    };
    states = function(props)
    {
        this.state('response', '');
        this.state('stock_id', '');
        this.state('stock_name', '');
        this.state('stock_desc', '');
        this.state('stock_price', '');
        this.state('stock_stock', '');
    };
    actions = function(props)
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
                const titles = [{title: 'ID'}, {title: 'Name'}, {title: 'Price'}, {title: 'Stock'}, {title: 'Status'}, {title: 'Date creation'}, {title: 'Creator'}, {title: ''}];
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
                    buffer.push(`${this._dom['details_btn'](s['ID'])} ${this._dom['edit_btn'](s['ID'])} ${this._dom['remove_btn'](s['ID'], s['Status'] === '1' ? 'Deactivate' : 'Activate')}`);
                    data.push(buffer);
                }
                
                $('#table-stock').DataTable({
                    data: data,
                    columns: titles
                });
                this.call_action('edit_btn');
                this.call_action('remove_btn');
            });
        });


        this.action('edit_btn', ()=>
        {
            const buffer = document.getElementsByClassName('stock-edit-btn');
            for(let btn of buffer)
            {
                btn.onclick = (e)=>
                {
                    const id = btn.getAttribute('key');
                    this.render({dom: 'loading', bbox: 'stock-section', params: 'Editing stock...'});
                    this.call_action('load_stock_data', {id: id, next_action: 'show_edit_form', api: 'get_stock_data'});
                }
            }
        });
        this.action('remove_btn', ()=>
        {
            const buffer = document.getElementsByClassName('stock-remove-btn');
            for(let btn of buffer)
            {
                btn.onclick = (e)=>
                {
                    const id = btn.getAttribute('key');
                    this.render({dom: 'loading', bbox: 'stock-section', params: 'Editing stock...'});
                    this.call_action('load_stock_data', {id: id, next_action: 'load_stock', api: 'toggle_stock'});
                }
            }
        });



        this.action('load_stock_data', (args)=>
        {
            MyAPI[args.api]({id: args.id}, (res)=>
            {
                this.call_action(args.next_action, res);
            });
        });

        this.action('show_edit_form', (args)=>
        {
            const data = args.stock;
            this.state('stock_id', data.ID);
            this.state('stock_name', data.Name);
            this.state('stock_desc', data.Description);
            this.state('stock_price', data.Price);
            this.state('stock_stock', data.Stock);
            this.render({dom: 'edit-stock-section', bbox: 'stock-section'});
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
                this.state('stock_id', '');
                this.state('stock_name', '');
                this.state('stock_desc', '');
                this.state('stock_price', '');
                this.state('stock_stock', '');
                this.call_action('load_stock');
            });
        });

        this.action('edit_stock_submit', ()=>
        {
            this.render({
                dom: 'loading',
                bbox: 'stock-section',
                params: 'Sending data...'
            });
            const data = {
                id: this.state('stock_id'),
                name: this.state('stock_name'),
                desc: this.state('stock_desc'),
                price: this.state('stock_price'),
                stock: this.state('stock_stock')
            };
            MyAPI.edit_stock(data, (res)=>
            {
                if(res.error)
                {
                    this.render({dom: 'new-stock-section', bbox: 'stock-section'});
                    this.state('response', 'Check the fields values and try again.');
                    return;
                }
                this.state('stock_id', '');
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
    };
    draw = function(props)
    {
        this._dom.green_flag = `<div class='green-flag'></div>`;
        this._dom.red_flag = `<div class='red-flag'></div>`;
        

        this.dom('edit_btn', (id) =>
        {
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            if(session_comp.state('user_data')['USER-TYPE'] !== '0') return '';

            return `<button key='${id}' class='stock-edit-btn'>Edit</button>`;
        });
        this.dom('remove_btn', (id, state) =>
        {
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            if(session_comp.state('user_data')['USER-TYPE'] !== '0') return '';
            return `<button key='${id}' class='stock-remove-btn'>${state}</button>`;
        });
        this.dom('details_btn', (id) =>
        {
            return '';
            return `<button key='${id}' class='stock-details-btn'>See details</button>`;
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

        this.dom('edit-stock-section', ()=>
        {
            return (
                `<p>[state:response]</p>
                <form onsubmit='edit_stock_submit'>
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
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            return (
                `<section class='content'>
                    <div class='tool-box'>
                        <button onclick='show_stock_list'>Stock</button>
                        ${session_comp.state('user_data')['USER-TYPE'] !== '0' ? "" : "<button onclick='show_new_product_form'>Add product</button>"}
                    </div>
                    <div id='stock-content'></div>
                </section>`
            );
        });
    }
}