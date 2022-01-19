class Route_Node
{
	_dir = '';
	_comp = null;
	_props = {};
	_parent = null;
	_children = [];
	constructor(dir, comp, parent, props = {})
	{
		this._dir = dir;
		this._comp = comp;
		this._parent = parent;
		this._props = props;
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
		const root = new Route_Node('', container, null);
		this._nodes.push(root);
	};
	create = function(args)
	{
		return New_Router(args);
	};
	add = function({ component, name, caption, props, parent })
	{
		const parent_node = this.get_node_by_comp(parent);
		const path = this.get_path_inverse(parent_node);
		const node = new Route_Node(`${path}/${name}`, component, parent, props);
		this._nodes.push(node);
		console.log(path);
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
			path += `/${this.get_path_inverse(node._parent, path)}`;
		return path;
	}
};

export function New_router(args)
{
	return new Router(args);
}

export default Router;