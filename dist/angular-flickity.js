(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angular-flickity", [], factory);
	else if(typeof exports === 'object')
		exports["angular-flickity"] = factory();
	else
		root["angular-flickity"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';
	
	var _flickity = __webpack_require__(1);
	
	var _flickity2 = __webpack_require__(2);
	
	var _flickity3 = __webpack_require__(3);
	
	var _flickityNext = __webpack_require__(4);
	
	var _flickityPrevious = __webpack_require__(5);
	
	angular.module('bc.Flickity', []).provider('FlickityConfig', _flickity.FlickityConfigProvider).service('FlickityService', _flickity2.FlickityService).directive('bcFlickity', _flickity3.FlickityDirective).directive('bcFlickityNext', _flickityNext.FlickityNextDirective).directive('bcFlickityPrevious', _flickityPrevious.FlickityPreviousDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FlickityConfigProvider = exports.FlickityConfigProvider = (function () {
	    function FlickityConfigProvider() {
	        _classCallCheck(this, FlickityConfigProvider);
	
	        // Define Flickity defaults
	        this.accessibility = true;
	        this.autoPlay = false;
	        this.cellAlign = 'center';
	        this.cellSelector = undefined;
	        this.contain = false;
	        this.draggable = true;
	        this.freeScroll = false;
	        this.freeScrollFriction = false;
	        this.selectedAttraction = .025;
	        this.friction = .28;
	        this.initialIndex = 0;
	        this.lazyLoad = true;
	        this.percentPosition = true;
	        this.prevNextButtons = true;
	        this.pageDots = true;
	        this.resize = true;
	        this.rightToLeft = false;
	        this.setGallerySize = true;
	        this.watchCSS = false;
	        this.wrapAround = false;
	        this.imagesLoaded = true;
	        this.asNavFor = true;
	    }
	
	    _createClass(FlickityConfigProvider, [{
	        key: '$get',
	        value: function $get() {
	            return this;
	        }
	    }]);
	
	    return FlickityConfigProvider;
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global Flickity */
	
	var FlickityService = exports.FlickityService = (function () {
	    FlickityService.$inject = ["$timeout", "$q"];
	    function FlickityService($timeout, $q) {
	        'ngInject';
	
	        _classCallCheck(this, FlickityService);
	
	        this.$timeout = $timeout;
	        this.$q = $q;
	
	        this.instances = [];
	    }
	
	    /**
	     * Create a new Flickity instance
	     * TODO: We should verify that the ID doesn't exist in case the user passes in an existing ID
	     *
	     * @param {Element} element
	     * @param {String} id
	     * @param {Object} options
	     * @return {Object} instance
	     */
	
	    _createClass(FlickityService, [{
	        key: 'create',
	        value: function create(element) {
	            var id = arguments.length <= 1 || arguments[1] === undefined ? this.instances.length + 1 : arguments[1];
	            var options = arguments[2];
	
	            // Define the new instance
	            var instance = {
	                id: id,
	                instance: new Flickity(element, options)
	            };
	
	            // Save this instance to the array
	            this.instances.push(instance);
	
	            return this.$q(function (resolve) {
	                resolve(instance);
	            });
	        }
	
	        /**
	         * Destroy a Flickity instance
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy(id) {
	            var _this = this;
	
	            var pauseBeforeDestruction = 2000;
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                }
	
	                // Pause to allow other scope cleanup to occur
	                // NOTE: Without this pause, Flickity is being destroyed before the view containing the
	                // directive can leave view
	                _this.$timeout(function () {
	
	                    // Destroy the Flickity instance
	                    _this.instances[flickityIndex].instance.destroy();
	
	                    // Remove the instance from the array
	                    _this.instances.splice(flickityIndex, 1);
	
	                    resolve('Instance ' + id + ' destroyed.');
	                }, pauseBeforeDestruction);
	            });
	        }
	
	        /**
	         * Move to the next slide
	         *
	         * @param {string} id
	         * @param {Bool} isWrapped
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'next',
	        value: function next(id, isWrapped) {
	            var _this2 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the next slide
	                    _this2.instances[flickityIndex].instance.next(isWrapped);
	
	                    resolve(_this2.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Move to the previous slide
	         *
	         * @param {string} id
	         * @param {Bool} isWrapped
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'previous',
	        value: function previous(id, isWrapped) {
	            var _this3 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the previous slide
	                    _this3.instances[flickityIndex].instance.previous(isWrapped);
	
	                    resolve(_this3.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Select a slide
	         *
	         * @param {String} id
	         * @param {Integer} index
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'select',
	        value: function select(id, index) {
	            var _this4 = this;
	
	            var isWrapped = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var isInstant = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the selected slide
	                    _this4.instances[flickityIndex].instance.select(index, isWrapped, isInstant);
	
	                    resolve(_this4.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the current slide index
	         *
	         * @param {String} id
	         * @return {Integer} selectedIndex
	         */
	
	    }, {
	        key: 'selectedIndex',
	        value: function selectedIndex(id) {
	            var _this5 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Return the current index
	                    resolve(_this5.instances[flickityIndex].instance.selectedIndex);
	                }
	            });
	        }
	
	        /**
	         * Resize the gallery and re-position cells.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'resize',
	        value: function resize(id) {
	            var _this6 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Trigger the resize
	                    _this6.instances[flickityIndex].instance.resize();
	
	                    resolve(_this6.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Position cells at selected position.
	         * Trigger reposition after the size of a cell has been changed.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'reposition',
	        value: function reposition(id) {
	            var _this7 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Trigger the resize
	                    _this7.instances[flickityIndex].instance.reposition();
	
	                    resolve(_this7.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Re-collect all cell elements in `flickity-slider`.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'reloadCells',
	        value: function reloadCells(id) {
	            var _this8 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Reload cells
	                    _this8.instances[flickityIndex].instance.reloadCells();
	
	                    resolve(_this8.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the Flickity instance
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'get',
	        value: function get(id) {
	            var _this9 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this9.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the first Flickity instance
	         *
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'getFirst',
	        value: function getFirst() {
	            var _this10 = this;
	
	            return this.$q(function (resolve, reject) {
	                if (!_this10.instances || _this10.instances.length < 1) {
	                    reject('No instances exist');
	                } else {
	                    resolve(_this10.instances[0]);
	                }
	            });
	        }
	
	        /**
	         * Get the Flickity instance
	         *
	         * @param {Element} element
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'getByElement',
	        value: function getByElement(element) {
	            return this.$q(function (resolve, reject) {
	                var instance = Flickity.data(element);
	
	                if (instance) {
	                    resolve(instance);
	                } else {
	                    reject('Instance not found for ' + element);
	                }
	            });
	        }
	
	        /**
	         * Prepend elements and create cells to the beginning of the gallery.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'prepend',
	        value: function prepend(id, elements) {
	            var _this11 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Prepend the slides
	                    _this11.instances[flickityIndex].instance.prepend(elements);
	
	                    resolve(_this11.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Append elements and create cells to the end of the gallery.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'append',
	        value: function append(id, elements) {
	            var _this12 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Append the slides
	                    _this12.instances[flickityIndex].instance.append(elements);
	
	                    resolve(_this12.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Insert elements into the gallery and create cells at the desired index.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @param {Integer} index - Zero based index
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'insert',
	        value: function insert(id, elements, index) {
	            var _this13 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Insert the slides
	                    _this13.instances[flickityIndex].instance.insert(elements, index);
	
	                    resolve(_this13.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the elements of the cells
	         *
	         * @param {String} id
	         * @return {Array} cellElements
	         */
	
	    }, {
	        key: 'getCellElements',
	        value: function getCellElements(id) {
	            var _this14 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this14.instances[flickityIndex].instance.getCellElements());
	                }
	            });
	        }
	
	        /**
	         * Get the elements of the cells
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(id, elements) {
	            var _this15 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    _this15.instances[flickityIndex].instance.remove(elements);
	
	                    resolve(_this15.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the currently selected cell element
	         *
	         * @param {String} id
	         * @return {Element} selectedCellElement
	         */
	
	    }, {
	        key: 'selectedElement',
	        value: function selectedElement(id) {
	            var _this16 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this16.instances[flickityIndex].instance.selectedElement);
	                }
	            });
	        }
	
	        /**
	         * Get an array of all cells
	         *
	         * @param {String} id
	         * @return {Array} cells
	         */
	
	    }, {
	        key: 'cells',
	        value: function cells(id) {
	            var _this17 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this17.instances[flickityIndex].instance.cells);
	                }
	            });
	        }
	
	        //
	        // Helper methods
	        //
	
	        /**
	         * Find the index for a Flickity instance
	         *
	         * @param {String} id
	         * @return {Integer} flickityIndex
	         */
	
	    }, {
	        key: '_getFlickityIndex',
	        value: function _getFlickityIndex(id) {
	            var negativeIndexForUnfound = -1;
	
	            // If no instances exist, cancel
	            if (this.instances.length < 1) {
	
	                return negativeIndexForUnfound;
	            } else {
	
	                // Find the instance by ID
	                var index = this.instances.findIndex(matchesId);
	
	                if (index === false) {
	                    return negativeIndexForUnfound;
	                } else {
	                    return index;
	                }
	            }
	
	            // Test to match an item in an array based on the id
	            function matchesId(item, index, array) {
	                if (item.id === id) {
	                    return item;
	                }
	            }
	        }
	    }]);
	
	    return FlickityService;
	})();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	FlickityDirective.$inject = ["$timeout", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityDirective = FlickityDirective;
	/* global Flickity */
	
	/**
	 * Flickity.js
	 * http://flickity.metafizzy.co/options.html
	 *
	 * Required markup
	 *
	 * <div bc-flickity flickity-options="{{ vm.myCustomOptions }}">
	 *   <div>
	 *   <div>
	 *   ...
	 * </div>
	 *
	 */
	function FlickityDirective($timeout, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    linkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickity: '@?',
	            bcFlickityId: '@?'
	        },
	        link: linkFunction,
	        controller: FlickityController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Link
	     */
	    function linkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // If no ID was passed in
	
	        if (!$controller.bcFlickityId) {
	            // Use the element's ID if one exists
	            if ($attrs.id) {
	                $controller.bcFlickityId = $attrs.id;
	            }
	        }
	
	        // Using a timeout ensures that any ng-repeats can finish running before we initialize
	        $timeout(function () {
	            // Initialize Flickity
	            var flickityInstance = FlickityService.create($element[0], $controller.bcFlickityId, $controller.options);
	
	            // Expose the Flickity instance and ID
	            $controller.Flickity = flickityInstance.instance;
	            $controller.bcFlickityId = flickityInstance.id;
	        });
	
	        // Clean up when being destroyed
	        var onDestroy = $scope.$on('$destroy', function (event) {
	            FlickityService.destroy($controller.bcFlickityId);
	        });
	    }
	
	    /**
	     * Controller
	     */
	    function FlickityController() {
	
	        // Extend the default options with user configuration
	        this.options = angular.extend({}, FlickityConfig, angular.fromJson(this.bcFlickity));
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	FlickityNextDirective.$inject = ["$log", "$timeout", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityNextDirective = FlickityNextDirective;
	function FlickityNextDirective($log, $timeout, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    linkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickityNext: '=?',
	            bcFlickityId: '@?'
	        },
	        link: linkFunction,
	        controller: FlickityNextController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Link
	     */
	    function linkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Trigger next() method
	
	        $element.on('click', function () {
	            FlickityService.next($controller.flickityId, $scope.bcFlickityNext);
	        });
	    }
	
	    /**
	     * Controller
	     */
	    function FlickityNextController() {
	        var _this = this;
	
	        // Assign or fall back to default
	        this.wrapAround = this.bcFlickityNext || FlickityConfig.wrapAround;
	
	        if (this.bcFlickityId) {
	            this.flickityId = this.bcFlickityId;
	        } else {
	            $timeout(function () {
	                FlickityService.getFirst().then(function (instance) {
	                    _this.flickityId = instance.id;
	                }).catch(function (error) {
	                    $log.warn(error);
	                });
	            });
	        }
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	FlickityPreviousDirective.$inject = ["$log", "$timeout", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityPreviousDirective = FlickityPreviousDirective;
	function FlickityPreviousDirective($log, $timeout, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    linkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickityPrevious: '=?',
	            bcFlickityId: '@?'
	        },
	        link: linkFunction,
	        controller: FlickityPreviousController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Link
	     */
	    function linkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Bind the click up to the required controller
	
	        $element.on('click', function () {
	            FlickityService.previous($controller.flickityId, $controller.wrapAround);
	        });
	    }
	
	    /**
	     * Controller
	     */
	    function FlickityPreviousController() {
	        var _this = this;
	
	        // Assign or fall back to default
	        this.wrapAround = this.bcFlickityPrevious || FlickityConfig.wrapAround;
	
	        if (this.bcFlickityId) {
	            this.flickityId = this.bcFlickityId;
	        } else {
	            $timeout(function () {
	                FlickityService.getFirst().then(function (instance) {
	                    _this.flickityId = instance.id;
	                }).catch(function (error) {
	                    $log.warn(error);
	                });
	            });
	        }
	    }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-flickity.js.map