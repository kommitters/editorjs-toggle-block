!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Toggle=t():e.Toggle=t()}(self,(function(){return(()=>{var e={424:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(81),a=r.n(n),s=r(645),o=r.n(s)()(a());o.push([e.id,".toggle-block__selector > div{\n  vertical-align: middle;\n  display: inline-block;\n  padding: 1% 0 1% 0;\n  outline: none;\n  border: none;\n  width: 90%;\n}\n\n.toggle-block__icon > svg {\n  vertical-align: top;\n  width: 34px;\n  height: 34px;\n}\n\n.toggle-block__icon:hover {\n  color: #388ae5;\n  cursor: pointer;\n}\n\n.toggle-block__paragraph {\n  margin-left: 34px;\n}",""]);const i=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",n=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),n&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),n&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,n,a,s){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(n)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(o[c]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);n&&o[d[0]]||(void 0!==s&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=s),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),t.push(d))}},t}},81:e=>{"use strict";e.exports=function(e){return e[1]}},379:e=>{"use strict";var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var s={},o=[],i=0;i<e.length;i++){var c=e[i],l=n.base?c[0]+n.base:c[0],d=s[l]||0,p="".concat(l," ").concat(d);s[l]=d+1;var u=r(p),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)t[u].references++,t[u].updater(h);else{var g=a(h,n);n.byIndex=i,t.splice(i,0,{identifier:p,updater:g,references:1})}o.push(p)}return o}function a(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,a){var s=n(e=e||[],a=a||{});return function(e){e=e||[];for(var o=0;o<s.length;o++){var i=r(s[o]);t[i].references--}for(var c=n(e,a),l=0;l<s.length;l++){var d=r(s[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}s=c}}},569:e=>{"use strict";var t={};e.exports=function(e,r){var n=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,r)=>{"use strict";e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var a=void 0!==r.layer;a&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,a&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var s=r.sourceMap;s&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},46:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-paragraph" viewBox="0 -4 15 25"><path d="M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5z"></path></svg>'},390:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 -4 15 25"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"></path><desc>Remove the last paragraph</desc></svg>'},370:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 25 15"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path></svg>'},664:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 25 15"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path></svg>'}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var s=t[n]={id:n,exports:{}};return e[n](s,s.exports,r),s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};return(()=>{"use strict";r.d(n,{default:()=>L});var e=r(379),t=r.n(e),a=r(795),s=r.n(a),o=r(569),i=r.n(o),c=r(565),l=r.n(c),d=r(216),p=r.n(d),u=r(589),h=r.n(u),g=r(424),v={};v.styleTagTransform=h(),v.setAttributes=l(),v.insert=i().bind(null,"head"),v.domAPI=s(),v.insertStyleElement=p(),t()(g.Z,v),g.Z&&g.Z.locals&&g.Z.locals;var f=r(370),m=r.n(f),b=r(664),w=r.n(b),x=r(46),y=r.n(x),_=r(390),T=r.n(_);class L{static get toolbox(){return{title:"Toggle",icon:m()}}constructor({data:e}){this.data={text:e.text||"",status:e.status||"closed",items:e.items||[]},this.wrapper=void 0}onKeyUp(e){const t=document.getElementById(this);"Backspace"===e.code&&0===t.innerHTML.length&&t.remove()}render(){this.wrapper=document.createElement("div"),this.wrapper.classList.add("toggle-block__selector");const e=document.createElement("span");e.classList.add("toggle-block__icon"),e.innerHTML="closed"===this.data.status?m():w(),e.addEventListener("click",(()=>{e.innerHTML=this._resolveToggleAction(),this._hideAndShowParagraphs()}));const t=document.createElement("div");return t.classList.add("toggle-block__input"),t.contentEditable=!0,t.innerHTML=this.data.text||"",this.wrapper.appendChild(e),this.wrapper.appendChild(t),this.data.items.forEach((e=>{this._renderParagraph(e)})),this.wrapper}save(e){const t=e.querySelector("div"),r=e.querySelectorAll(".toggle-block__paragraph"),n=[];return r.forEach((e=>n.push(e.innerHTML))),Object.assign(this.data,{text:t.innerHTML,items:[...n]})}validate(e){let t=!1;for(let r=0;r<e.items.length;r+=1)if(e.items[r].trim()){t=!0;break}return!(!t&&!e.text.trim())}renderSettings(){const e=[{name:"insertParagraph",icon:y()},{name:"removeParagraph",icon:T()}],t=document.createElement("div");return e.forEach((e=>{const r=document.createElement("div");r.classList.add("cdx-settings-button"),r.innerHTML=e.icon,r.addEventListener("click",(()=>{"insertParagraph"===e.name?this.insertParagraph():this.removeParagraph()})),t.appendChild(r)})),t}_renderParagraph(e=""){const t=this.data.status;this.insertParagraph(e),t!==this.data.status&&(this.wrapper.firstChild.innerHTML=this._resolveToggleAction(),this._hideAndShowParagraphs())}insertParagraph(e=""){"closed"===this.data.status&&(this.wrapper.firstChild.innerHTML=this._resolveToggleAction(),this._hideAndShowParagraphs());const t=document.createElement("div");t.classList.add("toggle-block__paragraph"),t.setAttribute("id",crypto.randomUUID()),t.addEventListener("keyup",this.onKeyUp.bind(t.id)),t.contentEditable=!0,t.innerHTML=e||"",this.wrapper.appendChild(t)}removeParagraph(){const e=this.wrapper.lastChild;"toggle-block__paragraph"===e.classList.value&&e.remove()}_resolveToggleAction(){let e=m();return"closed"===this.data.status?(e=w(),this.data.status="open"):this.data.status="closed",e}_hideAndShowParagraphs(){if("closed"===this.data.status)for(let e=2;e<this.wrapper.children.length;e+=1)this.wrapper.children[e].setAttribute("hidden",!0);else for(let e=2;e<this.wrapper.children.length;e+=1)this.wrapper.children[e].removeAttribute("hidden")}}})(),n.default})()}));