!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Toggle=e():t.Toggle=e()}(self,(function(){return(()=>{var t={424:(t,e,r)=>{"use strict";r.d(e,{Z:()=>a});var n=r(81),i=r.n(n),o=r(645),s=r.n(o)()(i());s.push([t.id,".toggle-block__selector > div {\n  vertical-align: middle;\n  display: inline-block;\n  padding: 1% 0 1% 0;\n  outline: none;\n  border: none;\n  width: 90%;\n}\n\n.toggle-block__icon > svg {\n  vertical-align: top;\n  width: 34px;\n  height: 34px;\n}\n\n.toggle-block__icon:hover {\n  color: #388ae5;\n  cursor: pointer;\n}\n\n.toggle-block__item {\n  padding-left: 1%;\n  margin-left: 34px;\n}\n\n.toggle-block__selector br {\n  display: none;\n}\n",""]);const a=s},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r="",n=void 0!==e[5];return e[4]&&(r+="@supports (".concat(e[4],") {")),e[2]&&(r+="@media ".concat(e[2]," {")),n&&(r+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),r+=t(e),n&&(r+="}"),e[2]&&(r+="}"),e[4]&&(r+="}"),r})).join("")},e.i=function(t,r,n,i,o){"string"==typeof t&&(t=[[null,t,void 0]]);var s={};if(n)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(s[c]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);n&&s[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),i&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=i):d[4]="".concat(i)),e.push(d))}},e}},81:t=>{"use strict";t.exports=function(t){return t[1]}},379:t=>{"use strict";var e=[];function r(t){for(var r=-1,n=0;n<e.length;n++)if(e[n].identifier===t){r=n;break}return r}function n(t,n){for(var o={},s=[],a=0;a<t.length;a++){var c=t[a],l=n.base?c[0]+n.base:c[0],d=o[l]||0,p="".concat(l," ").concat(d);o[l]=d+1;var u=r(p),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)e[u].references++,e[u].updater(h);else{var g=i(h,n);n.byIndex=a,e.splice(a,0,{identifier:p,updater:g,references:1})}s.push(p)}return s}function i(t,e){var r=e.domAPI(e);return r.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;r.update(t=e)}else r.remove()}}t.exports=function(t,i){var o=n(t=t||[],i=i||{});return function(t){t=t||[];for(var s=0;s<o.length;s++){var a=r(o[s]);e[a].references--}for(var c=n(t,i),l=0;l<o.length;l++){var d=r(o[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}o=c}}},569:t=>{"use strict";var e={};t.exports=function(t,r){var n=function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}(t);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,r)=>{"use strict";t.exports=function(t){var e=r.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(r){!function(t,e,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var i=void 0!==r.layer;i&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,i&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var o=r.sourceMap;o&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleTagTransform(n,t,e.options)}(e,t,r)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},172:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 25 15"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path></svg>'},710:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 25 15"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path></svg>'}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={id:n,exports:{}};return t[n](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};return(()=>{"use strict";r.d(n,{default:()=>k});var t=r(379),e=r.n(t),i=r(795),o=r.n(i),s=r(569),a=r.n(s),c=r(565),l=r.n(c),d=r(216),p=r.n(d),u=r(589),h=r.n(u),g=r(424),f={};f.styleTagTransform=h(),f.setAttributes=l(),f.insert=a().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=p(),e()(g.Z,f),g.Z&&g.Z.locals&&g.Z.locals;var v=r(172),m=r.n(v),b=r(710),y=r.n(b);class k{static get toolbox(){return{title:"Toggle",icon:m()}}static get enableLineBreaks(){return!0}constructor({data:t,api:e}){this.data={text:t.text||"",status:t.status||"closed",items:t.items||[]},this.api=e,this.wrapper=void 0}createParagraphFromToggleRoot(t){if("Enter"===t.code){const t=this.api.blocks.getCurrentBlockIndex();if("closed"===this.data.status){const e=document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);this.wrapper.firstChild.innerHTML=this._resolveToggleAction(),this._hideAndShowBlocks(t-1,e.length)}const e=this.wrapper.id,r=t+1,n=crypto.randomUUID();this.api.blocks.insert();const i=this.api.blocks.getBlockByIndex(r),{holder:o}=i,s=o.firstChild.firstChild;o.setAttribute("foreignKey",e),o.setAttribute("id",n),s.classList.add("toggle-block__item"),s.focus()}}createParagraphFromIt(t){if("Enter"===t.code){const t=this.api.blocks.getCurrentBlockIndex(),e=this.api.blocks.getBlockByIndex(t),r=crypto.randomUUID(),{holder:n}=e,i=n.firstChild.firstChild;n.setAttribute("foreignKey",this.wrapper.id),n.setAttribute("id",r),i.classList.add("toggle-block__item"),i.focus()}}_createToggle(){this.wrapper=document.createElement("div"),this.wrapper.classList.add("toggle-block__selector"),this.wrapper.id=crypto.randomUUID();const t=document.createElement("span");t.classList.add("toggle-block__icon"),t.innerHTML="closed"===this.data.status?m():y();const e=document.createElement("div");e.classList.add("toggle-block__input"),e.contentEditable=!0,e.addEventListener("keyup",this.createParagraphFromToggleRoot.bind(this)),e.innerHTML=this.data.text||"",this.wrapper.appendChild(t),this.wrapper.appendChild(e)}render(){return this._createToggle(),setTimeout(this.renderItems.bind(this)),this.wrapper}renderItems(){const t=this.api.blocks.getCurrentBlockIndex(),e=this.wrapper.firstChild,r=this.wrapper.id,n=this.api.blocks.getBlocksCount();let i=n>1?t+1:t;e.addEventListener("click",(()=>{const t=document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);e.innerHTML=this._resolveToggleAction(),this._hideAndShowBlocksClicking(t.length)})),this.data.items.forEach((t=>{const{type:e,data:n}=t;this.api.blocks.insert(e,n,{},i+=1,!0);const o=this.api.blocks.getBlockByIndex(i),{holder:s}=o,a=s.firstChild.firstChild;s.addEventListener("keydown",this.createParagraphFromIt.bind(this)),s.setAttribute("foreignKey",r),s.setAttribute("id",crypto.randomUUID()),a.classList.add("toggle-block__item")})),n>1?this._hideAndShowBlocks(t,this.data.items.length):this._hideAndShowBlocks(t-1,this.data.items.length)}_resolveToggleAction(){let t=m();return"closed"===this.data.status?(t=y(),this.data.status="open"):this.data.status="closed",t}_hideAndShowBlocks(t,e){const r=t+1;this._iterateOnItems(e,r)}_hideAndShowBlocksClicking(t){const e=this.api.blocks.getCurrentBlockIndex();this._iterateOnItems(t,e)}_iterateOnItems(t,e){let r=e;if("closed"===this.data.status)for(let e=0;e<t;e+=1)this.api.blocks.getBlockByIndex(r+=1).holder.setAttribute("hidden",!0);else for(let e=0;e<t;e+=1)this.api.blocks.getBlockByIndex(r+=1).holder.removeAttribute("hidden")}save(t){const e=t.textContent,r=document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`),n=[];return r.forEach((t=>{n.push({type:"paragraph",data:{text:t.textContent}})})),Object.assign(this.data,{text:e,items:[...n]})}validate(t){for(let e=0;e<t.items.length;e+=1)if(void 0===t.items[e].type||void 0===t.items[e].data)return!1;return!0}}})(),n.default})()}));