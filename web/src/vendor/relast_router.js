class Route_Node
{
	_name = '';
	_dir = '';
	_comp = null;
	_props = {};
	_parent = null;
	_bbox = '';
	_children = [];
	constructor(name, dir, comp, parent, bbox = '', props = {})
	{
		this._name = name;
		this._dir = dir;
		this._comp = comp;
		this._parent = parent;
		this._props = props;
		this._bbox = bbox;
	};
	get_child = function(dir)
	{
		for(let c of this._children)
		{
			if(c._dir === dir)
				return c;
		}
		return null;
	}
}
class Router
{
	_nodes = [];
	constructor({container})
	{
		const root = new Route_Node('main', '', container, null);
		this._nodes.push(root);
	};
	create = function(args)
	{
		return New_Router(args);
	};
	add = function(route, parent, props)
	{
		const { component, name, caption } = route;
		const parent_node = this.get_node_by_comp(parent);
		const path = this.get_path_inverse(parent_node);
		const node = new Route_Node(route.name, `${path}/${name}`, component, parent, route.bbox, props);
		this._nodes.push(node);
		parent.add_comp(caption, component, props);
	};
	get_node_by_comp = function(comp)
	{
		for(let n of this._nodes)
			if(n._comp === comp) return n;
		return null;
	};
	get_path_inverse = function(node, path = '')
	{
		if(node) 
			path += `${this.get_path_inverse(node._parent, path)}`;
		return path;
	};
	nav = function(path, nav = false)
	{
		for(let n of this._nodes){
			if(n._dir === path){
				if(nav)
					this.goto(path, n);
				return n;
			}
		}
		return null;
	};
	goto = function(path, comp)
	{
		if(!comp) return;
		if(this._nodes.length === 0) return;

		const root = this._nodes[0];
		if(!root) return;

		const app = root._comp;
		const bbox = comp._bbox;

		if (!path || !bbox) return;

		let buffer = app.get_IDsref(bbox, app, buffer);

		const comp_name = comp._name.toUpperCase();
		if (!app._comps[comp_name]) {
			app.add_comp(comp_name, comp._comp, comp._props);
			if (!app._comps[comp_name]) return;
			app._comps[comp_name]._bbox = bbox;
			app._comps[comp_name].start(comp._props);
		}else{
			if(!app._comps[comp_name]._bbox)
				app._comps[comp_name]._bbox = bbox;
		}
		app._comps[comp_name]._ran = false;
		app._comps[comp_name].reset_all_comps();
		app._comps[comp_name].render();
	}
};

export function New_router(args)
{
	return new Router(args);
}

export default Router;