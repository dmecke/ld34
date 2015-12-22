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
	
	var _Mouse = __webpack_require__(8);
	
	var _Mouse2 = _interopRequireDefault(_Mouse);
	
	var _Keyboard = __webpack_require__(15);
	
	var _Keyboard2 = _interopRequireDefault(_Keyboard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(22);
	
	var game = new _Game2.default();
	
	game.run();
	
	document.addEventListener('mousemove', function (event) {
	  _Mouse2.default.updatePosition(event);
	});
	document.addEventListener('mousedown', function (event) {
	  _Mouse2.default.buttonDown(event);
	});
	document.addEventListener('mouseup', function (event) {
	  _Mouse2.default.buttonUp(event);
	});
	document.addEventListener('touchstart', function (event) {
	  _Mouse2.default.updatePosition(event);_Mouse2.default.buttonDown(event);
	});
	document.addEventListener('touchend', function (event) {
	  _Mouse2.default.buttonUp(event);
	});
	document.addEventListener('keydown', function (event) {
	  _Keyboard2.default.steer(event.keyCode);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Menu_1 = __webpack_require__(2);
	var Level_1 = __webpack_require__(11);
	var Vector_1 = __webpack_require__(7);
	var Sfx_1 = __webpack_require__(18);
	var Music_1 = __webpack_require__(20);
	var LevelDefinitions_1 = __webpack_require__(21);
	var Canvas_1 = __webpack_require__(4);
	var Game = (function () {
	    function Game() {
	        this.menu = new Menu_1["default"](this);
	        this.levels = [];
	        this.dimensions = new Vector_1["default"](Canvas_1["default"].width, Canvas_1["default"].height);
	        this.sfx = new Sfx_1["default"]();
	        this.music = new Music_1["default"]();
	    }
	    Game.prototype.run = function () {
	        for (var key in LevelDefinitions_1["default"]) {
	            if (LevelDefinitions_1["default"].hasOwnProperty(key)) {
	                var level = new Level_1["default"](this, LevelDefinitions_1["default"][key]);
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
	    };
	    Game.prototype.startLevel = function (level) {
	        this.menu.hide();
	        this.currentLevel = level;
	        this.currentLevel.start();
	    };
	    Game.prototype.finishLevel = function () {
	        this.currentLevel.isFinished = true;
	        window.localStorage.setItem('level_' + this.currentLevel.levelSettings.level, true.toString());
	        this.currentLevel.cleanup();
	        this.currentLevel = undefined;
	    };
	    Game.prototype.showMenu = function () {
	        this.menu.show();
	    };
	    return Game;
	})();
	exports.__esModule = true;
	exports["default"] = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Context_1 = __webpack_require__(3);
	var Text_1 = __webpack_require__(5);
	var Circle_1 = __webpack_require__(6);
	var Vector_1 = __webpack_require__(7);
	var Mouse_1 = __webpack_require__(8);
	var Settings_1 = __webpack_require__(10);
	var Menu = (function () {
	    function Menu(game) {
	        this.background = new Image();
	        this.lock = new Image();
	        this.symbolSfx = new Image();
	        this.symbolMusic = new Image();
	        this.game = game;
	        this.mouse = Mouse_1["default"];
	    }
	    Menu.prototype.show = function () {
	        this.background.src = 'img/startscreen.jpg';
	        this.lock.src = 'img/lock.png';
	        this.symbolSfx.src = 'img/sfx.png';
	        this.symbolMusic.src = 'img/music.png';
	        this.game.music.playMenu();
	        var menu = this;
	        this.interval = setInterval(function () {
	            menu.update();
	            menu.render();
	        }, 1 / 30);
	    };
	    Menu.prototype.hide = function () {
	        this.game.music.pauseMenu();
	        clearInterval(this.interval);
	    };
	    Menu.prototype.update = function () {
	        if (this.mouse.clicked()) {
	            this.mouse.timer.reset();
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
	        new Circle_1["default"](position, 25, Settings_1["default"].white, Settings_1["default"].blue.replace(')', ', 0.2)').replace('rgb', 'rgba'), 2).draw();
	        Context_1["default"].drawImage(this.symbolMusic, position.x() - 15, position.y() - 18);
	        if (!this.game.music.enabled) {
	            var x = new Text_1["default"](position.add(new Vector_1["default"](1, 18)), 'X', Settings_1["default"].white, Settings_1["default"].red, '44px "Gloria Hallelujah"');
	            x.lineWidth = 5;
	            x.draw();
	        }
	    };
	    Menu.prototype.drawSfx = function () {
	        var position = new Vector_1["default"](this.game.dimensions.x() - 50, 120);
	        new Circle_1["default"](position, 25, Settings_1["default"].white, Settings_1["default"].blue.replace(')', ', 0.2)').replace('rgb', 'rgba'), 2).draw();
	        Context_1["default"].drawImage(this.symbolSfx, position.x() - 19, position.y() - 18);
	        if (!this.game.sfx.enabled) {
	            var x = new Text_1["default"](position.add(new Vector_1["default"](1, 18)), 'X', Settings_1["default"].white, Settings_1["default"].red, '44px "Gloria Hallelujah"');
	            x.lineWidth = 5;
	            x.draw();
	        }
	    };
	    Menu.prototype.positionByLevel = function (level) {
	        var row = Math.floor((level - 1) / 5);
	        return new Vector_1["default"](0, this.game.dimensions.y() / 3 * 2).add(new Vector_1["default"](this.game.dimensions.x() / 6 * ((level - 1) % 5 + 1), row * 120));
	    };
	    Menu.prototype.drawLevel = function (level) {
	        var position = this.positionByLevel(level.levelSettings.level);
	        new Circle_1["default"](position, 50, Settings_1["default"].white, Settings_1["default"].blue.replace(')', ', 0.2)').replace('rgb', 'rgba'), 2).draw();
	        if (level.isLocked()) {
	            Context_1["default"].drawImage(this.lock, position.x() - 29, position.y() - 44);
	        }
	        else {
	            var label = new Text_1["default"](position.add(new Vector_1["default"](0, 20)), level.levelSettings.level.toString(), Settings_1["default"].grey, Settings_1["default"].white, '52px "Gloria Hallelujah"');
	            label.lineWidth = 8;
	            label.draw();
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
	        return position.distanceTo(this.mouse.position) <= 50;
	    };
	    Menu.prototype.mouseIsAtSfx = function () {
	        var position = new Vector_1["default"](this.game.dimensions.x() - 50, 120);
	        return position.distanceTo(this.mouse.position) <= 50;
	    };
	    return Menu;
	})();
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
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	exports.__esModule = true;
	exports["default"] = canvas;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Context_1 = __webpack_require__(3);
	var Text = (function () {
	    function Text(position, content, strokeStyle, fillStyle, font, textAlign) {
	        if (strokeStyle === void 0) { strokeStyle = 'transparent'; }
	        if (fillStyle === void 0) { fillStyle = 'transparent'; }
	        if (font === void 0) { font = '12px Oswald'; }
	        if (textAlign === void 0) { textAlign = 'center'; }
	        this.lineWidth = 1;
	        this.lineHeight = 38;
	        this.position = position;
	        this.content = content;
	        this.strokeStyle = strokeStyle;
	        this.fillStyle = fillStyle;
	        this.font = font;
	        this.textAlign = textAlign;
	    }
	    Text.prototype.draw = function () {
	        Context_1["default"].font = this.font;
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
	})();
	exports.__esModule = true;
	exports["default"] = Text;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Context_1 = __webpack_require__(3);
	var Circle = (function () {
	    function Circle(position, radius, strokeStyle, fillStyle, lineWidth) {
	        if (strokeStyle === void 0) { strokeStyle = 'transparent'; }
	        if (fillStyle === void 0) { fillStyle = 'transparent'; }
	        if (lineWidth === void 0) { lineWidth = 1; }
	        this.position = position;
	        this.radius = radius;
	        this.fillStyle = fillStyle;
	        this.strokeStyle = strokeStyle;
	        this.lineWidth = lineWidth;
	    }
	    Circle.prototype.draw = function () {
	        Context_1["default"].fillStyle = this.fillStyle;
	        Context_1["default"].strokeStyle = this.strokeStyle;
	        Context_1["default"].lineWidth = this.lineWidth;
	        Context_1["default"].beginPath();
	        Context_1["default"].arc(this.position.x(), this.position.y(), this.radius, 0, 2 * Math.PI);
	        Context_1["default"].stroke();
	        Context_1["default"].fill();
	        Context_1["default"].closePath();
	    };
	    return Circle;
	})();
	exports.__esModule = true;
	exports["default"] = Circle;


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
	    return Vector;
	})();
	exports.__esModule = true;
	exports["default"] = Vector;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Timer_1 = __webpack_require__(9);
	var Vector_1 = __webpack_require__(7);
	var Canvas_1 = __webpack_require__(4);
	var Mouse = (function () {
	    function Mouse() {
	        this.position = new Vector_1["default"](0, 0);
	        this.click = false;
	        this.timer = new Timer_1["default"](30);
	    }
	    Mouse.prototype.updatePosition = function (event) {
	        var canvasRect = Canvas_1["default"].getBoundingClientRect();
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
	        this.position = new Vector_1["default"](x - canvasRect.left, y - canvasRect.top);
	    };
	    Mouse.prototype.buttonDown = function () {
	        this.click = true;
	    };
	    Mouse.prototype.buttonUp = function () {
	        this.click = false;
	    };
	    Mouse.prototype.clicked = function () {
	        return this.click && this.timer.isReady();
	    };
	    return Mouse;
	})();
	var mouse = new Mouse();
	setInterval(function () { mouse.timer.update(); }, 1 / 30);
	exports.__esModule = true;
	exports["default"] = mouse;


/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	var Settings = {
	    white: 'rgb(255, 255, 255)',
	    grey: 'rgb(55, 73, 89)',
	    blue: 'rgb(4, 97, 182)',
	    green: 'rgb(99, 170, 51)',
	    red: 'rgb(207, 39, 39)',
	    yellow: 'rgb(234, 197, 27)',
	    purple: 'rgb(222, 00, 255)',
	    CELL_TYPE_PLAYER: 1,
	    CELL_TYPE_SIMPLE: 2,
	    CELL_TYPE_ABSORB: 3,
	    CELL_TYPE_DIRECTION: 4,
	    CELL_TYPE_ESCAPER: 5
	};
	exports.__esModule = true;
	exports["default"] = Settings;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Context_1 = __webpack_require__(3);
	var Player_1 = __webpack_require__(12);
	var Vector_1 = __webpack_require__(7);
	var Cell_1 = __webpack_require__(13);
	var Ui_1 = __webpack_require__(16);
	var Settings_1 = __webpack_require__(10);
	var Level = (function () {
	    function Level(game, levelSettings) {
	        this.cells = [];
	        this.ui = new Ui_1["default"](this);
	        this.background = new Image();
	        this.showObjectives = true;
	        this.showScore = false;
	        this.isFinished = false;
	        this.collectedCells = 0;
	        this.game = game;
	        this.levelSettings = levelSettings;
	    }
	    Level.prototype.start = function () {
	        var level = this;
	        this.setup();
	        this.interval = setInterval(function () {
	            level.update();
	            level.render();
	        }, 1 / 30);
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
	            this.cells.push(new Cell_1["default"](this, position, velocity, mass, type));
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
	        clearInterval(this.interval);
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
	})();
	exports.__esModule = true;
	exports["default"] = Level;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Circle_1 = __webpack_require__(6);
	var Cell_1 = __webpack_require__(13);
	var PositionCheck_1 = __webpack_require__(14);
	var Mouse_1 = __webpack_require__(8);
	var Keyboard_1 = __webpack_require__(15);
	var Settings_1 = __webpack_require__(10);
	var Player = (function () {
	    function Player(level) {
	        this.position = new Vector_1["default"](400, 300);
	        this.velocity = new Vector_1["default"](0, 0);
	        this.minimumMass = 10;
	        this.mass = this.minimumMass + 10;
	        this.mouse = Mouse_1["default"];
	        this.transparency = 0.5;
	        this.transparencyFlag = true;
	        this.level = level;
	    }
	    Player.prototype.update = function () {
	        this.checkCollision();
	        this.processUserInput();
	        this.updatePosition();
	        this.updateTransparency();
	    };
	    Player.prototype.render = function () {
	        this.draw(this.mass);
	        this.draw(this.minimumMass);
	        new Circle_1["default"](this.position, this.mass + 1, Settings_1["default"].white.replace(')', ', ' + this.transparency + ')').replace('rgb', 'rgba')).draw();
	    };
	    Player.prototype.draw = function (radius) {
	        var dimensions = this.level.game.dimensions;
	        var check = new PositionCheck_1["default"](this.position, radius, dimensions);
	        this.drawElement(this.position, radius);
	        if (check.isOutOfLeftBorder()) {
	            this.drawElement(new Vector_1["default"](dimensions.x() + this.position.x(), this.position.y()), radius);
	        }
	        if (check.isOutOfTopBorder()) {
	            this.drawElement(new Vector_1["default"](this.position.x(), dimensions.y() + this.position.y()), radius);
	        }
	        if (check.isOutOfRightBorder()) {
	            this.drawElement(new Vector_1["default"](this.position.x() - dimensions.x(), this.position.y()), radius);
	        }
	        if (check.isOutOfBottomBorder()) {
	            this.drawElement(new Vector_1["default"](this.position.x(), this.position.y() - dimensions.y()), radius);
	        }
	        if (check.isOutOfTopLeftCorner()) {
	            this.drawElement(new Vector_1["default"](dimensions.x() + this.position.x(), dimensions.y() + this.position.y()), radius);
	        }
	        if (check.isOutOfBottomLeftCorner()) {
	            this.drawElement(new Vector_1["default"](dimensions.x() + this.position.x(), this.position.y() - dimensions.y()), radius);
	        }
	        if (check.isOutOfTopRightCorner()) {
	            this.drawElement(new Vector_1["default"](this.position.x() - dimensions.x(), dimensions.y() + this.position.y()), radius);
	        }
	        if (check.isOutOfBottomRightCorner()) {
	            this.drawElement(new Vector_1["default"](this.position.x() - dimensions.x(), this.position.y() - dimensions.y()), radius);
	        }
	    };
	    Player.prototype.drawElement = function (position, radius) {
	        new Circle_1["default"](position, radius, Settings_1["default"].blue, Settings_1["default"].blue.replace(')', ', 0.2)').replace('rgb', 'rgba'), 2).draw();
	    };
	    Player.prototype.checkCollision = function () {
	        var dimensions = this.level.game.dimensions;
	        var check = new PositionCheck_1["default"](this.position, this.mass, dimensions);
	        for (var i = 0; i < this.level.cells.length; i++) {
	            var cell = this.level.cells[i];
	            this.checkCollisionAt(this.position, cell, i);
	            if (check.isOutOfLeftBorder()) {
	                this.checkCollisionAt(new Vector_1["default"](dimensions.x() + this.position.x(), this.position.y()), cell, i);
	            }
	            if (check.isOutOfTopBorder()) {
	                this.checkCollisionAt(new Vector_1["default"](this.position.x(), dimensions.y() + this.position.y()), cell, i);
	            }
	            if (check.isOutOfRightBorder()) {
	                this.checkCollisionAt(new Vector_1["default"](this.position.x() - dimensions.x(), this.position.y()), cell, i);
	            }
	            if (check.isOutOfBottomBorder()) {
	                this.checkCollisionAt(new Vector_1["default"](this.position.x(), this.position.y() - dimensions.y()), cell, i);
	            }
	            if (check.isOutOfTopLeftCorner()) {
	                this.checkCollisionAt(new Vector_1["default"](dimensions.x() + this.position.x(), dimensions.y() + this.position.y()), cell, i);
	            }
	            if (check.isOutOfBottomLeftCorner()) {
	                this.checkCollisionAt(new Vector_1["default"](dimensions.x() + this.position.x(), this.position.y() - dimensions.y()), cell, i);
	            }
	            if (check.isOutOfTopRightCorner()) {
	                this.checkCollisionAt(new Vector_1["default"](this.position.x() - dimensions.x(), dimensions.y() + this.position.y()), cell, i);
	            }
	            if (check.isOutOfBottomRightCorner()) {
	                this.checkCollisionAt(new Vector_1["default"](this.position.x() - dimensions.x(), this.position.y() - dimensions.y()), cell, i);
	            }
	        }
	    };
	    Player.prototype.checkCollisionAt = function (position, cell, index) {
	        if (this.collidesWithCell(position, cell)) {
	            this.incorporateCell(cell, index);
	            if (cell.isForeign()) {
	                this.level.collectedCells++;
	            }
	        }
	    };
	    Player.prototype.collidesWithCell = function (position, cell) {
	        return cell.position.distanceTo(position) < this.mass + cell.mass;
	    };
	    Player.prototype.incorporateCell = function (cell, index) {
	        // @todo find out correct formula
	        //var velChange = this.velocity.subtract(cell.velocity).multiply(-1).normalize().multiply(1 / cell.mass);
	        //this.velocity = this.velocity.add(velChange);
	        this.addMass(cell.massWhenAbsorbed());
	        this.level.cells.splice(index, 1);
	        this.level.game.sfx.absorb();
	    };
	    Player.prototype.updatePosition = function () {
	        this.position = this.position.add(this.velocity);
	        if (this.position.x() > this.level.game.dimensions.x()) {
	            this.position = this.position.subtract(new Vector_1["default"](this.level.game.dimensions.x(), 0));
	        }
	        if (this.position.y() > this.level.game.dimensions.y()) {
	            this.position = this.position.subtract(new Vector_1["default"](0, this.level.game.dimensions.y()));
	        }
	        if (this.position.x() < 0) {
	            this.position = new Vector_1["default"](this.level.game.dimensions.x() - this.position.x(), this.position.y());
	        }
	        if (this.position.y() < 0) {
	            this.position = new Vector_1["default"](this.position.x(), this.level.game.dimensions.y() - this.position.y());
	        }
	    };
	    Player.prototype.processUserInput = function () {
	        if (!this.accelerationActive()) {
	            return;
	        }
	        if (this.mass == this.minimumMass) {
	            return;
	        }
	        var emittedMass = Math.max(0.2, this.mass * 0.2);
	        var direction = this.movementDirection();
	        var force = direction.multiply(-1).multiply(emittedMass).divide(this.mass);
	        this.addMass(-emittedMass);
	        var cellPosition = this.position.add(direction.multiply(this.mass + emittedMass));
	        var cell = new Cell_1["default"](this.level, cellPosition, this.velocity, emittedMass, Settings_1["default"].CELL_TYPE_PLAYER);
	        this.velocity = this.velocity.add(force);
	        this.level.cells.push(cell);
	        this.level.game.sfx.accelerate();
	    };
	    Player.prototype.updateTransparency = function () {
	        if (this.transparencyFlag) {
	            this.transparency += 0.005;
	        }
	        else {
	            this.transparency -= 0.005;
	        }
	        if (this.transparency >= 0.8 || this.transparency <= 0.2) {
	            this.transparencyFlag = !this.transparencyFlag;
	        }
	    };
	    Player.prototype.addMass = function (amount) {
	        this.mass = Math.max(this.minimumMass, this.mass + amount);
	    };
	    Player.prototype.accelerationActive = function () {
	        if (this.level.levelSettings.level == 5) {
	            this.velocity = Keyboard_1["default"].direction.normalize();
	            return false;
	        }
	        var clicked = this.mouse.clicked();
	        if (clicked) {
	            this.mouse.timer.reset();
	        }
	        return clicked;
	    };
	    Player.prototype.movementDirection = function () {
	        if (this.level.levelSettings.level == 5) {
	            return Keyboard_1["default"].direction.normalize();
	        }
	        return this.mouse.position.subtract(this.position).normalize();
	    };
	    return Player;
	})();
	exports.__esModule = true;
	exports["default"] = Player;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Circle_1 = __webpack_require__(6);
	var PositionCheck_1 = __webpack_require__(14);
	var Settings_1 = __webpack_require__(10);
	var Cell = (function () {
	    function Cell(level, position, velocity, mass, type) {
	        this.transparency = 0.5;
	        this.transparencyFlag = true;
	        this.level = level;
	        this.position = position;
	        this.velocity = velocity;
	        this.mass = mass;
	        this.type = type;
	    }
	    Cell.prototype.update = function () {
	        if (this.type == Settings_1["default"].CELL_TYPE_DIRECTION && Math.random() < 0.005) {
	            this.velocity = new Vector_1["default"](Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
	        }
	        if (this.type == Settings_1["default"].CELL_TYPE_ESCAPER) {
	            var toPlayer = this.position.subtract(this.level.player.position);
	            if (toPlayer.length() < 100) {
	                this.velocity = toPlayer.normalize().multiply(this.velocity.length());
	            }
	        }
	        this.position = this.position.add(this.velocity);
	        if (this.position.x() > this.level.game.dimensions.x()) {
	            this.position = this.position.subtract(new Vector_1["default"](this.level.game.dimensions.x(), 0));
	        }
	        if (this.position.y() > this.level.game.dimensions.y()) {
	            this.position = this.position.subtract(new Vector_1["default"](0, this.level.game.dimensions.y()));
	        }
	        if (this.position.x() < 0) {
	            this.position = new Vector_1["default"](this.level.game.dimensions.x() - this.position.x(), this.position.y());
	        }
	        if (this.position.y() < 0) {
	            this.position = new Vector_1["default"](this.position.x(), this.level.game.dimensions.y() - this.position.y());
	        }
	        this.updateTransparency();
	    };
	    Cell.prototype.render = function () {
	        var dimensions = this.level.game.dimensions;
	        var check = new PositionCheck_1["default"](this.position, this.mass, dimensions);
	        this.drawElement(this.position);
	        if (check.isOutOfLeftBorder()) {
	            this.drawElement(new Vector_1["default"](dimensions.x() + this.position.x(), this.position.y()));
	        }
	        if (check.isOutOfTopBorder()) {
	            this.drawElement(new Vector_1["default"](this.position.x(), dimensions.y() + this.position.y()));
	        }
	        if (check.isOutOfRightBorder()) {
	            this.drawElement(new Vector_1["default"](this.position.x() - dimensions.x(), this.position.y()));
	        }
	        if (check.isOutOfBottomBorder()) {
	            this.drawElement(new Vector_1["default"](this.position.x(), this.position.y() - dimensions.y()));
	        }
	        if (check.isOutOfTopLeftCorner()) {
	            this.drawElement(new Vector_1["default"](dimensions.x() + this.position.x(), dimensions.y() + this.position.y()));
	        }
	        if (check.isOutOfBottomLeftCorner()) {
	            this.drawElement(new Vector_1["default"](dimensions.x() + this.position.x(), this.position.y() - dimensions.y()));
	        }
	        if (check.isOutOfTopRightCorner()) {
	            this.drawElement(new Vector_1["default"](this.position.x() - dimensions.x(), dimensions.y() + this.position.y()));
	        }
	        if (check.isOutOfBottomRightCorner()) {
	            this.drawElement(new Vector_1["default"](this.position.x() - dimensions.x(), this.position.y() - dimensions.y()));
	        }
	    };
	    Cell.prototype.drawElement = function (position) {
	        new Circle_1["default"](position, this.mass, this.color(), this.color().replace(')', ', 0.3)').replace('rgb', 'rgba'), 3).draw();
	        new Circle_1["default"](position, this.mass + 1, Settings_1["default"].white.replace(')', ', ' + this.transparency + ')').replace('rgb', 'rgba')).draw();
	    };
	    Cell.prototype.updateTransparency = function () {
	        if (this.transparencyFlag) {
	            this.transparency += 0.005;
	        }
	        else {
	            this.transparency -= 0.005;
	        }
	        if (this.transparency >= 0.8 || this.transparency <= 0.2) {
	            this.transparencyFlag = !this.transparencyFlag;
	        }
	    };
	    Cell.prototype.color = function () {
	        if (this.type == Settings_1["default"].CELL_TYPE_PLAYER) {
	            return Settings_1["default"].blue;
	        }
	        else if (this.type == Settings_1["default"].CELL_TYPE_SIMPLE) {
	            return Settings_1["default"].green;
	        }
	        else if (this.type == Settings_1["default"].CELL_TYPE_ABSORB) {
	            return Settings_1["default"].red;
	        }
	        else if (this.type == Settings_1["default"].CELL_TYPE_DIRECTION) {
	            return Settings_1["default"].yellow;
	        }
	        else if (this.type == Settings_1["default"].CELL_TYPE_ESCAPER) {
	            return Settings_1["default"].purple;
	        }
	    };
	    Cell.prototype.isForeign = function () {
	        return this.type !== Settings_1["default"].CELL_TYPE_PLAYER;
	    };
	    Cell.prototype.massWhenAbsorbed = function () {
	        var mass = this.mass;
	        if (this.type == Settings_1["default"].CELL_TYPE_ABSORB) {
	            mass *= -1;
	        }
	        return mass;
	    };
	    return Cell;
	})();
	exports.__esModule = true;
	exports["default"] = Cell;


/***/ },
/* 14 */
/***/ function(module, exports) {

	var PositionCheck = (function () {
	    function PositionCheck(position, radius, dimensions) {
	        this.position = position;
	        this.radius = radius;
	        this.dimensions = dimensions;
	    }
	    PositionCheck.prototype.isOutOfLeftBorder = function () {
	        return this.position.x() - this.radius < 0;
	    };
	    PositionCheck.prototype.isOutOfTopBorder = function () {
	        return this.position.y() - this.radius < 0;
	    };
	    PositionCheck.prototype.isOutOfRightBorder = function () {
	        return this.position.x() + this.radius > this.dimensions.x();
	    };
	    PositionCheck.prototype.isOutOfBottomBorder = function () {
	        return this.position.y() + this.radius > this.dimensions.y();
	    };
	    PositionCheck.prototype.isOutOfTopLeftCorner = function () {
	        return this.position.x() - this.radius < 0 && this.position.y() - this.radius < 0;
	    };
	    PositionCheck.prototype.isOutOfTopRightCorner = function () {
	        return this.position.x() + this.radius > this.dimensions.x() && this.position.y() - this.radius < 0;
	    };
	    PositionCheck.prototype.isOutOfBottomLeftCorner = function () {
	        return this.position.x() - this.radius < 0 && this.position.y() + this.radius > this.dimensions.y();
	    };
	    PositionCheck.prototype.isOutOfBottomRightCorner = function () {
	        return this.position.x() + this.radius > this.dimensions.x() && this.position.y() + this.radius > this.dimensions.y();
	    };
	    return PositionCheck;
	})();
	exports.__esModule = true;
	exports["default"] = PositionCheck;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Timer_1 = __webpack_require__(9);
	var Vector_1 = __webpack_require__(7);
	var Keyboard = (function () {
	    function Keyboard() {
	        this.direction = new Vector_1["default"](1, 0);
	        this.timer = new Timer_1["default"](30);
	    }
	    Keyboard.prototype.steer = function (keyCode) {
	        if (!this.timer.isReady()) {
	            return;
	        }
	        if (keyCode == Keyboard.KEY_A) {
	            this.direction = this.direction.rotateByDegress(-45);
	            this.timer.reset();
	        }
	        if (keyCode == Keyboard.KEY_D) {
	            this.direction = this.direction.rotateByDegress(45);
	            this.timer.reset();
	        }
	    };
	    Keyboard.KEY_A = 65;
	    Keyboard.KEY_D = 68;
	    return Keyboard;
	})();
	var keyboard = new Keyboard();
	setInterval(function () {
	    keyboard.timer.update();
	}, 1 / 30);
	exports.__esModule = true;
	exports["default"] = keyboard;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Text_1 = __webpack_require__(5);
	var Rectangle_1 = __webpack_require__(17);
	var Settings_1 = __webpack_require__(10);
	var Mouse_1 = __webpack_require__(8);
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
	        if (Mouse_1["default"].clicked()) {
	            if (Mouse_1["default"].position.x() >= 210 &&
	                Mouse_1["default"].position.x() <= 290 &&
	                Mouse_1["default"].position.y() >= this.level.game.dimensions.y() - 35 &&
	                Mouse_1["default"].position.y() <= this.level.game.dimensions.y() - 15) {
	                Mouse_1["default"].timer.reset();
	                this.level.cleanup();
	                this.level.game.showMenu();
	            }
	        }
	    };
	    Ui.prototype.drawHud = function () {
	        var winningConditions = this.level.levelSettings.winningConditions;
	        var container = new Rectangle_1["default"](new Vector_1["default"](150, this.level.game.dimensions.y() - 25), 300, 50);
	        container.strokeStyle = Settings_1["default"].white;
	        container.lineWidth = 2;
	        container.fillStyle = Settings_1["default"].white.replace(')', ', 0.6)').replace('rgb', 'rgba');
	        container.draw();
	        var cellsText = 'Cells collected: ' + this.level.collectedCells;
	        if (winningConditions.cells) {
	            cellsText += ' (' + winningConditions.cells + ' needed)';
	        }
	        new Text_1["default"](new Vector_1["default"](10, this.level.game.dimensions.y() - 10), cellsText, 'transparent', Settings_1["default"].blue, '14px Oswald', 'left').draw();
	        var massText = 'Mass: ' + Math.floor(this.level.player.mass);
	        if (winningConditions.mass) {
	            massText += ' (' + winningConditions.mass + ' needed)';
	        }
	        new Text_1["default"](new Vector_1["default"](10, this.level.game.dimensions.y() - 30), massText, 'transparent', Settings_1["default"].blue, '14px Oswald', 'left').draw();
	        var abortButton = new Rectangle_1["default"](new Vector_1["default"](250, this.level.game.dimensions.y() - 25), 80, 20);
	        abortButton.strokeStyle = Settings_1["default"].red;
	        abortButton.fillStyle = Settings_1["default"].red.replace(')', ', 0.2)').replace('rgb', 'rgba');
	        abortButton.draw();
	        new Text_1["default"](new Vector_1["default"](250, this.level.game.dimensions.y() - 19), 'back to menu', 'transparent', Settings_1["default"].red, '14px Oswald').draw();
	    };
	    Ui.prototype.showObjectives = function () {
	        if (!this.level.showObjectives) {
	            return;
	        }
	        this.drawWindow();
	        var objectives = new Text_1["default"](new Vector_1["default"](this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2 - 100), this.level.levelSettings.intro, Settings_1["default"].grey, Settings_1["default"].white, '18px "Gloria Hallelujah');
	        objectives.maxWidth = 350;
	        objectives.lineWidth = 5;
	        objectives.draw();
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
	        var score = new Text_1["default"](new Vector_1["default"](this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2 - 50), 'You made it!', Settings_1["default"].grey, Settings_1["default"].white, '28px "Gloria Hallelujah"');
	        score.lineWidth = 5;
	        score.maxWidth = 350;
	        score.draw();
	        this.drawContinueText('Click to return to main menu!');
	        if (Mouse_1["default"].clicked()) {
	            Mouse_1["default"].timer.reset();
	            this.level.game.finishLevel();
	            this.level.game.showMenu();
	        }
	    };
	    Ui.prototype.drawWindow = function () {
	        var window = new Rectangle_1["default"](new Vector_1["default"](this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2), 400, 300);
	        window.strokeStyle = Settings_1["default"].white;
	        window.lineWidth = 2;
	        window.fillStyle = Settings_1["default"].white.replace(')', ', 0.6)').replace('rgb', 'rgba');
	        window.draw();
	    };
	    Ui.prototype.drawContinueText = function (text) {
	        var clickToStart = new Text_1["default"](new Vector_1["default"](this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2 + 120), text, Settings_1["default"].grey, Settings_1["default"].white, '18px "Gloria Hallelujah"');
	        clickToStart.lineWidth = 4;
	        clickToStart.draw();
	    };
	    return Ui;
	})();
	exports.__esModule = true;
	exports["default"] = Ui;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Context_1 = __webpack_require__(3);
	var Rectangle = (function () {
	    function Rectangle(position, width, height) {
	        this.position = position;
	        this.width = width;
	        this.height = height;
	        this.lineWidth = 1;
	        this.fillStyle = 'transparent';
	        this.strokeStyle = 'transparent';
	    }
	    Rectangle.prototype.draw = function () {
	        Context_1["default"].fillStyle = this.fillStyle;
	        Context_1["default"].strokeStyle = this.strokeStyle;
	        Context_1["default"].lineWidth = this.lineWidth;
	        Context_1["default"].beginPath();
	        Context_1["default"].rect(this.position.x() - this.width / 2, this.position.y() - this.height / 2, this.width, this.height);
	        Context_1["default"].stroke();
	        Context_1["default"].fill();
	        Context_1["default"].closePath();
	    };
	    return Rectangle;
	})();
	exports.__esModule = true;
	exports["default"] = Rectangle;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Container_1 = __webpack_require__(19);
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Vector_1 = __webpack_require__(7);
	var Settings_1 = __webpack_require__(10);
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
	                    mass: 10,
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports
	
	
	// module
	exports.push([module.id, "html, body {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n}\ncanvas {\n    background: white;\n    display: block;\n}\n", ""]);
	
	// exports


/***/ },
/* 24 */
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
/* 25 */
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