/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {

;// CONCATENATED MODULE: ./src/vendor/relast.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Rapp = function Rapp(_args) {
  _classCallCheck(this, Rapp);

  _defineProperty(this, "_id", "");

  _defineProperty(this, "_name", "");

  _defineProperty(this, "_bbox", null);

  _defineProperty(this, "_main", null);

  _defineProperty(this, "_parent", null);

  _defineProperty(this, "_electron", null);

  _defineProperty(this, "_props", {});

  _defineProperty(this, "_comps", {});

  _defineProperty(this, "_last_states", {});

  _defineProperty(this, "_states", {});

  _defineProperty(this, "_actions", {});

  _defineProperty(this, "_dom", {});

  _defineProperty(this, "_effects", []);

  _defineProperty(this, "_wrappers", {
    indexers: {},
    ids: {}
  });

  _defineProperty(this, "_router", null);

  _defineProperty(this, "_nav", {});

  _defineProperty(this, "_ran", false);

  _defineProperty(this, "nav", function (path) {
    if (!this._main._router) return;

    var comp = this._main._router.nav(path, true);
  });

  _defineProperty(this, "get_IDsref", function (id, comp) {
    var buffer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    comp = comp || this;
    if (this._wrappers.ids[id]) buffer.push(this._wrappers.ids[id]); // for(let c in comp._comps)
    // {
    // 	if(!comp._comps.hasOwnProperty(c)) continue;
    // 	const aux = comp._comps[c];
    // 	if(comp._wrappers.ids[id])
    // 	{
    // 		let exist = false;
    // 		for(let sc of buffer)
    // 		{
    // 			if(sc.el === comp._wrappers.ids[id])
    // 				exist = true;
    // 		}
    // 		if(!exist)
    // 			buffer.push({el: comp._wrappers.ids[id], comp: aux});
    // 	}
    // 	aux.get_IDsref(id, aux, buffer);
    // }

    return buffer;
  });

  _defineProperty(this, "title", function (title) {
    var title_tag = document.createElement('title');
    title_tag.innerHTML = title;
    document.head.appendChild(title_tag);
  });

  _defineProperty(this, "start", function (props) {
    this._props = props;
    if (this.draw) this.draw(props);
    if (this.states) this.states(props);
    if (this.actions) this.actions(props);
    return this;
  });

  _defineProperty(this, "render", function () {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var dom = args.dom || "main";
    var bbox = args.bbox || this._bbox;
    if (!this._dom[dom]) return;
    bbox = typeof bbox === "string" ? document.getElementById(bbox) : bbox;
    if (!bbox) return;
    var dom_args = args.params || {};
    var triggers = args.actions || [];
    var triggers_args = args.args || {};
    if (dom.trim() !== "") bbox.innerHTML = this.call_dom(dom, dom_args);else {
      bbox.innerHTML = "";
      return;
    }
    this.check_block(bbox);

    var _iterator = _createForOfIteratorHelper(triggers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var t = _step.value;
        if (this._actions[t]) this._actions[t](triggers_args);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (this._dom["style"]) {
      var style = "";
      if (typeof this._dom["style"] === "function") style = this._dom["style"]();else style = this._dom["style"];
      var dom_style = document.createElement("style");
      dom_style.setAttribute("type", "text/css");
      dom_style.appendChild(document.createTextNode(style));
      document.head.appendChild(dom_style);
    }

    if (args.response) args.response(triggers_args);

    if (!this._ran) {
      this._ran = true;
      if (this.run) this.run(this._props);
    }

    if (bbox === this._bbox) {
      this.set_bbox_classes(bbox);
      if (this.effect) this.effect(this._props);
    }

    this.update_states();
    return this;
  });

  _defineProperty(this, "reset", function (bbox) {
    this.render({
      dom: "",
      bbox: bbox
    });
  });

  _defineProperty(this, "dom", function (k, action) {
    if (!k || !action) return;
    if (k.trim() == "") return;
    this._dom[k] = action;
  });

  _defineProperty(this, "call_dom", function (k, args) {
    k = k || "main";
    if (k.trim() == "") return;

    if (this._dom[k]) {
      if (typeof this._dom[k] === "function") return this._dom[k](args);else return this._dom[k];
    }

    return null;
  });

  _defineProperty(this, "state", function (k) {
    var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (v === null) return this._states[k];
    if (this._states[k]) this._last_states[k] = this._states[k];
    this._states[k] = v;
    this.update_states();
  });

  _defineProperty(this, "action", function (k, action) {
    if (!k || !action) return;
    if (k.trim() == "") return;
    this._actions[k] = action;
  });

  _defineProperty(this, "call_action", function (k, args) {
    if (!k) return;
    if (k.trim() == "") return;
    if (this._actions[k]) this._actions[k](args);
  });

  _defineProperty(this, "check_block", function (bbox) {
    bbox = bbox || this._bbox;
    this.track_block(bbox);
  });

  _defineProperty(this, "track_block", function (node) {
    if (!node) return;

    var _iterator2 = _createForOfIteratorHelper(node.childNodes),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var c = _step2.value;
        this.check_node(c);
        this.track_block(c);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });

  _defineProperty(this, "check_node", function (node) {
    var _this = this;

    if (node.nodeType === 8) return null;
    var token = Rapp.uuid();

    if (node.nodeType === 3) {
      if (node.nodeValue.trim() === "") return;
      if (!this.has_textual_state(node.nodeValue)) return;
      this.index_textual_states(node, "text", node.nodeValue, token);
    } else if (node.nodeType === 1) {
      var _iterator3 = _createForOfIteratorHelper(node.attributes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var a = _step3.value;

          if (a.name === "id") {
            this._wrappers.ids[a.value] = node;
            var id = a.value.toUpperCase().trim();

            if (this._comps[id] !== null && this._comps[id] !== undefined) {
              this._comps[id]._bbox = node;

              this._comps[id].render();
            }
          }

          if (this.has_events_listener("".concat(a.name, "='").concat(a.value, "'"))) {
            (function () {
              var event = a.name.replace("on", "");
              var action = a.value.trim();
              node.addEventListener(event, function (e) {
                if (node.tagName.toLowerCase() === "form") e.preventDefault();

                _this.call_action(action, {
                  ev: e,
                  target: e.target,
                  node: node
                });
              });
            })();
          }

          if (this.has_textual_state(a.value)) {
            this.index_textual_states(node, "text_attr", a.value, token, {
              attr: a.name
            }, this);
          }

          if (this.has_textual_state(a.name)) {
            this.index_textual_states(node, "attr_name", a.name, token, {
              attr: a.name
            }, this);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  });

  _defineProperty(this, "get_comp", function (k) {
    if (!k) return;
    if (typeof k !== "string") return;
    if (this._comps[k.toUpperCase()]) return this._comps[k.toUpperCase()];
    return null;
  });

  _defineProperty(this, "reset_comp", function (k) {
    var comp = this.get_comp(k);
    if (comp) comp._ran = false;
  });

  _defineProperty(this, "looking_comp", function (path) {
    if (!path) return;
    if (typeof path !== "string") return;
    var split_path = path.split("/");
    var aux = this._main;

    var _iterator4 = _createForOfIteratorHelper(split_path),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var comp = _step4.value;

        if (aux._comps[comp.toUpperCase()]) {
          aux = aux._comps[comp.toUpperCase()];
        } else continue;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return aux;
  });

  _defineProperty(this, "get_id", function (k) {
    if (!k) return;
    return this._wrappers.ids[k];
  });

  _defineProperty(this, "reset_all_comps", function () {
    for (var c in this._comps) {
      this._comps[c].reset_all_comps();

      this._comps[c]._ran = false;
    }
  });

  _defineProperty(this, "set_bbox_classes", function (bbox) {
    if (this._bbox.hasAttribute("class") || this._bbox.hasAttribute("classComp")) {
      var classes = "";

      if (this._bbox.hasAttribute("classComp")) {
        var val = this._bbox.getAttribute("classComp").split(" ");

        var _iterator5 = _createForOfIteratorHelper(val),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var cl = _step5.value;
            classes += "".concat(this._parent._name, "-").concat(cl);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      if (this._bbox.hasAttribute("class")) {
        var _iterator6 = _createForOfIteratorHelper(this._bbox.classList),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _cl = _step6.value;
            classes += " ".concat(_cl, " ");
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }

      this._bbox.setAttribute("class", "".concat(this._name, "-main ").concat(classes));
    } else {
      this._bbox.setAttribute("class", "".concat(this._name, "-main"));
    }

    this._bbox.removeAttribute("classComp");

    this.set_bbox_classes_node(bbox);
  });

  _defineProperty(this, "set_bbox_classes_node", function (root) {
    for (var c in root.childNodes) {
      if (!root.childNodes.hasOwnProperty(c)) continue;
      var child = root.childNodes[c];
      var classes = "";

      if (child.hasAttribute("classComp")) {
        var val = child.getAttribute("classComp").split(" ");

        var _iterator7 = _createForOfIteratorHelper(val),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var cl = _step7.value;
            if (child.hasAttribute("classComp")) classes += "".concat(this._parent._name, "-").concat(cl);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }

      if (child.hasAttribute("class")) {
        var _iterator8 = _createForOfIteratorHelper(child.classList),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _cl2 = _step8.value;
            if (child.hasAttribute("classComp")) classes += " ".concat(_cl2, " ");
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }

      child.setAttribute("class", "".concat(this._name, "-main ").concat(classes));
      child.removeAttribute("classComp");
    }
  });

  _defineProperty(this, "has_events_listener", function (v) {
    return v.match(/on[\w]+[\s|=]*[\s|\'][\w|\W]*[\s|\']+/g) !== null;
  });

  _defineProperty(this, "get_events_listener", function (v) {
    return v.match(/on[\w]+[\s|=]*[\s|\'][\w|\W]*[\s|\']+/g);
  });

  _defineProperty(this, "extract_event_listener", function (v) {
    var replace = v.replace("on", "");
    var split = replace.split("=");
    if (split.length === 0) return null;
    var remove_quotes = split[1].replace("'");
    remove_quotes = remove_quotes.substr(1, remove_quotes.length - 1);
    return {
      event: split[0],
      action: remove_quotes
    };
  });

  _defineProperty(this, "has_textual_state", function (v) {
    return v.trim().match(/(\[)+state:[\w|_|-]+(\])+/g) !== null;
  });

  _defineProperty(this, "get_textual_states", function (v) {
    return v.trim().match(/(\[)+state:[\w|_|-]+(\])+/g);
  });

  _defineProperty(this, "extract_textual_state", function (v) {
    return v.replace("[state:", "").replace("]", "");
  });

  _defineProperty(this, "index_state", function (state, node, type, token) {
    var addons = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var comp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    if (!this._wrappers.indexers[token]) {
      var base_node = document.importNode(node);
      this._wrappers.indexers[token] = {
        final_node: node,
        base_node: base_node,
        type: type,
        states: [],
        addons: addons,
        state: state,
        comp: comp
      };
    }

    if (!this._wrappers.indexers[token].states.includes({
      type: type,
      state: state
    })) this._wrappers.indexers[token].states.push({
      type: type,
      state: state
    });
  });

  _defineProperty(this, "index_textual_states", function (node, type, value_eval, token) {
    var addons = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var comp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var states = this.get_textual_states(value_eval);
    if (!states) return;

    var _iterator9 = _createForOfIteratorHelper(states),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var s = _step9.value;
        var state = this.extract_textual_state(s);
        this.index_state(state, node, type, token, addons, comp);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
  });

  _defineProperty(this, "update_states", function () {
    var indexers = this._wrappers.indexers;

    for (var i in indexers) {
      if (!indexers.hasOwnProperty(i)) continue;
      var token = i;
      var data = indexers[i];
      var value = "";

      if (data.base_node) {
        if (data.type === "text") value = data.base_node.nodeValue;else if (data.type === "text_attr") {
          value = data.base_node.attributes[data.addons.attr].value;
        } else if (data.type === 'attr_name') {
          value = data.base_node.attributes[data.addons.attr].name;
        }
      }

      var _iterator10 = _createForOfIteratorHelper(data.states),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var s = _step10.value;

          if (s.type === "text" || s.type === "text_attr") {
            value = value.replace("[state:".concat(s.state, "]"), this._states[s.state] !== undefined || this._states[s.state] !== null ? this._states[s.state] : "[no-value]");
          } else if (s.type === 'attr_name') {
            value = this._states[s.state];
          } else if (s.type === "attr") {
            value = this._states[s.state] || "[no-value]";
          }

          if (s.type === "text") data.final_node.nodeValue = value;

          if (s.type === "text_attr") {
            if (data.final_node.attributes[data.addons.attr]) {
              data.final_node.attributes[data.addons.attr].value = value;

              if (data.final_node.tagName.toLowerCase() === 'select') {
                console.log(value);
                data.final_node.value = value;
              }
            } else if (data.addons.attr.toLowerCase() === "value") {
              data.final_node.value = value;
            }
          } else if (s.type === "attr") {
            data.final_node.setAttribute(data.addons.attr, value);
          } else if (s.type === 'attr_name') {
            data.final_node.removeAttribute("[state:".concat(s.state, "]"));
            if (this._last_states[s.state]) if (data.final_node.hasAttribute(this._last_states[s.state])) data.final_node.removeAttribute("".concat(this._last_states[s.state]));
            if (value === 'undefined' || value === undefined || value === null || value.trim() === '') continue;
            data.final_node.setAttribute(value, '');
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
  });

  _defineProperty(this, "add_comp", function (k, comp) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!k && !comp) return;
    if (typeof k !== "string") return;
    if (typeof comp !== "function") return;
    var args = {
      name: k,
      electron: this._electron || null,
      parent: this,
      main: this._main,
      visible: true
    };
    if (options.visible !== undefined || options.visible !== null) args.visible = options.visible;
    var props = options.props || {};
    this._comps[k.toUpperCase()] = new comp(args);
    this._comps[k.toUpperCase()]._self = this._comps[k.toUpperCase()];
    if (this._comps[k.toUpperCase()].start) this._comps[k.toUpperCase()].start(props);
    if (options.css) if (options.css.trim() !== "") this.load_css(options.css);
    return this;
  });

  _defineProperty(this, "load_css", function (file) {
    if (!file) return;
    if (typeof file !== "string") return;
    var tag = document.createElement("link");
    tag.setAttribute("rel", "stylesheet");
    tag.href = "app/".concat(file);
    document.head.appendChild(tag);
    return this;
  });

  this._name = _args.name;
  this._electron = _args.electron || null;
  this._bbox = typeof _args.bbox === "string" ? document.getElementById(_args.bbox) : _args.bbox;
  this._parent = _args.parent || this;
  this._main = _args.main || this._parent;
};


; ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Rapp.uuid = function () {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16).toUpperCase();
  });
};

Rapp.obj_length = function (obj) {
  var c = 0;

  for (var o in obj) {
    if (obj.hasOwnProperty(o)) c++;
  }

  return c;
};

Rapp.isMobile = function () {
  var toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some(function (toMatchItem) {
    return navigator.userAgent.match(toMatchItem);
  });
  return false;
};
;// CONCATENATED MODULE: ./src/vendor/relast_router.js
function relast_router_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = relast_router_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function relast_router_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return relast_router_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return relast_router_arrayLikeToArray(o, minLen); }

function relast_router_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function relast_router_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function relast_router_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Route_Node = function Route_Node(name, _dir, comp, parent) {
  var bbox = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var props = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  relast_router_classCallCheck(this, Route_Node);

  relast_router_defineProperty(this, "_name", '');

  relast_router_defineProperty(this, "_dir", '');

  relast_router_defineProperty(this, "_comp", null);

  relast_router_defineProperty(this, "_props", {});

  relast_router_defineProperty(this, "_parent", null);

  relast_router_defineProperty(this, "_bbox", '');

  relast_router_defineProperty(this, "_children", []);

  relast_router_defineProperty(this, "get_child", function (dir) {
    var _iterator = relast_router_createForOfIteratorHelper(this._children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        if (c._dir === dir) return c;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return null;
  });

  this._name = name;
  this._dir = _dir;
  this._comp = comp;
  this._parent = parent;
  this._props = props;
  this._bbox = bbox;
};

var Router = function Router(_ref) {
  var container = _ref.container;

  relast_router_classCallCheck(this, Router);

  relast_router_defineProperty(this, "_nodes", []);

  relast_router_defineProperty(this, "create", function (args) {
    return New_Router(args);
  });

  relast_router_defineProperty(this, "add", function (route, parent, props) {
    var component = route.component,
        name = route.name,
        caption = route.caption;
    var parent_node = this.get_node_by_comp(parent);
    var path = this.get_path_inverse(parent_node);
    var node = new Route_Node(route.name, "".concat(path, "/").concat(name), component, parent, route.bbox, props);

    this._nodes.push(node);

    parent.add_comp(caption, component, props);
  });

  relast_router_defineProperty(this, "get_node_by_comp", function (comp) {
    var _iterator2 = relast_router_createForOfIteratorHelper(this._nodes),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var n = _step2.value;
        if (n._comp === comp) return n;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return null;
  });

  relast_router_defineProperty(this, "get_path_inverse", function (node) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (node) path += "".concat(this.get_path_inverse(node._parent, path));
    return path;
  });

  relast_router_defineProperty(this, "nav", function (path) {
    var nav = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _iterator3 = relast_router_createForOfIteratorHelper(this._nodes),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var n = _step3.value;

        if (n._dir === path) {
          if (nav) this["goto"](path, n);
          return n;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return null;
  });

  relast_router_defineProperty(this, "goto", function (path, comp) {
    if (!comp) return;
    if (this._nodes.length === 0) return;
    var root = this._nodes[0];
    if (!root) return;
    var app = root._comp;
    var bbox = comp._bbox;
    if (!path || !bbox) return;
    var buffer = app.get_IDsref(bbox, app, buffer);

    var comp_name = comp._name.toUpperCase();

    if (!app._comps[comp_name]) {
      app.add_comp(comp_name, comp._comp, comp._props);
      if (!app._comps[comp_name]) return;
      app._comps[comp_name]._bbox = bbox;

      app._comps[comp_name].start(comp._props);
    } else {
      if (!app._comps[comp_name]._bbox) app._comps[comp_name]._bbox = bbox;
    }

    app._comps[comp_name]._ran = false;

    app._comps[comp_name].reset_all_comps();

    app._comps[comp_name].render();
  });

  var _root = new Route_Node('main', '', container, null);

  this._nodes.push(_root);
};

;
function New_router(args) {
  return new Router(args);
}
/* harmony default export */ const relast_router = ((/* unused pure expression or super */ null && (Router)));
;// CONCATENATED MODULE: ./src/app/content/dashboard/index.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function dashboard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function dashboard_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Dashboard = /*#__PURE__*/function (_Rapp) {
  _inherits(Dashboard, _Rapp);

  var _super = _createSuper(Dashboard);

  function Dashboard(args) {
    var _this;

    dashboard_classCallCheck(this, Dashboard);

    _this = _super.call(this, args);

    dashboard_defineProperty(_assertThisInitialized(_this), "run", function (props) {// THIS METHOD RUN WHEN THE RENDER FINISH
    });

    dashboard_defineProperty(_assertThisInitialized(_this), "states", function (props) {
      this.state('aaa', 11);
    });

    dashboard_defineProperty(_assertThisInitialized(_this), "actions", function (props) {});

    dashboard_defineProperty(_assertThisInitialized(_this), "draw", function (props) {
      this._dom.main = function () {
        return "<section>\n                    <h1>Hello Dashboard [state:aaa]</h1>\n                </section>";
      };
    });

    return _this;
  }

  return Dashboard;
}(Rapp);


;// CONCATENATED MODULE: ./src/vendor/md5.min.js
var MD5 = function MD5(string) {
  function RotateLeft(lValue, iShiftBits) {
    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
  }

  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);

    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    }

    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      }
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }

  function F(x, y, z) {
    return x & y | ~x & z;
  }

  function G(x, y, z) {
    return x & z | y & ~z;
  }

  function H(x, y, z) {
    return x ^ y ^ z;
  }

  function I(x, y, z) {
    return y ^ (x | ~z);
  }

  function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  ;

  function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  ;

  function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  ;

  function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  ;

  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;

    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = lByteCount % 4 * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
      lByteCount++;
    }

    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | 0x80 << lBytePosition;
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  ;

  function WordToHex(lValue) {
    var WordToHexValue = "",
        WordToHexValue_temp = "",
        lByte,
        lCount;

    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = lValue >>> lCount * 8 & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }

    return WordToHexValue;
  }

  ;

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode(c >> 6 | 192);
        utftext += String.fromCharCode(c & 63 | 128);
      } else {
        utftext += String.fromCharCode(c >> 12 | 224);
        utftext += String.fromCharCode(c >> 6 & 63 | 128);
        utftext += String.fromCharCode(c & 63 | 128);
      }
    }

    return utftext;
  }

  ;
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22;
  var S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20;
  var S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23;
  var S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;
  string = Utf8Encode(string);
  x = ConvertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }

  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
  return temp.toLowerCase();
};

