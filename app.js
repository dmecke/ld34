/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	Game = __webpack_require__(5);
	mouse = __webpack_require__(13);
	keyboard = __webpack_require__(20);

	var game = new Game();

	game.run();

	document.addEventListener('mousemove', function(event) { mouse.updatePosition(event); });
	document.addEventListener('mousedown', function(event) { mouse.buttonDown(event); });
	document.addEventListener('mouseup', function(event) { mouse.buttonUp(event); });
	document.addEventListener('touchstart', function(event) { mouse.updatePosition(event); mouse.buttonDown(event); });
	document.addEventListener('touchend', function(event) { mouse.buttonUp(event); });
	document.addEventListener('keydown', function(event) { keyboard.addKey(event.keyCode); });
	document.addEventListener('keyup', function(event) { keyboard.removeKey(event.keyCode); });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./app.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n    margin: 0;\n    background: #c6dde6;\n    font-family: 'Roboto', sans-serif;\n    color: #272727;\n}\nh1, h2 {\n    text-align: center;\n}\ncanvas {\n    background: white;\n    border: 1px solid #272727;\n    display: block;\n    margin: 50px auto;\n    width: 800px;\n    height: 600px;\n}\nfooter {\n    margin-top: 50px;\n    text-align: center;\n}\n.explanations {\n    margin: auto;\n    text-align: justify;\n    width: 800px;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	Menu = __webpack_require__(6);
	Level = __webpack_require__(15);
	Vector = __webpack_require__(11);
	levelDefinitions = __webpack_require__(12);
	canvas = __webpack_require__(8);

	function Game()
	{
	    this.menu = new Menu(this);
	    this.level = undefined;
	    this.dimensions = new Vector(canvas.width, canvas.height);

	    this.run = function()
	    {
	        console.log('Game::run');
	        this.showMenu();
	    };

	    this.startLevel = function(level)
	    {
	        console.log('Game::startLevel');
	        this.menu.hide();

	        this.level = new Level(this, level);
	        this.level.start();
	    };

	    this.finishLevel = function()
	    {
	        this.level.cleanup();
	        this.level = undefined;
	    };

	    this.showMenu = function()
	    {
	        this.menu.show();
	    };
	}

	module.exports = Game;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	context = __webpack_require__(7);
	Text = __webpack_require__(9);
	Circle = __webpack_require__(10);
	Vector = __webpack_require__(11);
	levelDefinitions = __webpack_require__(12);
	mouse = __webpack_require__(13);
	settings = __webpack_require__(14);

	function Menu(game)
	{
	    this.game = game;
	    this.mouse = mouse;
	    this.interval = undefined;
	    this.background = new Image();

	    this.show = function()
	    {
	        console.log('Menu::show');

	        this.background.src = 'img/startscreen.jpg';

	        var menu = this;
	        this.interval = setInterval(function() {
	            menu.update();
	            menu.render();
	        }, 1 / 30);
	    };

	    this.hide = function()
	    {
	        console.log('Menu::hide');
	        clearInterval(this.interval);
	    };

	    this.update = function()
	    {
	        //console.log('Menu::update');
	        console.log(this.mouse.click);
	        if (this.mouse.click) {
	            var level = this.levelAtPosition(this.mouse.position);
	            if (level) {
	                this.game.startLevel(level);
	            }
	        }
	    };

	    this.render = function()
	    {
	        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);

	        context.drawImage(this.background, 0, 0);

	        for (var key in levelDefinitions) {
	            if (levelDefinitions.hasOwnProperty(key)) {
	                this.drawLevel(levelDefinitions[key]);
	            }
	        }
	    };

	    this.drawLevel = function(level)
	    {
	        var circle = new Circle(level.position, 50);
	        circle.strokeStyle = 'white';
	        circle.lineWidth = 2;
	        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
	        circle.draw();

	        var label = new Text(level.position.add(new Vector(0, 20)), level.level);
	        label.font = '52px "Gloria Hallelujah"';
	        label.fillStyle = 'white';
	        label.strokeStyle = '#374959';
	        label.lineWidth = 5;
	        label.draw();
	    };

	    this.levelAtPosition = function(position)
	    {
	        for (var key in levelDefinitions) {
	            if (levelDefinitions.hasOwnProperty(key)) {
	                var level = levelDefinitions[key];
	                if (level.position.distanceTo(position) <= 50) {
	                    return level;
	                }
	            }
	        }

	        return null;
	    };
	}

	module.exports = Menu;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Canvas = __webpack_require__(8).getContext('2d');

	module.exports = Canvas;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Canvas = document.getElementById('canvas');
	Canvas.width = 800;
	Canvas.height = 600;

	module.exports = Canvas;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	Context = __webpack_require__(7);

	function Text(position, content)
	{
	    this.position = position;
	    this.content = content;
	    this.font = '12px Roboto';
	    this.fillStyle = 'transparent';
	    this.strokeStyle = 'transparent';
	    this.lineWidth = 1;
	    this.textAlign = 'center';

	    this.draw = function()
	    {
	        Context.font = this.font;
	        Context.fillStyle = this.fillStyle;
	        Context.strokeStyle = this.strokeStyle;
	        Context.lineWidth = this.lineWidth;
	        Context.textAlign = this.textAlign;
	        Context.strokeText(this.content, this.position.x, this.position.y);
	        Context.fillText(this.content, this.position.x, this.position.y);
	    }
	}

	module.exports = Text;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	Context = __webpack_require__(7);

	function Circle(position, radius)
	{
	    this.position = position;
	    this.radius = radius;
	    this.fillStyle = 'transparent';
	    this.strokeStyle = 'transparent';
	    this.lineWidth = 1;

	    this.draw = function()
	    {
	        Context.fillStyle = this.fillStyle;
	        Context.strokeStyle = this.strokeStyle;
	        Context.lineWidth = this.lineWidth;
	        Context.beginPath();
	        Context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
	        Context.stroke();
	        Context.fill();
	        Context.closePath();
	    }
	}

	module.exports = Circle;


