(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["trade-management-swing"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/TradeManagementSwing.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/TradeManagementSwing.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"SymbolMaintenance\",\n  props: {\n    msg: String\n  },\n  data: function data() {\n    return {\n      dataLoading: true,\n      overlay: false,\n      loading: false,\n      tradingData: [],\n      response: \"\",\n      switchTradeResponse: \"\",\n      search: \"\",\n      snack: false,\n      snackColor: \"\",\n      snackText: \"\"\n    };\n  },\n  watch: {\n    dialog: function dialog(val) {\n      val || this.close();\n    },\n    dialogDelete: function dialogDelete(val) {\n      val || this.closeDelete();\n    }\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    // ToDo: Disable symbols that do not have blocks created yet\n    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(\"http://localhost:8080/api/GetTradingDataSwing\").then(function (response) {\n      _this.tradingData = response.data;\n      _this.dataLoading = !_this.dataLoading;\n    });\n  },\n  computed: {\n    headers: function headers() {\n      return [{\n        text: \"Symbol\",\n        value: \"symbol\"\n      }, {\n        text: \"Trading\",\n        value: \"trading\"\n      }, {\n        text: \"Current Qty\",\n        value: \"currentQuantity\"\n      }, {\n        text: \"Open Position Profit\",\n        value: \"openProfit\"\n      }, {\n        text: \"Closed Position Profit\",\n        value: \"closedProfit\"\n      }, {\n        text: \"Condensed Profit\",\n        value: \"condensedProfit\"\n      }, {\n        text: \"Total Profit\",\n        value: \"totalProfit\"\n      }];\n    }\n  },\n  methods: {\n    displaySnack: function displaySnack(color, text) {\n      this.snackColor = color;\n      this.snackText = text;\n      this.snack = true;\n      this.overlay = false;\n    },\n    getColor: function getColor(profit) {\n      if (profit === 0) return \"blue\";else if (profit > 0) return \"green\";else return \"red\";\n    },\n    getSwitchLabel: function getSwitchLabel(trading) {\n      if (trading) return \"On\";else return \"Off\";\n    },\n    switchTrading: function switchTrading(item) {\n      var _this2 = this;\n\n      var symbol = item.symbol;\n      item.loading = !item.loading;\n      this.dataLoading = !this.dataLoading;\n\n      if (item.trading) {\n        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(\"http://localhost:8080/api/UpdateTradingStatus\", {\n          id: item.symbolId,\n          name: item.symbol,\n          trading: item.trading\n        }).then(function (response) {\n          _this2.dataLoading = !_this2.dataLoading;\n          item.loading = !item.loading;\n          _this2.updateSymbolResponse = response.data;\n\n          _this2.displaySnack(\"success\", \"Successfully activated trading for \" + symbol + \".\");\n        }).catch(function (err) {\n          if (err.response) {\n            // Request made and server responded\n            _this2.displaySnack(\"error\", \"Error while activating trading. \" + err.response.data);\n          } else if (err.request) {\n            // The request was made but no response was received\n            console.log(err.request);\n          } else {\n            // Something happened in setting up the request that triggered an Error\n            console.log(\"Error\", err.message);\n          }\n\n          _this2.dataLoading = !_this2.dataLoading;\n          item.loading = !item.loading;\n        });\n      } else {\n        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(\"http://localhost:8080/api/StopTrading\", null, {\n          params: {\n            symbol: symbol\n          }\n        }).then(function (response) {\n          _this2.dataLoading = !_this2.dataLoading;\n          item.loading = !item.loading;\n          _this2.updateSymbolResponse = response.data;\n\n          _this2.displaySnack(\"success\", \"Successfully deactivated trading for \" + symbol + \".\");\n        }).catch(function (err) {\n          if (err.response) {\n            // Request made and server responded\n            _this2.displaySnack(\"error\", \"Error while deactivating trading. \" + err.response.data);\n          } else if (err.request) {\n            // The request was made but no response was received\n            console.log(err.request);\n          } else {\n            // Something happened in setting up the request that triggered an Error\n            console.log(\"Error\", err.message);\n          }\n\n          _this2.dataLoading = !_this2.dataLoading;\n          item.loading = !item.loading;\n        });\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/views/TradeManagementSwing.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"75944cb3-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"75944cb3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\n        \"v-container\",\n        [\n          _c(\"v-data-table\", {\n            staticClass: \"elevation-1\",\n            attrs: {\n              headers: _vm.headers,\n              items: _vm.tradingData,\n              loading: _vm.dataLoading,\n              \"loading-text\": \"Loading... Please wait\"\n            },\n            scopedSlots: _vm._u([\n              {\n                key: \"top\",\n                fn: function() {\n                  return [\n                    _c(\n                      \"v-toolbar\",\n                      { attrs: { flat: \"\" } },\n                      [\n                        _c(\"v-toolbar-title\", [\n                          _vm._v(\"Trade Management Swing\")\n                        ]),\n                        _c(\"v-divider\", {\n                          staticClass: \"mx-4\",\n                          attrs: { inset: \"\", vertical: \"\" }\n                        }),\n                        _c(\"v-spacer\")\n                      ],\n                      1\n                    )\n                  ]\n                },\n                proxy: true\n              },\n              {\n                key: \"item.symbol\",\n                fn: function(ref) {\n                  var item = ref.item\n                  return [\n                    _c(\n                      \"v-chip\",\n                      {\n                        attrs: {\n                          color: _vm.getColor(item.totalProfit),\n                          dark: \"\"\n                        }\n                      },\n                      [_vm._v(\" \" + _vm._s(item.symbol) + \" \")]\n                    )\n                  ]\n                }\n              },\n              {\n                key: \"item.trading\",\n                fn: function(ref) {\n                  var item = ref.item\n                  return [\n                    _c(\"v-switch\", {\n                      attrs: {\n                        loading: item.loading,\n                        disabled: item.loading,\n                        inset: \"\",\n                        label: _vm.getSwitchLabel(item.trading)\n                      },\n                      on: {\n                        click: function($event) {\n                          return _vm.switchTrading(item)\n                        }\n                      },\n                      model: {\n                        value: item.trading,\n                        callback: function($$v) {\n                          _vm.$set(item, \"trading\", $$v)\n                        },\n                        expression: \"item.trading\"\n                      }\n                    })\n                  ]\n                }\n              },\n              {\n                key: \"no-data\",\n                fn: function() {\n                  return undefined\n                },\n                proxy: true\n              }\n            ])\n          }),\n          _c(\n            \"v-snackbar\",\n            {\n              attrs: { timeout: 3000, color: _vm.snackColor },\n              scopedSlots: _vm._u([\n                {\n                  key: \"action\",\n                  fn: function(ref) {\n                    var attrs = ref.attrs\n                    return [\n                      _c(\n                        \"v-btn\",\n                        _vm._b(\n                          {\n                            attrs: { text: \"\" },\n                            on: {\n                              click: function($event) {\n                                _vm.snack = false\n                              }\n                            }\n                          },\n                          \"v-btn\",\n                          attrs,\n                          false\n                        ),\n                        [_vm._v(\" Close \")]\n                      )\n                    ]\n                  }\n                }\n              ]),\n              model: {\n                value: _vm.snack,\n                callback: function($$v) {\n                  _vm.snack = $$v\n                },\n                expression: \"snack\"\n              }\n            },\n            [_vm._v(\" \" + _vm._s(_vm.snackText) + \" \")]\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/TradeManagementSwing.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2275944cb3-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify/src/components/VSwitch/VSwitch.sass":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./node_modules/vuetify/src/components/VSwitch/VSwitch.sass ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".theme--light.v-input--switch .v-input--switch__thumb {\\n  color: #FFFFFF;\\n}\\n.theme--light.v-input--switch .v-input--switch__track {\\n  color: rgba(0, 0, 0, 0.38);\\n}\\n.theme--light.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__thumb {\\n  color: #fafafa !important;\\n}\\n.theme--light.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__track {\\n  color: rgba(0, 0, 0, 0.12) !important;\\n}\\n\\n.theme--dark.v-input--switch .v-input--switch__thumb {\\n  color: #bdbdbd;\\n}\\n.theme--dark.v-input--switch .v-input--switch__track {\\n  color: rgba(255, 255, 255, 0.3);\\n}\\n.theme--dark.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__thumb {\\n  color: #424242 !important;\\n}\\n.theme--dark.v-input--switch.v-input--is-disabled:not(.v-input--is-dirty) .v-input--switch__track {\\n  color: rgba(255, 255, 255, 0.1) !important;\\n}\\n\\n.v-input--switch__track, .v-input--switch__thumb {\\n  background-color: currentColor;\\n  pointer-events: none;\\n  transition: inherit;\\n}\\n.v-input--switch__track {\\n  border-radius: 8px;\\n  width: 36px;\\n  height: 14px;\\n  left: 2px;\\n  position: absolute;\\n  opacity: 0.6;\\n  right: 2px;\\n  top: calc(50% - 7px);\\n}\\n.v-input--switch__thumb {\\n  border-radius: 50%;\\n  top: calc(50% - 10px);\\n  height: 20px;\\n  position: relative;\\n  width: 20px;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);\\n}\\n.v-input--switch .v-input--selection-controls__input {\\n  width: 38px;\\n}\\n.v-input--switch .v-input--selection-controls__ripple {\\n  top: calc(50% - 24px);\\n}\\n.v-input--switch.v-input--dense .v-input--switch__thumb {\\n  width: 18px;\\n  height: 18px;\\n}\\n.v-input--switch.v-input--dense .v-input--switch__track {\\n  height: 12px;\\n  width: 32px;\\n}\\n.v-input--switch.v-input--dense.v-input--switch--inset .v-input--switch__track {\\n  height: 22px;\\n  width: 44px;\\n  top: calc(50% - 12px);\\n  left: -3px;\\n}\\n.v-input--switch.v-input--dense .v-input--selection-controls__ripple {\\n  top: calc(50% - 22px);\\n}\\n.v-input--switch.v-input--is-dirty.v-input--is-disabled {\\n  opacity: 0.6;\\n}\\n.v-application--is-ltr .v-input--switch .v-input--selection-controls__ripple {\\n  left: -14px;\\n}\\n.v-application--is-ltr .v-input--switch.v-input--dense .v-input--selection-controls__ripple {\\n  left: -12px;\\n}\\n.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,\\n.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--switch__thumb {\\n  transform: translate(20px, 0);\\n}\\n.v-application--is-rtl .v-input--switch .v-input--selection-controls__ripple {\\n  right: -14px;\\n}\\n.v-application--is-rtl .v-input--switch.v-input--dense .v-input--selection-controls__ripple {\\n  right: -12px;\\n}\\n.v-application--is-rtl .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple,\\n.v-application--is-rtl .v-input--switch.v-input--is-dirty .v-input--switch__thumb {\\n  transform: translate(-20px, 0);\\n}\\n.v-input--switch:not(.v-input--switch--flat):not(.v-input--switch--inset) .v-input--switch__thumb {\\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\\n}\\n.v-input--switch--inset .v-input--switch__track,\\n.v-input--switch--inset .v-input--selection-controls__input {\\n  width: 48px;\\n}\\n.v-input--switch--inset .v-input--switch__track {\\n  border-radius: 14px;\\n  height: 28px;\\n  left: -4px;\\n  opacity: 0.32;\\n  top: calc(50% - 14px);\\n}\\n.v-application--is-ltr .v-input--switch--inset .v-input--selection-controls__ripple,\\n.v-application--is-ltr .v-input--switch--inset .v-input--switch__thumb {\\n  transform: translate(0, 0) !important;\\n}\\n.v-application--is-rtl .v-input--switch--inset .v-input--selection-controls__ripple,\\n.v-application--is-rtl .v-input--switch--inset .v-input--switch__thumb {\\n  transform: translate(-6px, 0) !important;\\n}\\n.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,\\n.v-application--is-ltr .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb {\\n  transform: translate(20px, 0) !important;\\n}\\n.v-application--is-rtl .v-input--switch--inset.v-input--is-dirty .v-input--selection-controls__ripple,\\n.v-application--is-rtl .v-input--switch--inset.v-input--is-dirty .v-input--switch__thumb {\\n  transform: translate(-26px, 0) !important;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./node_modules/vuetify/src/components/VSwitch/VSwitch.sass?./node_modules/css-loader/dist/cjs.js??ref--9-oneOf-3-1!./node_modules/postcss-loader/src??ref--9-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--9-oneOf-3-3");

/***/ }),