/* harmony default export */ const md5_min = (MD5);
;// CONCATENATED MODULE: ./src/app/content/users_manager/index.js
function users_manager_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { users_manager_typeof = function _typeof(obj) { return typeof obj; }; } else { users_manager_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return users_manager_typeof(obj); }

function users_manager_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = users_manager_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function users_manager_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return users_manager_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return users_manager_arrayLikeToArray(o, minLen); }

function users_manager_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function users_manager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function users_manager_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) users_manager_setPrototypeOf(subClass, superClass); }

function users_manager_setPrototypeOf(o, p) { users_manager_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return users_manager_setPrototypeOf(o, p); }

function users_manager_createSuper(Derived) { var hasNativeReflectConstruct = users_manager_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = users_manager_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = users_manager_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return users_manager_possibleConstructorReturn(this, result); }; }

function users_manager_possibleConstructorReturn(self, call) { if (call && (users_manager_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return users_manager_assertThisInitialized(self); }

function users_manager_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function users_manager_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function users_manager_getPrototypeOf(o) { users_manager_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return users_manager_getPrototypeOf(o); }

function users_manager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Users = /*#__PURE__*/function (_Rapp) {
  users_manager_inherits(Users, _Rapp);

  var _super = users_manager_createSuper(Users);

  function Users(_args) {
    var _this;

    users_manager_classCallCheck(this, Users);

    _this = _super.call(this, _args);

    users_manager_defineProperty(users_manager_assertThisInitialized(_this), "run", function (props) {
      // THIS METHOD RUN WHEN THE RENDER FINISH
      this.call_action('show_users_list');
      this.call_action('load_users');
    });

    users_manager_defineProperty(users_manager_assertThisInitialized(_this), "states", function (props) {
      this.state('new_user_response', '');
      this.state('first_name', '');
      this.state('last_name', '');
      this.state('user_email', '');
      this.state('user_password', '');
      this.state('user_type', '');
    });

    users_manager_defineProperty(users_manager_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('load_users', function () {
        _this2.render({
          dom: 'loading',
          bbox: 'user-list-section',
          params: 'Loading users...'
        });

        _this2.state('users_loaded', false);

        MyAPI.get_users({}, function (res) {
          _this2.call_action('bind_users', res);
        });
      }); //  ||||||||||||||||||||||||||

      this.action('bind_users', function (args) {
        var data = [];
        var titles = [];

        _this2.render({
          dom: 'users_table',
          bbox: 'user-list-section'
        });

        titles.push({
          title: 'ID'
        });
        titles.push({
          title: 'First name'
        });
        titles.push({
          title: 'Last name'
        });
        titles.push({
          title: 'Email'
        });
        titles.push({
          title: 'Status'
        });
        titles.push({
          title: 'Date creation'
        });
        titles.push({
          title: ''
        });

        var _iterator = users_manager_createForOfIteratorHelper(args.users),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var u = _step.value;
            var buffer = [];

            for (var f in u) {
              if (!u.hasOwnProperty(f)) continue;
              var content = u[f];

              if (f === 'status') {
                if (content === '1') content = _this2._dom.green_flag;else content = _this2._dom.red_flag;
              }

              buffer.push(content);
            }

            buffer.push("".concat(_this2._dom['edit_btn'](u['uid']), " ").concat(_this2._dom['remove_btn'](u['uid'])));
            data.push(buffer);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        _this2.state('users_loaded', true);

        $('#Users_list').DataTable({
          data: data,
          columns: titles
        });
        var edit_btns = document.getElementsByClassName('user-edit-btn');
        var remove_btns = document.getElementsByClassName('user-remove-btn');

        var _iterator2 = users_manager_createForOfIteratorHelper(edit_btns),
            _step2;

        try {
          var _loop = function _loop() {
            var btn = _step2.value;

            btn.onclick = function () {
              _this2.call_action('edit_user', btn.getAttribute('key'));
            };
          };

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var _iterator3 = users_manager_createForOfIteratorHelper(remove_btns),
            _step3;

        try {
          var _loop2 = function _loop2() {
            var btn = _step3.value;

            btn.onclick = function () {
              _this2.call_action('toggle_user', btn.getAttribute('key'));
            };
          };

          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }); //  ||||||||||||||||||||||||||

      this.action('edit_user', function (args) {
        _this2.render({
          dom: 'loading',
          bbox: 'user-list-section',
          params: 'Editing...'
        });

        MyAPI.get_user_data({
          id: args
        }, function (res) {
          var load = false;

          if (res.users) {
            if (res.users.length > 0) {
              load = true;

              _this2.state('first_name', res.users[0].first_name);

              _this2.state('last_name', res.users[0].last_name);

              _this2.state('user_email', res.users[0].email);

              _this2.state('user_type', res.users[0]['USER-TYPE']);

              _this2.render({
                dom: 'edit_user_form',
                bbox: 'user-list-section'
              });

              return;
            }
          }

          if (load) {
            _this2.render({
              dom: 'show_users_list',
              bbox: 'user-list-section'
            });
          }
        });
      }); //  ||||||||||||||||||||||||||

      this.action('toggle_user', function (args) {
        _this2.render({
          dom: 'loading',
          bbox: 'user-list-section',
          params: 'Loading users...'
        });

        MyAPI.toggle_user({
          id: args
        }, function () {
          _this2.call_action('show_users_list');
        });
      }); //  ||||||||||||||||||||||||||

      this.action('new_user_form', function () {
        var first_name = _this2.state('first_name');

        var last_name = _this2.state('last_name');

        var user_email = _this2.state('user_email');

        var password = md5_min(_this2.state('user_password'));

        var user_type = _this2.state('user_type');

        if (first_name.trim() === '') {
          _this2.state('new_user_response', '"First Name" field is invalid, re-write it and try again.');

          return;
        }

        if (_this2.state('user_password').trim() === '') {
          _this2.state('new_user_response', '"Password" is empty field, re-write it and try again.');

          return;
        }

        if (last_name.trim() === '') {
          _this2.state('new_user_response', '"Last Name" field is invalid, re-write it and try again.');

          return;
        }

        if (user_email.trim() === '') {
          _this2.state('new_user_response', '"E-mail" field is invalid, re-write it and try again.');

          return;
        } else {
          var email_check = user_email.match(/([\w|0-9|\W])+@([\w|\W])+[.]([\w])+([.]+[\w])?/g);
          if (!email_check) return _this2.state('new_user_response', 'Your E-mail does not have the correct format');
          if (email_check) if (email_check.length === 0) return _this2.state('new_user_response', 'Your E-mail does not have the correct format');
        }

        if (user_type.trim() === '') {
          _this2.state('new_user_response', 'Select one type of user and try again.');

          return;
        }

        _this2.render({
          dom: 'loading',
          bbox: 'new_user_form',
          params: 'Sending data...'
        });

        MyAPI.new_user({
          first_name: first_name,
          last_name: last_name,
          email: user_email,
          password: password,
          type: user_type
        }, function (res) {
          _this2.call_action('show_users_list');
        });
      }); //  ||||||||||||||||||||||||||

      this.action('show_users_list', function () {
        _this2.render({
          dom: 'show_users_list',
          bbox: 'users-content'
        });

        _this2.call_action('load_users');
      }); //  ||||||||||||||||||||||||||

      this.action('show_new_user_form', function () {
        _this2.state('first_name', '');

        _this2.state('last_name', '');

        _this2.state('user_email', '');

        _this2.state('user_type', '');

        _this2.render({
          dom: 'new_user',
          bbox: 'users-content'
        });

        _this2.render({
          dom: 'new_user_form',
          bbox: 'new_user_form'
        });
      }); // |||||||||||||||||||||||||||

      this.action('set_first_name', function (e) {
        _this2.state('first_name', e.target.value);
      }); // |||||||||||||||||||||||||||

      this.action('set_last_name', function (e) {
        _this2.state('last_name', e.target.value);
      }); // |||||||||||||||||||||||||||

      this.action('set_user_email', function (e) {
        _this2.state('user_email', e.target.value);
      }); // |||||||||||||||||||||||||||

      this.action('set_user_password', function (e) {
        _this2.state('user_password', e.target.value);
      }); // |||||||||||||||||||||||||||

      this.action('set_user_type', function (e) {
        _this2.state('user_type', e.target.value);
      });
    });

    users_manager_defineProperty(users_manager_assertThisInitialized(_this), "draw", function (props) {
      this._dom.green_flag = "<div class='green-flag'></div>";
      this._dom.red_flag = "<div class='red-flag'></div>";
      this.dom('edit_btn', function (id) {
        return "<button key='".concat(id, "' class='user-edit-btn'>Edit</button>");
      });
      this.dom('remove_btn', function (id) {
        return "<button key='".concat(id, "' class='user-remove-btn'>Toggle</button>");
      });
      this.dom('loading', function () {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading...';
        return "<div class='data_loader'><p>".concat(message, "</p><img src='assets/preloaders/windows8_2.svg' /></div>");
      });
      this.dom('users_table', function () {
        return "<table id='Users_list'></table>";
      });
      this.dom('show_users_list', function () {
        return "<div class='capsule'>\n                        <h1>Users list</h1>\n                        <div id='user-list-section'></div>\n                    </div>";
      });
      this.dom('new_user', function () {
        return "<div class='capsule'>\n                        <h1>New user</h1>\n                        <div id='new_user_form'></div>\n                    </div>";
      });
      this.dom('new_user_form', function () {
        return "<p>[state:new_user_response]</p>\n                    <form onsubmit='new_user_form'>\n                        <p>First name:</p>\n                        <input type='text' value='[state:first_name]' onkeyup='set_first_name' />\n                        <p>Last name:</p>\n                        <input type='text' value='[state:last_name]' onkeyup='set_last_name' />\n                        <p>E-mail:</p>\n                        <input type='text' value='[state:user_email]' onkeyup='set_user_email' />\n                        <p>Password:</p>\n                        <input type='password' value='[state:user_password]' onkeyup='set_user_password' />\n                        <p>Type of user:</p>\n                        <select value='[state:user_password]' onchange='set_user_type'>\n                            <option value='' disabled selected>Select...</option>\n                            <option value='0'>Admin</option>\n                            <option value='1'>Seller</option>\n                        </select>\n                        <div style='text-align:right'>\n                            <input type='reset' value='Clear' />\n                            <input type='submit' value='Save' />\n                        </div>\n                    </form>";
      });
      this.dom('edit_user_form', function () {
        return "<p>[state:new_user_response]</p>\n                    <form onsubmit='edit_user_form'>\n                        <p>First name:</p>\n                        <input type='text' value='[state:first_name]' onkeyup='set_first_name' />\n                        <p>Last name:</p>\n                        <input type='text' value='[state:last_name]' onkeyup='set_last_name' />\n                        <p>E-mail:</p>\n                        <input type='text' value='[state:user_email]' onkeyup='set_user_email' />\n                        <p>Type of user:</p>\n                        <select value='[state:user_type]' onchange='set_user_type'>\n                            <option value='' disabled selected>Select...</option>\n                            <option value='0'>Admin</option>\n                            <option value='1'>Seller</option>\n                        </select>\n                        <div style='text-align:right'>\n                            <input type='reset' value='Clear' />\n                            <input type='submit' value='Save' />\n                        </div>\n                    </form>";
      });
      this.dom('main', function () {
        return "<section class='content'>\n                        <div class='tool-box'>\n                            <button onclick='show_users_list'>Users</button>\n                            <button onclick='show_new_user_form'>New user</button>\n                        </div>\n                        <div id='users-content'></div>\n                    </section>";
      });
    });

    return _this;
  }

  return Users;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/content/products_manager/stock.js
function stock_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { stock_typeof = function _typeof(obj) { return typeof obj; }; } else { stock_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return stock_typeof(obj); }

function stock_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = stock_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function stock_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return stock_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return stock_arrayLikeToArray(o, minLen); }

function stock_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function stock_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function stock_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) stock_setPrototypeOf(subClass, superClass); }

function stock_setPrototypeOf(o, p) { stock_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return stock_setPrototypeOf(o, p); }

function stock_createSuper(Derived) { var hasNativeReflectConstruct = stock_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = stock_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = stock_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return stock_possibleConstructorReturn(this, result); }; }

