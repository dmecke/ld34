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
	mouse = __webpack_require__(14);
	keyboard = __webpack_require__(25);

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
	exports.push([module.id, "body {\n    margin: 0;\n    background: #c6dde6;\n    font-family: 'Gloria Hallelujah', sans-serif;\n    color: #272727;\n}\nh1, h2 {\n    text-align: center;\n}\ncanvas {\n    background: white;\n    border: 1px solid #272727;\n    display: block;\n    margin: 50px auto;\n    width: 800px;\n    height: 600px;\n}\nfooter {\n    margin: 50px auto 0;\n    text-align: center;\n    width: 800px;\n}\nfooter.credits {\n    font-size: 12px;\n}\n.explanations {\n    margin: auto;\n    text-align: justify;\n    width: 800px;\n}\n", ""]);

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
	Level = __webpack_require__(17);
	Vector = __webpack_require__(11);
	Sfx = __webpack_require__(23);
	Music = __webpack_require__(12);
	levelDefinitions = __webpack_require__(13);
	canvas = __webpack_require__(8);

	function Game()
	{
	    this.menu = new Menu(this);
	    this.levels = [];
	    this.currentLevel = undefined;
	    this.dimensions = new Vector(canvas.width, canvas.height);
	    this.sfx = new Sfx();
	    this.music = new Music();

	    this.run = function()
	    {
	        for (var key in levelDefinitions) {
	            if (levelDefinitions.hasOwnProperty(key)) {
	                var level = new Level(this, levelDefinitions[key]);
	                if (window.localStorage.getItem('level_' +  level.levelSettings.level)) {
	                    level.isFinished = true;
	                }
	                this.levels.push(level);
	            }
	        }
	        this.showMenu();
	    };

	    this.startLevel = function(level)
	    {
	        this.menu.hide();

	        this.currentLevel = level;
	        this.currentLevel.start();
	    };

	    this.finishLevel = function()
	    {
	        this.currentLevel.isFinished = true;
	        window.localStorage.setItem('level_' +  this.currentLevel.levelSettings.level, true);
	        this.currentLevel.cleanup();
	        this.currentLevel = undefined;
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
	Music = __webpack_require__(12);
	levelDefinitions = __webpack_require__(13);
	mouse = __webpack_require__(14);
	settings = __webpack_require__(16);

	function Menu(game)
	{
	    this.game = game;
	    this.mouse = mouse;
	    this.interval = undefined;
	    this.background = new Image();
	    this.lock = new Image();
	    this.symbolSfx = new Image();
	    this.symbolMusic = new Image();

	    this.show = function()
	    {
	        this.background.src = 'img/startscreen.jpg';
	        this.lock.src = 'img/lock.png';
	        this.symbolSfx.src = 'img/sfx.png';
	        this.symbolMusic.src = 'img/music.png';

	        this.game.music.playMenu();

	        var menu = this;
	        this.interval = setInterval(function() {
	            menu.update();
	            menu.render();
	        }, 1 / 30);
	    };

	    this.hide = function()
	    {
	        this.game.music.pauseMenu();
	        clearInterval(this.interval);
	    };

	    this.update = function()
	    {
	        if (this.mouse.clicked()) {
	            var level = this.levelAtPosition(this.mouse.position);
	            if (level && !level.isLocked()) {
	                this.game.startLevel(level);
	            }
	            if (this.mouseIsAtMusic()) {
	                this.game.music.toggle();
	            }
	            if (this.mouseIsAtSfx()) {
	                this.game.sfx.toggle();
	            }
	        }
	    };

	    this.render = function()
	    {
	        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);

	        context.drawImage(this.background, 0, 0);

	        this.drawMusic();
	        this.drawSfx();

	        for (var i = 0; i < this.game.levels.length; i++) {
	            this.drawLevel(this.game.levels[i]);
	        }
	    };

	    this.drawMusic = function()
	    {
	        var position = new Vector(this.game.dimensions.x - 50, 50);

	        var circle = new Circle(position, 25);
	        circle.strokeStyle = settings.white;
	        circle.lineWidth = 2;
	        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
	        circle.draw();

	        context.drawImage(this.symbolMusic, position.x - 15, position.y - 18);

	        if (!this.game.music.enabled) {
	            var x = new Text(position.add(new Vector(1, 18)), 'X');
	            x.font = '44px "Gloria Hallelujah"';
	            x.fillStyle = settings.red;
	            x.strokeStyle = settings.white;
	            x.lineWidth = 5;
	            x.draw();
	        }
	    };

	    this.drawSfx = function()
	    {
	        var position = new Vector(this.game.dimensions.x - 50, 120);

	        var circle = new Circle(position, 25);
	        circle.strokeStyle = settings.white;
	        circle.lineWidth = 2;
	        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
	        circle.draw();

	        context.drawImage(this.symbolSfx, position.x - 19, position.y - 18);

	        if (!this.game.sfx.enabled) {
	            var x = new Text(position.add(new Vector(1, 18)), 'X');
	            x.font = '44px "Gloria Hallelujah"';
	            x.fillStyle = settings.red;
	            x.strokeStyle = settings.white;
	            x.lineWidth = 5;
	            x.draw();
	        }
	    };

	    this.drawLevel = function(level)
	    {
	        var circle = new Circle(level.levelSettings.position, 50);
	        circle.strokeStyle = settings.white;
	        circle.lineWidth = 2;
	        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
	        circle.draw();

	        if (level.isLocked()) {
	            context.drawImage(this.lock, level.levelSettings.position.x - 29, level.levelSettings.position.y - 44);
	        } else {
	            var label = new Text(level.levelSettings.position.add(new Vector(0, 20)), level.levelSettings.level);
	            label.font = '52px "Gloria Hallelujah"';
	            label.fillStyle = settings.white;
	            label.strokeStyle = settings.grey;
	            label.lineWidth = 8;
	            label.draw();
	        }
	    };

	    this.levelAtPosition = function(position)
	    {
	        for (var i = 0; i < this.game.levels.length; i++) {
	            if (this.game.levels[i].levelSettings.position.distanceTo(position) <= 50) {
	                return this.game.levels[i];
	            }
	        }

	        return null;
	    };

	    this.mouseIsAtMusic = function()
	    {
	        var position = new Vector(this.game.dimensions.x - 50, 50);

	        return position.distanceTo(this.mouse.position) <= 50;
	    };

	    this.mouseIsAtSfx = function()
	    {
	        var position = new Vector(this.game.dimensions.x - 50, 120);

	        return position.distanceTo(this.mouse.position) <= 50;
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
	    this.maxWidth = undefined;
	    this.lineHeight = 38;

	    this.draw = function()
	    {
	        Context.font = this.font;
	        Context.fillStyle = this.fillStyle;
	        Context.strokeStyle = this.strokeStyle;
	        Context.lineWidth = this.lineWidth;
	        Context.textAlign = this.textAlign;

	        var words = String(this.content).split(' ');
	        var line = '';
	        var y = this.position.y;
	        for (var word = 0; word < words.length; word++) {
	            var testLine = line + words[word] + ' ';
	            var metrics = context.measureText(testLine);
	            var testWidth = metrics.width;

	            if (this.maxWidth && testWidth > this.maxWidth) {
	                Context.strokeText(line, this.position.x, y);
	                Context.fillText(line, this.position.x, y);
	                line = words[word] + ' ';
	                y += this.lineHeight;
	            } else {
	                line = testLine;
	            }
	        }
	        Context.strokeText(line.trim(), this.position.x, y);
	        Context.fillText(line.trim(), this.position.x, y);
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
/***/ function(module, exports) {

	function Music()
	{
	    this.musicMenu = new Audio('music/menu.mp3');
	    this.musicLevels = [
	        new Audio('music/0.mp3'),
	        new Audio('music/1.mp3'),
	        new Audio('music/2.mp3'),
	        new Audio('music/3.mp3'),
	        new Audio('music/4.mp3'),
	        new Audio('music/5.mp3')
	    ];
	    this.enabled = true;

	    this.toggle = function()
	    {
	        this.enabled = !this.enabled;
	        if (!this.enabled) {
	            this.pauseMenu();
	        }
	        if (this.enabled) {
	            this.playMenu();
	        }
	    };

	    this.playMenu = function()
	    {
	        if (!this.enabled) {
	            return;
	        }

	        this.musicMenu.loop = true;
	        this.musicMenu.play();
	    };

	    this.playLevel = function(level)
	    {
	        if (!this.enabled) {
	            return;
	        }

	        var index = level % 6;

	        this.musicLevels[index].loop = true;
	        this.musicLevels[index].play();
	    };

	    this.pauseMenu = function()
	    {
	        this.musicMenu.pause();
	    };

	    this.pauseLevel = function(level)
	    {
	        var index = level % 6;

	        this.musicLevels[index].pause();
	    };
	}

	module.exports = Music;


/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	Timer = __webpack_require__(15);
	Vector = __webpack_require__(11);
	canvas = __webpack_require__(8);

	function Mouse()
	{
	    this.position = new Vector(0, 0);
	    this.click = false;
	    this.timer = new Timer(30);

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

	    this.clicked = function()
	    {
	        var clicked = this.click && this.timer.isReady();
	        if (clicked) {
	            this.timer.reset();
	        }

	        return clicked;
	    };
	}

	var mouse = new Mouse();
	setInterval(function() {
	    mouse.timer.update();
	}, 1 / 30);

	module.exports = mouse;


/***/ },
/* 15 */
/***/ function(module, exports) {

	function Timer(maximum)
	{
	    this.maximum = maximum;
	    this.current = maximum;

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
	    };
	}

	module.exports = Timer;


/***/ },
/* 16 */
/***/ function(module, exports) {

	Settings = {
	    white: 'rgb(255, 255, 255)',
	    grey: 'rgb(55, 73, 89)',
	    blue: 'rgb(4, 97, 182)',
	    green: 'rgb(99, 170, 51)',
	    red: 'rgb(207, 39, 39)'
	};

	module.exports = Settings;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	context = __webpack_require__(7);
	Player = __webpack_require__(18);
	Vector = __webpack_require__(11);
	Cell = __webpack_require__(19);
	Ui = __webpack_require__(21);
	Music = __webpack_require__(12);
	settings = __webpack_require__(16);

	function Level(game, levelSettings)
	{
	    this.game = game;
	    this.player = new Player(this);
	    this.cells = [];
	    this.ui = new Ui(this);
	    this.interval = undefined;
	    this.levelSettings = levelSettings;
	    this.background = new Image();
	    this.showObjectives = true;
	    this.showScore = false;
	    this.isFinished = false;

	    this.start = function()
	    {
	        var level = this;
	        this.setup();

	        this.interval = setInterval(function() {
	            level.update();
	            level.render();
	        }, 1 / 30);
	    };

	    this.update = function()
	    {
	        if (this.paused()) {
	            return;
	        }

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
	        this.game.music.playLevel(this.levelSettings.level);
	    };

	    this.checkWinningConditions = function()
	    {
	        if (this.player.mass >= this.levelSettings.winningConditions.mass) {
	            this.showScore = true;
	        }
	    };

	    this.cleanup = function()
	    {
	        this.game.music.pauseLevel(this.levelSettings.level);
	        clearInterval(this.interval);
	    };

	    this.paused = function()
	    {
	        return this.showObjectives || this.showScore;
	    };

	    this.isLocked = function()
	    {
	        return this.levelSettings.level > 1 && this.previousLevel().isFinished == false;
	    };

	    this.previousLevel = function()
	    {
	        for (var i = 0; i < this.game.levels.length; i++) {
	            if (this.game.levels[i].levelSettings.level == this.levelSettings.level - 1) {
	                return this.game.levels[i];
	            }
	        }

	        return null;
	    };
	}

	module.exports = Level;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);
	Circle = __webpack_require__(10);
	Cell = __webpack_require__(19);
	PositionCheck = __webpack_require__(20);
	mouse = __webpack_require__(14);
	settings = __webpack_require__(16);

	function Player(level)
	{
	    this.level = level;
	    this.position = new Vector(400, 300);
	    this.velocity = new Vector(0, 0);
	    this.minimumMass = 10;
	    this.mass = this.minimumMass + 10;
	    this.mouse = mouse;

	    this.update = function()
	    {
	        this.checkCollision();
	        this.processUserInput();
	        this.updatePosition();
	    };

	    this.render = function()
	    {
	        this.draw(this.mass);
	        this.draw(this.minimumMass);
	    };

	    this.draw = function(radius)
	    {
	        var dimensions = this.level.game.dimensions;
	        var check = new PositionCheck(this.position, radius, dimensions);

	        this.drawElement(this.position, radius);
	        if (check.isOutOfLeftBorder()) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y), radius);
	        }
	        if (check.isOutOfTopBorder()) {
	            this.drawElement(new Vector(this.position.x, dimensions.y + this.position.y), radius);
	        }
	        if (check.isOutOfRightBorder()) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y), radius);
	        }
	        if (check.isOutOfBottomBorder()) {
	            this.drawElement(new Vector(this.position.x, this.position.y - dimensions.y), radius);
	        }

	        if (check.isOutOfTopLeftCorner()) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y), radius);
	        }
	        if (check.isOutOfBottomLeftCorner()) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y), radius);
	        }
	        if (check.isOutOfTopRightCorner()) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y), radius);
	        }
	        if (check.isOutOfBottomRightCorner()) {
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
	        var dimensions = this.level.game.dimensions;
	        var check = new PositionCheck(this.position, this.mass, dimensions);

	        for (var i = 0; i < this.level.cells.length; i++) {
	            var cell = this.level.cells[i];
	            this.checkCollisionAt(this.position, cell, i);

	            if (check.isOutOfLeftBorder()) {
	                this.checkCollisionAt(new Vector(dimensions.x + this.position.x, this.position.y), cell, i);
	            }
	            if (check.isOutOfTopBorder()) {
	                this.checkCollisionAt(new Vector(this.position.x, dimensions.y + this.position.y), cell, i);
	            }
	            if (check.isOutOfRightBorder()) {
	                this.checkCollisionAt(new Vector(this.position.x - dimensions.x, this.position.y), cell, i);
	            }
	            if (check.isOutOfBottomBorder()) {
	                this.checkCollisionAt(new Vector(this.position.x, this.position.y - dimensions.y), cell, i);
	            }

	            if (check.isOutOfTopLeftCorner()) {
	                this.checkCollisionAt(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y), cell, i);
	            }
	            if (check.isOutOfBottomLeftCorner()) {
	                this.checkCollisionAt(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y), cell, i);
	            }
	            if (check.isOutOfTopRightCorner()) {
	                this.checkCollisionAt(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y), cell, i);
	            }
	            if (check.isOutOfBottomRightCorner()) {
	                this.checkCollisionAt(new Vector(this.position.x - dimensions.x, this.position.y - dimensions.y), cell, i);
	            }
	        }
	    };

	    this.checkCollisionAt = function(position, cell, index)
	    {
	        if (this.collidesWithCell(position, cell)) {
	            this.incorporateCell(cell, index);
	        }
	    };

	    this.collidesWithCell = function(position, cell)
	    {
	        return cell.position.distanceTo(position) < this.mass + cell.mass;
	    };

	    this.incorporateCell = function(cell, index)
	    {
	        this.mass += cell.mass;
	        this.level.cells.splice(index, 1);
	        this.level.game.sfx.absorb();
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
	        if (!this.mouse.clicked()) {
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
	        this.level.game.sfx.accelerate();
	    };

	    this.reduceMass = function(amount)
	    {
	        this.mass = Math.max(this.minimumMass, this.mass - amount);
	    };
	}

	module.exports = Player;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);
	Circle = __webpack_require__(10);
	PositionCheck = __webpack_require__(20);

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
	        var check = new PositionCheck(this.position, this.mass, dimensions);

	        this.drawElement(this.position);
	        if (check.isOutOfLeftBorder()) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y));
	        }
	        if (check.isOutOfTopBorder()) {
	            this.drawElement(new Vector(this.position.x, dimensions.y + this.position.y));
	        }
	        if (check.isOutOfRightBorder()) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y));
	        }
	        if (check.isOutOfBottomBorder()) {
	            this.drawElement(new Vector(this.position.x, this.position.y - dimensions.y));
	        }

	        if (check.isOutOfTopLeftCorner()) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y));
	        }
	        if (check.isOutOfBottomLeftCorner()) {
	            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y));
	        }
	        if (check.isOutOfTopRightCorner()) {
	            this.drawElement(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y));
	        }
	        if (check.isOutOfBottomRightCorner()) {
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
/* 20 */
/***/ function(module, exports) {

	function PositionCheck(position, radius, dimensions)
	{
	    this.position = position;
	    this.radius = radius;
	    this.dimensions = dimensions;

	    this.isOutOfLeftBorder = function()
	    {
	        return this.position.x - this.radius < 0
	    };

	    this.isOutOfTopBorder = function()
	    {
	        return this.position.y - this.radius < 0;
	    };

	    this.isOutOfRightBorder = function()
	    {
	        return this.position.x + radius > this.dimensions.x;
	    };

	    this.isOutOfBottomBorder = function()
	    {
	        return this.position.y + this.radius > this.dimensions.y;
	    };

	    this.isOutOfTopLeftCorner = function()
	    {
	        return this.position.x - this.radius < 0 && this.position.y - this.radius < 0;
	    };

	    this.isOutOfTopRightCorner = function()
	    {
	        return this.position.x + this.radius > this.dimensions.x && this.position.y - this.radius < 0;
	    };

	    this.isOutOfBottomLeftCorner = function()
	    {
	        return this.position.x - this.radius < 0 && this.position.y + this.radius > this.dimensions.y;
	    };

	    this.isOutOfBottomRightCorner = function()
	    {
	        return this.position.x + this.radius > this.dimensions.x && this.position.y + this.radius > this.dimensions.y;
	    };
	}

	module.exports = PositionCheck;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	Vector = __webpack_require__(11);
	Text = __webpack_require__(9);
	Rectangle = __webpack_require__(22);
	settings = __webpack_require__(16);
	mouse = __webpack_require__(14);

	function Ui(level)
	{
	    this.level = level;

	    this.render = function()
	    {
	        this.drawHud();
	        this.showObjectives();
	        this.showScore();
	    };

	    this.drawHud = function()
	    {
	        var container = new Rectangle(new Vector(100, this.level.game.dimensions.y - 25), 200, 50);
	        container.strokeStyle = settings.white;
	        container.lineWidth = 2;
	        container.fillStyle = settings.white.replace(')', ', 0.6)').replace('rgb', 'rgba');
	        container.draw();

	        var currentMass = new Text(new Vector(10, this.level.game.dimensions.y - 30), 'Current mass: ' + Math.floor(this.level.player.mass));
	        currentMass.font = '14px "Gloria Hallelujah"';
	        currentMass.textAlign = 'left';
	        currentMass.fillStyle = settings.blue;
	        currentMass.draw();

	        var targetMass = new Text(new Vector(10, this.level.game.dimensions.y - 10), 'Target mass: ' + this.level.levelSettings.winningConditions.mass);
	        targetMass.font = '14px "Gloria Hallelujah"';
	        targetMass.textAlign = 'left';
	        targetMass.fillStyle = settings.blue;
	        targetMass.draw();
	    };

	    this.showObjectives = function()
	    {
	        if (!this.level.showObjectives) {
	            return;
	        }

	        this.drawWindow();

	        var objectives = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 - 50), 'Grow until you have a mass of ' + this.level.levelSettings.winningConditions.mass + '!');
	        objectives.font = '28px "Gloria Hallelujah"';
	        objectives.fillStyle = 'white';
	        objectives.strokeStyle = settings.grey;
	        objectives.lineWidth = 5;
	        objectives.maxWidth = 350;
	        objectives.draw();

	        this.drawContinueText('Click to start!');

	        if (mouse.clicked()) {
	            this.level.showObjectives = false;
	        }
	    };

	    this.showScore = function()
	    {
	        if (!this.level.showScore) {
	            return;
	        }

	        this.drawWindow();

	        var score = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 - 50), 'You made it!');
	        score.font = '28px "Gloria Hallelujah"';
	        score.fillStyle = 'white';
	        score.strokeStyle = settings.grey;
	        score.lineWidth = 5;
	        score.maxWidth = 350;
	        score.draw();

	        this.drawContinueText('Click to return to main menu!');

	        if (mouse.clicked()) {
	            this.level.game.finishLevel();
	            this.level.game.showMenu();
	        }
	    };

	    this.drawWindow = function()
	    {
	        var window = new Rectangle(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2), 400, 300);
	        window.strokeStyle = settings.white;
	        window.lineWidth = 2;
	        window.fillStyle = settings.white.replace(')', ', 0.6)').replace('rgb', 'rgba');
	        window.draw();
	    };

	    this.drawContinueText = function(text)
	    {
	        var clickToStart = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 + 100), text);
	        clickToStart.font = '18px "Gloria Hallelujah"';
	        clickToStart.fillStyle = 'white';
	        clickToStart.strokeStyle = settings.grey;
	        clickToStart.lineWidth = 4;
	        clickToStart.draw();
	    };
	}

	module.exports = Ui;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	Context = __webpack_require__(7);

	function Rectangle(position, width, height)
	{
	    this.position = position;
	    this.width = width;
	    this.height = height;
	    this.lineWidth = 1;
	    this.fillStyle = 'transparent';
	    this.strokeStyle = 'transparent';

	    this.draw = function()
	    {
	        Context.fillStyle = this.fillStyle;
	        Context.strokeStyle = this.strokeStyle;
	        Context.lineWidth = this.lineWidth;
	        Context.beginPath();
	        Context.rect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
	        Context.stroke();
	        Context.fill();
	        Context.closePath();
	    }
	}

	module.exports = Rectangle;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	Container = __webpack_require__(24);

	function Sfx()
	{
	    this.audioAccelerate = new Container('sfx/accelerate.m4a');
	    this.audioAbsorb = new Container('sfx/absorb.m4a');
	    this.enabled = true;

	    this.toggle = function()
	    {
	        this.enabled = !this.enabled;
	    };

	    this.absorb = function()
	    {
	        if (!this.enabled) {
	            return;
	        }

	        this.audioAbsorb.play();
	    };

	    this.accelerate = function()
	    {
	        if (!this.enabled) {
	            return;
	        }

	        this.audioAccelerate.play();
	    };
	}

	module.exports = Sfx;


/***/ },
/* 24 */
/***/ function(module, exports) {

	function Container(src)
	{
	    this.audio = [
	        new Audio(src),
	        new Audio(src),
	        new Audio(src),
	        new Audio(src),
	        new Audio(src)
	    ];

	    this.play = function()
	    {
	        for (var i = 0; i < this.audio.length; i++) {
	            if (this.audio[i].paused) {
	                this.audio[i].play();
	                return;
	            }
	        }
	    };

	    this.pause = function()
	    {
	        for (var i = 0; i < this.audio.length; i++) {
	            this.audio[i].pause();
	        }
	    };
	}

	module.exports = Container;


/***/ },
/* 25 */
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