exports.Invoicing = new Class({
	Extends: Rapp,
	initialize: function(args) {
		this.parent(args, this);
	},
	run: function(props) {
		this.render({ dom: "capsule", bbox: "invoice-content" });
		if (Rapp.obj_length(this.state("basket")) > 0)
		{
			this.call_action("show_client_finder");
			this.call_action("show_prev_invoice_saved");
		}else{
			this.call_action('show_invoice_list');
		}
	},
	states: function(props) {
		this.state("client_finder", "");
		this.state("product_finder", "");
		this.state("client_selected", "");
		this.state("client_selected_data", "");
		this.state("basket", {});
		this.state("basket_count", 0);
		this.state("basket_total_count", 0);
		this.state("basket_total_price", 0);
	},
	actions: function(props) {
		this.action("show_client_finder", () => {
			this.render({
				dom: "client_finder",
				bbox: `${this._name}-capsule-section`,
			});
		});

		this.action("submit_find_client", () => {
			this.render({
				dom: "loading",
				bbox: "client-finer-result",
				params: "Looking for the client...",
			});

			MyAPI.find_client({ text: this.state("client_finder") }, res => {
				this.render({
					dom: "client-find-table",
					bbox: "client-finer-result",
					params: { count: res.clients.length },
				});
				const titles = [
					{ title: "ID" },
					{ title: "First Name" },
					{ title: "Last Name" },
					{ title: "Address" },
					{ title: "Phone" },
					{ title: "" },
				];
				const data = [];

				for (let c of res.clients) {
					const buffer = [];
					for (let t in c) {
						if (!c.hasOwnProperty(t)) continue;
						if (
							t === "ID" ||
							t === "first_name" ||
							t === "last_name" ||
							t === "address" ||
							t === "phone"
						) {
							let value = c[t];
							buffer.push(value);
						}
					}
					buffer.push(`${this._dom["sell_btn"](c["ID"])}`);
					data.push(buffer);
				}

				$("#client-finder-table").DataTable({
					data: data,
					columns: titles,
				});

				this.call_action("click_start_sell");
			});
		});

		this.action("submit_find_product", () => {
			this.render({
				dom: "loading",
				bbox: "product-finer-result",
				params: "Looking for products...",
			});
			MyAPI.find_stock({ text: this.state("product_finder") }, res => {
				this.render({
					dom: "product-find-table",
					bbox: "product-finer-result",
					params: {
						count: res.stock.length,
					},
				});

				const data = [];
				const titles = [
					{ title: "ID" },
					{ title: "Name" },
					{ title: "Price" },
					{ title: "Stock" },
					{ title: "" },
				];

				for (let s of res.stock) {
					const buffer = [];
					for (let t in s) {
						if (!s.hasOwnProperty(t)) continue;
						if (
							t === "ID" ||
							t === "name" ||
							t === "price" ||
							t === "stock"
						) {
							let value = s[t];
							buffer.push(value);
						}
					}
					buffer.push(
						`${this._dom["add_product_btn"]({
							id: s["ID"],
							stock: s["stock"],
						})}`
					);
					data.push(buffer);
				}

				$("#product-finder-table").DataTable({
					data: data,
					columns: titles,
				});
				this.call_action("click_add_basket", res.stock);
			});
		});

		this.action("click_start_sell", () => {
			const buffer = document.getElementsByClassName("client-sell-btn");
			for (let btn of buffer) {
				btn.onclick = () => {
					const id = btn.getAttribute("key");
					this.state("client_selected", id);
					this.render({
						dom: "loading",
						bbox: "client-finer-result",
						params: "Selecting client...",
					});
					MyAPI.get_client({ id: id }, res => {
						this.state("client_selected_data", res.clients);
						this.render({
							dom: "selected_client",
							bbox: "client-finer-result",
							params: {
								first_name: res.clients.first_name,
								last_name: res.clients.last_name,
								address: res.clients.address,
								phone: res.clients.phone,
							},
						});
						this.render({
							dom: "product_finder_section",
							bbox: "product-finder",
						});
					});
				};
			}
		});

		this.action("click_add_basket", args => {
			const buffer = document.getElementsByClassName("product-add-btn");
			for (let btn of buffer) {
				btn.onclick = () => {
					const id = btn.getAttribute("key");

					let basket = this.state("basket");
					if (!basket[id]) {
						stock_data = {};
						for (let s of args) {
							if (s["ID"] !== id) continue;
							stock_data = s;
							break;
						}
						basket[id] = stock_data;
					}

					const stock_field = document.getElementById(
						`add-stock-${id}`
					);

					if (!basket[id]["count"])
						basket[id]["count"] = parseInt(stock_field.value);
					else basket[id]["count"] += parseInt(stock_field.value);

					this.state("basket", basket);
					this.state(
						"basket_count",
						Rapp.obj_length(this.state("basket"))
					);
					this.render({
						dom: "product_added",
						bbox: "product-finer-result",
					});
				};
			}
		});

		this.action("show_prev_invoice_saved", () => {
			const client = this.state("client_selected_data");
			this.render({
				dom: "selected_client",
				bbox: "client-finer-result",
				params: {
					first_name: client.first_name,
					last_name: client.last_name,
					address: client.address,
					phone: client.phone,
				},
			});
			this.render({
				dom: "product_finder_section",
				bbox: "product-finder",
			});
		});

		this.action("show_invoice_list", () => {
			this.render({
				dom: "loading",
				bbox: `${this._name}-capsule-section`,
				params: 'Loading invoices...'
			});
			MyAPI.load_invoices({}, (res)=>
			{
				this.render({
					dom: "invoices-table",
					bbox: `${this._name}-capsule-section`,
					params: {
						count: res.invoices.length
					}
				});
				const data = res.invoices;
				for(let i of data)
				{
					let status = parseInt(i[3]);
					i[3] = status === 1 ? this._dom['green_flag'] : this._dom['red_flag'];
					i.push(`${this._dom['view_btn'](i[0])} ${this._dom['toggle_btn'](i[0], status === 1 ? 'Deactivate' : 'Activate')}`);
				}
				res.titles.push({title: ''});
				$('#invoices-list-table').DataTable({
					data: data,
					columns: res.titles
				});

				this.call_action('toggle-btn-clik');
			});
		});

		this.action('toggle-btn-clik', ()=>
		{
			const btns = document.getElementsByClassName('toggle-invoice-btn');
			for(let btn of btns)
			{
				btn.onclick = ()=>
				{
					this.render({
						dom: "loading",
						bbox: `${this._name}-capsule-section`,
						params: 'Updating invoice...'
					});

					const id = btn.getAttribute('key');
					MyAPI.toggle_invoice({id: id}, (res)=>
					{
						this.call_action('show_invoice_list');
					});
				}
			}
		});

		this.action("show_new_invoice", () => {
			this.call_action("show_client_finder");
		});

		this.action("update_pre_products_listing", () => {
			let count = 0;
			let price = 0;
			const basket = this.state("basket");
			for (let prod in basket) {
				if (!basket.hasOwnProperty(prod)) continue;
				count += parseInt(basket[prod].count);
				price +=
					parseInt(basket[prod].count) *
					parseFloat(basket[prod].price);
			}
			this.state("basket_total_count", count);
			this.state("basket_total_price", price);

			this.render({
				dom: "pre_products_total_count",
				bbox: "pre-products-total-count",
			});
			this.render({
				dom: "pre_products_total_price",
				bbox: "pre-products-total-price",
			});
		});

		this.action("show_basket", () => {
			this.state("basket_total_count", 0);
			this.state("basket_total_price", 0);
			this.render({
				dom: "client-basket-table",
				bbox: "product-finder",
			});

			const count_fields = document.getElementsByClassName(
				"prods-final-count"
			);
			for (let txt of count_fields) {
				txt.onkeyup = e => {
					const id = txt.getAttribute("key");
					this._states["basket"][id].count = e.target.value;
					this.call_action("update_pre_products_listing");
				};
			}
			this.call_action("update_pre_products_listing");
		});

		this.action("show_product_finder", () => {
			this.render({
				dom: "product_finder_section",
				bbox: "product-finder",
			});
		});

		this.action("keyup_client_finder", e => {
			this.state("client_finder", e.target.value);
		});

		this.action("keyup_product_finder", e => {
			this.state("product_finder", e.target.value);
		});

		this.action('confirm_invoice', ()=>
		{
			this.render({
				dom: 'loading',
				bbox: `${this._name}-capsule-section`,
				params: 'Adding new Invoice...'
			});
			const data = {
				client_id: this.state('client_selected'),
				basket: this.state('basket')
			}
			MyAPI.save_invoice(data, (res)=>
			{
				if(!res.error)
				{
					this.state('client_selected', '');
					this.state('basket', []);
					this.call_action('show_invoice_list');
				}
			});
		});
	},
	draw: function(props) {
		this._dom.green_flag = `<div class='green-flag'></div>`;
		this._dom.red_flag = `<div class='red-flag'></div>`;

		this.dom("product_added", () => {
			return `<p>Product added to invoice</p>`;
		});

		this.dom("sell_btn", id => {
			return `<button key='${id}' class='client-sell-btn'>Start sell</button>`;
		});

		this.dom("view_btn", id => {
			return `<button key='${id}' class='view-invoice-btn'>view</button>`;
		});

		this.dom("toggle_btn", (id, state) => {
			return `<button key='${id}' class='toggle-invoice-btn'>${state}</button>`;
		});

		this.dom("add_product_btn", args => {
			let html = `
            <div>
                <input type='text' id='add-stock-${args.id}' value='0' />
                <button key='${args.id}' class='product-add-btn'>Add to basket</button>
            </div>`;
			if (parseInt(args.stock) === 0) {
				html = `<p>Not available</p>`;
			}
			return html;
		});

		this.dom("selected_client", args => {
			return `<section>
                <h1>Selected client:</h1>
                <p>Name: ${args.first_name} ${args.last_name}</p>
                <p>Address: ${args.first_name} | Phone: ${args.last_name}</p>
                <button onclick='show_basket'>Products Added ([state:basket_count])</button>
                <button onclick='show_product_finder'>Search more</button>
            </section>
            <section id='product-finder'></section>`;
		});

		this.dom("product_finder_section", () => {
			return `<form onsubmit='submit_find_product'>
                    <p>Search products:</p>
                    <input type='text' value='[state:product_finder]' onkeyup='keyup_product_finder' placeholder='Search product by ID, name' />
                    <div style='text-align: right'>
                        <input type='reset' value='Clear' />
                        <input type='submit' value='Search' />
                    </div>
                </form>
                <div id='product-finer-result'></div>`;
		});

		this.dom("client_finder", () => {
			return `<form onsubmit='submit_find_client'>
                    <p>Search client:</p>
                    <input type='text' value='[state:client_finder]' onkeyup='keyup_client_finder' placeholder='Search client by ID, first name or last name' />
                    <div style='text-align: right'>
                        <input type='reset' value='Clear' />
                        <input type='submit' value='Search' />
                    </div>
                </form>
                <div id='client-finer-result'></div>`;
		});

		this.dom("invoices-table", args => {
			return `<h1 style='border-bottom: solid 1px #DDD'>Results: ${args.count} ${args.count ===
			1
				? "invoice"
				: "invoices"}</h1>
            <table id='invoices-list-table'></table>`;
		});

		this.dom("product-find-table", args => {
			return `<h1 style='border-bottom: solid 1px #DDD'>Results: ${args.count} ${args.count ===
			1
				? "product"
				: "products"}</h1>
            <table id='product-finder-table'></table>`;
		});

		this.dom("client-find-table", args => {
			return `<h1 style='border-bottom: solid 1px #DDD'>Results: ${args.count} ${args.count ===
			1
				? "client"
				: "clients"}</h1>
            <table id='client-finder-table'></table>`;
		});

		this.dom("pre_products_total_count", () => {
			return `<td colspan='3'></td><td>TOTAL Count: [state:basket_total_count] units</td>`;
		});

		this.dom("pre_products_total_price", () => {
			return `<td colspan='3'></td><td>TOTAL Price: $[state:basket_total_price]</td>`;
		});

		this.dom("client-basket-table", args => {
			const count = Rapp.obj_length(this.state("basket"));
			const basket = this.state("basket");
			let prods = ``;
			for (let s in basket) {
				if (basket.hasOwnProperty(s)) {
					this.state(
						"basket_total_count",
						this.state("basket_total_count") +
							parseInt(basket[s].count)
					);
					this.state(
						"basket_total_price",
						this.state("basket_total_price") +
							parseFloat(basket[s].price) *
								parseInt(basket[s].count)
					);
					prods += `<tr><td>${basket[s].ID}</td><td>${basket[s]
						.name}</td><td>$${basket[s]
						.price}</td><td><input type='text' key='${basket[s]
						.ID}' value='${basket[s]
						.count}' class='prods-final-count' /> units</td></tr>`;
				}
			}

			return `<section class='preview-basket'>
                <h1 style='border-bottom: solid 1px #DDD'>Number of products: ${count} ${count ===
			1
				? "product"
				: "products"}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    ${prods}
                    <tr id='pre-products-total-count'></tr>
                    <tr id='pre-products-total-price'></tr>
                    </tbody>
                </table>
                <div style='text-align:right'>
                    <button onclick='clear_invoice'>Reset Invoice</button>
                    <button onclick='confirm_invoice'>Confirm Invoice</button>
                </div>
            </section>`;
		});

		this.dom("loading", (message = "Loading...") => {
			return `<div class='data_loader'><p>${message}</p><img src='assets/preloaders/windows8_2.svg' /></div>`;
		});

		this.dom("capsule", args => {
			return `<div class='capsule'>
                    <h1>${args.title || "Invoices"}</h1>
                    <div id='${this._name}-capsule-section'></div>
                </div>`;
		});

		this.dom("main", () => {
			return `<section class='content'>
                    <div class='tool-box'>
                        <button onclick='show_invoice_list'>Invoices</button>
                        <button onclick='show_new_invoice'>New Invoice</button>
                    </div>
                    <div id='invoice-content'></div>
                </section>`;
		});

		this._dom.style = `.preview-basket
        {
        }
        .preview-basket table
        {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
        }
        .preview-basket table tr:nth-child(even)
        {
            background-color: #DDD;
        }`;
	},
});
