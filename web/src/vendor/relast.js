export default class Rapp{
	_id = "";
	_name = "";
	_bbox = null;
	_main = null;
	_parent = null;
	_props = {};
	_comps = {};
	_states = {};
	_actions = {};
	_dom = {};
	_effects = [];
	_wrappers = { indexers = {}, ids = {} };
	_nav = {};
	_ran = false;
	constructor(args, self) 
	{
		// this._name = args.name;
		// this._bbox =
		// 	typeof args.bbox === "string"
		// 		? document.getElementById(args.bbox)
		// 		: args.bbox;
		// this._electron = args.electron;
		// this._parent = args.parent || this;
		// this._main = args.main || this._parent;
	};
	// title = function(title)
	// {
	// 	let title_tag = document.createElement('title');
	// 	title_tag.innerHTML = title;
	// 	document.head.appendChild(title_tag);
	// };
	// start = function(props) {
	// 	this._props = props;
	// 	if (this.draw) this.draw(props);
	// 	if (this.states) this.states(props);
	// 	if (this.actions) this.actions(props);
	// 	return this;
	// };
	// render = function(args = {}) {
	// 	const dom = args.dom || "main";
	// 	let bbox = args.bbox || this._bbox;
	// 	if (!this._dom[dom]) return;
	// 	bbox = typeof bbox === "string" ? document.getElementById(bbox) : bbox;
	// 	if (!bbox) return;

	// 	const dom_args = args.params || {};
	// 	const triggers = args.actions || [];
	// 	const triggers_args = args.args || {};

	// 	if (dom.trim() !== "") bbox.innerHTML = this.call_dom(dom, dom_args);
	// 	else {
	// 		bbox.innerHTML = "";
	// 		return;
	// 	}
	// 	this.check_block(bbox);
	// 	for (let t of triggers)
	// 		if (this._actions[t]) this._actions[t](triggers_args);

	// 	if (this._dom["style"]) {
	// 		let style = ``;
	// 		if (typeof this._dom["style"] === "function")
	// 			style = this._dom["style"]();
	// 		else style = this._dom["style"];
	// 		const dom_style = document.createElement("style");
	// 		dom_style.setAttribute("type", "text/css");
	// 		dom_style.appendChild(document.createTextNode(style));
	// 		document.head.appendChild(dom_style);
	// 	}

	// 	if (args.response) args.response(triggers_args);

	// 	if (!this._ran) {
	// 		this._ran = true;
	// 		if (this.run) this.run(this._props);
	// 	}
	// 	if (bbox === this._bbox) {
	// 		this.set_bbox_classes(bbox);
	// 		if (this.effect) this.effect(this._props);
	// 	}
	// 	this.update_states();
	// };
	// reset = function(bbox) {
	// 	this.render({
	// 		dom: "",
	// 		bbox: bbox,
	// 	});
	// };
	// dom = function(k, action) {
	// 	if (!k || !action) return;
	// 	if (k.trim() == "") return;
	// 	this._dom[k] = action;
	// };
	// call_dom = function(k, args) {
	// 	k = k || "main";
	// 	if (k.trim() == "") return;
	// 	if (this._dom[k]) {
	// 		if (typeof this._dom[k] === "function") return this._dom[k](args);
	// 		else return this._dom[k];
	// 	}
	// 	return null;
	// };
	// state = function(k, v = null) {
	// 	if (v === null) return this._states[k];

	// 	this._states[k] = v;
	// 	this.update_states();
	// };
	// action = function(k, action) {
	// 	if (!k || !action) return;
	// 	if (k.trim() == "") return;
	// 	this._actions[k] = action;
	// };
	// call_action = function(k, args) {
	// 	if (!k) return;
	// 	if (k.trim() == "") return;
	// 	if (this._actions[k]) this._actions[k](args);
	// };
	// check_block = function(bbox) {
	// 	bbox = bbox || this._bbox;
	// 	this.track_block(bbox);
	// };
	// track_block = function(node) {
	// 	if (!node) return;
	// 	for (let c of node.childNodes) {
	// 		this.check_node(c);
	// 		this.track_block(c);
	// 	}
	// };
	// check_node = function(node) {
	// 	if (node.nodeType === 8) return null;
	// 	const token = Rapp.uuid();
	// 	if (node.nodeType === 3) {
	// 		if (node.nodeValue.trim() === "") return;
	// 		if (!this.has_textual_state(node.nodeValue)) return;
	// 		this.index_textual_states(node, "text", node.nodeValue, token);
	// 	} else if (node.nodeType === 1) {
	// 		for (let a of node.attributes) {
	// 			if (a.name === "id") {
	// 				this._wrappers.ids[a.value] = node;
	// 				const id = a.value.toUpperCase().trim();
	// 				if (
	// 					this._comps[id] !== null &&
	// 					this._comps[id] !== undefined
	// 				) {
	// 					this._comps[id]._bbox = node;
	// 					this._comps[id].render();
	// 				}
	// 			}
	// 			if (this.has_events_listener(`${a.name}='${a.value}'`)) {
	// 				const event = a.name.replace("on", "");
	// 				const action = a.value.trim();
	// 				node.addEventListener(event, e => {
	// 					if (node.tagName.toLowerCase() === "form")
	// 						e.preventDefault();
	// 					this.call_action(action, {
	// 						ev: e,
	// 						target: e.target,
	// 						node: node,
	// 					});
	// 				});
	// 			}
	// 			if (this.has_textual_state(a.value)) {
	// 				this.index_textual_states(
	// 					node,
	// 					"text_attr",
	// 					a.value,
	// 					token,
	// 					{ attr: a.name }
	// 				);
	// 			}
	// 		}
	// 	}
	// };
	// get_comp = function(k) {
	// 	if (!k) return;
	// 	if (typeof k !== "string") return;
	// 	if (this._comps[k.toUpperCase()]) return this._comps[k.toUpperCase()];
	// 	return null;
	// };
	// reset_comp = function(k) {
	// 	const comp = this.get_comp(k);
	// 	if (comp) comp._ran = false;
	// };
	// looking_comp = function(path) {
	// 	if (!path) return;
	// 	if (typeof path !== "string") return;

	// 	const split_path = path.split("/");
	// 	let aux = this._main;
	// 	for (let comp of split_path) {
	// 		if (aux._comps[comp.toUpperCase()]) {
	// 			aux = aux._comps[comp.toUpperCase()];
	// 		} else continue;
	// 	}
	// 	return aux;
	// };
	// get_id = function(k) {
	// 	if (!k) return;
	// 	return this._wrappers.ids[k];
	// };
	// set_nav = function(path, conf, options = {}) {
	// 	this._main._nav[path] = {
	// 		path: path,
	// 		mod: conf.mod,
	// 		title: conf.title,
	// 		name: conf.name,
	// 	};
	// };
	// navigate = function(path, bbox, options = {}) {
	// 	if (!path || !bbox) return;
	// 	if (typeof path !== "string") return;
	// 	bbox = typeof bbox === "string" ? this._wrappers.ids[bbox] : bbox;
	// 	if (!bbox) return;
	// 	const obj = this._main._nav[path];
	// 	if (!obj) return;
	// 	const comp_name = obj.name.toUpperCase();
	// 	if (!this._main._comps[comp_name]) {
	// 		this._main.add_comp(comp_name, obj.mod, options);
	// 		if (!this._main._comps[comp_name]) return;
	// 		this._main._comps[comp_name]._bbox = bbox;
	// 		this._main._comps[comp_name].start(options);
	// 	}
	// 	this._main._comps[comp_name]._ran = false;
	// 	this._main._comps[comp_name].reset_all_comps();
	// 	this._main._comps[comp_name].render();
	// 	return obj;
	// };
	// reset_all_comps = function() {
	// 	for (let c in this._comps) {
	// 		this._comps[c].reset_all_comps();
	// 		this._comps[c]._ran = false;
	// 	}
	// };
	// set_bbox_classes = function(bbox) {
	// 	if (
	// 		this._bbox.hasAttribute("class") ||
	// 		this._bbox.hasAttribute("classComp")
	// 	) {
	// 		let classes = "";
	// 		if (this._bbox.hasAttribute("classComp")) {
	// 			const val = this._bbox.getAttribute("classComp").split(" ");
	// 			for (let cl of val) classes += `${this._parent._name}-${cl}`;
	// 		}

	// 		if (this._bbox.hasAttribute("class"))
	// 			for (let cl of this._bbox.classList) classes += ` ${cl} `;

	// 		this._bbox.setAttribute("class", `${this._name}-main ${classes}`);
	// 	} else {
	// 		this._bbox.setAttribute("class", `${this._name}-main`);
	// 	}
	// 	this._bbox.removeAttribute("classComp");
	// 	this.set_bbox_classes_node(bbox);
	// };
	// set_bbox_classes_node = function(root) {
	// 	for (let c in root.childNodes) {
	// 		if (!root.childNodes.hasOwnProperty(c)) continue;
	// 		const child = root.childNodes[c];
	// 		let classes = "";
	// 		if (child.hasAttribute("classComp")) {
	// 			const val = child.getAttribute("classComp").split(" ");
	// 			for (let cl of val)
	// 				if (child.hasAttribute("classComp"))
	// 					classes += `${this._parent._name}-${cl}`;
	// 		}
	// 		if (child.hasAttribute("class")) {
	// 			for (let cl of child.classList)
	// 				if (child.hasAttribute("classComp")) classes += ` ${cl} `;
	// 		}
	// 		child.setAttribute("class", `${this._name}-main ${classes}`);
	// 		child.removeAttribute("classComp");
	// 	}
	// };
	// has_events_listener = function(v) {
	// 	return v.match(/on[\w]+[\s|=]*[\s|\'][\w|\W]*[\s|\']+/g) !== null;
	// };
	// get_events_listener = function(v) {
	// 	return v.match(/on[\w]+[\s|=]*[\s|\'][\w|\W]*[\s|\']+/g);
	// };
	// extract_event_listener = function(v) {
	// 	const replace = v.replace("on", "");
	// 	const split = replace.split("=");
	// 	if (split.length === 0) return null;
	// 	let remove_quotes = split[1].replace("'");
	// 	remove_quotes = remove_quotes.substr(1, remove_quotes.length - 1);
	// 	return { event: split[0], action: remove_quotes };
	// };
	// has_textual_state = function(v) {
	// 	return v.trim().match(/(\[)+state:[\w|_|-]+(\])+/g) !== null;
	// };
	// get_textual_states = function(v) {
	// 	return v.trim().match(/(\[)+state:[\w|_|-]+(\])+/g);
	// };
	// extract_textual_state = function(v) {
	// 	return v.replace("[state:", "").replace("]", "");
	// };
	// index_state = function(state, node, type, token, addons = {}) {
	// 	if (!this._wrappers.indexers[token]) {
	// 		const base_node = document.importNode(node);
	// 		this._wrappers.indexers[token] = {
	// 			final_node: node,
	// 			base_node: base_node,
	// 			type: type,
	// 			states: [],
	// 			addons: addons,
	// 			state: state,
	// 		};
	// 	}
	// 	if (!this._wrappers.indexers[token].states.includes(state))
	// 		this._wrappers.indexers[token].states.push(state);
	// };
	// index_textual_states = function(node, type, value_eval, token, addons = {}) {
	// 	const states = this.get_textual_states(value_eval);
	// 	if (!states) return;
	// 	for (let s of states) {
	// 		const state = this.extract_textual_state(s);
	// 		this.index_state(state, node, type, token, addons);
	// 	}
	// };
	// update_states = function() {
	// 	const indexers = this._wrappers.indexers;
	// 	for (let i in indexers) {
	// 		if (!indexers.hasOwnProperty(i)) continue;
	// 		const token = i;
	// 		const data = indexers[i];
	// 		let value = "";
	// 		if (data.base_node) {
	// 			if (data.type === "text") value = data.base_node.nodeValue;
	// 			else if (data.type === "text_attr") {
	// 				value = data.base_node.attributes[data.addons.attr].value;
	// 			}
	// 		}

	// 		for (let s of data.states) {
	// 			if (data.type === "text" || data.type === "text_attr") {
	// 				value = value.replace(
	// 					`[state:${s}]`,
	// 					this._states[s] !== undefined ||
	// 					this._states[s] !== null
	// 						? this._states[s]
	// 						: "[no-value]"
	// 				);
	// 			} else if (data.type === "attr")
	// 				value = this._states[s] || "[no-value]";
	// 		}

	// 		if (data.type === "text") data.final_node.nodeValue = value;
	// 		if (data.type === "text_attr") {
	// 			if (data.final_node.attributes[data.addons.attr]) {
	// 				data.final_node.attributes[data.addons.attr].value = value;
	// 			} else if (data.addons.attr.toLowerCase() === "value")
	// 				data.final_node.value = value;
	// 		} else if (data.type === "attr")
	// 			data.final_node.setAttribute(data.addons.attr, value);
	// 	}
	// };
	// add_comp = function(k, comp, options = {}) {
	// 	if (!k && !comp) return;
	// 	if (typeof k !== "string") return;
	// 	if (typeof comp !== "function") return;
	// 	const args = {
	// 		name: k,
	// 		electron: this._electron,
	// 		parent: this,
	// 		main: this._main,
	// 		visible: true,
	// 	};
	// 	if (options.visible !== undefined || options.visible !== null)
	// 		args.visible = options.visible;
	// 	const props = options.props || {};
	// 	this._comps[k.toUpperCase()] = new comp(args);
	// 	this._comps[k.toUpperCase()]._self = this._comps[k.toUpperCase()];
	// 	if (this._comps[k.toUpperCase()].start)
	// 		this._comps[k.toUpperCase()].start(props);
	// 	if (options.css)
	// 		if (options.css.trim() !== "") this.load_css(options.css);
	// 	return this;
	// };
	// load_css = function(file) {
	// 	if (!file) return;
	// 	if (typeof file !== "string") return;

	// 	const tag = document.createElement("link");
	// 	tag.setAttribute("rel", "stylesheet");
	// 	tag.href = `app/${file}`;
	// 	document.head.appendChild(tag);

	// 	return this;
	// };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Rapp.uuid = () => {
	return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16).toUpperCase();
	});
};
Rapp.obj_length = obj => {
	let c = 0;
	for (let o in obj) if (obj.hasOwnProperty(o)) c++;
	return c;
};