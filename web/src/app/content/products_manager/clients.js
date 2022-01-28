import Rapp from '../../../vendor/relast.js';

export default class Clients extends Rapp
{
	constructor(args)
	{
		super(args);
	};

	run = function(props) {
		this.render({ dom: "capsule", bbox: "client-content" });
		this.call_action("load_clients");
	};
	states = function(props) {
		this.state("response", "");
		this.state("client_id", "");
		this.state("client_first_name", "");
		this.state("client_last_name", "");
		this.state("client_address", "");
		this.state("client_phone", "");
	};
	actions = function(props) {
		this.action("load_clients", () => {
			this.render({
				dom: "loading",
				bbox: "capsule-section",
				params: "Loading...",
			});

			MyAPI.get_clients({}, res => {
				this.render({ dom: "clients-table", bbox: "capsule-section" });

				const titles = [
					{ title: "ID" },
					{ title: "First Name" },
					{ title: "Last Name" },
					{ title: "Address" },
					{ title: "Phone" },
					{ title: "status" },
					{ title: "Date creation" },
					{ title: "Creator" },
					{ title: "" },
				];
				const data = [];

				for (let c of res.clients) {
					const buffer = [];
					for (let t in c) {
						if (!c.hasOwnProperty(t)) continue;
						let value = c[t];
						if (t === "status")
							value =
								value === "1"
									? this._dom["green_flag"]
									: this._dom["red_flag"];
						buffer.push(value);
					}
					buffer.push(
						`${this._dom["edit_btn"](c["ID"])} ${this._dom[
							"remove_btn"
						](
							c["ID"],
							c["status"] === "1" ? "Deactivate" : "Activate"
						)}`
					);
					data.push(buffer);
				}

				$("#table-clients").DataTable({
					data: data,
					columns: titles,
				});
				this.call_action("click_edit_btn");
				this.call_action("click_remove_btn");
			});
		});

		this.action("click_edit_btn", () => {
			const buffer = document.getElementsByClassName("client-edit-btn");
			for (let btn of buffer) {
				btn.onclick = () => {
					const id = btn.getAttribute("key");
					this.render({
						dom: "loading",
						bbox: "capsule-section",
						params: "Loading client data...",
					});
					MyAPI.get_client({ id: id }, res => {
						this.state("client_id", id);
						this.state("client_first_name", res.clients.first_name);
						this.state("client_last_name", res.clients.last_name);
						this.state("client_address", res.clients.address);
						this.state("client_phone", res.clients.phone);

						this.render({
							dom: "edit-client-form",
							bbox: "capsule-section",
						});
					});
				};
			}
		});

		this.action("click_remove_btn", () => {
			const buffer = document.getElementsByClassName("client-remove-btn");
			for (let btn of buffer) {
				btn.onclick = () => {
					const id = btn.getAttribute("key");
					this.render({
						dom: "loading",
						bbox: "capsule-section",
						params: "Changing client status...",
					});
					MyAPI.toggle_client_status({ id: id }, res => {
						this.call_action("load_clients");
					});
				};
			}
		});

		this.action("click_clients_btn", () => {
			this.call_action("load_clients");
		});
		this.action("click_add_client_btn", () => {
			this.render({ dom: "new-client-form", bbox: "capsule-section" });
		});

		this.action("submit_new_client", () => {
			this.render({
				dom: "loading",
				bbox: "capsule-section",
				params: "Sending data...",
			});

			const data = {
				first_name: this.state("client_first_name"),
				last_name: this.state("client_last_name"),
				address: this.state("client_address"),
				phone: this.state("client_phone"),
			};
			MyAPI.new_client(data, res => {
				if (res.error) {
					this.state(
						"response",
						"Check the field values and try again."
					);
					this.call_action("click_add_client_btn");
					return;
				}
				this.state("client_id", "");
				this.state("client_first_name", "");
				this.state("client_last_name", "");
				this.state("client_address", "");
				this.state("client_phone", "");

				this.call_action("load_clients");
			});
		});

		this.action("submit_edit_client", () => {
			this.render({
				dom: "loading",
				bbox: "capsule-section",
				params: "Sending data...",
			});

			const data = {
				id: this.state("client_id"),
				first_name: this.state("client_first_name"),
				last_name: this.state("client_last_name"),
				address: this.state("client_address"),
				phone: this.state("client_phone"),
			};
			MyAPI.edit_client(data, res => {
				if (res.error) {
					this.state(
						"response",
						"Check the field values and try again."
					);
					this.render({
						dom: "edit-client-form",
						bbox: "capsule-section",
					});
					return;
				}
				this.state("client_id", "");
				this.state("client_first_name", "");
				this.state("client_last_name", "");
				this.state("client_address", "");
				this.state("client_phone", "");

				this.call_action("load_clients");
			});
		});

		this.action("keyup_first_name", e => {
			this.state("client_first_name", e.target.value);
		});
		this.action("keyup_last_name", e => {
			this.state("client_last_name", e.target.value);
		});
		this.action("keyup_address", e => {
			this.state("client_address", e.target.value);
		});
		this.action("keyup_phone", e => {
			this.state("client_phone", e.target.value);
		});
	};
	draw = function(props) {
		this._dom.green_flag = `<div class='green-flag'></div>`;
		this._dom.red_flag = `<div class='red-flag'></div>`;

		this.dom("edit_btn", id => {
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            if(session_comp.state('user_data')['USER-TYPE'] !== '0') return '';

			return `<button key='${id}' class='client-edit-btn'>Edit</button>`;
		});
		this.dom("remove_btn", (id, state) => {
            const session_comp = this.looking_comp(`${this._main._name}/Session`);
            if(session_comp.state('user_data')['USER-TYPE'] !== '0') return '';

			return `<button key='${id}' class='client-remove-btn'>${state}</button>`;
		});

		this.dom("loading", (message = "Loading...") => {
			return `<div class='data_loader'><p>${message}</p><img src='assets/preloaders/windows8_2.svg' /></div>`;
		});

		this.dom("clients-table", () => {
			return `<table id='table-clients'></table>`;
		});

		this.dom("new-client-form", () => {
			return `<form onsubmit='submit_new_client'>
                    <p>First Name:</p>
                    <input type='text' value='[state:client_first_name]' onkeyup='keyup_first_name' />
                    <p>Last Name:</p>
                    <input type='text' value='[state:client_last_name]' onkeyup='keyup_last_name' />
                    <p>Address:</p>
                    <input type='text' value='[state:client_address]' onkeyup='keyup_address' />
                    <p>Phone:</p>
                    <input type='text' value='[state:client_phone]' onkeyup='keyup_phone' />
                    <div style='text-align: right'>
                        <input type='reset' value='Clear' />
                        <input type='submit' value='Save' />
                    </div>
                </form>`;
		});

		this.dom("edit-client-form", () => {
			return `<form onsubmit='submit_edit_client'>
                    <p>First Name:</p>
                    <input type='text' value='[state:client_first_name]' onkeyup='keyup_first_name' />
                    <p>Last Name:</p>
                    <input type='text' value='[state:client_last_name]' onkeyup='keyup_last_name' />
                    <p>Address:</p>
                    <input type='text' value='[state:client_address]' onkeyup='keyup_address' />
                    <p>Phone:</p>
                    <input type='text' value='[state:client_phone]' onkeyup='keyup_phone' />
                    <div style='text-align: right'>
                        <input type='reset' value='Clear' />
                        <input type='submit' value='Save' />
                    </div>
                </form>`;
		});

		this.dom("capsule", args => {
			return `<div class='capsule'>
                    <h1>${args.title || "Clients"}</h1>
                    <div id='capsule-section'></div>
                </div>`;
		});

		this.dom("main", () => {
            const session_comp = this.looking_comp(`${this._main._name}/Session`);

			return `<section class='content'>
                    <div class='tool-box'>
                        <button onclick='click_clients_btn'>Clients</button>
                        ${session_comp.state('user_data')['USER-TYPE'] !== '0' ? '' : "<button onclick='click_add_client_btn'>Add client</button>"}
                    </div>
                    <div id='client-content'></div>
                </section>`;
		});
	}
}