/***/ "./node_modules/vuetify/lib/components/VSwitch/VSwitch.js":
/*!****************************************************************!*\
  !*** ./node_modules/vuetify/lib/components/VSwitch/VSwitch.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_geoff_davis_source_repos_trading_tracker_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var core_js_modules_es_array_flat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.flat.js */ \"./node_modules/core-js/modules/es.array.flat.js\");\n/* harmony import */ var core_js_modules_es_array_flat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_flat_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_styles_components_selection_controls_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../src/styles/components/_selection-controls.sass */ \"./node_modules/vuetify/src/styles/components/_selection-controls.sass\");\n/* harmony import */ var _src_styles_components_selection_controls_sass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_styles_components_selection_controls_sass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_components_VSwitch_VSwitch_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../src/components/VSwitch/VSwitch.sass */ \"./node_modules/vuetify/src/components/VSwitch/VSwitch.sass\");\n/* harmony import */ var _src_components_VSwitch_VSwitch_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_components_VSwitch_VSwitch_sass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mixins_selectable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/selectable */ \"./node_modules/vuetify/lib/mixins/selectable/index.js\");\n/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VInput */ \"./node_modules/vuetify/lib/components/VInput/index.js\");\n/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../directives/touch */ \"./node_modules/vuetify/lib/directives/touch/index.js\");\n/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../transitions */ \"./node_modules/vuetify/lib/components/transitions/index.js\");\n/* harmony import */ var _VProgressCircular_VProgressCircular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../VProgressCircular/VProgressCircular */ \"./node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js\");\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/helpers */ \"./node_modules/vuetify/lib/util/helpers.js\");\n\n\n// Styles\n\n // Mixins\n\n\n // Directives\n\n // Components\n\n\n // Helpers\n\n\n/* @vue/component */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_mixins_selectable__WEBPACK_IMPORTED_MODULE_4__[\"default\"].extend({\n  name: 'v-switch',\n  directives: {\n    Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n  },\n  props: {\n    inset: Boolean,\n    loading: {\n      type: [Boolean, String],\n      default: false\n    },\n    flat: {\n      type: Boolean,\n      default: false\n    }\n  },\n  computed: {\n    classes: function classes() {\n      return Object(C_Users_geoff_davis_source_repos_trading_tracker_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(C_Users_geoff_davis_source_repos_trading_tracker_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, _VInput__WEBPACK_IMPORTED_MODULE_5__[\"default\"].options.computed.classes.call(this)), {}, {\n        'v-input--selection-controls v-input--switch': true,\n        'v-input--switch--flat': this.flat,\n        'v-input--switch--inset': this.inset\n      });\n    },\n    attrs: function attrs() {\n      return {\n        'aria-checked': String(this.isActive),\n        'aria-disabled': String(this.isDisabled),\n        role: 'switch'\n      };\n    },\n    // Do not return undefined if disabled,\n    // according to spec, should still show\n    // a color when disabled and active\n    validationState: function validationState() {\n      if (this.hasError && this.shouldValidate) return 'error';\n      if (this.hasSuccess) return 'success';\n      if (this.hasColor !== null) return this.computedColor;\n      return undefined;\n    },\n    switchData: function switchData() {\n      return this.setTextColor(this.loading ? undefined : this.validationState, {\n        class: this.themeClasses\n      });\n    }\n  },\n  methods: {\n    genDefaultSlot: function genDefaultSlot() {\n      return [this.genSwitch(), this.genLabel()];\n    },\n    genSwitch: function genSwitch() {\n      return this.$createElement('div', {\n        staticClass: 'v-input--selection-controls__input'\n      }, [this.genInput('checkbox', Object(C_Users_geoff_davis_source_repos_trading_tracker_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(C_Users_geoff_davis_source_repos_trading_tracker_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, this.attrs), this.attrs$)), this.genRipple(this.setTextColor(this.validationState, {\n        directives: [{\n          name: 'touch',\n          value: {\n            left: this.onSwipeLeft,\n            right: this.onSwipeRight\n          }\n        }]\n      })), this.$createElement('div', Object(C_Users_geoff_davis_source_repos_trading_tracker_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        staticClass: 'v-input--switch__track'\n      }, this.switchData)), this.$createElement('div', Object(C_Users_geoff_davis_source_repos_trading_tracker_frontend_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        staticClass: 'v-input--switch__thumb'\n      }, this.switchData), [this.genProgress()])]);\n    },\n    genProgress: function genProgress() {\n      return this.$createElement(_transitions__WEBPACK_IMPORTED_MODULE_7__[\"VFabTransition\"], {}, [this.loading === false ? null : this.$slots.progress || this.$createElement(_VProgressCircular_VProgressCircular__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        props: {\n          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,\n          size: 16,\n          width: 2,\n          indeterminate: true\n        }\n      })]);\n    },\n    onSwipeLeft: function onSwipeLeft() {\n      if (this.isActive) this.onChange();\n    },\n    onSwipeRight: function onSwipeRight() {\n      if (!this.isActive) this.onChange();\n    },\n    onKeydown: function onKeydown(e) {\n      if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_9__[\"keyCodes\"].left && this.isActive || e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_9__[\"keyCodes\"].right && !this.isActive) this.onChange();\n    }\n  }\n}));\n\n//# sourceURL=webpack:///./node_modules/vuetify/lib/components/VSwitch/VSwitch.js?");

