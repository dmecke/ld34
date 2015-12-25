/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(35);
	
	var game = new _Game2.default();
	
	game.run();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Menu_1 = __webpack_require__(2);
	var Level_1 = __webpack_require__(14);
	var Vector_1 = __webpack_require__(7);
	var Text_1 = __webpack_require__(5);
	var Sfx_1 = __webpack_require__(30);
	var Music_1 = __webpack_require__(32);
	var LevelDefinitions_1 = __webpack_require__(33);
	var Canvas_1 = __webpack_require__(4);
	var Context_1 = __webpack_require__(3);
	var Mouse_1 = __webpack_require__(11);
	var Keyboard_1 = __webpack_require__(16);
	var FPS_1 = __webpack_require__(34);
	var Settings_1 = __webpack_require__(9);
	var Game = (function () {
	    function Game() {
	        this.menu = new Menu_1["default"](this);
	        this.levels = [];
	        this.dimensions = new Vector_1["default"](Canvas_1["default"].width, Canvas_1["default"].height);
	        this.sfx = new Sfx_1["default"]();
	        this.music = new Music_1["default"]();
	        this.fps = new FPS_1["default"]();
	        this.screens = [];
	        this.screens.push(this.menu);
	    }
	    Game.prototype.run = function () {
	        Mouse_1["default"].init();
	        Keyboard_1["default"].init();
	        window.addEventListener('resize', function () {
	            Canvas_1["default"].width = window.innerWidth;
	            Canvas_1["default"].height = window.innerHeight;
	            this.dimensions = new Vector_1["default"](Canvas_1["default"].width, Canvas_1["default"].height);
	        }.bind(this));
	        for (var key in LevelDefinitions_1["default"]) {
	            if (LevelDefinitions_1["default"].hasOwnProperty(key)) {
	                var level = new Level_1["default"](this, LevelDefinitions_1["default"][key]);
	                this.screens.push(level);
	                if (window.localStorage.getItem('level_' + level.levelSettings.level)) {
	                    level.isFinished = true;
	                }
	                this.levels.push(level);
	            }
	        }
	        if (window.localStorage.getItem('disable_music') && window.localStorage.getItem('disable_music') == 'true') {
	            this.music.enabled = false;
	        }
	        if (window.localStorage.getItem('disable_sfx') && window.localStorage.getItem('disable_sfx') == 'true') {
	            this.sfx.enabled = false;
	        }
	        this.showMenu();
	        setInterval(this.loop.bind(this), 1000 / Game.FPS);
	    };
	    Game.prototype.loop = function () {
	        this.update();
	        this.render();
	        this.fps.tick();
	    };
	    Game.prototype.update = function () {
	        this.screens.forEach(function (screen) {
	            if (screen.isActive) {
	                screen.update();
	            }
	        });
	    };
	    Game.prototype.render = function () {
	        Context_1["default"].clearRect(0, 0, this.dimensions.x(), this.dimensions.y());
	        this.screens.forEach(function (screen) {
	            if (screen.isActive) {
	                screen.render();
	            }
	        });
	        new Text_1["default"](this.fps.toString())
	            .at(new Vector_1["default"](5, 15))
	            .leftAligned()
	            .withFillStyle(Settings_1["default"].white)
	            .draw();
	    };
	    Game.prototype.startLevel = function (level) {
	        this.menu.deactivate();
	        this.menu.hide();
	        this.currentLevel = level;
	        this.currentLevel.activate();
	        this.currentLevel.start();
	    };
	    Game.prototype.finishLevel = function () {
	        this.currentLevel.deactivate();
	        this.currentLevel.isFinished = true;
	        window.localStorage.setItem('level_' + this.currentLevel.levelSettings.level, true.toString());
	        this.currentLevel.cleanup();
	        this.currentLevel = undefined;
	    };
	    Game.prototype.showMenu = function () {
	        this.menu.activate();
	        this.menu.show();
	    };
	    Game.FPS = 60;
	    return Game;
	})();
	exports.__esModule = true;
	exports["default"] = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Context_1 = __webpack_require__(3);
	var Text_1 = __webpack_require__(5);
	var Circle_1 = __webpack_require__(8);
	var Vector_1 = __webpack_require__(7);
	var Settings_1 = __webpack_require__(9);
	var Mouse_1 = __webpack_require__(11);
	var GameScreen_1 = __webpack_require__(13);
	var Menu = (function (_super) {
	    __extends(Menu, _super);
	    function Menu() {
	        _super.apply(this, arguments);
	        this.background = new Image();
	        this.lock = new Image();
	        this.symbolSfx = new Image();
	        this.symbolMusic = new Image();
	    }
	    Menu.prototype.show = function () {
	        this.background.src = 'img/startscreen.jpg';
	        this.lock.src = 'img/lock.png';
	        this.symbolSfx.src = 'img/sfx.png';
	        this.symbolMusic.src = 'img/music.png';
	        this.game.music.playMenu();
	    };
	    Menu.prototype.hide = function () {
	        this.game.music.pauseMenu();
	    };
	    Menu.prototype.update = function () {
	        if (!Mouse_1["default"].clicked()) {
	            return;
	        }
	        Mouse_1["default"].timer.reset();
	        var level = this.levelAtPosition(Mouse_1["default"].position);
	        if (level && !level.isLocked()) {
	            this.game.startLevel(level);
	        }
	        if (this.mouseIsAtMusic()) {
	            this.game.music.toggle();
	        }
	        if (this.mouseIsAtSfx()) {
	            this.game.sfx.toggle();
	        }
	    };
	    Menu.prototype.render = function () {
	        Context_1["default"].clearRect(0, 0, this.game.dimensions.x(), this.game.dimensions.y());
	        Context_1["default"].drawImage(this.background, 0, 0, this.game.dimensions.x(), this.game.dimensions.y());
	        this.drawMusic();
	        this.drawSfx();
	        for (var i = 0; i < this.game.levels.length; i++) {
	            this.drawLevel(this.game.levels[i]);
	        }
	    };
	    Menu.prototype.drawMusic = function () {
	        var position = new Vector_1["default"](this.game.dimensions.x() - 50, 50);
	        new Circle_1["default"]()
	            .at(position)
	            .withRadius(25)
	            .withStrokeStyle(Settings_1["default"].white)
	            .withFillStyle(Settings_1["default"].blue.alpha(0.2))
	            .withLineWidth(2)
	            .draw();
	        Context_1["default"].drawImage(this.symbolMusic, position.x() - 15, position.y() - 18);
	        if (!this.game.music.enabled) {
	            new Text_1["default"]('X')
	                .at(position.add(new Vector_1["default"](1, 18)))
	                .withFontSize(44)
	                .withFont('Gloria Hallelujah')
	                .withStrokeStyle(Settings_1["default"].white)
	                .withFillStyle(Settings_1["default"].red)
	                .withLineWidth(5)
	                .draw();
	        }
	    };
	    Menu.prototype.drawSfx = function () {
	        var position = new Vector_1["default"](this.game.dimensions.x() - 50, 120);
	        new Circle_1["default"]()
	            .at(position)
	            .withRadius(25)
	            .withStrokeStyle(Settings_1["default"].white)
	            .withFillStyle(Settings_1["default"].blue.alpha(0.2))
	            .withLineWidth(2)
	            .draw();
	        Context_1["default"].drawImage(this.symbolSfx, position.x() - 19, position.y() - 18);
	        if (!this.game.sfx.enabled) {
	            new Text_1["default"]('X')
	                .at(position.add(new Vector_1["default"](1, 18)))
	                .withFontSize(44)
	                .withFont('Gloria Hallelujah')
	                .withStrokeStyle(Settings_1["default"].white)
	                .withFillStyle(Settings_1["default"].red)
	                .withLineWidth(5)
	                .draw();
	        }
	    };
	    Menu.prototype.positionByLevel = function (level) {
	        var row = Math.floor((level - 1) / 5);
	        return new Vector_1["default"](0, this.game.dimensions.y() / 3 * 2).add(new Vector_1["default"](this.game.dimensions.x() / 6 * ((level - 1) % 5 + 1), row * 120));
	    };
	    Menu.prototype.drawLevel = function (level) {
	        var position = this.positionByLevel(level.levelSettings.level);
	        new Circle_1["default"]()
	            .at(position)
	            .withRadius(50)
	            .withStrokeStyle(Settings_1["default"].white)
	            .withFillStyle(Settings_1["default"].blue.alpha(0.2))
	            .withLineWidth(2)
	            .draw();
	        if (level.isLocked()) {
	            Context_1["default"].drawImage(this.lock, position.x() - 29, position.y() - 44);
	        }
	        else {
	            new Text_1["default"](level.levelSettings.level.toString())
	                .at(position.add(new Vector_1["default"](0, 20)))
	                .withFontSize(52)
	                .withFont('Gloria Hallelujah')
	                .withStrokeStyle(Settings_1["default"].grey)
	                .withFillStyle(Settings_1["default"].white)
	                .withLineWidth(8)
	                .draw();
	        }
	    };
	    Menu.prototype.levelAtPosition = function (position) {
	        for (var i = 0; i < this.game.levels.length; i++) {
	            if (this.positionByLevel(this.game.levels[i].levelSettings.level).distanceTo(position) <= 50) {
	                return this.game.levels[i];
	            }
	        }
	        return null;
	    };
	    Menu.prototype.mouseIsAtMusic = function () {
	        var position = new Vector_1["default"](this.game.dimensions.x() - 50, 50);
	        return position.distanceTo(Mouse_1["default"].position) <= 50;
	    };
	    Menu.prototype.mouseIsAtSfx = function () {
	        var position = new Vector_1["default"](this.game.dimensions.x() - 50, 120);
	        return position.distanceTo(Mouse_1["default"].position) <= 50;
	    };
	    return Menu;
	})(GameScreen_1["default"]);
	exports.__esModule = true;
	exports["default"] = Menu;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Canvas_1 = __webpack_require__(4);
	var Context = Canvas_1["default"].getContext('2d');
	exports.__esModule = true;
	exports["default"] = Context;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var canvas = document.getElementById('canvas');
	exports.__esModule = true;
	exports["default"] = canvas;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Context_1 = __webpack_require__(3);
	var Shape_1 = __webpack_require__(6);
	var Text = (function (_super) {
	    __extends(Text, _super);
	    function Text(content) {
	        _super.call(this);
	        this.fontSize = 12;
	        this.font = 'Oswald';
	        this.textAlign = 'center';
	        this.lineHeight = 38;
	        this.content = content;
	    }
	    Text.prototype.withFont = function (font) {
	        this.font = font;
	        return this;
	    };
	    Text.prototype.withFontSize = function (fontSize) {
	        this.fontSize = fontSize;
	        return this;
	    };
	    Text.prototype.leftAligned = function () {
	        this.textAlign = 'left';
	        return this;
	    };
	    Text.prototype.withMaxWidth = function (maxWidth) {
	        this.maxWidth = maxWidth;
	        return this;
	    };
	    Text.prototype.draw = function () {
	        Context_1["default"].font = this.fontSize.toString() + 'px "' + this.font + '"';
	        Context_1["default"].fillStyle = this.fillStyle;
	        Context_1["default"].strokeStyle = this.strokeStyle;
	        Context_1["default"].lineWidth = this.lineWidth;
	        Context_1["default"].textAlign = this.textAlign;
	        var words = this.content.split(' ');
	        var line = '';
	        var y = this.position.y();
	        for (var word = 0; word < words.length; word++) {
	            var testLine = line + words[word] + ' ';
	            var metrics = Context_1["default"].measureText(testLine);
	            var testWidth = metrics.width;
	            if (this.maxWidth && testWidth > this.maxWidth) {
	                Context_1["default"].strokeText(line, this.position.x(), y);
	                Context_1["default"].fillText(line, this.position.x(), y);
	                line = words[word] + ' ';
	                y += this.lineHeight;
	            }
	            else {
	                line = testLine;
	            }
	        }
	        Context_1["default"].strokeText(line.trim(), this.position.x(), y);
	        Context_1["default"].fillText(line.trim(), this.position.x(), y);
	    };
	    return Text;
	})(Shape_1["default"]);
	exports.__esModule = true;
	exports["default"] = Text;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Shape = (function () {
	    function Shape() {
	        this.position = new Vector_1["default"](0, 0);
	        this.strokeStyle = 'transparent';
	        this.fillStyle = 'transparent';
	        this.lineWidth = 1;
	    }
	    Shape.prototype.at = function (position) {
	        this.position = position;
	        return this;
	    };
	    Shape.prototype.withStrokeStyle = function (color) {
	        this.strokeStyle = color.toString();
	        return this;
	    };
	    Shape.prototype.withFillStyle = function (color) {
	        this.fillStyle = color.toString();
	        return this;
	    };
	    Shape.prototype.withLineWidth = function (lineWidth) {
	        this.lineWidth = lineWidth;
	        return this;
	    };
	    return Shape;
	})();
	exports.__esModule = true;
	exports["default"] = Shape;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Vector = (function () {
	    function Vector(x, y) {
	        this.components = [x, y];
	    }
	    Vector.prototype.x = function () {
	        return this.components[0];
	    };
	    Vector.prototype.y = function () {
	        return this.components[1];
	    };
	    Vector.prototype.add = function (vector) {
	        return new Vector(this.components[0] + vector.x(), this.components[1] + vector.y());
	    };
	    Vector.prototype.subtract = function (vector) {
	        return new Vector(this.components[0] - vector.x(), this.components[1] - vector.y());
	    };
	    Vector.prototype.multiply = function (multiplier) {
	        return new Vector(this.components[0] * multiplier, this.components[1] * multiplier);
	    };
	    Vector.prototype.divide = function (divisor) {
	        return new Vector(this.components[0] / divisor, this.components[1] / divisor);
	    };
	    Vector.prototype.length = function () {
	        return Math.sqrt(this.components[0] * this.components[0] + this.components[1] * this.components[1]);
	    };
	    Vector.prototype.distanceTo = function (vector) {
	        var diffX = this.components[0] - vector.x();
	        var diffY = this.components[1] - vector.y();
	        return Math.sqrt(diffX * diffX + diffY * diffY);
	    };
	    Vector.prototype.normalize = function () {
	        return this.divide(this.length());
	    };
	    Vector.prototype.dot = function (vector) {
	        return this.x() * vector.x() + this.y() * vector.y();
	    };
	    Vector.prototype.limit = function (limit) {
	        if (this.length() <= limit) {
	            return new Vector(this.components[0], this.components[1]);
	        }
	        return this.normalize().multiply(limit);
	    };
	    Vector.prototype.rotateByDegress = function (degrees) {
	        return this.rotateByRadians(degrees * Math.PI / 180);
	    };
	    Vector.prototype.rotateByRadians = function (radians) {
	        var ca = Math.cos(radians);
	        var sa = Math.sin(radians);
	        var length = this.length();
	        var vector = new Vector(Math.round(ca * this.components[0] - sa * this.components[1]), Math.round(sa * this.components[0] + ca * this.components[1]));
	        return vector.normalize().multiply(length);
	    };
	    Vector.prototype.mirror = function (vector) {
	        var normal = vector.normalize();
	        var dotProduct = normal.dot(this);
	        return this.subtract(normal.multiply(2).multiply(dotProduct));
	    };
	    return Vector;
	})();
	exports.__esModule = true;
	exports["default"] = Vector;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Context_1 = __webpack_require__(3);
	var Shape_1 = __webpack_require__(6);
	var Circle = (function (_super) {
	    __extends(Circle, _super);
	    function Circle() {
	        _super.apply(this, arguments);
	        this.radius = 10;
	    }
	    Circle.prototype.withRadius = function (radius) {
	        this.radius = radius;
	        return this;
	    };
	    Circle.prototype.draw = function () {
	        Context_1["default"].fillStyle = this.fillStyle.toString();
	        Context_1["default"].strokeStyle = this.strokeStyle.toString();
	        Context_1["default"].lineWidth = this.lineWidth;
	        Context_1["default"].beginPath();
	        Context_1["default"].arc(this.position.x(), this.position.y(), this.radius, 0, 2 * Math.PI);
	        Context_1["default"].stroke();
	        Context_1["default"].fill();
	        Context_1["default"].closePath();
	    };
	    return Circle;
	})(Shape_1["default"]);
	exports.__esModule = true;
	exports["default"] = Circle;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Color_1 = __webpack_require__(10);
	var Settings = {
	    white: Color_1["default"].rgb(255, 255, 255),
	    grey: Color_1["default"].rgb(55, 73, 89),
	    blue: Color_1["default"].rgb(4, 97, 182),
	    green: Color_1["default"].rgb(99, 170, 51),
	    red: Color_1["default"].rgb(207, 39, 39),
	    yellow: Color_1["default"].rgb(234, 197, 27),
	    purple: Color_1["default"].rgb(222, 0, 255),
	    CELL_TYPE_PLAYER: 1,
	    CELL_TYPE_SIMPLE: 2,
	    CELL_TYPE_ABSORB: 3,
	    CELL_TYPE_DIRECTION: 4,
	    CELL_TYPE_ESCAPER: 5
	};
	exports.__esModule = true;
	exports["default"] = Settings;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var Color = (function () {
	    function Color(red, green, blue, alpha) {
	        this.red = red;
	        this.green = green;
	        this.blue = blue;
	        this.alphaChannel = alpha;
	    }
	    Color.rgb = function (red, green, blue) {
	        return new Color(red, green, blue, 1);
	    };
	    Color.rgba = function (red, green, blue, alpha) {
	        return new Color(red, green, blue, alpha);
	    };
	    Color.hex = function (code) {
	        var chars = code.split('');
	        var red = parseInt(chars[0], 16);
	        var green = parseInt(chars[1], 16);
	        var blue = parseInt(chars[2], 16);
	        return Color.rgb(red, green, blue);
	    };
	    Color.prototype.alpha = function (alpha) {
	        return Color.rgba(this.red, this.green, this.blue, alpha);
	    };
	    Color.prototype.toString = function () {
	        return 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.alphaChannel + ')';
	    };
	    return Color;
	})();
	exports.__esModule = true;
	exports["default"] = Color;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Canvas_1 = __webpack_require__(4);
	var Timer_1 = __webpack_require__(12);
	var Mouse = (function () {
	    function Mouse() {
	    }
	    Mouse.init = function () {
	        document.addEventListener('mousemove', Mouse.mouseMove.bind(this), true);
	        document.addEventListener('mousedown', Mouse.mouseDown.bind(this), true);
	        document.addEventListener('mouseup', Mouse.mouseUp.bind(this), true);
	        document.addEventListener('touchstart', Mouse.touchStart.bind(this), true);
	        document.addEventListener('touchend', Mouse.touchEnd.bind(this), true);
	        setInterval(function () {
	            Mouse.timer.update();
	        }, 1 / 30);
	    };
	    Mouse.mouseMove = function (event) {
	        Mouse.updatePosition(new Vector_1["default"](event.clientX, event.clientY));
	    };
	    Mouse.updatePosition = function (position) {
	        var canvasRect = Canvas_1["default"].getBoundingClientRect();
	        Mouse.position = position.subtract(new Vector_1["default"](canvasRect.left, canvasRect.top));
	        Mouse.onMoveCallbacks.forEach(function (callback) {
	            callback();
	        });
	    };
	    Mouse.mouseDown = function () {
	        Mouse.click = true;
	    };
	    Mouse.mouseUp = function () {
	        Mouse.click = false;
	    };
	    Mouse.touchStart = function (event) {
	        Mouse.updatePosition(new Vector_1["default"](event.changedTouches[0].pageX, event.changedTouches[0].pageY));
	        Mouse.mouseDown();
	    };
	    Mouse.touchEnd = function () {
	        Mouse.mouseUp();
	    };
	    Mouse.onMove = function (callback) {
	        Mouse.onMoveCallbacks.push(callback);
	    };
	    Mouse.clicked = function () {
	        return Mouse.click && Mouse.timer.isReady();
	    };
	    Mouse.position = new Vector_1["default"](0, 0);
	    Mouse.click = false;
	    Mouse.timer = new Timer_1["default"](30);
	    Mouse.onMoveCallbacks = [];
	    return Mouse;
	})();
	exports.__esModule = true;
	exports["default"] = Mouse;


