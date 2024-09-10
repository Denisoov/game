/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "phaser":
/*!*************************!*\
  !*** external "Phaser" ***!
  \*************************/
/***/ ((module) => {

module.exports = Phaser;

/***/ }),

/***/ "./src/create.js":
/*!***********************!*\
  !*** ./src/create.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   create: () => (/* binding */ create)\n/* harmony export */ });\nfunction create() {\n  var platforms = this.physics.add.staticGroup();\n  platforms.create(500, 568, 'ground').setScale(2).refreshBody();\n\n  // Настройка персонажа\n  this.player = this.physics.add.sprite(150, 450, 'character');\n  this.player.setBounce(0.2);\n  this.player.setCollideWorldBounds(true);\n  this.player.setScale(2);\n  this.player.setDepth(1);\n\n  // Создание анимаций\n  this.anims.create({\n    key: 'idle',\n    frames: this.anims.generateFrameNumbers('character', {\n      start: 5,\n      end: 8\n    }),\n    frameRate: 10,\n    repeat: -1\n  });\n  this.anims.create({\n    key: 'walk',\n    frames: this.anims.generateFrameNumbers('character', {\n      start: 0,\n      end: 3\n    }),\n    frameRate: 10,\n    repeat: -1\n  });\n  this.cursors = this.input.keyboard.createCursorKeys();\n\n  // Генерация монет\n  generateCoins.call(this);\n\n  // Коллизии\n  this.physics.add.collider(this.coins, platforms);\n  this.physics.add.collider(this.player, platforms);\n  this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);\n  this.input.on('pointerdown', onPointerDown, this);\n  this.targetX = null;\n  this.playerSpeed = 160;\n  this.debugGraphics = this.add.graphics();\n}\n\n//# sourceURL=webpack://game/./src/create.js?");

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"phaser\");\n/* harmony import */ var _preload_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preload.js */ \"./src/preload.js\");\n/* harmony import */ var _create_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create.js */ \"./src/create.js\");\n/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update.js */ \"./src/update.js\");\n\n\n\n\nvar config = {\n  type: phaser__WEBPACK_IMPORTED_MODULE_0__.AUTO,\n  width: 800,\n  height: 600,\n  physics: {\n    \"default\": 'arcade',\n    arcade: {\n      gravity: {\n        y: 300\n      },\n      debug: false\n    }\n  },\n  scene: {\n    preload: _preload_js__WEBPACK_IMPORTED_MODULE_1__.preload,\n    create: _create_js__WEBPACK_IMPORTED_MODULE_2__.create,\n    update: _update_js__WEBPACK_IMPORTED_MODULE_3__.update\n  }\n};\nvar game = new phaser__WEBPACK_IMPORTED_MODULE_0__.Game(config);\n\n//# sourceURL=webpack://game/./src/init.js?");

/***/ }),

/***/ "./src/preload.js":
/*!************************!*\
  !*** ./src/preload.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   preload: () => (/* binding */ preload)\n/* harmony export */ });\nfunction preload() {\n  this.load.image('ground', 'assets/ground.png');\n  this.load.image('money', 'assets/silver-money.png');\n  this.load.spritesheet('character', 'https://labs.phaser.io/assets/animations/brawler48x48.png', {\n    frameWidth: 48,\n    frameHeight: 48\n  });\n}\n\n//# sourceURL=webpack://game/./src/preload.js?");

/***/ }),

/***/ "./src/update.js":
/*!***********************!*\
  !*** ./src/update.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   update: () => (/* binding */ update)\n/* harmony export */ });\nfunction update() {\n  if (this.isPaused) {\n    return;\n  }\n  if (this.targetX !== null) {\n    var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetX, this.player.y);\n    if (distance < 5) {\n      this.player.setVelocityX(0);\n      this.targetX = null;\n      this.player.anims.stop();\n      this.player.setFrame(0);\n    } else {\n      var direction = Math.sign(this.targetX - this.player.x);\n      this.player.setVelocityX(this.playerSpeed * direction);\n      if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'walk') {\n        this.player.anims.play('walk', true);\n      }\n      this.player.flipX = direction > 0;\n    }\n  } else {\n    this.player.setVelocityX(0);\n    if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'idle') {\n      this.player.anims.play('idle', true);\n    }\n  }\n  this.debugGraphics.clear();\n  this.debugGraphics.strokeRect(this.player.x - 24, this.player.y - 24, 48, 48);\n}\n\n//# sourceURL=webpack://game/./src/update.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/init.js");
/******/ 	
/******/ })()
;