/***/ },
/* 11 */
/***/ function(module, exports) {

	function Vector(x, y)
	{
	    this.x = x;
	    this.y = y;

	    this.add = function(vector)
	    {
	        return new Vector(this.x + vector.x, this.y + vector.y);
	    };

	    this.subtract = function(vector)
	    {
	        return new Vector(this.x - vector.x, this.y - vector.y);
	    };

	    this.multiply = function(multiplier)
	    {
	        return new Vector(this.x * multiplier, this.y * multiplier);
	    };

	    this.divide = function(divisor)
	    {
	        return new Vector(this.x / divisor, this.y / divisor);
	    };

	    this.length = function()
	    {
	        return Math.sqrt(this.x * this.x + this.y * this.y);
	    };

	    this.distanceTo = function(vector)
	    {
	        var diffX = this.x - vector.x;
	        var diffY = this.y - vector.y;

	        return Math.sqrt(diffX * diffX + diffY * diffY);
	    };

	    this.normalize = function()
	    {
	        return this.divide(this.length());
	    };

	    this.limit = function(limit)
	    {
	        if (this.length() <= limit) {
	            return new Vector(this.x, this.y);
	        }

	        return this.normalize().multiply(limit);
	    };
	}

	module.exports = Vector;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);

	LevelDefinitions = [
	    { level: 1, position: new Vector(100, 340), winningConditions: { mass: 50 }},
	    { level: 2, position: new Vector(250, 340), winningConditions: { mass: 60 }},
	    { level: 3, position: new Vector(400, 340), winningConditions: { mass: 70 }},
	    { level: 4, position: new Vector(550, 340), winningConditions: { mass: 80 }},
	    { level: 5, position: new Vector(700, 340), winningConditions: { mass: 90 }},
	    { level: 6, position: new Vector(100, 490), winningConditions: { mass: 100 }},
	    { level: 7, position: new Vector(250, 490), winningConditions: { mass: 110 }},
	    { level: 8, position: new Vector(400, 490), winningConditions: { mass: 120 }},
	    { level: 9, position: new Vector(550, 490), winningConditions: { mass: 130 }},
	    { level: 10, position: new Vector(700, 490), winningConditions: { mass: 140 }}
	];

	module.exports = LevelDefinitions;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);
	canvas = __webpack_require__(8);

	function Mouse()
	{
	    this.position = new Vector(0, 0);
	    this.click = false;

	    this.updatePosition = function(event)
	    {
	        var canvasRect = canvas.getBoundingClientRect();
	        var x, y;
	        if (event.clientX) {
	            x = event.clientX;
	        }
	        if (event.clientY) {
	            y = event.clientY;
	        }
	        if (event.changedTouches) {
	            x = event.changedTouches[0].pageX;
	            y = event.changedTouches[0].pageY;
	        }

	        this.position = new Vector(x - canvasRect.left, y - canvasRect.top);
	    };

	    this.buttonDown = function(event)
	    {
	        this.click = true;
	    };

	    this.buttonUp = function(event)
	    {
	        this.click = false;
	    };
	}

	module.exports = new Mouse();


