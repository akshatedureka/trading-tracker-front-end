(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["symbol-management"],{"169a":function(t,e,i){"use strict";var n=i("5530"),a=i("2909"),s=i("ade3"),o=(i("a9e3"),i("498a"),i("caad"),i("2532"),i("7db0"),i("368e"),i("480e")),c=i("4ad4"),r=i("b848"),l=i("75eb"),d=i("e707"),u=i("e4d3"),h=i("21be"),v=i("f2e7"),m=i("a293"),f=i("58df"),p=i("d9bd"),b=i("80d2"),g=Object(f["a"])(c["a"],r["a"],l["a"],d["a"],u["a"],h["a"],v["a"]);e["a"]=g.extend({name:"v-dialog",directives:{ClickOutside:m["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200,previousActiveElement:null}},computed:{classes:function(){var t;return t={},Object(s["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(s["a"])(t,"v-dialog--active",this.isActive),Object(s["a"])(t,"v-dialog--persistent",this.persistent),Object(s["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(s["a"])(t,"v-dialog--scrollable",this.scrollable),Object(s["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){var e;t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind(),null==(e=this.previousActiveElement)||e.focus())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(p["e"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):d["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$nextTick((function(){t.previousActiveElement=document.activeElement,t.$refs.content.focus(),t.bind()}))}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===b["x"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var i=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),n=Object(a["a"])(i).find((function(t){return!t.hasAttribute("disabled")}));n&&n.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(o["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(n["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style=Object(n["a"])(Object(n["a"])({},t.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(b["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(b["g"])(this.width)})),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"368e":function(t,e,i){},"615b":function(t,e,i){},"6ca7":function(t,e,i){},"8a2e":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-container",[i("v-overlay",{attrs:{value:t.overlay}},[i("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1),i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.symbols,loading:t.dataLoading,"loading-text":"Loading... Please wait","no-data-text":"No symbols have been added yet. Click Add Symbol to add your first symbol."},scopedSlots:t._u([{key:"top",fn:function(){return[i("v-toolbar",{attrs:{flat:""}},[i("v-toolbar-title",[t._v("Symbol Management")]),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),i("v-spacer"),i("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,a=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",a,!1),n),[t._v(" Add Symbol ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),i("v-card-text",[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[i("v-text-field",{ref:"symbolName",attrs:{label:"Name"},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),i("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[i("v-checkbox",{attrs:{label:"Active"},model:{value:t.editedItem.active,callback:function(e){t.$set(t.editedItem,"active",e)},expression:"editedItem.active"}})],1)],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v(" Cancel ")]),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v(" Save ")])],1)],1)],1),i("v-dialog",{attrs:{"max-width":"650px"},model:{value:t.dialogDelete,callback:function(e){t.dialogDelete=e},expression:"dialogDelete"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Are you sure you want to delete symbol "+t._s(t.editedItem.name)+"?")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDelete}},[t._v("Cancel")]),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.deleteItemConfirm}},[t._v("OK")]),i("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.active",fn:function(e){var n=e.item;return[i("v-simple-checkbox",{attrs:{disabled:""},model:{value:n.active,callback:function(e){t.$set(n,"active",e)},expression:"item.active"}})]}},{key:"item.actions",fn:function(e){var n=e.item;return[i("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(n)}}},[t._v(" mdi-pencil ")]),i("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(n)}}},[t._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){},proxy:!0}])}),i("v-snackbar",{attrs:{timeout:8e3,color:t.snackColor},scopedSlots:t._u([{key:"action",fn:function(e){var n=e.attrs;return[i("v-btn",t._b({attrs:{text:""},on:{click:function(e){t.snack=!1}}},"v-btn",n,!1),[t._v(" Close ")])]}}]),model:{value:t.snack,callback:function(e){t.snack=e},expression:"snack"}},[t._v(" "+t._s(t.snackText)+" ")])],1)],1)},a=[],s=(i("b0c0"),i("a434"),i("bc3a")),o=i.n(s),c={name:"SymbolManagement",data:function(){return{dataLoading:!0,overlay:!1,symbols:[],response:"",search:"",dialog:!1,dialogDelete:!1,editedIndex:-1,editedItem:{name:"",active:""},defaultItem:{name:"",active:""},snack:!1,snackColor:"",snackText:""}},mounted:function(){var t=this;o.a.get("http://localhost:8080/api/GetTradingSymbols").then((function(e){t.symbols=e.data,t.dataLoading=!1})).catch((function(e){t.displaySnack("error","Error while getting symbols. "+e)}))},watch:{dialog:function(t){var e=this;t||this.close(),this.editedIndex<0&&(this.editedItem.active=!0,t&&setTimeout((function(){e.$refs.symbolName.focus()})))},dialogDelete:function(t){t||this.closeDelete()}},computed:{headers:function(){return[{text:"Name",value:"name"},{text:"Active",value:"active"},{text:"Actions",value:"actions",sortable:!1}]},formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"}},methods:{editItem:function(t){this.editedIndex=this.symbols.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){this.editedIndex=this.symbols.indexOf(t),this.editedItem=Object.assign({},t),this.dialogDelete=!0},deleteItemConfirm:function(){var t=this;this.overlay=!0;var e=this.editedItem.name,i=this.editedItem.id,n=this.editedIndex;o.a.delete("http://localhost:8080/api/DeleteTradingSymbol",{data:{id:i,name:e}}).then((function(i){t.response=i.data,t.symbols.splice(n,1),t.displaySnack("success","Successfully deleted symbol "+e+".")})).catch((function(i){t.displaySnack("error","Error while deleting symbol "+e+". "+i)})),this.closeDelete()},close:function(){var t=this;this.dialog=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},closeDelete:function(){var t=this;this.dialogDelete=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},save:function(){var t=this;this.overlay=!0;var e=this.editedIndex,i=this.editedItem,n=this.editedItem.name;this.editedIndex>-1?o.a.post("http://localhost:8080/api/UpdateTradingSymbol",{id:this.editedItem.id,oldName:this.symbols[e].name,name:this.editedItem.name,active:this.editedItem.active}).then((function(n){t.response=n.data,Object.assign(t.symbols[e],i),t.displaySnack("success","Successfully updated symbol "+i.name+".")})).catch((function(e){t.displaySnack("error","Error while editing symbol. "+e)})):o.a.post("http://localhost:8080/api/CreateTradingSymbol",null,{params:{symbol:n}}).then((function(e){t.response=e.data,i.id=t.response.id,t.symbols.push(i),t.displaySnack("success","Successfully added symbol "+i.name+".")})).catch((function(e){t.displaySnack("error","Error while creating new symbol. "+e)})),this.close()},displaySnack:function(t,e){this.snackColor=t,this.snackText=e,this.snack=!0,this.overlay=!1}}},r=c,l=i("2877"),d=i("6544"),u=i.n(d),h=i("8336"),v=i("b0af"),m=i("99d9"),f=i("5530"),p=(i("d3b7"),i("25f0"),i("6ca7"),i("ec29"),i("9d26")),b=i("c37a"),g=i("fe09"),y=g["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(f["a"])(Object(f["a"])({},b["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(p["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(f["a"])(Object(f["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}),k=i("62ad"),x=i("a523"),C=i("8fea"),I=i("169a"),S=i("ce7e"),w=i("132d"),O=i("a797"),_=i("490a"),A=i("0fd9"),V=i("9e88"),$=i("2db4"),j=i("2fa4"),T=i("8654"),D=i("71d9"),E=i("2a7f"),B=Object(l["a"])(r,n,a,!1,null,"c08a892a",null);e["default"]=B.exports;u()(B,{VBtn:h["a"],VCard:v["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VCheckbox:y,VCol:k["a"],VContainer:x["a"],VDataTable:C["a"],VDialog:I["a"],VDivider:S["a"],VIcon:w["a"],VOverlay:O["a"],VProgressCircular:_["a"],VRow:A["a"],VSimpleCheckbox:V["a"],VSnackbar:$["a"],VSpacer:j["a"],VTextField:T["a"],VToolbar:D["a"],VToolbarTitle:E["a"]})},"99d9":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return c})),i.d(e,"c",(function(){return r}));var n=i("b0af"),a=i("80d2"),s=Object(a["i"])("v-card__actions"),o=Object(a["i"])("v-card__subtitle"),c=Object(a["i"])("v-card__text"),r=Object(a["i"])("v-card__title");n["a"]},b0af:function(t,e,i){"use strict";var n=i("5530"),a=(i("a9e3"),i("0481"),i("615b"),i("10d2")),s=i("297c"),o=i("1c87"),c=i("58df");e["a"]=Object(c["a"])(s["a"],o["a"],a["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({"v-card":!0},o["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},a["a"].options.computed.classes.call(this))},styles:function(){var t=Object(n["a"])({},a["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=s["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),i=e.tag,n=e.data;return n.style=this.styles,this.isClickable&&(n.attrs=n.attrs||{},n.attrs.tabindex=0),t(i,this.setBackgroundColor(this.color,n),[this.genProgress(),this.$slots.default])}})},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i("d3b7"),i("25f0"),i("4de4");var n=i("c37a"),a=i("5607"),s=i("2b0e"),o=s["a"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),c=i("8547"),r=i("58df");function l(t){t.preventDefault()}e["a"]=Object(r["a"])(n["a"],o,c["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:l},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:l},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===n&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=symbol-management.cad1b732.js.map