(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["symbol-management"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SymbolManagement.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SymbolManagement.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ \"./node_modules/core-js/modules/es.array.splice.js\");\n/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"SymbolManagement\",\n  data: function data() {\n    return {\n      dataLoading: true,\n      overlay: false,\n      symbols: [],\n      response: \"\",\n      search: \"\",\n      dialog: false,\n      dialogDelete: false,\n      editedIndex: -1,\n      editedItem: {\n        name: \"\",\n        active: \"\"\n      },\n      defaultItem: {\n        name: \"\",\n        active: \"\"\n      },\n      snack: false,\n      snackColor: \"\",\n      snackText: \"\"\n    };\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(\"https://tradingservice.azurewebsites.net/api\" + \"/GetTradingSymbols\", {\n      headers: {\n        'Access-Control-Allow-Origin': \"*\"\n      }\n    }).then(function (response) {\n      _this.symbols = response.data;\n      _this.dataLoading = false;\n    }).catch(function (err) {\n      _this.displaySnack(\"error\", \"Error while getting symbols. \" + err);\n    });\n  },\n  watch: {\n    dialog: function dialog(val) {\n      var _this2 = this;\n\n      val || this.close();\n\n      if (this.editedIndex < 0) {\n        this.editedItem.active = true; // default active to true for new symbol creation dialog\n\n        if (val) {\n          setTimeout(function () {\n            _this2.$refs.symbolName.focus();\n          });\n        }\n      }\n    },\n    dialogDelete: function dialogDelete(val) {\n      val || this.closeDelete();\n    }\n  },\n  computed: {\n    headers: function headers() {\n      return [{\n        text: \"Name\",\n        value: \"name\"\n      }, {\n        text: \"Active\",\n        value: \"active\"\n      }, {\n        text: \"Actions\",\n        value: \"actions\",\n        sortable: false\n      }];\n    },\n    formTitle: function formTitle() {\n      return this.editedIndex === -1 ? \"New Item\" : \"Edit Item\";\n    }\n  },\n  methods: {\n    editItem: function editItem(item) {\n      this.editedIndex = this.symbols.indexOf(item);\n      this.editedItem = Object.assign({}, item);\n      this.dialog = true;\n    },\n    deleteItem: function deleteItem(item) {\n      this.editedIndex = this.symbols.indexOf(item);\n      this.editedItem = Object.assign({}, item);\n      this.dialogDelete = true;\n    },\n    deleteItemConfirm: function deleteItemConfirm() {\n      var _this3 = this;\n\n      this.overlay = true;\n      var symbolName = this.editedItem.name;\n      var symbolId = this.editedItem.id;\n      var symbolIndex = this.editedIndex;\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.delete(\"http://localhost:8080/api/DeleteTradingSymbol\", {\n        data: {\n          id: symbolId,\n          name: symbolName\n        }\n      }).then(function (response) {\n        _this3.response = response.data;\n\n        _this3.symbols.splice(symbolIndex, 1);\n\n        _this3.displaySnack(\"success\", \"Successfully deleted symbol \" + symbolName + \".\");\n      }).catch(function (err) {\n        _this3.displaySnack(\"error\", \"Error while deleting symbol \" + symbolName + \". \" + err);\n      });\n      this.closeDelete();\n    },\n    close: function close() {\n      var _this4 = this;\n\n      this.dialog = false;\n      this.$nextTick(function () {\n        _this4.editedItem = Object.assign({}, _this4.defaultItem);\n        _this4.editedIndex = -1;\n      });\n    },\n    closeDelete: function closeDelete() {\n      var _this5 = this;\n\n      this.dialogDelete = false;\n      this.$nextTick(function () {\n        _this5.editedItem = Object.assign({}, _this5.defaultItem);\n        _this5.editedIndex = -1;\n      });\n    },\n    save: function save() {\n      var _this6 = this;\n\n      this.overlay = true;\n      var symbolIndex = this.editedIndex;\n      var newSymbol = this.editedItem;\n      var symbol = this.editedItem.name;\n\n      if (this.editedIndex > -1) {\n        // edit\n        axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(\"http://localhost:8080/api/UpdateTradingSymbol\", {\n          id: this.editedItem.id,\n          oldName: this.symbols[symbolIndex].name,\n          name: this.editedItem.name,\n          active: this.editedItem.active\n        }).then(function (response) {\n          _this6.response = response.data;\n          Object.assign(_this6.symbols[symbolIndex], newSymbol);\n\n          _this6.displaySnack(\"success\", \"Successfully updated symbol \" + newSymbol.name + \".\");\n        }).catch(function (err) {\n          _this6.displaySnack(\"error\", \"Error while editing symbol. \" + err);\n        });\n      } else {\n        // create new\n        axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(\"http://localhost:8080/api/CreateTradingSymbol\", null, {\n          params: {\n            symbol: symbol\n          }\n        }).then(function (response) {\n          _this6.response = response.data;\n          newSymbol.id = _this6.response.id;\n\n          _this6.symbols.push(newSymbol);\n\n          _this6.displaySnack(\"success\", \"Successfully added symbol \" + newSymbol.name + \".\");\n        }).catch(function (err) {\n          _this6.displaySnack(\"error\", \"Error while creating new symbol. \" + err);\n        });\n      }\n\n      this.close();\n    },\n    displaySnack: function displaySnack(color, text) {\n      this.snackColor = color;\n      this.snackText = text;\n      this.snack = true;\n      this.overlay = false;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/views/SymbolManagement.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6b9769d6-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6b9769d6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\n        \"v-container\",\n        [\n          _c(\n            \"v-overlay\",\n            { attrs: { value: _vm.overlay } },\n            [\n              _c(\"v-progress-circular\", {\n                attrs: { indeterminate: \"\", size: \"64\" }\n              })\n            ],\n            1\n          ),\n          _c(\"v-data-table\", {\n            staticClass: \"elevation-1\",\n            attrs: {\n              headers: _vm.headers,\n              items: _vm.symbols,\n              loading: _vm.dataLoading,\n              \"loading-text\": \"Loading... Please wait\",\n              \"no-data-text\":\n                \"No symbols have been added yet. Click Add Symbol to add your first symbol.\"\n            },\n            scopedSlots: _vm._u([\n              {\n                key: \"top\",\n                fn: function() {\n                  return [\n                    _c(\n                      \"v-toolbar\",\n                      { attrs: { flat: \"\" } },\n                      [\n                        _c(\"v-toolbar-title\", [_vm._v(\"Symbol Management\")]),\n                        _c(\"v-divider\", {\n                          staticClass: \"mx-4\",\n                          attrs: { inset: \"\", vertical: \"\" }\n                        }),\n                        _c(\"v-spacer\"),\n                        _c(\n                          \"v-dialog\",\n                          {\n                            attrs: { \"max-width\": \"500px\" },\n                            scopedSlots: _vm._u([\n                              {\n                                key: \"activator\",\n                                fn: function(ref) {\n                                  var on = ref.on\n                                  var attrs = ref.attrs\n                                  return [\n                                    _c(\n                                      \"v-btn\",\n                                      _vm._g(\n                                        _vm._b(\n                                          {\n                                            staticClass: \"mb-2\",\n                                            attrs: {\n                                              color: \"primary\",\n                                              dark: \"\"\n                                            }\n                                          },\n                                          \"v-btn\",\n                                          attrs,\n                                          false\n                                        ),\n                                        on\n                                      ),\n                                      [_vm._v(\" Add Symbol \")]\n                                    )\n                                  ]\n                                }\n                              }\n                            ]),\n                            model: {\n                              value: _vm.dialog,\n                              callback: function($$v) {\n                                _vm.dialog = $$v\n                              },\n                              expression: \"dialog\"\n                            }\n                          },\n                          [\n                            _c(\n                              \"v-card\",\n                              [\n                                _c(\"v-card-title\", [\n                                  _c(\"span\", { staticClass: \"headline\" }, [\n                                    _vm._v(_vm._s(_vm.formTitle))\n                                  ])\n                                ]),\n                                _c(\n                                  \"v-card-text\",\n                                  [\n                                    _c(\n                                      \"v-container\",\n                                      [\n                                        _c(\n                                          \"v-row\",\n                                          [\n                                            _c(\n                                              \"v-col\",\n                                              {\n                                                attrs: {\n                                                  cols: \"12\",\n                                                  sm: \"6\",\n                                                  md: \"4\"\n                                                }\n                                              },\n                                              [\n                                                _c(\"v-text-field\", {\n                                                  ref: \"symbolName\",\n                                                  attrs: { label: \"Name\" },\n                                                  model: {\n                                                    value: _vm.editedItem.name,\n                                                    callback: function($$v) {\n                                                      _vm.$set(\n                                                        _vm.editedItem,\n                                                        \"name\",\n                                                        $$v\n                                                      )\n                                                    },\n                                                    expression:\n                                                      \"editedItem.name\"\n                                                  }\n                                                })\n                                              ],\n                                              1\n                                            ),\n                                            _c(\n                                              \"v-col\",\n                                              {\n                                                attrs: {\n                                                  cols: \"12\",\n                                                  sm: \"6\",\n                                                  md: \"4\"\n                                                }\n                                              },\n                                              [\n                                                _c(\"v-checkbox\", {\n                                                  attrs: { label: \"Active\" },\n                                                  model: {\n                                                    value:\n                                                      _vm.editedItem.active,\n                                                    callback: function($$v) {\n                                                      _vm.$set(\n                                                        _vm.editedItem,\n                                                        \"active\",\n                                                        $$v\n                                                      )\n                                                    },\n                                                    expression:\n                                                      \"editedItem.active\"\n                                                  }\n                                                })\n                                              ],\n                                              1\n                                            )\n                                          ],\n                                          1\n                                        )\n                                      ],\n                                      1\n                                    )\n                                  ],\n                                  1\n                                ),\n                                _c(\n                                  \"v-card-actions\",\n                                  [\n                                    _c(\"v-spacer\"),\n                                    _c(\n                                      \"v-btn\",\n                                      {\n                                        attrs: {\n                                          color: \"blue darken-1\",\n                                          text: \"\"\n                                        },\n                                        on: { click: _vm.close }\n                                      },\n                                      [_vm._v(\" Cancel \")]\n                                    ),\n                                    _c(\n                                      \"v-btn\",\n                                      {\n                                        attrs: {\n                                          color: \"blue darken-1\",\n                                          text: \"\"\n                                        },\n                                        on: { click: _vm.save }\n                                      },\n                                      [_vm._v(\" Save \")]\n                                    )\n                                  ],\n                                  1\n                                )\n                              ],\n                              1\n                            )\n                          ],\n                          1\n                        ),\n                        _c(\n                          \"v-dialog\",\n                          {\n                            attrs: { \"max-width\": \"650px\" },\n                            model: {\n                              value: _vm.dialogDelete,\n                              callback: function($$v) {\n                                _vm.dialogDelete = $$v\n                              },\n                              expression: \"dialogDelete\"\n                            }\n                          },\n                          [\n                            _c(\n                              \"v-card\",\n                              [\n                                _c(\n                                  \"v-card-title\",\n                                  { staticClass: \"headline\" },\n                                  [\n                                    _vm._v(\n                                      \"Are you sure you want to delete symbol \" +\n                                        _vm._s(_vm.editedItem.name) +\n                                        \"?\"\n                                    )\n                                  ]\n                                ),\n                                _c(\n                                  \"v-card-actions\",\n                                  [\n                                    _c(\"v-spacer\"),\n                                    _c(\n                                      \"v-btn\",\n                                      {\n                                        attrs: {\n                                          color: \"blue darken-1\",\n                                          text: \"\"\n                                        },\n                                        on: { click: _vm.closeDelete }\n                                      },\n                                      [_vm._v(\"Cancel\")]\n                                    ),\n                                    _c(\n                                      \"v-btn\",\n                                      {\n                                        attrs: {\n                                          color: \"blue darken-1\",\n                                          text: \"\"\n                                        },\n                                        on: { click: _vm.deleteItemConfirm }\n                                      },\n                                      [_vm._v(\"OK\")]\n                                    ),\n                                    _c(\"v-spacer\")\n                                  ],\n                                  1\n                                )\n                              ],\n                              1\n                            )\n                          ],\n                          1\n                        )\n                      ],\n                      1\n                    )\n                  ]\n                },\n                proxy: true\n              },\n              {\n                key: \"item.active\",\n                fn: function(ref) {\n                  var item = ref.item\n                  return [\n                    _c(\"v-simple-checkbox\", {\n                      attrs: { disabled: \"\" },\n                      model: {\n                        value: item.active,\n                        callback: function($$v) {\n                          _vm.$set(item, \"active\", $$v)\n                        },\n                        expression: \"item.active\"\n                      }\n                    })\n                  ]\n                }\n              },\n              {\n                key: \"item.actions\",\n                fn: function(ref) {\n                  var item = ref.item\n                  return [\n                    _c(\n                      \"v-icon\",\n                      {\n                        staticClass: \"mr-2\",\n                        attrs: { small: \"\" },\n                        on: {\n                          click: function($event) {\n                            return _vm.editItem(item)\n                          }\n                        }\n                      },\n                      [_vm._v(\" mdi-pencil \")]\n                    ),\n                    _c(\n                      \"v-icon\",\n                      {\n                        attrs: { small: \"\" },\n                        on: {\n                          click: function($event) {\n                            return _vm.deleteItem(item)\n                          }\n                        }\n                      },\n                      [_vm._v(\" mdi-delete \")]\n                    )\n                  ]\n                }\n              },\n              {\n                key: \"no-data\",\n                fn: function() {\n                  return undefined\n                },\n                proxy: true\n              }\n            ])\n          }),\n          _c(\n            \"v-snackbar\",\n            {\n              attrs: { timeout: 8000, color: _vm.snackColor },\n              scopedSlots: _vm._u([\n                {\n                  key: \"action\",\n                  fn: function(ref) {\n                    var attrs = ref.attrs\n                    return [\n                      _c(\n                        \"v-btn\",\n                        _vm._b(\n                          {\n                            attrs: { text: \"\" },\n                            on: {\n                              click: function($event) {\n                                _vm.snack = false\n                              }\n                            }\n                          },\n                          \"v-btn\",\n                          attrs,\n                          false\n                        ),\n                        [_vm._v(\" Close \")]\n                      )\n                    ]\n                  }\n                }\n              ]),\n              model: {\n                value: _vm.snack,\n                callback: function($$v) {\n                  _vm.snack = $$v\n                },\n                expression: \"snack\"\n              }\n            },\n            [_vm._v(\" \" + _vm._s(_vm.snackText) + \" \")]\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/SymbolManagement.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226b9769d6-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/views/SymbolManagement.vue":
/*!****************************************!*\
  !*** ./src/views/SymbolManagement.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SymbolManagement_vue_vue_type_template_id_2afb06b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true& */ \"./src/views/SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true&\");\n/* harmony import */ var _SymbolManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SymbolManagement.vue?vue&type=script&lang=js& */ \"./src/views/SymbolManagement.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ \"./node_modules/vuetify/lib/components/VCard/index.js\");\n/* harmony import */ var vuetify_lib_components_VCheckbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCheckbox */ \"./node_modules/vuetify/lib/components/VCheckbox/index.js\");\n/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ \"./node_modules/vuetify/lib/components/VGrid/index.js\");\n/* harmony import */ var vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VDataTable */ \"./node_modules/vuetify/lib/components/VDataTable/index.js\");\n/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ \"./node_modules/vuetify/lib/components/VDialog/index.js\");\n/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ \"./node_modules/vuetify/lib/components/VDivider/index.js\");\n/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ \"./node_modules/vuetify/lib/components/VIcon/index.js\");\n/* harmony import */ var vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VOverlay */ \"./node_modules/vuetify/lib/components/VOverlay/index.js\");\n/* harmony import */ var vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VProgressCircular */ \"./node_modules/vuetify/lib/components/VProgressCircular/index.js\");\n/* harmony import */ var vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vuetify/lib/components/VSnackbar */ \"./node_modules/vuetify/lib/components/VSnackbar/index.js\");\n/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ \"./node_modules/vuetify/lib/components/VTextField/index.js\");\n/* harmony import */ var vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! vuetify/lib/components/VToolbar */ \"./node_modules/vuetify/lib/components/VToolbar/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _SymbolManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SymbolManagement_vue_vue_type_template_id_2afb06b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SymbolManagement_vue_vue_type_template_id_2afb06b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2afb06b5\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__[\"VBtn\"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCard\"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCardActions\"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCardText\"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__[\"VCardTitle\"],VCheckbox: vuetify_lib_components_VCheckbox__WEBPACK_IMPORTED_MODULE_6__[\"VCheckbox\"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__[\"VCol\"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__[\"VContainer\"],VDataTable: vuetify_lib_components_VDataTable__WEBPACK_IMPORTED_MODULE_8__[\"VDataTable\"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_9__[\"VDialog\"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_10__[\"VDivider\"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_11__[\"VIcon\"],VOverlay: vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_12__[\"VOverlay\"],VProgressCircular: vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_13__[\"VProgressCircular\"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__[\"VRow\"],VSimpleCheckbox: vuetify_lib_components_VCheckbox__WEBPACK_IMPORTED_MODULE_6__[\"VSimpleCheckbox\"],VSnackbar: vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_14__[\"VSnackbar\"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__[\"VSpacer\"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_15__[\"VTextField\"],VToolbar: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_16__[\"VToolbar\"],VToolbarTitle: vuetify_lib_components_VToolbar__WEBPACK_IMPORTED_MODULE_16__[\"VToolbarTitle\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/SymbolManagement.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/SymbolManagement.vue?");

/***/ }),

/***/ "./src/views/SymbolManagement.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/views/SymbolManagement.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SymbolManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SymbolManagement.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SymbolManagement.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SymbolManagement_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/SymbolManagement.vue?");

/***/ }),

/***/ "./src/views/SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./src/views/SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_6b9769d6_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SymbolManagement_vue_vue_type_template_id_2afb06b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6b9769d6-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"6b9769d6-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/SymbolManagement.vue?vue&type=template&id=2afb06b5&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_6b9769d6_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SymbolManagement_vue_vue_type_template_id_2afb06b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_6b9769d6_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SymbolManagement_vue_vue_type_template_id_2afb06b5_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/SymbolManagement.vue?");

/***/ })

}]);