/***/ },
/* 14 */
/***/ function(module, exports) {

	
	Settings = {
	    blue: 'rgb(4, 97, 182)',
	    green: 'rgb(99, 170, 51)'
	};

	module.exports = Settings;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	context = __webpack_require__(7);
	Player = __webpack_require__(16);
	Vector = __webpack_require__(11);
	Cell = __webpack_require__(17);
	Ui = __webpack_require__(19);
	settings = __webpack_require__(14);

	function Level(game, levelSettings)
	{
	    this.game = game;
	    this.player = new Player(this);
	    this.cells = [];
	    this.ui = new Ui(this);
	    this.interval = undefined;
	    this.levelSettings = levelSettings;
	    this.background = new Image();

	    this.start = function()
	    {
	        console.log('Level::start');
	        var level = this;
	        this.setup();

	        this.interval = setInterval(function() {
	            level.update();
	            level.render();
	        }, 1 / 30);
	    };

	    this.update = function()
	    {
	        console.log('Level::update');
	        this.player.update();
	        for (var i = 0; i < this.cells.length; i++) {
	            this.cells[i].update();
	        }
	        this.checkWinningConditions();
	    };

	    this.render = function()
	    {
	        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);
	        context.drawImage(this.background, 0, 0);
	        this.player.render();
	        for (var i = 0; i < this.cells.length; i++) {
	            this.cells[i].render();
	        }
	        this.ui.render();
	    };

	    this.setup = function()
	    {
	        console.log('Level::setup');
	        console.log(settings.green);
	        for (var i = 0; i < 20; i++) {
	            this.cells.push(
	                new Cell(
	                    this,
	                    new Vector(Math.random() * this.game.dimensions.x, Math.random() * this.game.dimensions.y),
	                    new Vector(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
	                    Math.random() * 10,
	                    settings.green
	                )
	            );
	        }
	        var background = this.levelSettings.level % 10;
	        this.background.src = 'img/background/' + background + '.jpg';
	    };

	    this.checkWinningConditions = function()
	    {
	        if (this.player.mass >= this.levelSettings.winningConditions.mass) {
	            this.game.finishLevel();
	            this.game.showMenu();
	        }
	    };

	    this.cleanup = function()
	    {
	        clearInterval(this.interval);
	    };
	}

	module.exports = Level;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);
	Circle = __webpack_require__(10);
	Cell = __webpack_require__(17);
	ClickTimer = __webpack_require__(18);
	mouse = __webpack_require__(13);
	settings = __webpack_require__(14);

	function Player(level)
	{
	    this.level = level;
	    this.position = new Vector(400, 300);
	    this.velocity = new Vector(0, 0);
	    this.minimumMass = 10;
	    this.mass = this.minimumMass;
	    this.mouse = mouse;
	    this.clickTimer = new ClickTimer(30);
	    this.clickTimer.reset();

	    this.update = function()
	    {
	        this.checkCollision();
	        this.processUserInput();
	        this.updatePosition();
	        this.clickTimer.update();
	    };

	    this.render = function()
	    {
	        this.draw(this.mass);
	        this.draw(this.minimumMass);
	    };

	    this.draw = function(radius)
	    {
	        var dimensions = this.level.game.dimensions;

	        this.drawElement(this.position, radius);
	        if (this.position.x - radius < 0) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y), radius);
	        }
	        if (this.position.y - radius < 0) {
	            this.drawElement(new Vector(this.position.x, dimensions.y + this.position.y), radius);
	        }
	        if (this.position.x + radius > dimensions.x) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y), radius);
	        }
	        if (this.position.y + radius > dimensions.y) {
	            this.drawElement(new Vector(this.position.x, this.position.y - dimensions.y), radius);
	        }

	        if (this.position.x - radius < 0 && this.position.y - radius < 0) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y), radius);
	        }
	        if (this.position.x - radius < 0 && this.position.y + radius > dimensions.y) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y), radius);
	        }
	        if (this.position.x + radius > dimensions.x && this.position.y - radius < 0) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y), radius);
	        }
	        if (this.position.x + radius > dimensions.x && this.position.y + radius > dimensions.y) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y - dimensions.y), radius);
	        }
	    };

	    this.drawElement = function(position, radius)
	    {
	        var circle = new Circle(position, radius);
	        circle.strokeStyle = settings.blue;
	        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
	        circle.lineWidth = 2;
	        circle.draw();
	    };

	    this.checkCollision = function()
	    {
	        for (var i = 0; i < this.level.cells.length; i++) {
	            var cell = this.level.cells[i];
	            if (cell.position.distanceTo(this.position) < this.mass + cell.mass) {
	                this.mass += cell.mass;
	                this.level.cells.splice(i, 1);
	            }
	        }
	    };

	    this.updatePosition = function()
	    {
	        this.position = this.position.add(this.velocity);
	        if (this.position.x > this.level.game.dimensions.x) {
	            this.position.x -= this.level.game.dimensions.x;
	        }
	        if (this.position.y > this.level.game.dimensions.y) {
	            this.position.y -= this.level.game.dimensions.y;
	        }
	        if (this.position.x < 0) {
	            this.position.x = this.level.game.dimensions.x - this.position.x;
	        }
	        if (this.position.y < 0) {
	            this.position.y = this.level.game.dimensions.y - this.position.y;
	        }
	    };

	    this.processUserInput = function()
	    {
	        if (!this.mouse.click) {
	            return;
	        }

	        if (!this.clickTimer.isReady()) {
	            return;
	        }

	        var emittedMass = Math.max(0.05, this.mass * 0.05);
	        var direction = this.mouse.position.subtract(this.position).normalize();
	        var force = direction.multiply(-1).multiply(emittedMass).divide(this.mass);
	        this.velocity = this.velocity.add(force);
	        this.reduceMass(emittedMass);
	        var cellPosition = this.position.add(direction.multiply(this.mass + emittedMass));
	        var cell = new Cell(this.level, cellPosition, force.multiply(-1), emittedMass, settings.blue);
	        if (this.mass == this.minimumMass) {
	            cell.disappearsIn = 100;
	        }
	        this.level.cells.push(cell);
	        this.clickTimer.reset();
	    };

	    this.reduceMass = function(amount)
	    {
	        this.mass = Math.max(this.minimumMass, this.mass - amount);
	    };
	}

	module.exports = Player;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);
	Circle = __webpack_require__(10);

	function Cell(level, position, velocity, mass, color)
	{
	    this.level = level;
	    this.position = position;
	    this.velocity = velocity;
	    this.mass = mass;
	    this.color = color;
	    this.disappearsIn = undefined;

	    this.update = function()
	    {
	        this.position = this.position.add(this.velocity);
	        if (this.position.x > this.level.game.dimensions.x) {
	            this.position.x -= this.level.game.dimensions.x;
	        }
	        if (this.position.y > this.level.game.dimensions.y) {
	            this.position.y -= this.level.game.dimensions.y;
	        }
	        if (this.position.x < 0) {
	            this.position.x = this.level.game.dimensions.x - this.position.x;
	        }
	        if (this.position.y < 0) {
	            this.position.y = this.level.game.dimensions.y - this.position.y;
	        }

	        if (this.disappearsIn) {
	            this.disappearsIn--;
	            if (this.disappearsIn == 0) {
	                var index = this.level.cells.indexOf(this);
	                this.level.cells.splice(index, 1);
	            }
	        }
	    };

	    this.render = function()
	    {
	        var dimensions = this.level.game.dimensions;

	        this.drawElement(this.position);
	        if (this.position.x - this.mass < 0) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y));
	        }
	        if (this.position.y - this.mass < 0) {
	            this.drawElement(new Vector(this.position.x, dimensions.y + this.position.y));
	        }
	        if (this.position.x + this.mass > dimensions.x) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y));
	        }
	        if (this.position.y + this.mass > dimensions.y) {
	            this.drawElement(new Vector(this.position.x, this.position.y - dimensions.y));
	        }

	        if (this.position.x - this.mass < 0 && this.position.y - this.mass < 0) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y));
	        }
	        if (this.position.x - this.mass < 0 && this.position.y + this.mass > dimensions.y) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y));
	        }
	        if (this.position.x + this.mass > dimensions.x && this.position.y - this.mass < 0) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y));
	        }
	        if (this.position.x + this.mass > dimensions.x && this.position.y + this.mass > dimensions.y) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y - dimensions.y));
	        }
	    };

	    this.drawElement = function(position)
	    {
	        var circle = new Circle(position, this.mass);
	        circle.strokeStyle = this.color;
	        circle.fillStyle = this.color.replace(')', ', 0.1)').replace('rgb', 'rgba');
	        circle.lineWidth = 2;
	        circle.draw();
	    };
	}

	module.exports = Cell;