/***/ },
/* 12 */
/***/ function(module, exports) {

	var Timer = (function () {
	    function Timer(maximum) {
	        this.maximum = maximum;
	        this.current = maximum;
	    }
	    Timer.prototype.reset = function () {
	        this.current = this.maximum;
	    };
	    Timer.prototype.isReady = function () {
	        return this.current == 0;
	    };
	    Timer.prototype.update = function () {
	        this.current = Math.max(0, this.current - 1);
	    };
	    return Timer;
	})();
	exports.__esModule = true;
	exports["default"] = Timer;


/***/ },
/* 13 */
/***/ function(module, exports) {

	var GameScreen = (function () {
	    function GameScreen(game) {
	        this.isActive = false;
	        this.game = game;
	    }
	    GameScreen.prototype.activate = function () {
	        this.isActive = true;
	    };
	    GameScreen.prototype.deactivate = function () {
	        this.isActive = false;
	    };
	    return GameScreen;
	})();
	exports.__esModule = true;
	exports["default"] = GameScreen;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Context_1 = __webpack_require__(3);
	var Player_1 = __webpack_require__(15);
	var Vector_1 = __webpack_require__(7);
	var Ui_1 = __webpack_require__(23);
	var Settings_1 = __webpack_require__(9);
	var Factory_1 = __webpack_require__(25);
	var GameScreen_1 = __webpack_require__(13);
	var Level = (function (_super) {
	    __extends(Level, _super);
	    function Level(game, levelSettings) {
	        _super.call(this, game);
	        this.cells = [];
	        this.ui = new Ui_1["default"](this);
	        this.background = new Image();
	        this.showObjectives = true;
	        this.showScore = false;
	        this.isFinished = false;
	        this.collectedCells = 0;
	        this.levelSettings = levelSettings;
	    }
	    Level.prototype.start = function () {
	        this.setup();
	    };
	    Level.prototype.update = function () {
	        this.ui.update();
	        if (this.paused()) {
	            return;
	        }
	        this.player.update();
	        for (var i = 0; i < this.cells.length; i++) {
	            this.cells[i].update();
	        }
	        this.checkWinningConditions();
	    };
	    Level.prototype.render = function () {
	        Context_1["default"].clearRect(0, 0, this.game.dimensions.x(), this.game.dimensions.y());
	        Context_1["default"].drawImage(this.background, 0, 0, this.game.dimensions.x(), this.game.dimensions.y());
	        this.player.render();
	        for (var i = 0; i < this.cells.length; i++) {
	            this.cells[i].render();
	        }
	        this.ui.render();
	    };
	    Level.prototype.setup = function () {
	        var numberOfCells = 10;
	        if (this.levelSettings.setup) {
	            var setup = this.levelSettings.setup;
	            if (setup.numberOfCells) {
	                numberOfCells = setup.numberOfCells;
	            }
	        }
	        for (var i = 0; i < numberOfCells; i++) {
	            var position = new Vector_1["default"](Math.random() * this.game.dimensions.x(), Math.random() * this.game.dimensions.y());
	            var velocity = new Vector_1["default"](Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
	            var mass = Math.random() * 10 + 5;
	            var type = Settings_1["default"].CELL_TYPE_SIMPLE;
	            if (setup && setup.cells && setup.cells[i]) {
	                if (setup.cells[i].position) {
	                    position = setup.cells[i].position;
	                }
	                if (setup.cells[i].velocity) {
	                    velocity = setup.cells[i].velocity;
	                }
	                if (setup.cells[i].mass) {
	                    mass = setup.cells[i].mass;
	                }
	                if (setup.cells[i].type) {
	                    type = setup.cells[i].type;
	                }
	            }
	            this.cells.push(Factory_1["default"].create(type, this, position, velocity, mass));
	        }
	        var background = this.levelSettings.level % 10;
	        this.background.src = 'img/background/' + background + '.jpg';
	        this.game.music.playLevel(this.levelSettings.level);
	        this.player = new Player_1["default"](this);
	    };
	    Level.prototype.checkWinningConditions = function () {
	        var conditions = this.levelSettings.winningConditions;
	        var solved = true;
	        if (conditions.mass && this.player.mass < conditions.mass) {
	            solved = false;
	        }
	        if (conditions.cells && this.collectedCells < conditions.cells) {
	            solved = false;
	        }
	        if (solved) {
	            this.showScore = true;
	        }
	    };
	    Level.prototype.cleanup = function () {
	        this.collectedCells = 0;
	        this.cells = [];
	        this.showScore = false;
	        this.showObjectives = true;
	        this.game.music.pauseLevel(this.levelSettings.level);
	    };
	    Level.prototype.paused = function () {
	        return this.showObjectives || this.showScore;
	    };
	    Level.prototype.isLocked = function () {
	        return this.levelSettings.level > 1 && this.previousLevel().isFinished == false;
	    };
	    Level.prototype.previousLevel = function () {
	        for (var i = 0; i < this.game.levels.length; i++) {
	            if (this.game.levels[i].levelSettings.level == this.levelSettings.level - 1) {
	                return this.game.levels[i];
	            }
	        }
	        return null;
	    };
	    return Level;
	})(GameScreen_1["default"]);
	exports.__esModule = true;
	exports["default"] = Level;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Vector_1 = __webpack_require__(7);
	var Mouse_1 = __webpack_require__(11);
	var Keyboard_1 = __webpack_require__(16);
	var PlayerGraphic_1 = __webpack_require__(17);
	var MovingObject_1 = __webpack_require__(19);
	var PlayerCell_1 = __webpack_require__(20);
	var Player = (function (_super) {
	    __extends(Player, _super);
	    function Player(level) {
	        _super.call(this, new Vector_1["default"](400, 300), 20, new Vector_1["default"](0, 0));
	        this.minimumMass = 10;
	        this.graphic = new PlayerGraphic_1["default"]();
	        this.level = level;
	    }
	    Player.prototype.update = function () {
	        this.checkCollision();
	        this.processUserInput();
	        _super.prototype.update.call(this);
	    };
	    Player.prototype.render = function () {
	        this.graphic.draw(this.position, this.minimumMass, this.radius());
	    };
	    Player.prototype.checkCollision = function () {
	        for (var i = 0; i < this.level.cells.length; i++) {
	            var cell = this.level.cells[i];
	            this.checkCollisionAt(this.position, cell, i);
	        }
	    };
	    Player.prototype.checkCollisionAt = function (position, cell, index) {
	        if (this.collidesWithCell(position, cell)) {
	            this.incorporateCell(position, cell, index);
	        }
	    };
	    Player.prototype.collidesWithCell = function (position, cell) {
	        return cell.position.distanceTo(position) < this.radius() + cell.radius();
	    };
	    Player.prototype.incorporateCell = function (position, cell, index) {
	        //var overallMomentum = this.momentum().add(cell.momentum());
	        //this.velocity = overallMomentum.divide(this.mass);
	        this.addMass(cell.mass * cell.massSign());
	        this.level.cells.splice(index, 1);
	        this.level.game.sfx.absorb();
	        if (cell.isForeign()) {
	            this.level.collectedCells++;
	        }
	        //var diff = 0.1;
	        //this.addMass(diff * cell.massSign());
	        //cell.mass -= diff;
	        //if (cell.mass <= 0) {
	        //    this.level.cells.splice(index, 1);
	        //    this.level.game.sfx.absorb();
	        //    if (cell.isForeign()) {
	        //        this.level.collectedCells++;
	        //    }
	        //}
	    };
	    Player.prototype.processUserInput = function () {
	        if (!this.accelerationActive()) {
	            return;
	        }
	        if (this.mass == this.minimumMass) {
	            return;
	        }
	        var emittedMass = Math.max(0.1, this.mass * 0.1);
	        var direction = this.movementDirection();
	        var force = direction.multiply(-1).multiply(emittedMass).divide(this.mass);
	        this.addMass(-emittedMass);
	        var cell = new PlayerCell_1["default"](this.level, new Vector_1["default"](0, 0), this.velocity, emittedMass);
	        cell.position = this.position.add(direction.multiply(this.radius() + cell.radius()));
	        this.velocity = this.velocity.add(force);
	        this.level.cells.push(cell);
	        this.level.game.sfx.accelerate();
	    };
	    Player.prototype.addMass = function (amount) {
	        this.mass = Math.max(this.minimumMass, this.mass + amount);
	    };
	    Player.prototype.accelerationActive = function () {
	        if (this.level.levelSettings.level == 5) {
	            this.velocity = Keyboard_1["default"].direction.normalize();
	            return false;
	        }
	        var clicked = Mouse_1["default"].clicked();
	        if (clicked) {
	            Mouse_1["default"].timer.reset();
	        }
	        return clicked;
	    };
	    Player.prototype.movementDirection = function () {
	        if (this.level.levelSettings.level == 5) {
	            return Keyboard_1["default"].direction.normalize();
	        }
	        return Mouse_1["default"].position.subtract(this.position).normalize();
	    };
	    return Player;
	})(MovingObject_1["default"]);
	exports.__esModule = true;
	exports["default"] = Player;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Timer_1 = __webpack_require__(12);
	var Vector_1 = __webpack_require__(7);
	var Keyboard = (function () {
	    function Keyboard() {
	    }
	    Keyboard.init = function () {
	        document.addEventListener('keydown', Keyboard.keyDown.bind(this), true);
	        setInterval(function () {
	            Keyboard.timer.update();
	        }, 1 / 30);
	    };
	    Keyboard.keyDown = function (event) {
	        Keyboard.steer(event.keyCode);
	    };
	    Keyboard.steer = function (keyCode) {
	        if (!Keyboard.timer.isReady()) {
	            return;
	        }
	        if (keyCode == Keyboard.KEY_A) {
	            Keyboard.direction = Keyboard.direction.rotateByDegress(-45);
	            Keyboard.timer.reset();
	        }
	        if (keyCode == Keyboard.KEY_D) {
	            Keyboard.direction = Keyboard.direction.rotateByDegress(45);
	            Keyboard.timer.reset();
	        }
	    };
	    Keyboard.KEY_A = 65;
	    Keyboard.KEY_D = 68;
	    Keyboard.direction = new Vector_1["default"](1, 0);
	    Keyboard.timer = new Timer_1["default"](30);
	    return Keyboard;
	})();
	exports.__esModule = true;
	exports["default"] = Keyboard;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Circle_1 = __webpack_require__(8);
	var Settings_1 = __webpack_require__(9);
	var PulsatingCircle_1 = __webpack_require__(18);
	var PlayerGraphic = (function () {
	    function PlayerGraphic() {
	        this.border = new PulsatingCircle_1["default"]();
	    }
	    PlayerGraphic.prototype.draw = function (position, innerRadius, outerRadius) {
	        this.drawPlayer(position, innerRadius);
	        this.drawPlayer(position, outerRadius);
	        this.border
	            .at(position)
	            .withRadius(outerRadius + 1)
	            .withStrokeStyle(Settings_1["default"].white)
	            .draw();
	    };
	    PlayerGraphic.prototype.drawPlayer = function (position, radius) {
	        new Circle_1["default"]()
	            .at(position)
	            .withRadius(radius)
	            .withStrokeStyle(Settings_1["default"].blue)
	            .withFillStyle(Settings_1["default"].blue.alpha(0.2))
	            .withLineWidth(2)
	            .draw();
	    };
	    return PlayerGraphic;
	})();
	exports.__esModule = true;
	exports["default"] = PlayerGraphic;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Circle_1 = __webpack_require__(8);
	var PulsatingCircle = (function (_super) {
	    __extends(PulsatingCircle, _super);
	    function PulsatingCircle() {
	        _super.apply(this, arguments);
	        this.alpha = 0.5;
	        this.alphaFlag = true;
	    }
	    PulsatingCircle.prototype.draw = function () {
	        this.updateTransparency();
	        this.withStrokeStyle(this.pulsatingColor.alpha(this.alpha));
	        _super.prototype.draw.call(this);
	    };
	    PulsatingCircle.prototype.withStrokeStyle = function (color) {
	        this.pulsatingColor = color;
	        _super.prototype.withStrokeStyle.call(this, color);
	        return this;
	    };
	    PulsatingCircle.prototype.updateTransparency = function () {
	        if (this.alphaFlag) {
	            this.alpha += 0.005;
	        }
	        else {
	            this.alpha -= 0.005;
	        }
	        if (this.alpha >= 0.8 || this.alpha <= 0.2) {
	            this.alphaFlag = !this.alphaFlag;
	        }
	    };
	    return PulsatingCircle;
	})(Circle_1["default"]);
	exports.__esModule = true;
	exports["default"] = PulsatingCircle;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var MovingObject = (function () {
	    function MovingObject(position, mass, velocity) {
	        this.position = position;
	        this.mass = mass;
	        this.velocity = velocity;
	    }
	    MovingObject.prototype.update = function () {
	        this.position = this.position.add(this.velocity);
	        this.reflectAtWalls();
	    };
	    MovingObject.prototype.momentum = function () {
	        return this.velocity.multiply(this.mass);
	    };
	    MovingObject.prototype.radius = function () {
	        return this.mass;
	    };
	    MovingObject.prototype.reflectAtWalls = function () {
	        if (this.position.x() > this.level.game.dimensions.x() - this.radius()) {
	            this.velocity = this.velocity.mirror(new Vector_1["default"](1, 0));
	            var ueberlappung = this.position.x() + this.radius() - this.level.game.dimensions.x();
	            this.position = this.position.subtract(new Vector_1["default"](2 * ueberlappung, 0));
	        }
	        if (this.position.y() > this.level.game.dimensions.y() - this.radius()) {
	            this.velocity = this.velocity.mirror(new Vector_1["default"](0, 1));
	            var ueberlappung = this.position.y() + this.radius() - this.level.game.dimensions.y();
	            this.position = this.position.subtract(new Vector_1["default"](0, 2 * ueberlappung));
	        }
	        if (this.position.x() < this.radius()) {
	            this.velocity = this.velocity.mirror(new Vector_1["default"](1, 0));
	            this.position = this.position.add(new Vector_1["default"](2 * (this.radius() - this.position.x()), 0));
	        }
	        if (this.position.y() < this.radius()) {
	            this.velocity = this.velocity.mirror(new Vector_1["default"](0, 1));
	            this.position = this.position.add(new Vector_1["default"](0, 2 * (this.radius() - this.position.y())));
	        }
	    };
	    ;
	    return MovingObject;
	})();
	exports.__esModule = true;
	exports["default"] = MovingObject;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Settings_1 = __webpack_require__(9);
	var Cell_1 = __webpack_require__(21);
	var PlayerCell = (function (_super) {
	    __extends(PlayerCell, _super);
	    function PlayerCell() {
	        _super.apply(this, arguments);
	    }
	    PlayerCell.prototype.color = function () {
	        return Settings_1["default"].blue;
	    };
	    PlayerCell.prototype.isForeign = function () {
	        return false;
	    };
	    return PlayerCell;
	})(Cell_1["default"]);
	exports.__esModule = true;
	exports["default"] = PlayerCell;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var MovingObject_1 = __webpack_require__(19);
	var CellGraphics_1 = __webpack_require__(22);
	var Cell = (function (_super) {
	    __extends(Cell, _super);
	    function Cell(level, position, velocity, mass) {
	        _super.call(this, position, mass, velocity);
	        this.graphic = new CellGraphics_1["default"]();
	        this.level = level;
	    }
	    Cell.prototype.update = function () {
	        _super.prototype.update.call(this);
	    };
	    Cell.prototype.render = function () {
	        this.graphic.draw(this.position, this.radius(), this.color());
	    };
	    Cell.prototype.isForeign = function () {
	        return true;
	    };
	    Cell.prototype.massSign = function () {
	        return 1;
	    };
	    return Cell;
	})(MovingObject_1["default"]);
	exports.__esModule = true;
	exports["default"] = Cell;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Settings_1 = __webpack_require__(9);
	var Circle_1 = __webpack_require__(8);
	var PulsatingCircle_1 = __webpack_require__(18);
	var CellGraphics = (function () {
	    function CellGraphics() {
	        this.border = new PulsatingCircle_1["default"]();
	    }
	    CellGraphics.prototype.draw = function (position, radius, color) {
	        new Circle_1["default"]()
	            .at(position)
	            .withRadius(radius)
	            .withStrokeStyle(color)
	            .withFillStyle(color.alpha(0.3))
	            .withLineWidth(3)
	            .draw();
	        this.border
	            .at(position)
	            .withRadius(radius + 1)
	            .withStrokeStyle(Settings_1["default"].white)
	            .draw();
	    };
	    return CellGraphics;
	})();
	exports.__esModule = true;
	exports["default"] = CellGraphics;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Text_1 = __webpack_require__(5);
	var Rectangle_1 = __webpack_require__(24);
	var Settings_1 = __webpack_require__(9);
	var Mouse_1 = __webpack_require__(11);
	var Ui = (function () {
	    function Ui(level) {
	        this.level = level;
	    }
	    Ui.prototype.render = function () {
	        this.drawHud();
	        this.showObjectives();
	        this.showScore();
	    };
	    Ui.prototype.update = function () {
	        if (!Mouse_1["default"].clicked()) {
	            return;
	        }
	        if (Mouse_1["default"].position.x() >= 210 &&
	            Mouse_1["default"].position.x() <= 290 &&
	            Mouse_1["default"].position.y() >= this.level.game.dimensions.y() - 35 &&
	            Mouse_1["default"].position.y() <= this.level.game.dimensions.y() - 15) {
	            Mouse_1["default"].timer.reset();
	            this.level.cleanup();
	            this.level.game.showMenu();
	        }
	    };
	    Ui.prototype.drawHud = function () {
	        var winningConditions = this.level.levelSettings.winningConditions;
	        new Rectangle_1["default"]()
	            .at(new Vector_1["default"](150, this.level.game.dimensions.y() - 25))
	            .withWidth(300)
	            .withHeight(50)
	            .withStrokeStyle(Settings_1["default"].white)
	            .withFillStyle(Settings_1["default"].white.alpha(0.6))
	            .withLineWidth(2)
	            .draw();
	        var cellsText = 'Cells collected: ' + this.level.collectedCells;
	        if (winningConditions.cells) {
	            cellsText += ' (' + winningConditions.cells + ' needed)';
	        }
	        new Text_1["default"](cellsText)
	            .at(new Vector_1["default"](10, this.level.game.dimensions.y() - 10))
	            .withFontSize(14)
	            .leftAligned()
	            .withFillStyle(Settings_1["default"].blue)
	            .draw();
	        var massText = 'Mass: ' + Math.floor(this.level.player.mass);
	        if (winningConditions.mass) {
	            massText += ' (' + winningConditions.mass + ' needed)';
	        }
	        new Text_1["default"](massText)
	            .at(new Vector_1["default"](10, this.level.game.dimensions.y() - 30))
	            .withFontSize(14)
	            .leftAligned()
	            .withFillStyle(Settings_1["default"].blue)
	            .draw();
	        new Rectangle_1["default"]()
	            .at(new Vector_1["default"](250, this.level.game.dimensions.y() - 25))
	            .withWidth(80)
	            .withHeight(20)
	            .withStrokeStyle(Settings_1["default"].red)
	            .withFillStyle(Settings_1["default"].red.alpha(0.2))
	            .draw();
	        new Text_1["default"]('back to menu')
	            .at(new Vector_1["default"](250, this.level.game.dimensions.y() - 19))
	            .withFontSize(14)
	            .withFillStyle(Settings_1["default"].red)
	            .draw();
	    };
	    Ui.prototype.showObjectives = function () {
	        if (!this.level.showObjectives) {
	            return;
	        }
	        this.drawWindow();
	        new Text_1["default"](this.level.levelSettings.intro)
	            .at(this.level.game.dimensions.divide(2).subtract(new Vector_1["default"](0, 100)))
	            .withFontSize(18)
	            .withFont('Gloria Hallelujah')
	            .withStrokeStyle(Settings_1["default"].grey)
	            .withFillStyle(Settings_1["default"].white)
	            .withMaxWidth(350)
	            .withLineWidth(5)
	            .draw();
	        this.drawContinueText('Click to start!');
	        if (Mouse_1["default"].clicked()) {
	            Mouse_1["default"].timer.reset();
	            this.level.showObjectives = false;
	        }
	    };
	    Ui.prototype.showScore = function () {
	        if (!this.level.showScore) {
	            return;
	        }
	        this.drawWindow();
	        new Text_1["default"]('You made it!')
	            .at(this.level.game.dimensions.divide(2).subtract(new Vector_1["default"](0, 50)))
	            .withFontSize(28)
	            .withFont('Gloria Hallelujah')
	            .withStrokeStyle(Settings_1["default"].grey)
	            .withFillStyle(Settings_1["default"].white)
	            .withLineWidth(5)
	            .withMaxWidth(350)
	            .draw();
	        this.drawContinueText('Click to return to main menu!');
	        if (Mouse_1["default"].clicked()) {
	            Mouse_1["default"].timer.reset();
	            this.level.game.finishLevel();
	            this.level.game.showMenu();
	        }
	    };
	    Ui.prototype.drawWindow = function () {
	        new Rectangle_1["default"]()
	            .at(this.level.game.dimensions.divide(2))
	            .withWidth(400)
	            .withHeight(300)
	            .withStrokeStyle(Settings_1["default"].white)
	            .withLineWidth(2)
	            .withFillStyle(Settings_1["default"].white.alpha(0.6))
	            .draw();
	    };
	    Ui.prototype.drawContinueText = function (text) {
	        new Text_1["default"](text)
	            .at(this.level.game.dimensions.divide(2).add(new Vector_1["default"](0, 120)))
	            .withFontSize(18)
	            .withFont('Gloria Hallelujah')
	            .withStrokeStyle(Settings_1["default"].grey)
	            .withFillStyle(Settings_1["default"].white)
	            .withLineWidth(4)
	            .draw();
	    };
	    return Ui;
	})();
	exports.__esModule = true;
	exports["default"] = Ui;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Context_1 = __webpack_require__(3);
	var Vector_1 = __webpack_require__(7);
	var Shape_1 = __webpack_require__(6);
	var Rectangle = (function (_super) {
	    __extends(Rectangle, _super);
	    function Rectangle() {
	        _super.apply(this, arguments);
	        this.width = 10;
	        this.height = 10;
	    }
	    Rectangle.prototype.withWidth = function (width) {
	        this.width = width;
	        return this;
	    };
	    Rectangle.prototype.withHeight = function (height) {
	        this.height = height;
	        return this;
	    };
	    Rectangle.prototype.draw = function () {
	        var position = this.position.subtract(new Vector_1["default"](this.width / 2, this.height / 2));
	        Context_1["default"].fillStyle = this.fillStyle;
	        Context_1["default"].strokeStyle = this.strokeStyle;
	        Context_1["default"].lineWidth = this.lineWidth;
	        Context_1["default"].beginPath();
	        Context_1["default"].rect(position.x(), position.y(), this.width, this.height);
	        Context_1["default"].stroke();
	        Context_1["default"].fill();
	        Context_1["default"].closePath();
	    };
	    return Rectangle;
	})(Shape_1["default"]);
	exports.__esModule = true;
	exports["default"] = Rectangle;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Settings_1 = __webpack_require__(9);
	var PlayerCell_1 = __webpack_require__(20);
	var SimpleCell_1 = __webpack_require__(26);
	var AbsorberCell_1 = __webpack_require__(27);
	var DirectionCell_1 = __webpack_require__(28);
	var EscaperCell_1 = __webpack_require__(29);
	var Factory = (function () {
	    function Factory() {
	    }
	    Factory.create = function (type, level, position, velocity, mass) {
	        switch (type) {
	            case Settings_1["default"].CELL_TYPE_PLAYER:
	                return new PlayerCell_1["default"](level, position, velocity, mass);
	            case Settings_1["default"].CELL_TYPE_SIMPLE:
	                return new SimpleCell_1["default"](level, position, velocity, mass);
	            case Settings_1["default"].CELL_TYPE_ABSORB:
	                return new AbsorberCell_1["default"](level, position, velocity, mass);
	            case Settings_1["default"].CELL_TYPE_DIRECTION:
	                return new DirectionCell_1["default"](level, position, velocity, mass);
	            case Settings_1["default"].CELL_TYPE_ESCAPER:
	                return new EscaperCell_1["default"](level, position, velocity, mass);
	        }
	    };
	    return Factory;
	})();
	exports.__esModule = true;
	exports["default"] = Factory;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Settings_1 = __webpack_require__(9);
	var Cell_1 = __webpack_require__(21);
	var SimpleCell = (function (_super) {
	    __extends(SimpleCell, _super);
	    function SimpleCell() {
	        _super.apply(this, arguments);
	    }
	    SimpleCell.prototype.color = function () {
	        return Settings_1["default"].green;
	    };
	    return SimpleCell;
	})(Cell_1["default"]);
	exports.__esModule = true;
	exports["default"] = SimpleCell;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Settings_1 = __webpack_require__(9);
	var Cell_1 = __webpack_require__(21);
	var AbsorberCell = (function (_super) {
	    __extends(AbsorberCell, _super);
	    function AbsorberCell() {
	        _super.apply(this, arguments);
	    }
	    AbsorberCell.prototype.color = function () {
	        return Settings_1["default"].red;
	    };
	    AbsorberCell.prototype.massSign = function () {
	        return -1;
	    };
	    return AbsorberCell;
	})(Cell_1["default"]);
	exports.__esModule = true;
	exports["default"] = AbsorberCell;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Settings_1 = __webpack_require__(9);
	var Cell_1 = __webpack_require__(21);
	var Vector_1 = __webpack_require__(7);
	var DirectionCell = (function (_super) {
	    __extends(DirectionCell, _super);
	    function DirectionCell() {
	        _super.apply(this, arguments);
	    }
	    DirectionCell.prototype.color = function () {
	        return Settings_1["default"].yellow;
	    };
	    DirectionCell.prototype.update = function () {
	        if (Math.random() < 0.005) {
	            this.velocity = new Vector_1["default"](Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
	        }
	        _super.prototype.update.call(this);
	    };
	    return DirectionCell;
	})(Cell_1["default"]);
	exports.__esModule = true;
	exports["default"] = DirectionCell;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Settings_1 = __webpack_require__(9);
	var Cell_1 = __webpack_require__(21);
	var EscaperCell = (function (_super) {
	    __extends(EscaperCell, _super);
	    function EscaperCell() {
	        _super.apply(this, arguments);
	    }
	    EscaperCell.prototype.color = function () {
	        return Settings_1["default"].purple;
	    };
	    EscaperCell.prototype.update = function () {
	        var toPlayer = this.position.subtract(this.level.player.position);
	        if (toPlayer.length() < 100) {
	            this.velocity = toPlayer.normalize().multiply(this.velocity.length());
	        }
	        _super.prototype.update.call(this);
	    };
	    return EscaperCell;
	})(Cell_1["default"]);
	exports.__esModule = true;
	exports["default"] = EscaperCell;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var Container_1 = __webpack_require__(31);
	var Sfx = (function () {
	    function Sfx() {
	        this.audioAccelerate = new Container_1["default"]('sfx/accelerate.mp3');
	        this.audioAbsorb = new Container_1["default"]('sfx/absorb.mp3');
	        this.enabled = true;
	    }
	    Sfx.prototype.toggle = function () {
	        this.enabled = !this.enabled;
	        window.localStorage.setItem('disable_sfx', (!this.enabled).toString());
	    };
	    Sfx.prototype.absorb = function () {
	        if (!this.enabled) {
	            return;
	        }
	        this.audioAbsorb.play();
	    };
	    Sfx.prototype.accelerate = function () {
	        if (!this.enabled) {
	            return;
	        }
	        this.audioAccelerate.play();
	    };
	    return Sfx;
	})();
	exports.__esModule = true;
	exports["default"] = Sfx;


/***/ },
/* 31 */
/***/ function(module, exports) {

	var Container = (function () {
	    function Container(src) {
	        this.audio = [
	            new Audio(src),
	            new Audio(src),
	            new Audio(src),
	            new Audio(src),
	            new Audio(src)
	        ];
	    }
	    Container.prototype.play = function () {
	        for (var i = 0; i < this.audio.length; i++) {
	            if (this.audio[i].paused) {
	                this.audio[i].play();
	                return;
	            }
	        }
	    };
	    Container.prototype.pause = function () {
	        for (var i = 0; i < this.audio.length; i++) {
	            this.audio[i].pause();
	        }
	    };
	    return Container;
	})();
	exports.__esModule = true;
	exports["default"] = Container;


/***/ },
/* 32 */
/***/ function(module, exports) {

	var Music = (function () {
	    function Music() {
	        this.enabled = true;
	        this.musicMenu = new Audio('music/menu.mp3');
	        this.musicLevels = [
	            new Audio('music/0.mp3'),
	            new Audio('music/1.mp3'),
	            new Audio('music/2.mp3'),
	            new Audio('music/3.mp3'),
	            new Audio('music/4.mp3'),
	            new Audio('music/5.mp3')
	        ];
	    }
	    Music.prototype.toggle = function () {
	        this.enabled = !this.enabled;
	        if (!this.enabled) {
	            this.pauseMenu();
	        }
	        if (this.enabled) {
	            this.playMenu();
	        }
	        window.localStorage.setItem('disable_music', (!this.enabled).toString());
	    };
	    Music.prototype.playMenu = function () {
	        if (!this.enabled) {
	            return;
	        }
	        this.musicMenu.loop = true;
	        this.musicMenu.play();
	    };
	    Music.prototype.playLevel = function (level) {
	        if (!this.enabled) {
	            return;
	        }
	        var index = level % 6;
	        this.musicLevels[index].loop = true;
	        this.musicLevels[index].play();
	    };
	    Music.prototype.pauseMenu = function () {
	        this.musicMenu.pause();
	    };
	    Music.prototype.pauseLevel = function (level) {
	        var index = level % 6;
	        this.musicLevels[index].pause();
	    };
	    return Music;
	})();
	exports.__esModule = true;
	exports["default"] = Music;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Settings_1 = __webpack_require__(9);
	var LevelDefinitions = [
	    {
	        level: 1,
	        position: new Vector_1["default"](100, 340),
	        intro: 'You are the blue cell in the middle. Click left to it to emit some mass and you will move right. Absorb the green cell by moving over it!',
	        winningConditions: {
	            cells: 1
	        },
	        setup: {
	            numberOfCells: 1,
	            cells: [
	                {
	                    position: new Vector_1["default"](500, 300),
	                    velocity: new Vector_1["default"](0, 0),
	                    mass: 20,
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE
	                }
	            ]
	        }
	    },
	    {
	        level: 2,
	        position: new Vector_1["default"](250, 340),
	        intro: 'There can be multiple cells and they are moving! Your mass cannot go below a certain level, but you won\'t be able to move anymore. Collect all green cells!',
	        winningConditions: {
	            cells: 5
	        },
	        setup: {
	            numberOfCells: 5
	        }
	    },
	    {
	        level: 3,
	        position: new Vector_1["default"](400, 340),
	        intro: 'Be aware of the red cells - they withdraw some mass! Grow up to 50 mass anyway!',
	        winningConditions: {
	            mass: 50
	        },
	        setup: {
	            numberOfCells: 15,
	            cells: [
	                {
	                    mass: 5,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB
	                },
	                {
	                    mass: 10,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB
	                },
	                {
	                    mass: 20,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB
	                },
	                {
	                    mass: 10,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB
	                },
	                {
	                    mass: 15,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB
	                }
	            ]
	        }
	    },
	    {
	        level: 4,
	        position: new Vector_1["default"](550, 340),
	        intro: 'Uh oh! Yellow cells randomly change their directions. Can you still collect them all?',
	        winningConditions: {
	            cells: 5
	        },
	        setup: {
	            numberOfCells: 5,
	            cells: [
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                }
	            ]
	        }
	    },
	    {
	        level: 5,
	        position: new Vector_1["default"](700, 340),
	        intro: 'Uhm.. It seems we are in the wrong theme now.. The mouse won\'t work here, you can only use A and D to steer. Can you collect all cells even with two button controls?',
	        winningConditions: {
	            cells: 10
	        },
	        setup: {
	            numberOfCells: 10,
	            cells: [
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                }
	            ]
	        }
	    },
	    {
	        level: 6,
	        position: new Vector_1["default"](100, 490),
	        intro: 'Back to normal now. But wait! These purple ones seem to flee! Can you catch them?',
	        winningConditions: {
	            cells: 5
	        },
	        setup: {
	            numberOfCells: 5,
	            cells: [
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                }
	            ]
	        }
	    },
	    {
	        level: 7,
	        position: new Vector_1["default"](250, 490),
	        intro: 'Time ran out, so no new cell types here? Well then, at least the red ones are back, and they are huge! Try to grow to 100 before they hit you!',
	        winningConditions: {
	            mass: 100
	        },
	        setup: {
	            numberOfCells: 15,
	            cells: [
	                {
	                    mass: 100,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](100, 100)
	                },
	                {
	                    mass: 100,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](750, 400)
	                },
	                {
	                    mass: 100,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](200, 300)
	                }
	            ]
	        }
	    },
	    {
	        level: 8,
	        position: new Vector_1["default"](400, 490),
	        intro: 'Are you clever enough to catch the escaping cells without colliding with the red ones too often? Grow to at least 50.',
	        winningConditions: {
	            mass: 50
	        },
	        setup: {
	            numberOfCells: 22,
	            cells: [
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](100, 100),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](400, 100),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](700, 100),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](100, 300),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](700, 300),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](100, 500),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](400, 500),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](700, 500),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](250, 200),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](550, 200),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](250, 400),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    mass: 25,
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    position: new Vector_1["default"](550, 400),
	                    velocity: new Vector_1["default"](0, 0)
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                }
	            ]
	        }
	    },
	    {
	        level: 9,
	        position: new Vector_1["default"](550, 490),
	        intro: 'Lets throw in what we\'ve got! How huge can you grow? (Hint: really huge..)',
	        winningConditions: {
	            cells: 30
	        },
	        setup: {
	            numberOfCells: 30,
	            cells: [
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER
	                }
	            ]
	        }
	    },
	    {
	        level: 10,
	        position: new Vector_1["default"](700, 490),
	        intro: 'Ok, that was too easy, right? So this time we have some red ones in here as well. Can you collect everything (including your emitted mass) and don\'t get hit by any red one? (That\'s really tough..)',
	        winningConditions: {
	            mass: 110
	        },
	        setup: {
	            numberOfCells: 15,
	            cells: [
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE,
	                    mass: 10
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_SIMPLE,
	                    mass: 10
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER,
	                    mass: 10
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ESCAPER,
	                    mass: 10
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION,
	                    mass: 10
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_DIRECTION,
	                    mass: 10
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    mass: 5
	                },
	                {
	                    type: Settings_1["default"].CELL_TYPE_ABSORB,
	                    mass: 5
	                }
	            ]
	        }
	    }
	];
	exports.__esModule = true;
	exports["default"] = LevelDefinitions;


/***/ },
/* 34 */
/***/ function(module, exports) {

	var FPS = (function () {
	    function FPS() {
	        this.frameTime = 0;
	        this.lastLoop = new Date().valueOf();
	    }
	    FPS.prototype.tick = function () {
	        this.thisLoop = new Date().valueOf();
	        var thisFrameTime = this.thisLoop - this.lastLoop;
	        this.frameTime += (thisFrameTime - this.frameTime) / FPS.filterStrength;
	        this.lastLoop = this.thisLoop;
	    };
	    FPS.prototype.toString = function () {
	        return (1000 / this.frameTime).toFixed(0) + ' FPS';
	    };
	    FPS.filterStrength = 20;
	    return FPS;
	})();
	exports.__esModule = true;
	exports["default"] = FPS;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports
	
	
	// module
	exports.push([module.id, "html, body {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n}\ncanvas {\n    background: white;\n    display: block;\n}\n", ""]);
	
	// exports


/***/ },
/* 37 */
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
/* 38 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map