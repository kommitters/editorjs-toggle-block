!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Toggle=e():t.Toggle=e()}(self,(function(){return(()=>{var t={424:(t,e,s)=>{"use strict";s.d(e,{Z:()=>a});var i=s(81),n=s.n(i),r=s(645),o=s.n(r)()(n());o.push([t.id,".toggle-block__selector > div {\n  vertical-align: middle;\n  display: inline-block;\n  padding: 1% 0 1% 0;\n  outline: none;\n  border: none;\n  width: 90%;\n}\n\n.toggle-block__icon > svg {\n  vertical-align: middle;\n  width: 25px;\n  height: 25px;\n}\n\n.bi-play-fill {\n  width: 34px;\n  height: 34px;\n}\n\n.toggle-block__icon:hover {\n  color: #388ae5;\n  cursor: pointer;\n}\n\n.toggle-block__item,\n.toggle-block__content-default {\n  margin-left: 25px;\n}\n\n.toggle-block__content-default {\n  color: gray;\n  border-radius: 5px;\n}\n\n.toggle-block__content-default:hover {\n  cursor: pointer;\n  background: rgba(55, 53, 47, 0.08);\n}\n\n.toggle-block__selector br {\n  display: none;\n}\n\n.toggle-block__input:empty:before {\n  content: attr(placeholder);\n  position: absolute;\n  color: gray;\n  background-color: transparent;\n}\n\ndiv.hidden{\n  display: none;\n}\n",""]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var s="",i=void 0!==e[5];return e[4]&&(s+="@supports (".concat(e[4],") {")),e[2]&&(s+="@media ".concat(e[2]," {")),i&&(s+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),s+=t(e),i&&(s+="}"),e[2]&&(s+="}"),e[4]&&(s+="}"),s})).join("")},e.i=function(t,s,i,n,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var d=[].concat(t[c]);i&&o[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),s&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=s):d[2]=s),n&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=n):d[4]="".concat(n)),e.push(d))}},e}},81:t=>{"use strict";t.exports=function(t){return t[1]}},379:t=>{"use strict";var e=[];function s(t){for(var s=-1,i=0;i<e.length;i++)if(e[i].identifier===t){s=i;break}return s}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],d=r[c]||0,p="".concat(c," ").concat(d);r[c]=d+1;var h=s(p),u={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)e[h].references++,e[h].updater(u);else{var g=n(u,i);i.byIndex=a,e.splice(a,0,{identifier:p,updater:g,references:1})}o.push(p)}return o}function n(t,e){var s=e.domAPI(e);return s.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;s.update(t=e)}else s.remove()}}t.exports=function(t,n){var r=i(t=t||[],n=n||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=s(r[o]);e[a].references--}for(var l=i(t,n),c=0;c<r.length;c++){var d=s(r[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,s){var i=function(t){if(void 0===e[t]){var s=document.querySelector(t);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(t){s=null}e[t]=s}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(s)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,s)=>{"use strict";t.exports=function(t){var e=s.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(s){!function(t,e,s){var i="";s.supports&&(i+="@supports (".concat(s.supports,") {")),s.media&&(i+="@media ".concat(s.media," {"));var n=void 0!==s.layer;n&&(i+="@layer".concat(s.layer.length>0?" ".concat(s.layer):""," {")),i+=s.css,n&&(i+="}"),s.media&&(i+="}"),s.supports&&(i+="}");var r=s.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,s)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},370:t=>{t.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg>'}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var r=e[i]={id:i,exports:{}};return t[i](r,r.exports,s),r.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var i={};return(()=>{"use strict";s.d(i,{default:()=>k});var t=s(379),e=s.n(t),n=s(795),r=s.n(n),o=s(569),a=s.n(o),l=s(565),c=s.n(l),d=s(216),p=s.n(d),h=s(589),u=s.n(h),g=s(424),f={};f.styleTagTransform=u(),f.setAttributes=c(),f.insert=a().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=p(),e()(g.Z,f),g.Z&&g.Z.locals&&g.Z.locals;var b=s(370),m=s.n(b);class k{static get toolbox(){return{title:"Toggle",icon:m()}}static get enableLineBreaks(){return!0}static get isReadOnlySupported(){return!0}constructor({data:t,api:e,readOnly:s}){this.data={text:t.text||"",status:t.status||"open",items:parseInt(t.items,10)||0},this.api=e,this.wrapper=void 0,this.readOnly=s||!1,this.createToggleWithShortcut(),this.nestBlock()}createParagraphFromToggleRoot(t){if("Enter"===t.code){const t=this.api.blocks.getCurrentBlockIndex();"closed"===this.data.status&&(this.resolveToggleAction(),this.hideAndShowBlocks(t)),setTimeout((()=>{this.api.blocks.insert(),this.updateItems(1),this.setAttributesToNewBlock()}),100)}}createParagraphFromIt(t){"Enter"===t.code&&(this.updateItems(1),this.setAttributesToNewBlock())}setAttributesToNewBlock(t=null){const e=this.wrapper.id,s=null===t?this.api.blocks.getCurrentBlockIndex():t,i=crypto.randomUUID(),n=this.api.blocks.getBlockByIndex(s),{holder:r}=n,o=r.firstChild.firstChild;r.setAttribute("foreignKey",e),r.setAttribute("id",i),o.classList.add("toggle-block__item"),this.readOnly||(r.addEventListener("keydown",this.extractBlock.bind(this,o)),r.addEventListener("keydown",this.createParagraphFromIt.bind(this)),r.addEventListener("keydown",this.removeBlock.bind(this,i)),o.focus())}createToggle(){this.wrapper=document.createElement("div"),this.wrapper.classList.add("toggle-block__selector"),this.wrapper.id=crypto.randomUUID(),this.wrapper.setAttribute("items",this.data.items);const t=document.createElement("span"),e=document.createElement("div"),s=document.createElement("div");t.classList.add("toggle-block__icon"),t.innerHTML=m(),e.classList.add("toggle-block__input"),e.setAttribute("contentEditable",!this.readOnly),e.innerHTML=this.data.text||"",this.readOnly||(e.addEventListener("keyup",this.createParagraphFromToggleRoot.bind(this)),e.addEventListener("keydown",this.removeToggle.bind(this)),e.addEventListener("keyup",this.setPlaceHolder.bind(this)),e.setAttribute("placeholder","Toggle"),e.addEventListener("focus",this.setDefaultContent.bind(this)),e.addEventListener("focusout",this.setDefaultContent.bind(this)),s.addEventListener("click",this.clickInDefaultContent.bind(this)),e.addEventListener("focus",this.setNestedBlockAttributes.bind(this))),s.classList.add("toggle-block__content-default","hidden"),s.innerHTML="Empty toggle. Click or drop blocks inside.",this.wrapper.appendChild(t),this.wrapper.appendChild(e),this.wrapper.appendChild(s)}clickInDefaultContent(){this.api.blocks.insert(),this.updateItems(1),this.setAttributesToNewBlock(),this.setDefaultContent()}setDefaultContent(){const{firstChild:t,lastChild:e}=this.wrapper,{status:s}=this.data,i=parseInt(this.wrapper.getAttribute("items"),10),n=i>0||"closed"===s;e.classList.toggle("hidden",n),t.style.color=0===i?"gray":"black"}removeToggle(t){if("Backspace"===t.code){const{children:t}=this.wrapper,{length:e}=t[1].textContent;if(0===e){const t=this.api.blocks.getCurrentBlockIndex();this.api.blocks.delete(t),this.removeFullToggle(t)}}}extractBlock(t,e){if("Tab"===e.code&&e.shiftKey){const e=this.api.blocks.getCurrentBlockIndex(),s=this.wrapper.children[1],i=parseInt(this.wrapper.getAttribute("items"),10);let n,r={};for(;r[1]!==s;){this.api.caret.setToPreviousBlock("end",0),n=this.api.blocks.getCurrentBlockIndex();const t=this.api.blocks.getBlockByIndex(n),{holder:e}=t;r=e.firstChild.firstChild.children}this.api.blocks.delete(e),this.api.blocks.insert("paragraph",{text:t.textContent},{},n+i,!0),this.updateItems(-1)}}setPlaceHolder(t){if("Backspace"===t.code||"Enter"===t.code){const{children:t}=this.wrapper,{length:e}=t[1].textContent;0===e&&(t[1].textContent="")}}render(){return this.createToggle(),setTimeout((()=>this.renderItems())),setTimeout(this.setInitialTransition.bind(this)),this.wrapper}setInitialTransition(){const{status:t}=this.data,e=this.wrapper.firstChild.firstChild;e.style.transition="0.5s",e.style.transform=`rotate(${"closed"===t?0:90}deg)`}renderItems(){const t=this.api.blocks.getBlocksCount(),e=this.wrapper.firstChild,s=parseInt(this.wrapper.getAttribute("items"),10);let i;if(this.readOnly){const t=document.getElementsByClassName("codex-editor__redactor")[0],{children:e}=t,{length:s}=e;for(let t=0;t<s;t+=1){const s=e[t].firstChild.firstChild,{id:n}=s;if(n===this.wrapper.id){i=t;break}}}else{const t=this.wrapper.children[1];let e={};for(;e[1]!==t;){i=this.api.blocks.getCurrentBlockIndex();const t=this.api.blocks.getBlockByIndex(i),{holder:s}=t;e=s.firstChild.firstChild.children,this.api.caret.setToNextBlock("end",0)}}if(i+s<t)for(let t=i+1,e=0;t<=i+s;t+=1){const s=this.api.blocks.getBlockByIndex(t),{holder:i}=s,n=i.firstChild.firstChild;if(this.isPartOfAToggle(n)){this.wrapper.setAttribute("items",e);break}this.setAttributesToNewBlock(t),e+=1}else this.wrapper.setAttribute("items",0);e.addEventListener("click",(()=>{this.resolveToggleAction(),setTimeout((()=>{const t=this.readOnly?i:null;this.hideAndShowBlocks(t)}),100)})),this.hideAndShowBlocks(i)}resolveToggleAction(){const t=this.wrapper.firstChild.firstChild;"closed"===this.data.status?(this.data.status="open",t.style.transform="rotate(90deg)"):(this.data.status="closed",t.style.transform="rotate(0deg)")}hideAndShowBlocks(t=null){const e=parseInt(this.wrapper.getAttribute("items"),10),s="closed"===this.data.status;let i=null===t?this.api.blocks.getCurrentBlockIndex():t;if(e>0)for(let t=0;t<e;t+=1){const{holder:t}=this.api.blocks.getBlockByIndex(i+=1);t.hidden=s}else{const{lastChild:t}=this.wrapper;t.classList.toggle("hidden",s)}}save(t){const{children:e}=t,s=e[1].textContent,i=parseInt(t.getAttribute("items"),10);return Object.assign(this.data,{text:s,items:i})}renderSettings(){const t=document.getElementsByClassName("ce-settings--opened")[0].lastChild,e=this.api.blocks.getCurrentBlockIndex();setTimeout((()=>{const s=t.getElementsByClassName("ce-settings__button--delete")[0];s.addEventListener("click",(()=>{const t=s.classList;-1===Object.values(t).indexOf("clicked-to-destroy-toggle")?s.classList.add("clicked-to-destroy-toggle"):this.removeFullToggle(e)}))}))}removeFullToggle(t){const e=parseInt(this.wrapper.getAttribute("items"),10);for(let s=t;s<t+e;s+=1)this.api.blocks.delete(t)}createToggleWithShortcut(){this.readOnly||document.activeElement.addEventListener("keyup",(t=>{if("Space"===t.code){const t=document.activeElement.textContent,{length:e}=t;if(">"===t[0]&&e-1==1){const t=this.api.blocks.getCurrentBlockIndex();this.api.blocks.insert("toggle",{},this.api,t,!0),this.api.blocks.delete(t+1),setTimeout((()=>{this.api.caret.setToBlock(t)}))}}}))}nestBlock(){this.readOnly||document.activeElement.addEventListener("keyup",(t=>{const e=document.activeElement;if(this.api.blocks.getCurrentBlockIndex()>0&&!this.isPartOfAToggle(e)&&"Tab"===t.code){const t=e.parentElement.parentElement,s=t.previousElementSibling,i=s.firstChild.firstChild;if(this.isPartOfAToggle(i)){const e=s.getAttribute("foreignKey"),n=i.getAttribute("id");let r;e?r=e:n&&(r=n),t.setAttribute("will-be-a-nested-block",!0),document.getElementById(r).children[1].focus()}}}))}setNestedBlockAttributes(){const t=this.api.blocks.getCurrentBlockIndex(),e=this.api.blocks.getBlockByIndex(t),{holder:s}=e;s.getAttribute("will-be-a-nested-block")&&(s.removeAttribute("will-be-a-nested-block"),this.setAttributesToNewBlock(t),this.api.toolbar.close(),this.updateItems(1))}isPartOfAToggle(t){const e=Array.from(t.classList);return e.includes("toggle-block__item")||e.includes("toggle-block__input")||e.includes("toggle-block__selector")}removeBlock(t,e){"Backspace"===e.code&&null===document.getElementById(t)&&this.updateItems(-1)}updateItems(t){let e=parseInt(this.wrapper.getAttribute("items"),10);e+=t,this.wrapper.setAttribute("items",e)}}})(),i.default})()}));