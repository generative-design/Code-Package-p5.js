/**
 * @module QuickSettings
 */
(function() {

    ////////////////////////////////////////////////////////////////////////////////
    // region PRIVATE GENERIC UTILS
    ////////////////////////////////////////////////////////////////////////////////


    function createLabel(title, container) {
        var label = createElement("div", null, "qs_label", container);
        label.innerHTML = title;
        return label;
    }

    function createInput(type, id, className, parent) {
        var input = createElement("input", id, className, parent);
        input.type = type;
        return input;
    }

    function createElement(type, id, className, parent) {
        var element = document.createElement(type);
        if(!element) return;
        element.id = id;
        if(className) {
            element.className = className;
        }
        if(parent) {
            parent.appendChild(element);
        }
        return element;
    }

    function isIE() {
        if(navigator.userAgent.indexOf("rv:11") != -1) {
            return true;
        }
        if(navigator.userAgent.indexOf("MSIE") != -1) {
            return true;
        }
        return false;
    }

    function isSafari() {
        var userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.indexOf("chrome") > -1 ||
            userAgent.indexOf("firefox") > -1 ||
            userAgent.indexOf("epiphany") > -1) {
            return false;
        }
        if(userAgent.indexOf('safari/') > -1) {
            return true;
        }
        return false;
    }

    function isEdge() {
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.indexOf("edge") > -1;
    }
    // endregion



    ////////////////////////////////////////////////////////////////////////////////
	// region PRIVATE/STATIC DATA AND FUNCTIONS
	////////////////////////////////////////////////////////////////////////////////
	var cssInjected = false,
		css = ".qs_main{background-color:#ffffff;text-align:left;position:absolute;width:160px;font:10px sans-serif;box-shadow:none;user-select:none;-webkit-user-select:none;color:#333333;border:1px solid #cccccc}.qs_content{background-color:#ffffff;overflow-y:auto}.qs_title_bar{background-color:#ffffff;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:bold;border:none;color:#333333}.qs_container{margin:2px;padding:2px;background-color:#ffffff;border:1px solid #cccccc;position:relative}.qs_container_selected{border:1px solid #666666;background-color:#ffffff}.qs_range{-webkit-appearance:none;-moz-appearance:none;width:100%;height:14px;padding:0;margin:0;background-color:transparent;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:none;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:12px;cursor:pointer;background:#eeeeee;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#eeeeee}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:12px;width:12px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#aaaaaa;cursor:pointer;margin-top:0}.qs_range::-moz-range-track{width:100%;height:12px;cursor:pointer;background:#eeeeee;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-moz-range-thumb{height:12px;width:12px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#aaaaaa;cursor:pointer}.qs_range::-ms-track{width:100%;height:12px;cursor:pointer;visibility:hidden;background:transparent}.qs_range::-ms-thumb{height:12px;width:12px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#aaaaaa;cursor:pointer;border:none}.qs_range::-ms-fill-lower{background:#eeeeee;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#eeeeee}.qs_range::-ms-fill-upper{background:#eeeeee;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#eeeeee}.qs_button{background-color:#ffffff;color:#333333;height:20px;border:1px solid #cccccc;font:10px sans-serif}.qs_button:active{background-color:#cccccc;border:1px solid #cccccc}.qs_button:focus{border:1px solid #cccccc;outline:none}.qs_checkbox{cursor:pointer;display:inline}.qs_checkbox input{position:absolute;left:-99999px}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2OcOXPmfwYKACPIgLS0NLKMmDVrFsOoAaNhMJoOGBioFwZkZUWoJgApdFaxjUM1YwAAAABJRU5ErkJggg==') no-repeat}.qs_checkbox input:checked+span{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4T63Tyw2EIBAA0OFKBxBL40wDRovAUACcKc1IB1zZDAkG18GYZTmSmafzgTnnMgwchoDWGlJKheGcP3JtnPceCqCUAmttSZznuYtgchsXQrgC+77DNE0kUpPbmBOoJaBOIVQylnqWgAAeKhDve/AN+EaklJBzhhgjWRoJVGTbNjiOowAIret6a+4jYIwpX8aDwLIs74C2D0IIYIyVP6Gm898m9kbVm85ljHUTf16k4VUefkwDrxk+zoUEwCt0GbUAAAAASUVORK5CYII=') no-repeat}.qs_checkbox_label{position:absolute;top:5px;left:24px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:10px sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:18px;border:none;background-color:#eeeeee;color:#333333;font-size:10px}.qs_text_input:focus{outline:none;background:#eeeeee;border:none}.qs_select{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAApklEQVRIS+2UwQ2AIAxF2wEYgguMAaPDGHBhCAbAlMQEjbYkxls5wrcPXhtxjDHgx4UKkOyqIskQqKLvinrvYIx5LMSdnR+wPSilQM4ZQgjgvb9AuLM1yAJSSlBrnfkVchanfeccxBhfVYlTdIdQJXrVTnHKiAAKrRD6+SKiePOtHqzvJkhrbW5Za1kt2z24i6WpofU2VU+N2FIkDjsTUIBoTxWJig7pMJi50zaHaQAAAABJRU5ErkJggg==') no-repeat right #ffffff;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#333333;width:100%;height:18px;border:1px solid #cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none;font-size:12px}.qs_select option{font-size:12px}.qs_select::-ms-expand{display:none}.qs_select:focus{outline:none}.qs_number{height:18px}.qs_image{width:100%}.qs_progress{width:100%;height:12px;background-color:#eeeeee;border:1px solid #cccccc;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#aaaaaa}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:none;background-color:#eeeeee;color:#333333;font-size:10px}.qs_textarea:focus{outline:none;background:#eeeeee;border:none}.qs_color{position:absolute;left:-999999px}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #cccccc;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_file_chooser{position:absolute;left:-999999px}.qs_file_chooser_label{background-color:#ffffff;color:#333333;height:20px;border:1px solid #cccccc;font:10px sans-serif;width:100%;display:block;cursor:pointer;padding:3px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"; // will be injected with default css

	function injectCSS() {
		var styleTag = document.createElement("style");
		styleTag.innerText = css;
		document.head.appendChild(styleTag);
		cssInjected = true;
	}
	// endregion


	/**
	 *
	 * @alias module:QuickSettings
	 * @lends module:QuickSettings.prototype
	 */
	var QuickSettings = {
		_version: "3.0.2",
		_topZ: 1,

		_panel: null,
		_titleBar: null,
		_content: null,
		_startX: 0,
		_startY: 0,
		_hidden: false,
		_collapsed: false,
		_controls: null,
		_keyCode: -1,
		_draggable: true,
		_collapsible: true,
		_globalChangeHandler: null,

		////////////////////////////////////////////////////////////////////////////////
		// region GENERAL INIT FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Static method. Causes QuickSettings to ignore its default styles and instead use whatever QuickSettings stylesheet is on the page. This must be called before creating any panel in order to have any effect.
		 * @static
		 */
		useExtStyleSheet: function() {
			cssInjected = true;
		},

		/**
		 * Static method. Creates a new QuickSettings Panel
		 * @param x            {Number}        x position of panel (default 0)
		 * @param y            {Number}        y position of panel (default 0)
		 * @param title        {String}        title of panel (default "QuickSettings")
		 * @param parent    {HTMLElement}    parent element (default document.body)
		 * @returns {module:QuickSettings}    New QuickSettings Panel
		 * @static
		 */
		create: function(x, y, title, parent) {
			var obj = Object.create(this);
			obj._init(x, y, title, parent);
			return obj;
		},

		/**
		 * Destroys the panel, removing it from the document and nulling all properties.
		 */
		destroy: function() {
			if(this._panel.parentElement) {
				this._panel.parentElement.removeChild(this._panel);
			}
			for(var prop in this) {
				this[prop] = null;
			}
		},

		_init: function(x, y, title, parent) {
			if(!cssInjected) {
				injectCSS();
			}
			this._bindHandlers();
			this._createPanel(x, y, parent);
			this._createTitleBar(title || "QuickSettings");
			this._createContent();

		},

		_bindHandlers: function() {
			this._startDrag = this._startDrag.bind(this);
			this._drag = this._drag.bind(this);
			this._endDrag = this._endDrag.bind(this);
			this._doubleClickTitle = this._doubleClickTitle.bind(this);
			this._onKeyUp = this._onKeyUp.bind(this);
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region VALUE FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Returns an object containing the titles and values of all user-interactive controls in this panel.
		 * @param asString    {Boolean}    If true, returns a JSON formatted string of these values.
		 * @returns        {Object}    An object or string containing the titles and values fo all user-interactive controls in this panel.
		 */
		getValuesAsJSON: function(asString) {
			var json = {};
			for(var title in this._controls) {
                if(this._controls[title].getValue) {
                    json[title] = this._controls[title].getValue();
                }
			}
			if(asString) {
				json = JSON.stringify(json);
			}
			return json;
		},

        /**
         * Sets values of any controls from a JSON object or string. The JSON is one large object with title: value elements for each control you want to set.
         * @param json {Object} A string or JS object containing the titles and values to set.
         * @returns {module:QuickSettings}
         */
        setValuesFromJSON:  function(json) {
            if(typeof json === "string") {
                json = JSON.parse(json);
            }
            for(var title in json) {
                if(this._controls[title] && this._controls[title].setValue) {
                    this._controls[title].setValue(json[title]);
                }
            }
            return this;
        },

        /**
         * Sets up the panel to save all of its values to local storage. This will also immediately try to read in any saved values from local storage, if they exist.
         * So the method should be called after all controls are created on the panel.
         * @param name {String} A unique name to store the values under in localStorage.
         * @return {model:QuickSettings}
         */
        saveInLocalStorage: function(name) {
            this._localStorageName = name;
            this._readFromLocalStorage(name);
            return this;
        },

        /**
         * Clears any saved values in local storage.
         * @param name {String} The unique name in localStorage to clear.
         * @return {module:QuickSettings}
         */
        clearLocalStorage: function(name) {
            localStorage.removeItem(name);
            return this;
        },

        _saveInLocalStorage: function(name) {
            localStorage.setItem(name, this.getValuesAsJSON(true));
        },

        _readFromLocalStorage: function(name) {
            var str = localStorage.getItem(name);
            if(str) {
                this.setValuesFromJSON(str);
            }
        },
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region CREATION FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		_createPanel: function(x, y, parent) {
			this._panel = createElement("div", null, "qs_main", parent || document.body);
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this.setPosition(x || 0, y || 0);
			this._controls = {};
		},

		_createTitleBar: function(text) {
			this._titleBar = createElement("div", null, "qs_title_bar", this._panel);
			this._titleBar.textContent = text;

			this._titleBar.addEventListener("mousedown", this._startDrag);
			this._titleBar.addEventListener("dblclick", this._doubleClickTitle);

		},

		_createContent: function() {
			this._content = createElement("div", null, "qs_content", this._panel);
		},

		_createContainer: function() {
			var container = createElement("div", null, "qs_container");
			container.addEventListener("focus", function() {
				this.className += " qs_container_selected";
			}, true);
			container.addEventListener("blur", function() {
				var index = this.className.indexOf(" qs_container_selected");
				if(index > -1) {
					this.className = this.className.substr(0, index);
				}
			}, true);
			this._content.appendChild(container);
			return container;
		},

        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region SIZE AND POSITION FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Positions the panel at the given location.
		 * @param x    {Number} The x position.
		 * @param y    {Number} The y position.
		 * @returns {module:QuickSettings}
		 */
		setPosition: function(x, y) {
			this._panel.style.left = x + "px";
			this._panel.style.top = Math.max(y, 0) + "px";
			return this;
		},

		/**
		 * Sets the size of the panel.
		 * @param w    {Number} The width of the panel.
		 * @param h    {Number} The height of the panel.
		 * @returns {module:QuickSettings}
		 */
		setSize: function(w, h) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
			this._content.style.height = (h - this._titleBar.offsetHeight) + "px";
			return this;
		},

		/**
		 * Sets the width of the panel.
		 * @param w    {Number} The width of the panel.
		 * @returns {module:QuickSettings}
		 */
		setWidth: function(w) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
			return this;
		},

		/**
		 * Sets the height of the panel.
		 * @param h    {Number} The height of the panel.
		 * @returns {module:QuickSettings}
		 */
		setHeight: function(h) {
			this._content.style.height = (h - this._titleBar.offsetHeight) + "px";
			return this;
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region DRAG AND DROP FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Sets whether or not the panel can be dragged.
		 * @param draggable {Boolean} Whether or not the panel can be dragged.
		 * @returns {module:QuickSettings}
		 */
		setDraggable: function(draggable) {
			this._draggable = draggable;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
			return this;
		},

		_startDrag: function(event) {
			if(this._draggable) {
				this._panel.style.zIndex = ++QuickSettings._topZ;
				document.addEventListener("mousemove", this._drag);
				document.addEventListener("mouseup", this._endDrag);
				this._startX = event.clientX;
				this._startY = event.clientY;
			}
			event.preventDefault();
		},

		_drag: function(event) {
			var x = parseInt(this._panel.style.left),
				y = parseInt(this._panel.style.top),
				mouseX = event.clientX,
				mouseY = event.clientY;

			this.setPosition(x + mouseX - this._startX, y + mouseY - this._startY);
			this._startX = mouseX;
			this._startY = mouseY;
			event.preventDefault();
		},

		_endDrag: function(event) {
			document.removeEventListener("mousemove", this._drag);
			document.removeEventListener("mouseup", this._endDrag);
			event.preventDefault();
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region CHANGE HANDLER FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Sets a function that will be called whenever any value in the panel is changed.
		 * @param handler {Function}
		 * @returns {module:QuickSettings}
		 */
		setGlobalChangeHandler: function(handler) {
			this._globalChangeHandler = handler;
			return this;
		},

		_callGCH: function(title) {
            if(this._localStorageName) {
                this._saveInLocalStorage(this._localStorageName);
            }
			if(this._globalChangeHandler) {
				this._globalChangeHandler(title);
			}
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region VISIBILITY FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Hides the panel.
		 * @returns {module:QuickSettings}
		 */
		hide: function() {
			this._panel.style.visibility = "hidden";
			this._hidden = true;
			return this;
		},

		/**
		 * Shows the panel.
		 * @returns {module:QuickSettings}
		 */
		show: function() {
			this._panel.style.visibility = "visible";
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this._hidden = false;
			return this;
		},

		/**
		 * Toggles the panel from hidden to visible and back.
		 * @returns {module:QuickSettings}
		 */
		toggleVisibility: function() {
			if(this._hidden) {
				this.show();
			}
			else {
				this.hide();
			}
			return this;
		},

		/**
		 * Sets whether or not the panel will collapse and expand when the title is double clicked.
		 * @param collapsible {Boolean} Wheter or not the panel can collapse and expand.
		 * @returns {module:QuickSettings}
		 */
		setCollapsible: function(collapsible) {
			this._collapsible = collapsible;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
			return this;
		},

		/**
		 * Collapses the panel showing only the title bar.
		 * @returns {module:QuickSettings}
		 */
		collapse: function() {
			this._panel.removeChild(this._content);
			this._collapsed = true;
			return this;
		},

		/**
		 * If panel is collapsed, re-expands it.
		 * @returns {module:QuickSettings}
		 */
		expand: function() {
			this._panel.appendChild(this._content);
			this._collapsed = false;
			return this;
		},

		/**
		 * Toggles the panel back and forth between collapsed and expanded states.
		 * @returns {module:QuickSettings}
		 */
		toggleCollapsed: function() {
			if(this._collapsed) {
				this.expand();
			}
			else {
				this.collapse();
			}
			return this;
		},

		/**
		 * Sets a key that, when pressed, will show and hide the panel.
		 * @param char
		 * @returns {module:QuickSettings}
		 */
		setKey: function(char) {
			this._keyCode = char.toUpperCase().charCodeAt(0);
			document.addEventListener("keyup", this._onKeyUp);
			return this;
		},

		_onKeyUp: function(event) {
			if(event.keyCode === this._keyCode) {
				if (["INPUT", "SELECT", "TEXTAREA"].indexOf(event.target.tagName) < 0) {
					this.toggleVisibility();
				}
			}
		},

		_doubleClickTitle: function() {
			if(this._collapsible) {
				this.toggleCollapsed();
			}
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region CONTROL FUNCTIONS
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Removes a given control from the panel.
		 * @param title {String} The title of the control to remove.
		 * @returns {module:QuickSettings}
		 */
		removeControl: function(title) {
			if(this._controls[title]){
				var container = this._controls[title].container;
			}
			if(container && container.parentElement) {
				container.parentElement.removeChild(container);
			}
			this._controls[title] = null;
			return this;
		},

		/**
		 * Enables the given control.
		 * @param title {String} The title of the control to enable.
		 * @returns {module:QuickSettings}
		 */
		enableControl: function(title) {
			if(this._controls[title]) {
				this._controls[title].control.disabled = false;
			}
			return this;
		},

		/**
		 * Disables the given control.
		 * @param title {String} The title of the control to disable.
		 * @returns {module:QuickSettings}
		 */
		disableControl: function(title) {
			if(this._controls[title]) {
				this._controls[title].control.disabled = true;
			}
			return this;
		},

		/**
		 * Hides the given control.
		 * @param title {String} The title of the control to hide.
		 * @returns {module:QuickSettings}
		 */
		hideControl: function(title) {
			if(this._controls[title]) {
				this._controls[title].container.style.display = "none";
			}
			return this;
		},

		/**
		 * Shows the given control.
		 * @param title {String} The title of the control to show.
		 * @returns {module:QuickSettings}
		 */
		showControl: function(title) {
			if(this._controls[title]) {
				this._controls[title].container.style.display = "block";
			}
			return this;
		},

		/**
		 * Changes a specific style on the given component.
		 * @param title {String} The title of the control.
		 * @param style {String} The name of the style.
		 * @param value {Various} The new value of the style.
		 * @returns {module:QuickSettings}
		 */
		overrideStyle: function(title, style, value) {
			if(this._controls[title]) {
				this._controls[title].control.style[style] = value;
			}
			return this;
		},

		/**
		 * Hides the title label of a given control.
		 * @param title {String} The title of the control.
		 * @returns {module:QuickSettings}
		 */
		hideTitle: function(title) {
			var label = this._controls[title].label;
			if(label) {
				label.style.display = "none";
			}
			return this;
		},

		/**
		 * Shows the title label of a given control.
		 * @param title {String} The title of the control.
		 * @returns {module:QuickSettings}
		 */
		showTitle: function(title) {
			var label = this._controls[title].label;
			if(label) {
				label.style.display = "block";
			}
			return this;
		},

		/**
		 * Hides the title labels of all controls.
		 * @returns {module:QuickSettings}
		 */
		hideAllTitles: function() {
			for(var title in this._controls) {
				var label = this._controls[title].label;
				if(label) {
					label.style.display = "none";
				}
			}
			return this;
		},

		/**
		 * Shows the title labels of all controls. Button and booleans have no title labels.
		 * @returns {module:QuickSettings}
		 */
		showAllTitles: function() {
			for(var title in this._controls) {
				var label = this._controls[title].label;
				if(label) {
					label.style.display = "block";
				}
			}
			return this;
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region GET/SET VALUES
		////////////////////////////////////////////////////////////////////////////////

		getValue: function(title) {
			return this._controls[title].getValue();
		},

		setValue: function(title, value) {
			this._controls[title].setValue(value);
			this._callGCH(title);
			return this;
		},
        // endregion

        //==========================================================================================
		//==========================================================================================
		// CONTROL CREATION AND MANAGEMENT FUNCTIONS
		//==========================================================================================
		//==========================================================================================

		////////////////////////////////////////////////////////////////////////////////
		// region BOOLEAN
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a checkbox to the panel.
		 * @param title {String} The title of this control.
		 * @param value {Boolean} The initial value of this control.
		 * @param [callback] {Function} A callback function that will be called when the value of this control changes.
		 * @returns {module:QuickSettings}
		 */
		addBoolean: function(title, value, callback) {
			var container = this._createContainer();

			var label = createElement("label", null, "qs_checkbox_label", container);
			label.textContent = title;
			label.setAttribute("for", title);

			var checkbox = createElement("label", null, "qs_checkbox", container);
			checkbox.setAttribute("for", title);

			var input = createInput("checkbox", title, null, checkbox);
			input.checked = value;

			var span = createElement("span", null, null, checkbox);

			this._controls[title] = {
				container: container,
				control: input,
				getValue: function() {
					return this.control.checked;
				},
				setValue: function(value) {
					this.control.checked = value;
					if(callback) {
						callback(value);
					}
				},
			};

			var self = this;
			input.addEventListener("change", function() {
				if(callback) {
					callback(input.checked);
				}
				self._callGCH(title);
			});
			return this;
		},

		/**
		 * Adds a checkbox to the panel, bound to an object
		 * @param title {String} The title of this control.
		 * @param value {Boolean} The initial value of this control.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindBoolean: function(title, value, object) {
			return this.addBoolean(title, value, function(value) {
				object[title] = value;
			});
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region BUTTON
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a button to the panel.
		 * @param title {String} The title of the control.
		 * @param [callback] {Function} Callback function to be called when the button is clicked.
		 * @returns {module:QuickSettings}
		 */
		addButton: function(title, callback) {
			var container = this._createContainer();

			var button = createInput("button", title, "qs_button", container);
			button.value = title;

			this._controls[title] = {
				container: container,
				control: button
			}

			var self = this;
			button.addEventListener("click", function() {
				if(callback) {
					callback(button);
				}
				self._callGCH(title);
			});
			return this;
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region COLOR
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a color picker control. In some browsers this will just render as a text input field, but should still retain all other functionality.
		 * @param title {String} The title of this control.
		 * @param color {String} The initial color value for this control.
		 * @param [callback] {Function} Callback that will be called when the value of this control changes.
		 * @returns {module:QuickSettings}
		 */
		addColor: function(title, color, callback) {
			if(isSafari() || isEdge() || isIE()) {
				return this.addText(title, color, callback);
			}
			var container = this._createContainer();
			var label = createLabel("<b>" + title + ":</b> " + color, container);

			var colorInput = createInput("color", title, "qs_color", container);
			colorInput.value = color || "#ff0000";

			var colorLabel = createElement("label", null, "qs_color_label", container);
			colorLabel.setAttribute("for", title);
			colorLabel.style.backgroundColor = colorInput.value;

			this._controls[title] = {
				container: container,
				control: colorInput,
                colorLabel:  colorLabel,
				label: label,
				title: title,
				getValue: function() {
					return this.control.value;
				},
				setValue: function(value) {
					this.control.value = value;
                    this.colorLabel.style.backgroundColor = colorInput.value;
					this.label.innerHTML = "<b>" + this.title + ":</b> " + this.control.value;
					if(callback) {
						callback(value);
					}
				}
			};

			var self = this;
			colorInput.addEventListener("input", function() {
				label.innerHTML = "<b>" + title + ":</b> " + colorInput.value;
				colorLabel.style.backgroundColor = colorInput.value;
				if(callback) {
					callback(colorInput.value);
				}
				self._callGCH(title);
			});
			return this;
		},

		/**
		 * Adds a color picker control bound to an object. In some browsers this will just render as a text input field, but should still retain all other functionality.
		 * @param title {String} The title of this control.
		 * @param color {String} The initial color value for this control.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindColor: function(title, color, object) {
			return this.addColor(title, color, function(value) {
				object[title] = value;
			});
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region DATE INPUT
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a date input control. In some browsers this will just render as a text input field, but should still retain all other functionality.
		 * @param title {String} The title of the control.
		 * @param date {String|Date} A string in the format "YYYY-MM-DD" or a Date object.
		 * @param [callback] {Function} Callback function that will be called when the value of this control changes.
		 * @returns {*}
		 */
		addDate: function(title, date, callback) {
			var dateStr;
			if(date instanceof Date) {
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if(month < 10) month = "0" + month;
				var day = date.getDate();
				dateStr = year + "-" + month + "-" + day;
			}
			else {
				dateStr = date;
			}

			if(isIE()) {
				return this.addText(title, dateStr, callback);
			}
			var container = this._createContainer();
			var label = createLabel("<b>" + title + "</b>", container);

			var dateInput = createInput("date", title, "qs_text_input", container);
			dateInput.value = dateStr || "";

			this._controls[title] = {
				container: container,
				control: dateInput,
				label: label,
				getValue: function() {
					return this.control.value;
				},
				setValue: function(date) {
					var dateStr;
					if(date instanceof Date) {
						var year = date.getFullYear();
						var month = date.getMonth() + 1;
						if(month < 10) month = "0" + month;
						var day = date.getDate();
                        if(day < 10)  day = "0" + day;
						dateStr = year + "-" + month + "-" + day;
					}
					else {
						dateStr = date;
					}

					this.control.value = dateStr || "";
					if(callback) {
						callback(dateStr);
					}
				}
			}

			var self = this;
			dateInput.addEventListener("input", function() {
				if(callback) {
					callback(dateInput.value);
				}
				self._callGCH(title);
			});
			return this;
		},

		/**
		 * Adds a date input control. In some browsers this will just render as a text input field, but should still retain all other functionality.
		 * @param title {String} The title of the control.
		 * @param date {String|Date} A string in the format "YYYY-MM-DD" or a Date object.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {*}
		 */
		bindDate: function(title, date, object) {
			return this.addDate(title, date, function(value) {
				object[title] = value;
			});
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region DROPDOWN
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a dropdown (select) control. Dropdown items can be strings ("one", "two", "three"), any other values that can be converted to strings (1, 2, 3), or an object that contains label and value properties ({label: "one", value: 77}).
		 * @param title {String} The title of the control.
		 * @param items {Array} An array of items.
		 * @param [callback] {Function} Callback function that will be called when a new option is chosen. Callback will be passed an object containing "index", "label", and "value" properties. If the selected item is a simple value, then label and value will be the same.
		 * @returns {module:QuickSettings}
		 */
		addDropDown: function(title, items, callback) {
			var container = this._createContainer();

			var label = createLabel("<b>" + title + "</b>", container);
			var select = createElement("select", null, "qs_select", container);
			for(var i = 0; i < items.length; i++) {
				var option = createElement("option"),
					item = items[i];
				if(item.label) {
                	option.value = item.value;
                	option.innerText = item.label;
				}
                else {
                    option.label = item;
                    option.innerText = item;
                }
				select.add(option);
			};

			var self = this;
			select.addEventListener("change", function() {
				var index = select.selectedIndex,
					options = select.options;

				if(callback) {
					callback({
						index: index,
						label: options[index].label,
						value: items[index].value || items[index]
					});
				}
				self._callGCH(title);
			});

			this._controls[title] = {
				container: container,
				control: select,
				label: label,
				getValue: function() {
                    var index = this.control.selectedIndex;
					return {
						index: index,
                        label: this.control.options[index].label,
						value: items[index].value || items[index]
					}
				},
				setValue: function(value) {
                    var index
                    if(value.index != null) {
                        index = value.index;
                    }
                    else {
                        index = value;
                    }
					var options = this.control.options;
					this.control.selectedIndex = index;
					if(callback) {
						callback({
                            index: index,
                            label: options[index].label,
                            value: items[index].value || items[index]
						});
					}
				},
			};
			return this;
		},

		/**
		 * Adds a dropdown (select) control bound to an object.
		 * @param title {String} The title of the control.
		 * @param items {Array} An array of strings or values that will be converted to string and displayed as options.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindDropDown: function(title, items, object) {
			return this.addDropDown(title, items, function(value) {
				object[title] = value.value;
			});
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region ELEMENT
		////////////////////////////////////////////////////////////////////////////////


		/**
		 * Adds an existing HTML Element to the panel.
		 * @param title {String} The title of the control.
		 * @param element {HTMLElement} The element to add.
		 * @returns {module:QuickSettings}
		 */
		addElement: function(title, element) {
			var container = this._createContainer(),
				label = createLabel("<b>" + title + "</b>", container);

			container.appendChild(element);

			this._controls[title] = {
				container: container,
				label: label
			};
			return this;
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region FILE CHOOSER
		////////////////////////////////////////////////////////////////////////////////


		/**
		 * Adds a file input control to the panel.
		 * Filter accepts standard media types such as "image/*", "video/*", "audio/*", a file extension, such as ".doc", ".jpg", or mime types.
		 * Multiple filters can be added, comma separated. See standard HTML docs for file input "accept" attribute.
		 * @param title {String} The title of the control.
		 * @param lableStr {String} The initial label on the file button. Defaults to "Choose a file...".
		 * @param filter {String} Species what file types the chooser will accept. See below.
		 * @param [callback] {Function} Callback function that will be called when a file is chosen.
		 * @returns {module:QuickSettings}
		 */
		addFileChooser: function(title, labelStr, filter, callback) {
			var container = this._createContainer();
			var label = createLabel("<b>" + title + "</b>", container);

			var fileChooser = createInput("file", title, "qs_file_chooser", container);
			if(filter) {
				fileChooser.accept = filter;
			}

			var fcLabel = createElement("label", null, "qs_file_chooser_label", container);
			fcLabel.setAttribute("for", title);
			fcLabel.textContent = labelStr || "Choose a file...";


			this._controls[title] = {
				container: container,
				control: fileChooser,
				label: label,
				getValue: function() {
					return this.control.files[0];
				}
			}

			var self = this;
			fileChooser.addEventListener("change", function() {
				if(!fileChooser.files || !fileChooser.files.length) return;
				fcLabel.textContent = fileChooser.files[0].name;
				if(callback) {
					callback(fileChooser.files[0]);
				}
				self._callGCH(title);
			});
			return this;
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region HTML
		////////////////////////////////////////////////////////////////////////////////


		/**
		 * Adds arbitrary HTML to the panel.
		 * @param title {String} The title of the control.
		 * @param html {String} The HTML to add.
		 * @returns {module:QuickSettings}
		 */
		addHTML: function(title, html) {
			var container = this._createContainer();
			var label = createLabel("<b>" + title + ":</b> ", container);

			var div = createElement("div", null, null, container);
			div.innerHTML = html;
			this._controls[title] = {
				container: container,
				label: label,
				control: div,
				getValue: function() {
					return this.control.innerHTML;
				},
				setValue: function(html) {
					this.control.innerHTML = html;
				}
			};
			return this;
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region IMAGE
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds an image control.
		 * @param title {String} The title of the control.
		 * @param imageURL {String} The URL to the image.
		 * @param [callback] {Function} Callback function to call when the image has fully loaded
		 * @returns {module:QuickSettings}
		 */
		addImage: function(title, imageURL, callback) {
			var container = this._createContainer(),
				label = createLabel("<b>" + title + "</b>", container);
			img = createElement("img", null, "qs_image", container);
			img.src = imageURL;

			this._controls[title] = {
				container: container,
				control: img,
				label: label,
				getValue: function() {
					return this.control.src;
				},
				setValue: function(url) {
					this.control.src = url;
					if(callback) {
						img.addEventListener("load", function _onLoad() {
							img.removeEventListener("load", _onLoad)
							callback(url);
						})
					}
				}
			};
			return this;
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region NUMBER and RANGE (SLIDER)
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a range slider control.
		 * @param title {String} Title of the control.
		 * @param min {Number} Minimum value of control.
		 * @param max {Number} Maximum value of control.
		 * @param value {Number} Initial value of control.
		 * @param step {Number} Size of value increments.
		 * @param [callback] {Function} Callback function to call when control value changes.
		 * @returns {module:QuickSettings}
		 */
		addRange: function(title, min, max, value, step, callback) {
			return this._addNumber("range", title, min, max, value, step, callback);
		},

		/**
		 * Adds a number control.
		 * @param title {String} Title of the control.
		 * @param min {Number} Minimum value of control.
		 * @param max {Number} Maximum value of control.
		 * @param value {Number} Initial value of control.
		 * @param step {Number} Size of value increments.
		 * @param [callback] {Function} Callback function to call when control value changes.
		 * @returns {module:QuickSettings}
		 */
		addNumber: function(title, min, max, value, step, callback) {
			return this._addNumber("number", title, min, max, value, step, callback);
		},

		_addNumber: function(type, title, min, max, value, step, callback) {
			var container = this._createContainer();

			var label = createLabel("", container);

			var className = type === "range" ? "qs_range" : "qs_text_input qs_number";
			var input = createInput(type, title, className, container);
			input.min = min || 0;
			input.max = max || 100;
			input.step = step || 1;
			input.value = value || 0;

			label.innerHTML = "<b>" + title + ":</b> " + input.value;


			this._controls[title] = {
				container: container,
				control: input,
				label: label,
				title: title,
				callback: callback,
				getValue: function() {
					return parseFloat(this.control.value);
				},
				setValue: function(value) {
					this.control.value = value;
					this.label.innerHTML = "<b>" + this.title + ":</b> " + this.control.value;
					if(callback) {
						callback(parseFloat(value));
					}
				}
			};

			var eventName = "input";
			if(type === "range" && isIE()) {
				eventName = "change";
			}
			var self = this;
			input.addEventListener(eventName, function() {
				label.innerHTML = "<b>" + title + ":</b> " + input.value;
				if(callback) {
					callback(parseFloat(input.value));
				}
				self._callGCH(title);
			});
			return this;
		},

		/**
		 * Add a range slider control bound to an object.
		 * @param title {String} Title of the control.
		 * @param min {Number} Minimum value of control.
		 * @param max {Number} Maximum value of control.
		 * @param value {Number} Initial value of control.
		 * @param step {Number} Size of value increments.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindRange: function(title, min, max, value, step, object) {
			return this.addRange(title, min, max, value, step, function(value) {
				object[title] = value;
			});
		},

		/**
		 * Add a number control bound to an object.
		 * @param title {String} Title of the control.
		 * @param min {Number} Minimum value of control.
		 * @param max {Number} Maximum value of control.
		 * @param value {Number} Initial value of control.
		 * @param step {Number} Size of value increments.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindNumber: function(title, min, max, value, step, object) {
			return this.addNumber(title, min, max, value, step, function(value) {
				object[title] = value;
			});
		},

		/**
		 * Sets the parameters of a range control.
		 * @param title {Number} The title of the control to set the parameters on.
		 * @param min {Number} The minimum value of the control.
		 * @param max {Number} The maximum value of the control.
		 * @param step {Number} Size of value increments.
		 * @returns {module:QuickSettings}
		 */
		setRangeParameters: function(title, min, max, step) {
			return this.setNumberParameters(title, min, max, step);
		},

		/**
		 * Sets the parameters of a number control.
		 * @param title {Number} The title of the control to set the parameters on.
		 * @param min {Number} The minimum value of the control.
		 * @param max {Number} The maximum value of the control.
		 * @param step {Number} Size of value increments.
		 * @returns {module:QuickSettings}
		 */
		setNumberParameters: function(title, min, max, step) {
			var control = this._controls[title];
			var origValue = control.control.value;
			control.control.min = min;
			control.control.max = max;
			control.control.step = step;

			if(control.control.value !== origValue && control.callback) {
				control.callback(control.control.value);
			}
			return this;
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region PASSWORD
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a password input field.
		 * @param title {String} The title of the control.
		 * @param text {String} The initial text value to put in the control.
		 * @param [callback] {Function} Callback that will be called when the value of this control changes.
		 * @returns {module:QuickSettings}
		 */
		addPassword: function(title, text, callback) {
			return this._addText("password", title, text, callback);
		},

		/**
		 * Adds a password input field bound to an object.
		 * @param title {String} The title of the control.
		 * @param text {String} The initial text value to put in the control.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindPassword: function(title, text, object) {
			return this.addPassword(title, text, function(value) {
				object[title] = value;
			});
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region PROGRESS BAR
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a progress bar control.
		 * @param title {String} The title of the control.
		 * @param max (Number} The maximum value of the control.
		 * @param value (Number} The initial value of the control.
		 * @param valueDisplay {String} How to display the value. Valid values: "percent" displays percent of max, "numbers" displays value and max as fraction. Anything else, value is not shown.
		 * @returns {module:QuickSettings}
		 */
		addProgressBar: function(title, max, value, valueDisplay) {
			var container = this._createContainer(),
				label = createLabel("", container),
				progressDiv = createElement("div", null, "qs_progress", container),
				valueDiv = createElement("div", null, "qs_progress_value", progressDiv);

			valueDiv.style.width = (value / max * 100) + "%";

			if(valueDisplay === "numbers") {
				label.innerHTML = "<b>" + title + ":</b> " + value + " / " + max;
			}
			else if(valueDisplay === "percent") {
				label.innerHTML = "<b>" + title + ":</b> " + Math.round(value / max * 100) + "%";
			}
			else {
				label.innerHTML = "<b>" + title + "</b>";
			}

			this._controls[title] = {
				container: container,
				control: progressDiv,
				valueDiv: valueDiv,
				valueDisplay: valueDisplay,
				label: label,
				value: value,
				max: max,
				title: title,
				getValue: function() {
					return this.value;
				},
				setValue: function(value) {
					this.value = Math.max(0, Math.min(value, this.max));
					this.valueDiv.style.width = (this.value / this.max * 100) + "%";
					if(this.valueDisplay === "numbers") {
						this.label.innerHTML = "<b>" + this.title + ":</b> " + this.value + " / " + this.max;
					}
					else if(this.valueDisplay === "percent") {
						this.label.innerHTML = "<b>" + this.title + ":</b> " + Math.round(this.value / this.max * 100) + "%";
					}
				}
			};
			return this;
		},

		/**
		 * Sets the maximum value for a progress bar control.
		 * @param title {String} The title of the control to change.
		 * @param max {Number} The new maximum value for the control.
		 * @returns {module:QuickSettings}
		 */
		setProgressMax: function(title, max) {
			var control = this._controls[title];
			control.max = max;
			control.value = Math.min(control.value, control.max);
			control.valueDiv.style.width = (control.value / control.max * 100) + "%";

			if(control.valueDisplay === "numbers") {
				control.label.innerHTML = "<b>" + control.title + ":</b> " + control.value + " / " + control.max;
			}
			else if(control.valueDisplay === "percent") {
				control.label.innerHTML = "<b>" + control.title + ":</b> " + Math.round(control.value / control.max * 100) + "%";
			}
			else {
				control.label.innerHTML = "<b>" + control.title + "</b>";
			}
			return this;
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region TEXT
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a text input field.
		 * @param title {String} The title of the control.
		 * @param text {String} The initial text value to put in the control.
		 * @param [callback] {Function} Callback that will be called when the value of this control changes.
		 * @returns {module:QuickSettings}
		 */
		addText: function(title, text, callback) {
			return this._addText("text", title, text, callback);
		},

		_addText: function(type, title, text, callback) {
			var container = this._createContainer();
			var label = createLabel("<b>" + title + "</b>", container);
			var textInput;

			if(type === "textarea") {
				textInput = createElement("textarea", title, "qs_textarea", container);
				textInput.rows = 5;
			}
			else {
				textInput = createInput(type, title, "qs_text_input", container);
			}
			textInput.value = text || "";

			this._controls[title] = {
				container: container,
				control: textInput,
				label: label,
				getValue: function() {
					return this.control.value;
				},
				setValue: function(text) {
					this.control.value = text;
					if(callback) {
						callback(text);
					}
				}
			};

			var self = this;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				self._callGCH(title);
			});
			return this;
		},

		/**
		 * Adds a text input field bound to an object.
		 * @param title {String} The title of the control.
		 * @param text {String} The initial text value to put in the control.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindText: function(title, text, object) {
			return this.addText(title, text, function(value) {
				object[title] = value;
			});
		},
        // endregion

		////////////////////////////////////////////////////////////////////////////////
		// region TEXT AREA
		////////////////////////////////////////////////////////////////////////////////

		/**
		 * Adds a text area control.
		 * @param title {String} The title of the control.
		 * @param text {String} The initial text value to put in the control.
		 * @param [callback] {Function} Callback that will be called when the value of this control changes.
		 * @returns {module:QuickSettings}
		 */
		addTextArea: function(title, text, callback) {
			return this._addText("textarea", title, text, callback);
		},


		/**
		 * Sets the number of rows in a text area control.
		 * @param title {String} The control to set the number of rows on.
		 * @param rows {Integer} The number of rows in the text area.
		 * @returns {module:QuickSettings}
		 */
		setTextAreaRows: function(title, rows) {
			this._controls[title].control.rows = rows;
			return this;
		},

		/**
		 * Adds a text area control bound to an object.
		 * @param title {String} The title of the control.
		 * @param text {String} The initial text value to put in the control.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {module:QuickSettings}
		 */
		bindTextArea: function(title, text, object) {
			return this.addTextArea(title, text, function(value) {
				object[title] = value;
			});
		},
        // endregion

        ////////////////////////////////////////////////////////////////////////////////
		// region TIME INPUT
		////////////////////////////////////////////////////////////////////////////////


		/**
		 * Adds a time input control. In some browsers this will just render as a text input field, but should still retain all other functionality.
		 * @param title {String} The title of the control.
		 * @param time {String|Date} A string in the format "HH:MM", "HH:MM:SS" or a Date object.
		 * @param [callback] {Function} Callback function that will be called when the value of this control changes.
		 * @returns {*}
		 */
		addTime: function(title, time, callback) {
			var timeStr;
			if(time instanceof Date) {
				var hours = time.getHours();
				if(hours < 10) hours = "0" + hours;
				var minutes = time.getMinutes();
				if(minutes < 10) minutes = "0" + minutes;
				var seconds = time.getSeconds();
				if(seconds < 10) seconds = "0" + seconds;
				timeStr = hours + ":" + minutes + ":" + seconds;
			}
			else {
				timeStr = time;
			}

			if(isIE()) {
				return this.addText(title, timeStr, callback);
			}

			var container = this._createContainer();
			var label = createLabel("<b>" + title + "</b>", container);

			var timeInput = createInput("time", title, "qs_text_input", container);
			timeInput.value = timeStr || "";

			this._controls[title] = {
				container: container,
				control: timeInput,
				label: label,
				getValue: function() {
					return this.control.value;
				},
				setValue: function(time) {
					var timeStr;
					if(time instanceof Date) {
						var hours = time.getHours();
						if(hours < 10) hours = "0" + hours;
						var minutes = time.getMinutes();
						if(minutes < 10) minutes = "0" + minutes;
						var seconds = time.getSeconds();
						if(seconds < 10) seconds = "0" + seconds;
						timeStr = hours + ":" + minutes + ":" + seconds;
					}
					else {
						timeStr = time;
					}

					this.control.value = timeStr || "";
					if(callback) {
						callback(timeStr);
					}
				}
			};

			var self = this;
			timeInput.addEventListener("input", function() {
				if(callback) {
					callback(timeInput.value);
				}
				self._callGCH(title);
			});
			return this;
		},

		/**
		 * Adds a time input control. In some browsers this will just render as a text input field, but should still retain all other functionality.
		 * @param title {String} The title of the control.
		 * @param date {String|Date} A string in the format "HH:MM", "HH:MM:SS" or a Date object.
		 * @param object {Object} Object the control is bound to. When the value of the control changes, a property on this object, with the name of the title of this control, will be set to the current value of this control.
		 * @returns {*}
		 */
		bindTime: function(title, time, object) {
			return this.addTime(title, time, function(value) {
				object[title] = value;
			});
		},
        // endregion




    }
	////////////////////////////////////////////////////////////////////////////////
	// EXPORT
	////////////////////////////////////////////////////////////////////////////////
	if(typeof exports === "object" && typeof module === "object") {
		module.exports = QuickSettings
	}
	else if(typeof define === "function" && define.amd) {
	    define(QuickSettings);
	}
	else {
	   window.QuickSettings = QuickSettings;
	}

}());
