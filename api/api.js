const MyAPI = {
	init: () => {},
	check_session: cback => {
		MyNet.fetch(
			"session",
			"checker",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			}
		);
	},
	signup: (args, cback) => {
		MyNet.fetch(
			"session",
			"signup",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{}
		);
	},
	login: (args, cback) => {
		MyNet.fetch(
			"session",
			"login",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				user: args.email,
				pass: args.password,
			}
		);
	},
	get_users: (args, cback) => {
		MyNet.fetch(
			"users",
			"get_full_users",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			}
		);
	},
	get_user_data: (args, cback) => {
		MyNet.fetch(
			"users",
			"get_user_data",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			args
		);
	},
	new_user: (args, cback) => {
		console.log(args);
		MyNet.fetch(
			"users",
			"new_user",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			{
				id: args.id,
			}
		);
	},
	get_stock: (args, cback) => {
		MyNet.fetch(
			"stock",
			"get_stock",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			}
		);
	},
	new_stock: (args, cback) => {
		MyNet.fetch(
			"stock",
			"new_stock",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				name: args.name,
				desc: args.desc,
				price: args.price,
				stock: args.stock,
			}
		);
	},
	get_stock_data: (args, cback) => {
		MyNet.fetch(
			"stock",
			"get_stock_data",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				id: args.id,
			}
		);
	},
	edit_stock: (args, cback) => {
		MyNet.fetch(
			"stock",
			"edit_stock",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				id: args.id,
				name: args.name,
				desc: args.desc,
				price: args.price
					.replace("$", "")
					.replace(" ", "")
					.replace(",", "."),
				stock: args.stock,
			}
		);
	},
	toggle_stock: (args, cback) => {
		MyNet.fetch(
			"stock",
			"toggle_stock",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				id: args.id,
			}
		);
	},
	find_stock: (args, cback) => {
		MyNet.fetch(
			"stock",
			"find_stock",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				txt: args.text,
			}
		);
	},
	get_clients: (args, cback) => {
		MyNet.fetch(
			"clients",
			"get_clients_list",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			}
		);
	},
	new_client: (args, cback) => {
		MyNet.fetch(
			"clients",
			"add_new_client",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				first_name: args.first_name,
				last_name: args.last_name,
				address: args.address,
				phone: args.phone,
			}
		);
	},
	edit_client: (args, cback) => {
		MyNet.fetch(
			"clients",
			"edit_client",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				id: args.id,
				first_name: args.first_name,
				last_name: args.last_name,
				address: args.address,
				phone: args.phone,
			}
		);
	},
	get_client: (args, cback) => {
		MyNet.fetch(
			"clients",
			"get_client",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				id: args.id,
			}
		);
	},
	toggle_client_status: (args, cback) => {
		MyNet.fetch(
			"clients",
			"toggle_client",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				id: args.id,
			}
		);
	},
	find_client: (args, cback) => {
		MyNet.fetch(
			"clients",
			"find_client",
			res => {
				res["error"] = false;
				if (cback) cback(res);
			},
			() => {
				if (cback) cback({ error: true });
			},
			{
				txt: args.text,
			}
		);
	},
};

MyAPI.debug = true;
MyAPI.REQUEST_ENUM = {
	XHR: "xmlhttp",
	FETCH: "fetch",
};
MyAPI.backend = MyAPI.REQUEST_ENUM.FETCH;

const MyNet = {
	uri: MyAPI.debug ? "http://localhost/CTI/cti_cluster3/back/api/" : "",
	fetch: function(mod, cmd, cback, cback_error, args = {}) {
		let headers = {
			"Content-Type": "application/x-www-form-urlencoded",
		};
		const output = {
			mod: mod,
			cmd: cmd,
			args: args,
		};
		headers["Access-Control-Allow-Credentials"] = true;
		headers["Access-Control-Allow-Headers"] =
			"Origin, X-Requested-With, Content-Type, Accept;";
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] =
			"GET, POST, OPTIONS, PUT, DELETE";
		if (MyAPI.backend === MyAPI.REQUEST_ENUM.FETCH) {
			const data = {
				method: "POST",
				headers: headers,
				body: `input=${JSON.stringify(output)}`,
			};
			fetch(this.uri, data).then(res => {
				if (res.status !== 200) {
					if (cback_error) cback_error();
					return;
				}
				res.json().then(resp => {
					if (cback) cback(resp);
				});
			});
		} else if (MyAPI.backend === MyAPI.REQUEST_ENUM.XHR) {
			const http = new XMLHttpRequest();
			http.open("POST", this.uri, true);
			for (h in headers)
				if (headers.hasOwnProperty(h))
					http.setRequestHeader(h, headers[h]);
			http.send(`input=${JSON.stringify(output)}`);
			http.onload = function() {
				if (MyNet.debug) console.log(http.responseText);
			};
			http.onreadystatechange = function(res) {
				if (
					this.readyState === XMLHttpRequest.DONE &&
					this.status === 200
				) {
					if (cback) cback(JSON.parse(this.responseText));
				} else {
					if (cback_error) cback_error();
				}
			};
		}
	},
};

MyNet.debug = true;