/***/ }),

/***/ "./node_modules/vuetify/lib/components/VSwitch/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/vuetify/lib/components/VSwitch/index.js ***!
  \**************************************************************/
/*! exports provided: VSwitch, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _VSwitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSwitch */ \"./node_modules/vuetify/lib/components/VSwitch/VSwitch.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"VSwitch\", function() { return _VSwitch__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_VSwitch__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./node_modules/vuetify/lib/components/VSwitch/index.js?");

/***/ }),

/***/ "./node_modules/vuetify/src/components/VSwitch/VSwitch.sass":
/*!******************************************************************!*\
  !*** ./node_modules/vuetify/src/components/VSwitch/VSwitch.sass ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../../css-loader/dist/cjs.js??ref--9-oneOf-3-1!../../../../postcss-loader/src??ref--9-oneOf-3-2!../../../../sass-loader/dist/cjs.js??ref--9-oneOf-3-3!./VSwitch.sass */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vuetify/src/components/VSwitch/VSwitch.sass\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../../vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"7c8a2b0b\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./node_modules/vuetify/src/components/VSwitch/VSwitch.sass?");

/***/ }),

/***/ "./src/views/TradeManagementSwing.vue":
/*!********************************************!*\
  !*** ./src/views/TradeManagementSwing.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TradeManagementSwing_vue_vue_type_template_id_ac34139e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true& */ \"./src/views/TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true&\");\n/* harmony import */ var _TradeManagementSwing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TradeManagementSwing.vue?vue&type=script&lang=js& */ \"./src/views/TradeManagementSwing.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VChip */ \"./node_modules/vuetify/lib/components/VChip/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ \"./node_modules/vuetify/lib/components/VDataTable/index.js\");\n/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ \"./node_modules/vuetify/lib/components/VDivider/index.js\");\n/* harmony import */ var vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VSnackbar */ \"./node_modules/vuetify/lib/components/VSnackbar/index.js\");\n/* harmony import */ var vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VSwitch */ \"./node_modules/vuetify/lib/components/VSwitch/index.js\");\n/* harmony import */ var vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VToolbar */ \"./node_modules/vuetify/lib/components/VToolbar/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _TradeManagementSwing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _TradeManagementSwing_vue_vue_type_template_id_ac34139e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _TradeManagementSwing_vue_vue_type_template_id_ac34139e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"ac34139e\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__[\"VBtn\"],VChip: vuetify_lib_components_VChip__WEBPACK_IMPORTED_MODULE_5__[\"VChip\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VContainer\"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_7__[\"VDataTable\"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_8__[\"VDivider\"],VSnackbar: vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_9__[\"VSnackbar\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_6__[\"VSpacer\"],VSwitch: vuetify_lib_components_VSwitch__WEBPACK_IMPORTED_MODULE_10__[\"VSwitch\"],VToolbar: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_11__[\"VToolbar\"],VToolbarTitle: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_11__[\"VToolbarTitle\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/TradeManagementSwing.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/TradeManagementSwing.vue?");

/***/ }),

/***/ "./src/views/TradeManagementSwing.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./src/views/TradeManagementSwing.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeManagementSwing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./TradeManagementSwing.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/TradeManagementSwing.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeManagementSwing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/TradeManagementSwing.vue?");

/***/ }),

/***/ "./src/views/TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./src/views/TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_75944cb3_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeManagementSwing_vue_vue_type_template_id_ac34139e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"75944cb3-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"75944cb3-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/TradeManagementSwing.vue?vue&type=template&id=ac34139e&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_75944cb3_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeManagementSwing_vue_vue_type_template_id_ac34139e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_75944cb3_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeManagementSwing_vue_vue_type_template_id_ac34139e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/TradeManagementSwing.vue?");

/***/ })

}]);