function stock_possibleConstructorReturn(self, call) { if (call && (stock_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return stock_assertThisInitialized(self); }

function stock_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function stock_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function stock_getPrototypeOf(o) { stock_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return stock_getPrototypeOf(o); }

function stock_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Products = /*#__PURE__*/function (_Rapp) {
  stock_inherits(Products, _Rapp);

  var _super = stock_createSuper(Products);

  function Products(_args) {
    var _this;

    stock_classCallCheck(this, Products);

    _this = _super.call(this, _args);

    stock_defineProperty(stock_assertThisInitialized(_this), "run", function (props) {
      // THIS METHOD RUN WHEN THE RENDER FINISH
      this.call_action('load_stock');
    });

    stock_defineProperty(stock_assertThisInitialized(_this), "states", function (props) {
      this.state('response', '');
      this.state('stock_id', '');
      this.state('stock_name', '');
      this.state('stock_desc', '');
      this.state('stock_price', '');
      this.state('stock_stock', '');
    });

    stock_defineProperty(stock_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('load_stock', function () {
        _this2.render({
          dom: 'show_stock',
          bbox: 'stock-content'
        });

        _this2.render({
          dom: 'loading',
          bbox: 'stock-section',
          params: 'Loading stock...'
        });

        MyAPI.get_stock({}, function (res) {
          _this2.render({
            dom: 'stock_list_section',
            bbox: 'stock-section'
          });

          var titles = [{
            title: 'ID'
          }, {
            title: 'Name'
          }, {
            title: 'Price'
          }, {
            title: 'Stock'
          }, {
            title: 'Status'
          }, {
            title: 'Date creation'
          }, {
            title: 'Creator'
          }, {
            title: ''
          }];
          var data = [];

          var _iterator = stock_createForOfIteratorHelper(res.stock),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var s = _step.value;
              var buffer = [];

              for (var f in s) {
                if (!s.hasOwnProperty(f)) continue;
                var value = s[f];
                if (f === 'Status') value = value === '1' ? _this2._dom['green_flag'] : _this2._dom['red_flag'];
                buffer.push(value);
              }

              buffer.push("".concat(_this2._dom['details_btn'](s['ID']), " ").concat(_this2._dom['edit_btn'](s['ID']), " ").concat(_this2._dom['remove_btn'](s['ID'], s['Status'] === '1' ? 'Deactivate' : 'Activate')));
              data.push(buffer);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          $('#table-stock').DataTable({
            data: data,
            columns: titles
          });

          _this2.call_action('edit_btn');

          _this2.call_action('remove_btn');
        });
      });
      this.action('edit_btn', function () {
        var buffer = document.getElementsByClassName('stock-edit-btn');

        var _iterator2 = stock_createForOfIteratorHelper(buffer),
            _step2;

        try {
          var _loop = function _loop() {
            var btn = _step2.value;

            btn.onclick = function (e) {
              var id = btn.getAttribute('key');

              _this2.render({
                dom: 'loading',
                bbox: 'stock-section',
                params: 'Editing stock...'
              });

              _this2.call_action('load_stock_data', {
                id: id,
                next_action: 'show_edit_form',
                api: 'get_stock_data'
              });
            };
          };

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
      this.action('remove_btn', function () {
        var buffer = document.getElementsByClassName('stock-remove-btn');

        var _iterator3 = stock_createForOfIteratorHelper(buffer),
            _step3;

        try {
          var _loop2 = function _loop2() {
            var btn = _step3.value;

            btn.onclick = function (e) {
              var id = btn.getAttribute('key');

              _this2.render({
                dom: 'loading',
                bbox: 'stock-section',
                params: 'Editing stock...'
              });

              _this2.call_action('load_stock_data', {
                id: id,
                next_action: 'load_stock',
                api: 'toggle_stock'
              });
            };
          };

          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
      this.action('load_stock_data', function (args) {
        MyAPI[args.api]({
          id: args.id
        }, function (res) {
          _this2.call_action(args.next_action, res);
        });
      });
      this.action('show_edit_form', function (args) {
        var data = args.stock;

        _this2.state('stock_id', data.ID);

        _this2.state('stock_name', data.Name);

        _this2.state('stock_desc', data.Description);

        _this2.state('stock_price', data.Price);

        _this2.state('stock_stock', data.Stock);

        _this2.render({
          dom: 'edit-stock-section',
          bbox: 'stock-section'
        });
      });
      this.action('show_stock_list', function () {
        _this2.call_action('load_stock');
      });
      this.action('show_new_product_form', function () {
        _this2.render({
          dom: 'new-stock-section',
          bbox: 'stock-section'
        });
      });
      this.action('new_stock_submit', function () {
        _this2.render({
          dom: 'loading',
          bbox: 'stock-section',
          params: 'Sending data...'
        });

        var data = {
          name: _this2.state('stock_name'),
          desc: _this2.state('stock_desc'),
          price: _this2.state('stock_price'),
          stock: _this2.state('stock_stock')
        };
        MyAPI.new_stock(data, function (res) {
          if (res.error) {
            _this2.render({
              dom: 'new-stock-section',
              bbox: 'stock-section'
            });

            _this2.state('response', 'Check the fields values and try again.');

            return;
          }

          _this2.state('stock_id', '');

          _this2.state('stock_name', '');

          _this2.state('stock_desc', '');

          _this2.state('stock_price', '');

          _this2.state('stock_stock', '');

          _this2.call_action('load_stock');
        });
      });
      this.action('edit_stock_submit', function () {
        _this2.render({
          dom: 'loading',
          bbox: 'stock-section',
          params: 'Sending data...'
        });

        var data = {
          id: _this2.state('stock_id'),
          name: _this2.state('stock_name'),
          desc: _this2.state('stock_desc'),
          price: _this2.state('stock_price'),
          stock: _this2.state('stock_stock')
        };
        MyAPI.edit_stock(data, function (res) {
          if (res.error) {
            _this2.render({
              dom: 'new-stock-section',
              bbox: 'stock-section'
            });

            _this2.state('response', 'Check the fields values and try again.');

            return;
          }

          _this2.state('stock_id', '');

          _this2.state('stock_name', '');

          _this2.state('stock_desc', '');

          _this2.state('stock_price', '');

          _this2.state('stock_stock', '');

          _this2.call_action('load_stock');
        });
      });
      this.action('set_stock_name', function (e) {
        _this2.state('stock_name', e.target.value);
      });
      this.action('set_stock_desc', function (e) {
        _this2.state('stock_desc', e.target.value);
      });
      this.action('set_stock_price', function (e) {
        _this2.state('stock_price', e.target.value);
      });
      this.action('set_stock_stock', function (e) {
        _this2.state('stock_stock', e.target.value);
      });
    });

    stock_defineProperty(stock_assertThisInitialized(_this), "draw", function (props) {
      var _this3 = this;

      this._dom.green_flag = "<div class='green-flag'></div>";
      this._dom.red_flag = "<div class='red-flag'></div>";
      this.dom('edit_btn', function (id) {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        if (session_comp.state('user_data')['USER-TYPE'] !== '0') return '';
        return "<button key='".concat(id, "' class='stock-edit-btn'>Edit</button>");
      });
      this.dom('remove_btn', function (id, state) {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        if (session_comp.state('user_data')['USER-TYPE'] !== '0') return '';
        return "<button key='".concat(id, "' class='stock-remove-btn'>").concat(state, "</button>");
      });
      this.dom('details_btn', function (id) {
        return '';
        return "<button key='".concat(id, "' class='stock-details-btn'>See details</button>");
      });
      this.dom('loading', function () {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading...';
        return "<div class='data_loader'><p>".concat(message, "</p><img src='assets/preloaders/windows8_2.svg' /></div>");
      });
      this.dom('show_stock', function () {
        return "<div class='capsule'>\n                    <h1>Stock</h1>\n                    <div id='stock-section'></div>\n                </div>";
      });
      this.dom('new-stock-section', function () {
        return "<p>[state:response]</p>\n                <form onsubmit='new_stock_submit'>\n                    <p>Name:</p>\n                    <input type='text' value='[state:stock_name]' onkeyup='set_stock_name' />\n                    <p>Description:</p>\n                    <textarea value='[state:stock_desc]' onkeyup='set_stock_desc'>[state:stock_desc]</textarea>\n                    <p>Price:</p>\n                    <input type='text' value='[state:stock_price]' onkeyup='set_stock_price' />\n                    <p>Stock:</p>\n                    <input type='text' value='[state:stock_stock]' onkeyup='set_stock_stock' />\n                    <div style='text-align: right'>\n                        <input type='reset' value='Clear' />\n                        <input type='submit' value='Save' />\n                    </div>\n                </form>";
      });
      this.dom('edit-stock-section', function () {
        return "<p>[state:response]</p>\n                <form onsubmit='edit_stock_submit'>\n                    <p>Name:</p>\n                    <input type='text' value='[state:stock_name]' onkeyup='set_stock_name' />\n                    <p>Description:</p>\n                    <textarea value='[state:stock_desc]' onkeyup='set_stock_desc'>[state:stock_desc]</textarea>\n                    <p>Price:</p>\n                    <input type='text' value='[state:stock_price]' onkeyup='set_stock_price' />\n                    <p>Stock:</p>\n                    <input type='text' value='[state:stock_stock]' onkeyup='set_stock_stock' />\n                    <div style='text-align: right'>\n                        <input type='reset' value='Clear' />\n                        <input type='submit' value='Save' />\n                    </div>\n                </form>";
      });
      this.dom('stock_list_section', function () {
        return "<table id='table-stock'></table>";
      });
      this.dom('main', function () {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        return "<section class='content'>\n                    <div class='tool-box'>\n                        <button onclick='show_stock_list'>Stock</button>\n                        ".concat(session_comp.state('user_data')['USER-TYPE'] !== '0' ? "" : "<button onclick='show_new_product_form'>Add product</button>", "\n                    </div>\n                    <div id='stock-content'></div>\n                </section>");
      });
    });

    return _this;
  }

  return Products;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/content/products_manager/invoicing.js
function invoicing_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { invoicing_typeof = function _typeof(obj) { return typeof obj; }; } else { invoicing_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return invoicing_typeof(obj); }

function invoicing_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = invoicing_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function invoicing_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return invoicing_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return invoicing_arrayLikeToArray(o, minLen); }

function invoicing_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function invoicing_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function invoicing_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) invoicing_setPrototypeOf(subClass, superClass); }

function invoicing_setPrototypeOf(o, p) { invoicing_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return invoicing_setPrototypeOf(o, p); }

function invoicing_createSuper(Derived) { var hasNativeReflectConstruct = invoicing_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = invoicing_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = invoicing_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return invoicing_possibleConstructorReturn(this, result); }; }

function invoicing_possibleConstructorReturn(self, call) { if (call && (invoicing_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return invoicing_assertThisInitialized(self); }

function invoicing_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function invoicing_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function invoicing_getPrototypeOf(o) { invoicing_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return invoicing_getPrototypeOf(o); }

function invoicing_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Invoicing = /*#__PURE__*/function (_Rapp) {
  invoicing_inherits(Invoicing, _Rapp);

  var _super = invoicing_createSuper(Invoicing);

  function Invoicing(_args) {
    var _this;

    invoicing_classCallCheck(this, Invoicing);

    _this = _super.call(this, _args);

    invoicing_defineProperty(invoicing_assertThisInitialized(_this), "run", function (props) {
      this.render({
        dom: "capsule",
        bbox: "invoice-content"
      });

      if (Rapp.obj_length(this.state("basket")) > 0) {
        this.call_action("show_client_finder");
        this.call_action("show_prev_invoice_saved");
      } else {
        this.call_action('show_invoice_list');
      }
    });

    invoicing_defineProperty(invoicing_assertThisInitialized(_this), "states", function (props) {
      this.state("client_finder", "");
      this.state("product_finder", "");
      this.state("client_selected", "");
      this.state("client_selected_data", "");
      this.state("basket", {});
      this.state("basket_count", 0);
      this.state("basket_total_count", 0);
      this.state("basket_total_price", 0);
    });

    invoicing_defineProperty(invoicing_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action("show_client_finder", function () {
        _this2.render({
          dom: "client_finder",
          bbox: "".concat(_this2._name, "-capsule-section")
        });
      });
      this.action("submit_find_client", function () {
        _this2.render({
          dom: "loading",
          bbox: "client-finer-result",
          params: "Looking for the client..."
        });

        MyAPI.find_client({
          text: _this2.state("client_finder")
        }, function (res) {
          _this2.render({
            dom: "client-find-table",
            bbox: "client-finer-result",
            params: {
              count: res.clients.length
            }
          });

          var titles = [{
            title: "ID"
          }, {
            title: "First Name"
          }, {
            title: "Last Name"
          }, {
            title: "Address"
          }, {
            title: "Phone"
          }, {
            title: ""
          }];
          var data = [];

          var _iterator = invoicing_createForOfIteratorHelper(res.clients),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var c = _step.value;
              var buffer = [];

              for (var t in c) {
                if (!c.hasOwnProperty(t)) continue;

                if (t === "ID" || t === "first_name" || t === "last_name" || t === "address" || t === "phone") {
                  var value = c[t];
                  buffer.push(value);
                }
              }

              buffer.push("".concat(_this2._dom["sell_btn"](c["ID"])));
              data.push(buffer);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          $("#client-finder-table").DataTable({
            data: data,
            columns: titles
          });

          _this2.call_action("click_start_sell");
        });
      });
      this.action("submit_find_product", function () {
        _this2.render({
          dom: "loading",
          bbox: "product-finer-result",
          params: "Looking for products..."
        });

        MyAPI.find_stock({
          text: _this2.state("product_finder")
        }, function (res) {
          _this2.render({
            dom: "product-find-table",
            bbox: "product-finer-result",
            params: {
              count: res.stock.length
            }
          });

          var data = [];
          var titles = [{
            title: "ID"
          }, {
            title: "Name"
          }, {
            title: "Price"
          }, {
            title: "Stock"
          }, {
            title: ""
          }];

          var _iterator2 = invoicing_createForOfIteratorHelper(res.stock),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var s = _step2.value;
              var buffer = [];

              for (var t in s) {
                if (!s.hasOwnProperty(t)) continue;

                if (t === "ID" || t === "name" || t === "price" || t === "stock") {
                  var value = s[t];
                  buffer.push(value);
                }
              }

              buffer.push("".concat(_this2._dom["add_product_btn"]({
                id: s["ID"],
                stock: s["stock"]
              })));
              data.push(buffer);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          $("#product-finder-table").DataTable({
            data: data,
            columns: titles
          });

          _this2.call_action("click_add_basket", res.stock);
        });
      });
      this.action("click_start_sell", function () {
        var buffer = document.getElementsByClassName("client-sell-btn");

        var _iterator3 = invoicing_createForOfIteratorHelper(buffer),
            _step3;

        try {
          var _loop = function _loop() {
            var btn = _step3.value;

            btn.onclick = function () {
              var id = btn.getAttribute("key");

              _this2.state("client_selected", id);

              _this2.render({
                dom: "loading",
                bbox: "client-finer-result",
                params: "Selecting client..."
              });

              MyAPI.get_client({
                id: id
              }, function (res) {
                _this2.state("client_selected_data", res.clients);

                _this2.render({
                  dom: "selected_client",
                  bbox: "client-finer-result",
                  params: {
                    first_name: res.clients.first_name,
                    last_name: res.clients.last_name,
                    address: res.clients.address,
                    phone: res.clients.phone
                  }
                });

                _this2.render({
                  dom: "product_finder_section",
                  bbox: "product-finder"
                });
              });
            };
          };

          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
      this.action("click_add_basket", function (args) {
        var buffer = document.getElementsByClassName("product-add-btn");

        var _iterator4 = invoicing_createForOfIteratorHelper(buffer),
            _step4;

        try {
          var _loop2 = function _loop2() {
            var btn = _step4.value;

            btn.onclick = function () {
              var id = btn.getAttribute("key");

              var basket = _this2.state("basket");

              if (!basket[id]) {
                var stock_data = {};

                var _iterator5 = invoicing_createForOfIteratorHelper(args),
                    _step5;

                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var s = _step5.value;
                    if (s["ID"] !== id) continue;
                    stock_data = s;
                    break;
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }

                basket[id] = stock_data;
              }

              var stock_field = document.getElementById("add-stock-".concat(id));
              if (!basket[id]["count"]) basket[id]["count"] = parseInt(stock_field.value);else basket[id]["count"] += parseInt(stock_field.value);

              _this2.state("basket", basket);

              _this2.state("basket_count", Rapp.obj_length(_this2.state("basket")));

              _this2.render({
                dom: "product_added",
                bbox: "product-finer-result"
              });
            };
          };

          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      });
      this.action("show_prev_invoice_saved", function () {
        var client = _this2.state("client_selected_data");

        _this2.render({
          dom: "selected_client",
          bbox: "client-finer-result",
          params: {
            first_name: client.first_name,
            last_name: client.last_name,
            address: client.address,
            phone: client.phone
          }
        });

        _this2.render({
          dom: "product_finder_section",
          bbox: "product-finder"
        });
      });
      this.action('show_document_invoice', function (args) {
        var sale = args.sale;

        _this2.render({
          dom: 'view-document-invoice',
          bbox: "".concat(_this2._name, "-capsule-section"),
          params: args.sale
        });
      });
      this.action('print-invoice-document', function () {
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title + '</h1>');
        mywindow.document.write(document.getElementById("".concat(_this2._name, "-print-invoice")).innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10

        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
      });
      this.action("show_invoice_list", function () {
        _this2.render({
          dom: "loading",
          bbox: "".concat(_this2._name, "-capsule-section"),
          params: 'Loading invoices...'
        });

        MyAPI.load_invoices({}, function (res) {
          _this2.render({
            dom: "invoices-table",
            bbox: "".concat(_this2._name, "-capsule-section"),
            params: {
              count: res.invoices.length
            }
          });

          var data = res.invoices;

          var _iterator6 = invoicing_createForOfIteratorHelper(data),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var i = _step6.value;
              var status = parseInt(i[3]);
              i[3] = status === 1 ? _this2._dom['green_flag'] : _this2._dom['red_flag'];
              i.push("".concat(_this2._dom['view_btn'](i[0]), " ").concat(_this2._dom['toggle_btn'](i[0], status === 1 ? 'Deactivate' : 'Activate')));
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          res.titles.push({
            title: ''
          });
          $('#invoices-list-table').DataTable({
            data: data,
            columns: res.titles
          });

          _this2.call_action('view-invoice-btn-click');

          _this2.call_action('toggle-btn-clik');
        });
      });
      this.action('toggle-btn-clik', function () {
        var btns = document.getElementsByClassName('toggle-invoice-btn');

        var _iterator7 = invoicing_createForOfIteratorHelper(btns),
            _step7;

        try {
          var _loop3 = function _loop3() {
            var btn = _step7.value;

            btn.onclick = function () {
              _this2.render({
                dom: "loading",
                bbox: "".concat(_this2._name, "-capsule-section"),
                params: 'Updating invoice...'
              });

              var id = btn.getAttribute('key');
              MyAPI.toggle_invoice({
                id: id
              }, function (res) {
                _this2.call_action('show_invoice_list');
              });
            };
          };

          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            _loop3();
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      });
      this.action('view-invoice-btn-click', function () {
        var btns = document.getElementsByClassName('view-invoice-btn');

        var _iterator8 = invoicing_createForOfIteratorHelper(btns),
            _step8;

        try {
          var _loop4 = function _loop4() {
            var btn = _step8.value;

            btn.onclick = function () {
              _this2.render({
                dom: "loading",
                bbox: "".concat(_this2._name, "-capsule-section"),
                params: 'Loading invoice info...'
              });

              var id = btn.getAttribute('key');
              MyAPI.view_invoice({
                id: id
              }, function (res) {
                _this2.call_action('show_document_invoice', res);
              });
            };
          };

          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            _loop4();
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      });
      this.action("show_new_invoice", function () {
        _this2.call_action("show_client_finder");
      });
      this.action("update_pre_products_listing", function () {
        var count = 0;
        var price = 0;

        var basket = _this2.state("basket");

        for (var prod in basket) {
          if (!basket.hasOwnProperty(prod)) continue;
          count += parseInt(basket[prod].count);
          price += parseInt(basket[prod].count) * parseFloat(basket[prod].price);
        }

        _this2.state("basket_total_count", count);

        _this2.state("basket_total_price", price);

        _this2.render({
          dom: "pre_products_total_count",
          bbox: "pre-products-total-count"
        });

        _this2.render({
          dom: "pre_products_total_price",
          bbox: "pre-products-total-price"
        });
      });
      this.action("show_basket", function () {
        _this2.state("basket_total_count", 0);

        _this2.state("basket_total_price", 0);

        _this2.render({
          dom: "client-basket-table",
          bbox: "product-finder"
        });

        var count_fields = document.getElementsByClassName("prods-final-count");

        var _iterator9 = invoicing_createForOfIteratorHelper(count_fields),
            _step9;

        try {
          var _loop5 = function _loop5() {
            var txt = _step9.value;

            txt.onkeyup = function (e) {
              var id = txt.getAttribute("key");
              _this2._states["basket"][id].count = e.target.value;

              _this2.call_action("update_pre_products_listing");
            };
          };

          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            _loop5();
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }

        _this2.call_action("update_pre_products_listing");
      });
      this.action("show_product_finder", function () {
        _this2.render({
          dom: "product_finder_section",
          bbox: "product-finder"
        });
      });
      this.action("keyup_client_finder", function (e) {
        _this2.state("client_finder", e.target.value);
      });
      this.action("keyup_product_finder", function (e) {
        _this2.state("product_finder", e.target.value);
      });
      this.action('confirm_invoice', function () {
        _this2.render({
          dom: 'loading',
          bbox: "".concat(_this2._name, "-capsule-section"),
          params: 'Adding new Invoice...'
        });

        var data = {
          client_id: _this2.state('client_selected'),
          basket: _this2.state('basket')
        };
        MyAPI.save_invoice(data, function (res) {
          if (!res.error) {
            _this2.state('client_selected', '');

            _this2.state('basket', []);

            _this2.call_action('show_invoice_list');
          }
        });
      });
    });

    invoicing_defineProperty(invoicing_assertThisInitialized(_this), "draw", function (props) {
      var _this3 = this;

      this._dom.green_flag = "<div class='green-flag'></div>";
      this._dom.red_flag = "<div class='red-flag'></div>";
      this.dom("product_added", function () {
        return "<p>Product added to invoice</p>";
      });
      this.dom("sell_btn", function (id) {
        return "<button key='".concat(id, "' class='client-sell-btn'>Start sell</button>");
      });
      this.dom("view_btn", function (id) {
        return "<button key='".concat(id, "' class='view-invoice-btn'>view</button>");
      });
      this.dom("toggle_btn", function (id, state) {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        if (session_comp.state('user_data')['USER-TYPE'] !== '0') return '';
        return "<button key='".concat(id, "' class='toggle-invoice-btn'>").concat(state, "</button>");
      });
      this.dom("add_product_btn", function (args) {
        var html = "\n            <div>\n                <input type='text' id='add-stock-".concat(args.id, "' value='0' />\n                <button key='").concat(args.id, "' class='product-add-btn'>Add to basket</button>\n            </div>");

        if (parseInt(args.stock) === 0) {
          html = "<p>Not available</p>";
        }

        return html;
      });
      this.dom("selected_client", function (args) {
        return "<section>\n                <h1>Selected client:</h1>\n                <p>Name: ".concat(args.first_name, " ").concat(args.last_name, "</p>\n                <p>Address: ").concat(args.first_name, " | Phone: ").concat(args.last_name, "</p>\n                <button onclick='show_basket'>Products Added ([state:basket_count])</button>\n                <button onclick='show_product_finder'>Search more</button>\n            </section>\n            <section id='product-finder'></section>");
      });
      this.dom("product_finder_section", function () {
        return "<form onsubmit='submit_find_product'>\n                    <p>Search products:</p>\n                    <input type='text' value='[state:product_finder]' onkeyup='keyup_product_finder' placeholder='Search product by ID, name' />\n                    <div style='text-align: right'>\n                        <input type='reset' value='Clear' />\n                        <input type='submit' value='Search' />\n                    </div>\n                </form>\n                <div id='product-finer-result'></div>";
      });
      this.dom("client_finder", function () {
        return "<form onsubmit='submit_find_client'>\n                    <p>Search client:</p>\n                    <input type='text' value='[state:client_finder]' onkeyup='keyup_client_finder' placeholder='Search client by ID, first name or last name' />\n                    <div style='text-align: right'>\n                        <input type='reset' value='Clear' />\n                        <input type='submit' value='Search' />\n                    </div>\n                </form>\n                <div id='client-finer-result'></div>";
      });
      this.dom("invoices-table", function (args) {
        return "<h1 style='border-bottom: solid 1px #DDD'>Results: ".concat(args.count, " ").concat(args.count === 1 ? "invoice" : "invoices", "</h1>\n            <table id='invoices-list-table'></table>");
      });
      this.dom("product-find-table", function (args) {
        return "<h1 style='border-bottom: solid 1px #DDD'>Results: ".concat(args.count, " ").concat(args.count === 1 ? "product" : "products", "</h1>\n            <table id='product-finder-table'></table>");
      });
      this.dom("client-find-table", function (args) {
        return "<h1 style='border-bottom: solid 1px #DDD'>Results: ".concat(args.count, " ").concat(args.count === 1 ? "client" : "clients", "</h1>\n            <table id='client-finder-table'></table>");
      });
      this.dom("pre_products_total_count", function () {
        return "<td colspan='3'></td><td>TOTAL Count: [state:basket_total_count] units</td>";
      });
      this.dom("pre_products_total_price", function () {
        return "<td colspan='3'></td><td>TOTAL Price: $[state:basket_total_price]</td>";
      });
      this.dom("client-basket-table", function (args) {
        var count = Rapp.obj_length(_this3.state("basket"));

        var basket = _this3.state("basket");

        var prods = "";

        for (var s in basket) {
          if (basket.hasOwnProperty(s)) {
            _this3.state("basket_total_count", _this3.state("basket_total_count") + parseInt(basket[s].count));

            _this3.state("basket_total_price", _this3.state("basket_total_price") + parseFloat(basket[s].price) * parseInt(basket[s].count));

            prods += "<tr><td>".concat(basket[s].ID, "</td><td>").concat(basket[s].name, "</td><td>$").concat(basket[s].price, "</td><td><input type='text' key='").concat(basket[s].ID, "' value='").concat(basket[s].count, "' class='prods-final-count' /> units</td></tr>");
          }
        }

        return "<section class='preview-basket'>\n                <h1 style='border-bottom: solid 1px #DDD'>Number of products: ".concat(count, " ").concat(count === 1 ? "product" : "products", "</h1>\n                <table>\n                    <thead>\n                        <tr>\n                            <th>ID</th>\n                            <th>Name</th>\n                            <th>Price</th>\n                            <th>Count</th>\n                            <th></th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                    ").concat(prods, "\n                    <tr id='pre-products-total-count'></tr>\n                    <tr id='pre-products-total-price'></tr>\n                    </tbody>\n                </table>\n                <div style='text-align:right'>\n                    <button onclick='clear_invoice'>Reset Invoice</button>\n                    <button onclick='confirm_invoice'>Confirm Invoice</button>\n                </div>\n            </section>");
      });
      this.dom("loading", function () {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Loading...";
        return "<div class='data_loader'><p>".concat(message, "</p><img src='assets/preloaders/windows8_2.svg' /></div>");
      });
      this.dom('view-document-invoice', function (args) {
        var prods = "";
        var total_amount = 0;

        var _iterator10 = invoicing_createForOfIteratorHelper(args.prods),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var p = _step10.value;
            prods += "<tr>\n\t\t\t\t\t\t<td>".concat(p['PROD-NAME'], "</td>\n\t\t\t\t\t\t<td>").concat(p['PROD-DESC'], "</td>\n\t\t\t\t\t\t<td>").concat(p['PROD-MOUNT'], " units</td>\n\t\t\t\t\t\t<td>$").concat(p['PROD-PRICE'], "</td>\n\t\t\t\t\t\t<td>$").concat(parseFloat(p['PROD-PRICE']) * parseFloat(p['PROD-MOUNT']), "</td>\n\t\t\t\t\t</tr>");
            total_amount += parseFloat(p['PROD-MOUNT']);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }

        var invoice_id = args.invoice['ID'];
        invoice_id = invoice_id.substr(invoice_id.length - 7, invoice_id.length - 1);
        var client_id = args.invoice['CLIENT-ID'];
        client_id = client_id.substr(client_id.length - 7, client_id.length - 1);
        return "<div class='".concat(_this3._name, "-invoice-document' id='").concat(_this3._name, "-print-invoice'>\n\t\t\t\t\t<h2>Invoice document #").concat(invoice_id, "</h2>\n\t\t\t\t\t<p>Sale date: ").concat(args.invoice['SALE-DATE'], "</p>\n\t\t\t\t\t<p>Client: ").concat(args.invoice['CLIENT-NAME'], " - #").concat(client_id, "</p>\n\t\t\t\t\t<table>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>Product</th>\n\t\t\t\t\t\t\t<th>Decription</th>\n\t\t\t\t\t\t\t<th>Amount</th>\n\t\t\t\t\t\t\t<th>Price</th>\n\t\t\t\t\t\t\t<th>Total</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t").concat(prods, "\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td colspan='2'></td>\n\t\t\t\t\t\t\t<td>").concat(total_amount, " units</td>\n\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t<td>$").concat(args.invoice.TOTAL, "</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<button onclick='print-invoice-document' class='print-btn'>Print this document...</button>\n\t\t\t\t</div>");
      });
      this.dom("capsule", function (args) {
        return "<div class='capsule'>\n                    <h1>".concat(args.title || "Invoices", "</h1>\n                    <div id='").concat(_this3._name, "-capsule-section'></div>\n                </div>");
      });
      this.dom("main", function () {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        return "<section class='content'>\n                    <div class='tool-box'>\n                        <button onclick='show_invoice_list'>Invoices</button>\n                        ".concat(session_comp.state('user_data')['USER-TYPE'] !== '0' ? "" : "<button onclick='show_new_invoice'>New Invoice</button>", "\n                    </div>\n                    <div id='invoice-content'></div>\n                </section>");
      });
      this._dom.style = ".preview-basket\n        {\n        }\n        .preview-basket table\n        {\n            width: 100%;\n            text-align: center;\n            border-collapse: collapse;\n        }\n        .preview-basket table tr:nth-child(even)\n        {\n            background-color: #DDD;\n        }\n        .".concat(this._name, "-invoice-document table\n        {\n        \twidth: 100%;\n        \tborder-collapse: collapse;\n        \tborder: solid 1px #CCC;\n        }\n        .").concat(this._name, "-invoice-document table td\n        {\n        \tpadding: 5px;\n        }\n        .").concat(this._name, "-invoice-document table tr:nth-child(even)\n        {\n        \tbackground-color: #CCC;\n        }");
    });

    return _this;
  }

  return Invoicing;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/content/products_manager/clients.js
function clients_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clients_typeof = function _typeof(obj) { return typeof obj; }; } else { clients_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clients_typeof(obj); }

function clients_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = clients_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function clients_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return clients_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return clients_arrayLikeToArray(o, minLen); }

function clients_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function clients_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clients_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) clients_setPrototypeOf(subClass, superClass); }

function clients_setPrototypeOf(o, p) { clients_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return clients_setPrototypeOf(o, p); }

function clients_createSuper(Derived) { var hasNativeReflectConstruct = clients_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = clients_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = clients_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return clients_possibleConstructorReturn(this, result); }; }

function clients_possibleConstructorReturn(self, call) { if (call && (clients_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return clients_assertThisInitialized(self); }

function clients_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function clients_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function clients_getPrototypeOf(o) { clients_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return clients_getPrototypeOf(o); }

function clients_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Clients = /*#__PURE__*/function (_Rapp) {
  clients_inherits(Clients, _Rapp);

  var _super = clients_createSuper(Clients);

  function Clients(_args) {
    var _this;

    clients_classCallCheck(this, Clients);

    _this = _super.call(this, _args);

    clients_defineProperty(clients_assertThisInitialized(_this), "run", function (props) {
      this.render({
        dom: "capsule",
        bbox: "client-content"
      });
      this.call_action("load_clients");
    });

    clients_defineProperty(clients_assertThisInitialized(_this), "states", function (props) {
      this.state("response", "");
      this.state("client_id", "");
      this.state("client_first_name", "");
      this.state("client_last_name", "");
      this.state("client_address", "");
      this.state("client_phone", "");
    });

    clients_defineProperty(clients_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action("load_clients", function () {
        _this2.render({
          dom: "loading",
          bbox: "capsule-section",
          params: "Loading..."
        });

        MyAPI.get_clients({}, function (res) {
          _this2.render({
            dom: "clients-table",
            bbox: "capsule-section"
          });

          var titles = [{
            title: "ID"
          }, {
            title: "First Name"
          }, {
            title: "Last Name"
          }, {
            title: "Address"
          }, {
            title: "Phone"
          }, {
            title: "status"
          }, {
            title: "Date creation"
          }, {
            title: "Creator"
          }, {
            title: ""
          }];
          var data = [];

          var _iterator = clients_createForOfIteratorHelper(res.clients),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var c = _step.value;
              var buffer = [];

              for (var t in c) {
                if (!c.hasOwnProperty(t)) continue;
                var value = c[t];
                if (t === "status") value = value === "1" ? _this2._dom["green_flag"] : _this2._dom["red_flag"];
                buffer.push(value);
              }

              buffer.push("".concat(_this2._dom["edit_btn"](c["ID"]), " ").concat(_this2._dom["remove_btn"](c["ID"], c["status"] === "1" ? "Deactivate" : "Activate")));
              data.push(buffer);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          $("#table-clients").DataTable({
            data: data,
            columns: titles
          });

          _this2.call_action("click_edit_btn");

          _this2.call_action("click_remove_btn");
        });
      });
      this.action("click_edit_btn", function () {
        var buffer = document.getElementsByClassName("client-edit-btn");

        var _iterator2 = clients_createForOfIteratorHelper(buffer),
            _step2;

        try {
          var _loop = function _loop() {
            var btn = _step2.value;

            btn.onclick = function () {
              var id = btn.getAttribute("key");

              _this2.render({
                dom: "loading",
                bbox: "capsule-section",
                params: "Loading client data..."
              });

              MyAPI.get_client({
                id: id
              }, function (res) {
                _this2.state("client_id", id);

                _this2.state("client_first_name", res.clients.first_name);

                _this2.state("client_last_name", res.clients.last_name);

                _this2.state("client_address", res.clients.address);

                _this2.state("client_phone", res.clients.phone);

                _this2.render({
                  dom: "edit-client-form",
                  bbox: "capsule-section"
                });
              });
            };
          };

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
      this.action("click_remove_btn", function () {
        var buffer = document.getElementsByClassName("client-remove-btn");

        var _iterator3 = clients_createForOfIteratorHelper(buffer),
            _step3;

        try {
          var _loop2 = function _loop2() {
            var btn = _step3.value;

            btn.onclick = function () {
              var id = btn.getAttribute("key");

              _this2.render({
                dom: "loading",
                bbox: "capsule-section",
                params: "Changing client status..."
              });

              MyAPI.toggle_client_status({
                id: id
              }, function (res) {
                _this2.call_action("load_clients");
              });
            };
          };

          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      });
      this.action("click_clients_btn", function () {
        _this2.call_action("load_clients");
      });
      this.action("click_add_client_btn", function () {
        _this2.render({
          dom: "new-client-form",
          bbox: "capsule-section"
        });
      });
      this.action("submit_new_client", function () {
        _this2.render({
          dom: "loading",
          bbox: "capsule-section",
          params: "Sending data..."
        });

        var data = {
          first_name: _this2.state("client_first_name"),
          last_name: _this2.state("client_last_name"),
          address: _this2.state("client_address"),
          phone: _this2.state("client_phone")
        };
        MyAPI.new_client(data, function (res) {
          if (res.error) {
            _this2.state("response", "Check the field values and try again.");

            _this2.call_action("click_add_client_btn");

            return;
          }

          _this2.state("client_id", "");

          _this2.state("client_first_name", "");

          _this2.state("client_last_name", "");

          _this2.state("client_address", "");

          _this2.state("client_phone", "");

          _this2.call_action("load_clients");
        });
      });
      this.action("submit_edit_client", function () {
        _this2.render({
          dom: "loading",
          bbox: "capsule-section",
          params: "Sending data..."
        });

        var data = {
          id: _this2.state("client_id"),
          first_name: _this2.state("client_first_name"),
          last_name: _this2.state("client_last_name"),
          address: _this2.state("client_address"),
          phone: _this2.state("client_phone")
        };
        MyAPI.edit_client(data, function (res) {
          if (res.error) {
            _this2.state("response", "Check the field values and try again.");

            _this2.render({
              dom: "edit-client-form",
              bbox: "capsule-section"
            });

            return;
          }

          _this2.state("client_id", "");

          _this2.state("client_first_name", "");

          _this2.state("client_last_name", "");

          _this2.state("client_address", "");

          _this2.state("client_phone", "");

          _this2.call_action("load_clients");
        });
      });
      this.action("keyup_first_name", function (e) {
        _this2.state("client_first_name", e.target.value);
      });
      this.action("keyup_last_name", function (e) {
        _this2.state("client_last_name", e.target.value);
      });
      this.action("keyup_address", function (e) {
        _this2.state("client_address", e.target.value);
      });
      this.action("keyup_phone", function (e) {
        _this2.state("client_phone", e.target.value);
      });
    });

    clients_defineProperty(clients_assertThisInitialized(_this), "draw", function (props) {
      var _this3 = this;

      this._dom.green_flag = "<div class='green-flag'></div>";
      this._dom.red_flag = "<div class='red-flag'></div>";
      this.dom("edit_btn", function (id) {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        if (session_comp.state('user_data')['USER-TYPE'] !== '0') return '';
        return "<button key='".concat(id, "' class='client-edit-btn'>Edit</button>");
      });
      this.dom("remove_btn", function (id, state) {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        if (session_comp.state('user_data')['USER-TYPE'] !== '0') return '';
        return "<button key='".concat(id, "' class='client-remove-btn'>").concat(state, "</button>");
      });
      this.dom("loading", function () {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Loading...";
        return "<div class='data_loader'><p>".concat(message, "</p><img src='assets/preloaders/windows8_2.svg' /></div>");
      });
      this.dom("clients-table", function () {
        return "<table id='table-clients'></table>";
      });
      this.dom("new-client-form", function () {
        return "<form onsubmit='submit_new_client'>\n                    <p>First Name:</p>\n                    <input type='text' value='[state:client_first_name]' onkeyup='keyup_first_name' />\n                    <p>Last Name:</p>\n                    <input type='text' value='[state:client_last_name]' onkeyup='keyup_last_name' />\n                    <p>Address:</p>\n                    <input type='text' value='[state:client_address]' onkeyup='keyup_address' />\n                    <p>Phone:</p>\n                    <input type='text' value='[state:client_phone]' onkeyup='keyup_phone' />\n                    <div style='text-align: right'>\n                        <input type='reset' value='Clear' />\n                        <input type='submit' value='Save' />\n                    </div>\n                </form>";
      });
      this.dom("edit-client-form", function () {
        return "<form onsubmit='submit_edit_client'>\n                    <p>First Name:</p>\n                    <input type='text' value='[state:client_first_name]' onkeyup='keyup_first_name' />\n                    <p>Last Name:</p>\n                    <input type='text' value='[state:client_last_name]' onkeyup='keyup_last_name' />\n                    <p>Address:</p>\n                    <input type='text' value='[state:client_address]' onkeyup='keyup_address' />\n                    <p>Phone:</p>\n                    <input type='text' value='[state:client_phone]' onkeyup='keyup_phone' />\n                    <div style='text-align: right'>\n                        <input type='reset' value='Clear' />\n                        <input type='submit' value='Save' />\n                    </div>\n                </form>";
      });
      this.dom("capsule", function (args) {
        return "<div class='capsule'>\n                    <h1>".concat(args.title || "Clients", "</h1>\n                    <div id='capsule-section'></div>\n                </div>");
      });
      this.dom("main", function () {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        return "<section class='content'>\n                    <div class='tool-box'>\n                        <button onclick='click_clients_btn'>Clients</button>\n                        ".concat(session_comp.state('user_data')['USER-TYPE'] !== '0' ? '' : "<button onclick='click_add_client_btn'>Add client</button>", "\n                    </div>\n                    <div id='client-content'></div>\n                </section>");
      });
    });

    return _this;
  }

  return Clients;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/content/products_manager/index.js
function products_manager_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { products_manager_typeof = function _typeof(obj) { return typeof obj; }; } else { products_manager_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return products_manager_typeof(obj); }

function products_manager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function products_manager_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) products_manager_setPrototypeOf(subClass, superClass); }

function products_manager_setPrototypeOf(o, p) { products_manager_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return products_manager_setPrototypeOf(o, p); }

function products_manager_createSuper(Derived) { var hasNativeReflectConstruct = products_manager_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = products_manager_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = products_manager_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return products_manager_possibleConstructorReturn(this, result); }; }

function products_manager_possibleConstructorReturn(self, call) { if (call && (products_manager_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return products_manager_assertThisInitialized(self); }

function products_manager_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function products_manager_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function products_manager_getPrototypeOf(o) { products_manager_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return products_manager_getPrototypeOf(o); }

function products_manager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Sales_Invoice = /*#__PURE__*/function (_Rapp) {
  products_manager_inherits(Sales_Invoice, _Rapp);

  var _super = products_manager_createSuper(Sales_Invoice);

  function Sales_Invoice(args) {
    var _this;

    products_manager_classCallCheck(this, Sales_Invoice);

    _this = _super.call(this, args);

    products_manager_defineProperty(products_manager_assertThisInitialized(_this), "run", function (props) {});

    products_manager_defineProperty(products_manager_assertThisInitialized(_this), "states", function (props) {});

    products_manager_defineProperty(products_manager_assertThisInitialized(_this), "actions", function (props) {});

    products_manager_defineProperty(products_manager_assertThisInitialized(_this), "draw", function (props) {
      this.dom('main', function () {
        return "<section>\n                    <h1 class='subtitle-section'>Invoices Management</h1>\n                    <div id='Invoicing'></div>\n                    <h1 class='subtitle-section'>Clients Management</h1>\n                    <div id='Clients'></div>\n                </section>";
      });
    });

    _this.add_comp('Invoicing', Invoicing);

    _this.add_comp('Clients', Clients);

    return _this;
  }

  return Sales_Invoice;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/routes/index.js




var Routes = {
  dashboard: {
    name: 'dashboard',
    caption: 'Dashboard',
    component: Dashboard,
    bbox: 'Body-content'
  },
  users: {
    name: 'users',
    caption: 'Users',
    component: Users,
    bbox: 'Body-content'
  },
  products: {
    name: 'products',
    caption: 'Products',
    component: Products,
    bbox: 'Body-content'
  },
  sales: {
    name: 'sales',
    caption: 'Sales',
    component: Sales_Invoice,
    bbox: 'Body-content'
  }
};
/* harmony default export */ const routes = (Routes);
;// CONCATENATED MODULE: ./src/app/components/login/index.js
function login_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { login_typeof = function _typeof(obj) { return typeof obj; }; } else { login_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return login_typeof(obj); }

function login_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = login_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || login_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function login_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return login_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return login_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return login_arrayLikeToArray(arr); }

function login_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function login_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function login_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) login_setPrototypeOf(subClass, superClass); }

function login_setPrototypeOf(o, p) { login_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return login_setPrototypeOf(o, p); }

function login_createSuper(Derived) { var hasNativeReflectConstruct = login_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = login_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = login_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return login_possibleConstructorReturn(this, result); }; }

function login_possibleConstructorReturn(self, call) { if (call && (login_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return login_assertThisInitialized(self); }

function login_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function login_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function login_getPrototypeOf(o) { login_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return login_getPrototypeOf(o); }

function login_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Login = /*#__PURE__*/function (_Rapp) {
  login_inherits(Login, _Rapp);

  var _super = login_createSuper(Login);

  function Login(_args) {
    var _this;

    login_classCallCheck(this, Login);

    _this = _super.call(this, _args);

    login_defineProperty(login_assertThisInitialized(_this), "run", function (props) {// THIS METHOD RUN WHEN THE RENDER FINISH
    });

    login_defineProperty(login_assertThisInitialized(_this), "states", function (props) {
      this.state('email', '');
      this.state('pass', '');
      this.state('messages', []);
      this.state('response_toggle', 'hide');
      this.state('button_active', '');
      this.state('button_label', 'Login');
    });

    login_defineProperty(login_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('input_email', function (args) {
        _this2.state('email', args.target.value);
      });
      this.action('input_pass', function (args) {
        _this2.state('pass', args.target.value);
      });
      this.action('add_message', function (args) {
        var message = {
          message: args
        };

        _this2.state('messages', [].concat(_toConsumableArray(_this2.state('messages')), [message]));
      });
      this.action('clear_messages', function () {
        _this2.state('messages', []);
      });
      this.action('login-submit', function () {
        _this2.call_action('clear_messages');

        _this2.call_action('submit_checker');

        if (_this2.state('messages').length > 0) return;
      });
      this.action('submit_checker', function () {
        _this2.state('button_active', 'disabled');

        _this2.state('button_label', 'Waiting response...');

        _this2.state('response_toggle', 'hide');

        var username = _this2.state('email');

        var pass = _this2.state('pass');

        if (username.trim() === '') _this2.call_action('add_message', 'Write your E-mail, please and try again.');else {
          var email_check = username.match(/([\w|0-9|\W])+@([\w|\W])+[.]([\w])+([.]+[\w])?/g);
          if (!email_check) _this2.call_action('add_message', 'Your E-mail does not have the correct format');
          if (email_check) if (email_check.length === 0) _this2.call_action('add_message', 'Your E-mail does not have the correct format');
        }
        if (pass.trim() === '') _this2.call_action('add_message', 'Write your password, please and try again.');

        if (_this2.state('messages').length > 0) {
          _this2.render({
            dom: 'messages',
            bbox: "".concat(_this2._name, "-messages-bbox")
          });

          _this2.state('response_toggle', 'show');

          _this2.state('button_active', '');

          _this2.state('button_label', 'Login');

          return;
        }

        MyAPI.login({
          email: username,
          password: md5_min(pass)
        }, function (resp) {
          _this2.state('button_active', '');

          _this2.state('button_label', 'Login');

          if (!resp.error) {
            var _iterator = login_createForOfIteratorHelper(resp.log),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var m = _step.value;

                _this2.call_action('add_message', m);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            if (_this2.state('messages').length > 0) {
              _this2.render({
                dom: 'messages',
                bbox: "".concat(_this2._name, "-messages-bbox")
              });

              _this2.state('response_toggle', 'show');
            } else {
              _this2._parent.call_action('show_intro');

              if (_this2._props.Session) _this2._parent.get_comp(props.Session).call_action('check_session');
            }
          }
        });
      });
    });

    login_defineProperty(login_assertThisInitialized(_this), "draw", function (props) {
      var _this3 = this;

      this._dom.style = "<style>\n            .".concat(this._name, "-login-bbox-hide\n            {\n                display: none;\n            }\n            .").concat(this._name, "-login-bbox-show\n            {\n                display: block;\n            }\n            .").concat(this._name, "-login-response-hide\n            {\n                display: none;\n            }\n            .").concat(this._name, "-login-response-show\n            {\n                display: block;\n            }\n        </style>");
      this.dom('messages', function () {
        var buffer = _this3.state('messages');

        var message = "";

        var _iterator2 = login_createForOfIteratorHelper(buffer),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var m = _step2.value;
            message += "<li>".concat(m.message, "</li>");
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return message;
      });
      this.dom('main', function () {
        return "<section class='login-bbox'>\n                    <div>\n                        <div>\n                            <img src='assets/images/logo.svg' />\n                        </div>\n                        <p>Technologic Shop</p>\n                    </div>\n                    <form onsubmit='login-submit'>\n                        <p>Write your user data to Sign In.</p>\n                        <div class='".concat(_this3._name, "-login-response-[state:response_toggle] error-messages'>\n                            <ul id='").concat(_this3._name, "-messages-bbox'></ul>\n                        </div>\n                        <p>E-mail</p>\n                        <div><input type='text' value='[state:email]' onchange='input_email' /></div>\n                        <p>Password</p>\n                        <div><input type='password' value='[state:pass]' onchange='input_pass' /></div>\n                        <div>\n                            <input type='submit' value='[state:button_label]' [state:button_active] />\n                        </div>\n                    </form>\n                </section>");
      });
    });

    return _this;
  }

  return Login;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/components/session/index.js
function session_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { session_typeof = function _typeof(obj) { return typeof obj; }; } else { session_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return session_typeof(obj); }

function session_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function session_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) session_setPrototypeOf(subClass, superClass); }

function session_setPrototypeOf(o, p) { session_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return session_setPrototypeOf(o, p); }

function session_createSuper(Derived) { var hasNativeReflectConstruct = session_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = session_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = session_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return session_possibleConstructorReturn(this, result); }; }

function session_possibleConstructorReturn(self, call) { if (call && (session_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return session_assertThisInitialized(self); }

function session_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function session_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function session_getPrototypeOf(o) { session_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return session_getPrototypeOf(o); }

function session_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Session = /*#__PURE__*/function (_Rapp) {
  session_inherits(Session, _Rapp);

  var _super = session_createSuper(Session);

  function Session(_args) {
    var _this;

    session_classCallCheck(this, Session);

    _this = _super.call(this, _args);

    session_defineProperty(session_assertThisInitialized(_this), "run", function (props) {
      // THIS METHOD RUN WHEN THE RENDER FINISH
      this.call_action('check_session');
    });

    session_defineProperty(session_assertThisInitialized(_this), "states", function (props) {
      this.state('user_data', {});
    });

    session_defineProperty(session_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('check_session', function () {
        MyAPI.check_session(function (res) {
          _this2.call_action('set_session', res);
        });
      });
      this.action('set_session', function (args) {
        var logged = false;

        if (args) {
          if (args.user) {
            logged = args.user.logged;

            _this2.state('user_data', args.user);
          }
        }

        if (props.response) _this2._parent.call_action(props.response, logged);
      });
    });

    session_defineProperty(session_assertThisInitialized(_this), "draw", function (props) {
      this.dom('main', function () {
        return "<section></section>";
      });
    });

    return _this;
  }

  return Session;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/view/header/index.js
function header_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { header_typeof = function _typeof(obj) { return typeof obj; }; } else { header_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return header_typeof(obj); }

function header_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function header_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) header_setPrototypeOf(subClass, superClass); }

function header_setPrototypeOf(o, p) { header_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return header_setPrototypeOf(o, p); }

function header_createSuper(Derived) { var hasNativeReflectConstruct = header_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = header_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = header_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return header_possibleConstructorReturn(this, result); }; }

function header_possibleConstructorReturn(self, call) { if (call && (header_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return header_assertThisInitialized(self); }

function header_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function header_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function header_getPrototypeOf(o) { header_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return header_getPrototypeOf(o); }

function header_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Header = /*#__PURE__*/function (_Rapp) {
  header_inherits(Header, _Rapp);

  var _super = header_createSuper(Header);

  function Header(args) {
    var _this;

    header_classCallCheck(this, Header);

    _this = _super.call(this, args);

    header_defineProperty(header_assertThisInitialized(_this), "run", function (props) {// THIS METHOD RUN WHEN THE RENDER FINISH
    });

    header_defineProperty(header_assertThisInitialized(_this), "states", function (props) {});

    header_defineProperty(header_assertThisInitialized(_this), "actions", function (props) {});

    header_defineProperty(header_assertThisInitialized(_this), "draw", function (props) {
      //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;
      this.dom('main', function () {
        return "<section class='dflex dflex-wrap justifyc-center'>\n                    <img src='assets/images/logo.svg' class='header-logo' />\n                </section>";
      });
    });

    return _this;
  }

  return Header;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/view/body/index.js
function body_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { body_typeof = function _typeof(obj) { return typeof obj; }; } else { body_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return body_typeof(obj); }

function body_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function body_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) body_setPrototypeOf(subClass, superClass); }

function body_setPrototypeOf(o, p) { body_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return body_setPrototypeOf(o, p); }

function body_createSuper(Derived) { var hasNativeReflectConstruct = body_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = body_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = body_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return body_possibleConstructorReturn(this, result); }; }

function body_possibleConstructorReturn(self, call) { if (call && (body_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return body_assertThisInitialized(self); }

function body_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function body_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function body_getPrototypeOf(o) { body_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return body_getPrototypeOf(o); }

function body_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Body = /*#__PURE__*/function (_Rapp) {
  body_inherits(Body, _Rapp);

  var _super = body_createSuper(Body);

  function Body(_args) {
    var _this;

    body_classCallCheck(this, Body);

    _this = _super.call(this, _args);

    body_defineProperty(body_assertThisInitialized(_this), "run", function (props) {// THIS METHOD RUN WHEN THE RENDER FINISH
    });

    body_defineProperty(body_assertThisInitialized(_this), "states", function (props) {
      this.state('title', '');
    });

    body_defineProperty(body_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('set_title', function (args) {
        _this2.state('title', args);
      });
    });

    body_defineProperty(body_assertThisInitialized(_this), "draw", function (props) {
      this.dom('main', function () {
        return "<section>\n                    <h1 class='title'>[state:title]</h1>\n                    <div class='content-bbox'>\n                        <section id='Body-content'></section>\n                    </div>\n                </section>";
      });
    });

    return _this;
  }

  return Body;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/view/main_menu/index.js
function main_menu_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { main_menu_typeof = function _typeof(obj) { return typeof obj; }; } else { main_menu_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return main_menu_typeof(obj); }

function main_menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function main_menu_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) main_menu_setPrototypeOf(subClass, superClass); }

function main_menu_setPrototypeOf(o, p) { main_menu_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return main_menu_setPrototypeOf(o, p); }

function main_menu_createSuper(Derived) { var hasNativeReflectConstruct = main_menu_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = main_menu_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = main_menu_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return main_menu_possibleConstructorReturn(this, result); }; }

function main_menu_possibleConstructorReturn(self, call) { if (call && (main_menu_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return main_menu_assertThisInitialized(self); }

function main_menu_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function main_menu_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function main_menu_getPrototypeOf(o) { main_menu_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return main_menu_getPrototypeOf(o); }

function main_menu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Main_menu = /*#__PURE__*/function (_Rapp) {
  main_menu_inherits(Main_menu, _Rapp);

  var _super = main_menu_createSuper(Main_menu);

  function Main_menu(args) {
    var _this;

    main_menu_classCallCheck(this, Main_menu);

    _this = _super.call(this, args);

    main_menu_defineProperty(main_menu_assertThisInitialized(_this), "run", function (props) {
      // THIS METHOD RUN WHEN THE RENDER FINISH
      var session_comp = this.looking_comp("".concat(this._main._name, "/Session"));

      if (session_comp) {
        this.state('first_name', session_comp.state('user_data').first_name);
        this.state('last_name', session_comp.state('user_data').last_name);
        this.state('email', session_comp.state('user_data').email);
      }
    });

    main_menu_defineProperty(main_menu_assertThisInitialized(_this), "states", function (props) {
      this.state('first_name', 'unknow');
      this.state('last_name', 'unknow');
      this.state('email', 'unknow');
    });

    main_menu_defineProperty(main_menu_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('dashboard', function () {
        _this2.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Dashboard');

        _this2.nav('/dashboard');

        _this2.call_action('toggle_menu');
      });
      this.action('products', function () {
        _this2.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Products Management');

        _this2.nav('/products');

        _this2.call_action('toggle_menu');
      });
      this.action('sales', function () {
        _this2.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Sales Management');

        _this2.nav('/sales');

        _this2.call_action('toggle_menu');
      });
      this.action('users', function () {
        _this2.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Users Management');

        _this2.nav('/users');

        _this2.call_action('toggle_menu');
      });
      this.action('settings', function () {
        _this2.looking_comp('/TEMPLATE/BODY').call_action('set_title', 'Settings');

        _this2.nav('/settings');

        _this2.call_action('toggle_menu');
      });
      this.action('toggle_menu', function () {
        var menu = _this2._parent._wrappers.ids["Main-menu"];
        menu.classList.toggle('Template-main-menu-mobile-hidden');
      });
      this.action('logout', function () {
        var session_comp = _this2.looking_comp("".concat(_this2._main._name, "/Session"));

        _this2._main.call_action('show_intro');

        MyAPI.logout({
          id: session_comp.state('id'),
          token: session_comp.state('token')
        }, function (resp) {
          session_comp.call_action('check_session');
        });
      });
    });

    main_menu_defineProperty(main_menu_assertThisInitialized(_this), "draw", function (props) {
      var _this3 = this;

      //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;
      this.dom('main', function () {
        var session_comp = _this3.looking_comp("".concat(_this3._main._name, "/Session"));

        var mobile_button = "<div class='mobile-button'>\n                <button onclick='toggle_menu'>\n                    <div></div>\n                    <div></div>\n                    <div></div>\n                </button>\n            </div>";
        var user_manager_btn = "<hr/>\n                <button onclick='users'>User Management</button>";
        return "<section>\n                    ".concat(Rapp.isMobile() ? mobile_button : '', "\n                    <div class='menu-container'>\n                        <p class='user-name'>[state:first_name] [state:last_name]</p>\n                        <p class='user-email'>[state:email]</p>\n                    </div>\n                    <div class='menu-container'>\n                        <button onclick='dashboard'>Mashups</button>\n                        <hr/>\n                        <button onclick='products'>Stock Management</button>\n                        <button onclick='sales'>Sales and Invoicing</button>\n                        ").concat(session_comp.state('user_data')['USER-TYPE'] === '0' ? user_manager_btn : '', "\n                        <hr/>\n                        <!--button onclick='settings'>Settings</button-->\n                        <button onclick='logout' class='btn-link'>Logout</button>\n                    </div>\n                </section>");
      });
    });

    return _this;
  }

  return Main_menu;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/view/templates/default/index.js
function default_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { default_typeof = function _typeof(obj) { return typeof obj; }; } else { default_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return default_typeof(obj); }

function default_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function default_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) default_setPrototypeOf(subClass, superClass); }

function default_setPrototypeOf(o, p) { default_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return default_setPrototypeOf(o, p); }

function default_createSuper(Derived) { var hasNativeReflectConstruct = default_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = default_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = default_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return default_possibleConstructorReturn(this, result); }; }

function default_possibleConstructorReturn(self, call) { if (call && (default_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return default_assertThisInitialized(self); }

function default_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function default_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function default_getPrototypeOf(o) { default_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return default_getPrototypeOf(o); }

function default_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Default = /*#__PURE__*/function (_Rapp) {
  default_inherits(Default, _Rapp);

  var _super = default_createSuper(Default);

  function Default(args) {
    var _this;

    default_classCallCheck(this, Default);

    _this = _super.call(this, args);

    default_defineProperty(default_assertThisInitialized(_this), "run", function (props) {// THIS METHOD RUN WHEN THE RENDER FINISH
      // this.call_action("nav", "/sales");
    });

    default_defineProperty(default_assertThisInitialized(_this), "states", function (props) {});

    default_defineProperty(default_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('load_default', function () {
        _this2.get_comp('BODY').call_action('set_title', 'Products Management');

        _this2.nav('/products');
      });
    });

    default_defineProperty(default_assertThisInitialized(_this), "draw", function (props) {
      this.dom("main", function () {
        return "<section>\n                        <div id='Header' classComp='header'></div>\n                        <section class='body-panel'>\n                            <div id='Main-menu' classComp='".concat(Rapp.isMobile() ? 'main-menu-mobile' : 'main-menu', "' class='").concat(Rapp.isMobile() && 'Template-main-menu-mobile-hidden', "'></div>\n                            <div id='Body' classComp='body'></div>\n                        <section>\n                    </section>");
      });
    });

    _this.add_comp("Header", Header);

    _this.add_comp("Body", Body);

    _this.add_comp("Main-menu", Main_menu);

    return _this;
  }

  return Default;
}(Rapp);


;// CONCATENATED MODULE: ./src/app/App.js
function App_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { App_typeof = function _typeof(obj) { return typeof obj; }; } else { App_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return App_typeof(obj); }

function App_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function App_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) App_setPrototypeOf(subClass, superClass); }

function App_setPrototypeOf(o, p) { App_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return App_setPrototypeOf(o, p); }

function App_createSuper(Derived) { var hasNativeReflectConstruct = App_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = App_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = App_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return App_possibleConstructorReturn(this, result); }; }

function App_possibleConstructorReturn(self, call) { if (call && (App_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return App_assertThisInitialized(self); }

function App_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function App_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function App_getPrototypeOf(o) { App_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return App_getPrototypeOf(o); }

function App_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var App = /*#__PURE__*/function (_Rapp) {
  App_inherits(App, _Rapp);

  var _super = App_createSuper(App);

  function App(_args) {
    var _this;

    App_classCallCheck(this, App);

    _this = _super.call(this, _args);

    App_defineProperty(App_assertThisInitialized(_this), "run", function (props) {
      // // THIS METHOD RUN WHEN THE RENDER FINISH
      this.call_action('show_intro');
      this.render({
        dom: 'no_logged',
        bbox: 'main-content'
      });
      this.get_comp('Session').call_action('check_session');
    });

    App_defineProperty(App_assertThisInitialized(_this), "states", function (props) {
      this.state('logged', false);
      this.state('loaded', false);
    });

    App_defineProperty(App_assertThisInitialized(_this), "actions", function (props) {
      var _this2 = this;

      this.action('show_intro', function () {
        _this2.render({
          dom: 'loading',
          bbox: 'main-loader'
        });
      });
      this.action('session_response', function (args) {
        _this2.reset('main-loader'); // if(args)
        // {


        _this2.render({
          dom: "".concat(args ? 'logged' : 'no_logged'),
          bbox: 'main-content'
        }); // }


        _this2.state('loaded', true);

        _this2.state('logged', args);

        if (args) {
          _this2.get_comp('TEMPLATE').call_action('load_default');
        }
      });
    });

    App_defineProperty(App_assertThisInitialized(_this), "draw", function (props) {
      this.dom('loading', function () {
        return "<div class='loading-lbox'>\n                    <div>\n                        <div><img src='./assets/images/logo.svg' class='intro-logo' /></div>\n                        <div><img src='./assets/preloaders/points.gif' /></div>\n                    </div>\n                </div>";
      });
      this.dom('no_logged', function () {
        return "<section id='Login'></section>";
      });
      this.dom('logged', function () {
        return "<section id='Template'></section>";
      });

      this._dom.main = function () {
        return "<section>\n                    <div id='Session'></div>\n                    <div id='main-content' class='main-content'></div>\n                    <div id='main-loader'></div>\n                </section>";
      };

      this._dom.style = "\n            @font-face {\n                font-family: 'aaarghnormal';\n                src: url('assets/fonts/aaargh-webfont.woff2') format('woff2'),\n                    url('assets/fonts/aaargh-webfont.woff') format('woff');\n                font-weight: normal;\n                font-style: normal;\n            }\n            @font-face {\n                font-family: 'abelregular';\n                src: url('assets/fonts/abel-regular-webfont.woff2') format('woff2'),\n                    url('assets/fonts/abel-regular-webfont.woff') format('woff');\n                font-weight: normal;\n                font-style: normal;\n            }\n            button{font-size: 14px;}\n            .intro-logo\n            {\n                height: 50px;\n            }\n            ".concat(Rapp.isMobile() && '.title{  text-align: center;  }');
    });

    MyAPI.headers = false;
    _this._router = New_router({
      container: App_assertThisInitialized(_this)
    });

    _this._router.add(routes.dashboard, App_assertThisInitialized(_this));

    _this._router.add(routes.users, App_assertThisInitialized(_this));

    _this._router.add(routes.products, App_assertThisInitialized(_this));

    _this._router.add(routes.sales, App_assertThisInitialized(_this));

    _this.add_comp('Session', Session, {
      props: {
        response: 'session_response'
      }
    });

    _this.add_comp('Login', Login, {
      css: 'components/login/main.css',
      props: {
        response: 'session_response',
        Session: 'Session'
      }
    });

    _this.add_comp('Template', Default, {
      css: 'view/templates/default/main.css',
      props: {
        Session: 'Session'
      }
    });

    return _this;
  }

  return App;
}(Rapp);


;// CONCATENATED MODULE: ./src/main.js


window.onload = function () {
  new App({
    name: 'Main',
    bbox: document.getElementById('root')
  }).start().render().title('CTI Ecom');
};
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

/******/ })()
;