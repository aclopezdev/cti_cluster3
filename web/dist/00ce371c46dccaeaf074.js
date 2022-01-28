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

export { Rapp as default };
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