/***/ },
/* 18 */
/***/ function(module, exports) {

	function ClickTimer(maximum)
	{
	    this.maximum = maximum;
	    this.current = 0;

	    this.reset = function()
	    {
	        this.current = this.maximum;
	    };

	    this.isReady = function()
	    {
	        return this.current == 0;
	    };

	    this.update = function()
	    {
	        this.current = Math.max(0, this.current - 1);
	    }
	}

	module.exports = ClickTimer;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);
	Text = __webpack_require__(9);
	settings = __webpack_require__(14);

	function Ui(level)
	{
	    this.level = level;

	    this.render = function()
	    {
	        var currentMass = new Text(new Vector(10, this.level.game.dimensions.y - 30), 'Current mass: ' + Math.floor(this.level.player.mass));
	        currentMass.textAlign = 'left';
	        currentMass.fillStyle = settings.blue;
	        currentMass.draw();

	        var targetMass = new Text(new Vector(10, this.level.game.dimensions.y - 10), 'Target mass: ' + this.level.levelSettings.winningConditions.mass);
	        targetMass.textAlign = 'left';
	        targetMass.fillStyle = settings.blue;
	        targetMass.draw();
	    };
	}

	module.exports = Ui;


/***/ },
/* 20 */
/***/ function(module, exports) {

	function Keyboard()
	{
	    this.keys = [];

	    this.KEY_ENTER = 13;
	    this.KEY_SPACE = 32;
	    this.KEY_LEFT = 37;
	    this.KEY_UP = 38;
	    this.KEY_RIGHT = 39;
	    this.KEY_DOWN = 40;
	    this.KEY_A = 65;
	    this.KEY_D = 68;
	    this.KEY_S = 83;
	    this.KEY_W = 87;

	    this.addKey = function(keyCode)
	    {
	        if (-1 == this.keys.indexOf(keyCode)) {
	            this.keys.push(keyCode);
	        }
	    };

	    this.removeKey = function(keyCode)
	    {
	        var index = this.keys.indexOf(keyCode);
	        if (index != -1) {
	            this.keys.splice(index, 1);
	        }
	    };

	    this.isUp = function()
	    {
	        if (-1 != this.keys.indexOf(this.KEY_UP)) {
	            return true;
	        }

	        return -1 != this.keys.indexOf(this.KEY_W);
	    };

	    this.isDown = function()
	    {
	        if (-1 != this.keys.indexOf(this.KEY_DOWN)) {
	            return true;
	        }

	        return -1 != this.keys.indexOf(this.KEY_S);
	    };

	    this.isLeft = function()
	    {
	        if (-1 != this.keys.indexOf(this.KEY_LEFT)) {
	            return true;
	        }

	        return -1 != this.keys.indexOf(this.KEY_A);
	    };

	    this.isRight = function()
	    {
	        if (-1 != this.keys.indexOf(this.KEY_RIGHT)) {
	            return true;
	        }

	        return -1 != this.keys.indexOf(this.KEY_D);
	    };
	}

	module.exports = new Keyboard();


/***/ }
/******/ ]);