;
(self.AMP=self.AMP||[]).push({m:0,v:"2203281422000",n:"amp-access-scroll",ev:"0.1",l:!0,f:function(t,n){!function(){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,i=new Array(n);r<n;r++)i[r]=t[r];return i}function i(t,n){var i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(i)return(i=i.call(t)).next.bind(i);if(Array.isArray(t)||(i=function(t,n){if(t){if("string"==typeof t)return r(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?r(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){i&&(t=i);var e=0;return function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Array.isArray;var e=Object.prototype,o=e.hasOwnProperty;function u(t){var n=Object.create(null);return t&&Object.assign(n,t),n}function s(t,n){return o.call(t,n)}function c(t,n){t.insertBefore(n,t.firstChild)}function a(t,n,r){return function(t,n){for(var r in n)t.setAttribute(r,n[r]);return t}(t.createElement(n),r)}e.toString;var l=self.AMP_CONFIG||{},f=("string"==typeof l.thirdPartyFrameRegex?new RegExp(l.thirdPartyFrameRegex):l.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,h=("string"==typeof l.cdnProxyRegex?new RegExp(l.cdnProxyRegex):l.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;function v(t){if(!self.document||!self.document.head)return null;if(self.location&&h.test(self.location.origin))return null;var n=self.document.head.querySelector('meta[name="'.concat(t,'"]'));return n&&n.getAttribute("content")||null}var p={thirdParty:l.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:l.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:f,cdn:l.cdnUrl||v("runtime-host")||"https://cdn.ampproject.org",cdnProxyRegex:h,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,errorReporting:l.errorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r",betaErrorReporting:l.betaErrorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r-beta",localDev:l.localDev||!1,trustedViewerHosts:[/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/,/(^|\.)gmail\.(com|dev)$/],geoApi:l.geoApiUrl||v("amp-geo-api")},d=/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;function m(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";try{return decodeURIComponent(t)}catch(t){return n}}function b(t){var n,r=u();if(!t)return r;for(;n=d.exec(t);){var i=m(n[1],n[1]),e=n[2]?m(n[2].replace(/\+/g," "),n[2]):"";r[i]=e}return r}function g(t){var n=(t||self).location;return b(n.originalHash||n.hash)}var y="";function w(t){var n=t||self;return n.__AMP_MODE?n.__AMP_MODE:n.__AMP_MODE=function(t){return{localDev:!1,development:A(t,g(t)),esm:!1,test:!1,rtvVersion:R(t)}}(n)}function R(t){var n;return y||(y=(null===(n=t.AMP_CONFIG)||void 0===n?void 0:n.v)||"01".concat("2203281422000")),y}function A(t,n){var r=n||g(t);return["1","actions","amp","amp4ads","amp4email"].includes(r.development)||!!t.AMP_DEV_MODE}function E(t){var n=Object.getOwnPropertyDescriptor(t,"message");if(null!=n&&n.writable)return t;var r=t.message,i=t.stack,e=new Error(r);for(var o in t)e[o]=t[o];return e.stack=i,e}function x(t){for(var n,r=null,e="",o=i(arguments,!0);!(n=o()).done;){var u=n.value;u instanceof Error&&!r?r=E(u):(e&&(e+=" "),e+=u)}return r?e&&(r.message=e+": "+r.message):r=new Error(e),r}function U(t){var n,r;null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t)}self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var I=self.__AMP_LOG;function C(t,n){throw new Error("failed to call initLogConstructor")}function _(t){return C()}function D(){return I.dev||(I.dev=C())}function L(t,n,r,i,e,o,u,s,c,a,l){return t}function O(t,n,r,i,e,o,u,s,c,a,l){return(I.user||(I.user=_()),void I.user.win?I.userForEmbed||(I.userForEmbed=_()):I.user).assert(t,n,r,i,e,o,u,s,c,a,l)}var T=function(){var t=this;this.promise=new Promise((function(n,r){t.resolve=n,t.reject=r}))};function j(t,n){return M(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function S(t,n){return M(k(N(t)),n)}function P(t,n){return z(k(t),n)}function N(t){return t.nodeType?(r=t,n=(r.ownerDocument||r).defaultView,j(n,"ampdoc")).getAmpDoc(t):t;var n,r}function k(t){var n=N(t);return n.isSingleDoc()?n.win:n}function M(t,n){L(function(t,n){var r=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!r||!r.ctor)}(t,n));var r=H(t)[n];return r.obj||(L(r.ctor),L(r.context),r.obj=new r.ctor(r.context),L(r.obj),r.context=null,r.resolve&&r.resolve(r.obj)),r.obj}function z(t,n){var r=H(t)[n];return r?r.promise?r.promise:(M(t,n),r.promise=Promise.resolve(r.obj)):null}function H(t){var n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}function F(t,n,r,i){return function(t,n,r,i){var e=P(t,n);if(e)return e;var o=N(t);return o.whenExtensionsKnown().then((function(){var t=o.getExtensionVersion(r);return t?j(o.win,"extensions").waitForExtension(r,t):null})).then((function(r){return r?i?P(t,n):function(t,n){return function(t,n){var r=z(t,n);if(r)return r;var i,e,o,u,s=H(t);return s[n]=(e=(i=new T).promise,o=i.reject,u=i.resolve,e.catch((function(){})),{obj:null,promise:e,resolve:u,reject:o,context:null,ctor:null}),s[n].promise}(k(t),n)}(t,n):null}))}(t,n,r,i).then((function(t){return function(t,n,r){return O(t,"Service %s was requested to be provided through %s, but %s is not loaded in the current page. To fix this problem load the JavaScript file for %s in this page.",n,r,r,r)}(t,n,r)}))}var Y=function(t){return S(t,"viewport")},$=function(t){return j(t,"xhr")};function Q(t,n){return(Q=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function q(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&Q(t,n)}function B(t){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function V(t,r){if(r&&("object"===n(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function J(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,i=B(t);if(n){var e=B(this).constructor;r=Reflect.construct(i,arguments,e)}else r=i.apply(this,arguments);return V(this,r)}}var Z,W=function(){function t(t,n,r){var i=this;this.qi=t,this._vt=null,this.oE=n,this.Hvt=r;var e=function(t,n,r){var i=0,e=0,o=null;function u(){i=0;var s,c=r-(t.Date.now()-e);c>0?i=t.setTimeout(u,c):(s=o,o=null,n.apply(null,s))}return function(){e=t.Date.now();for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];o=s,i||(i=t.setTimeout(u,r))}}(t.win,this.Yvt.bind(this),1e3);this.Tu=Y(t),this.$vt=[],t.whenReady().then((function(){i.Tu.onChanged(e),i.$vt=t.getBody().getElementsByTagName("p")}))}var n=t.prototype;return n.Yvt=function(){var t=this;return Promise.all([].slice.call(this.$vt).map((function(n){return t.Tu.getClientRectAsync(n)}))).then((function(n){for(var r=null,i=null,e=n.length-1;e>=0;e--){var o=n[e].bottom;o<=0&&(null===i||i<o)&&(r=e,i=o)}null!==r&&t.Qvt(r)}))},n.Qvt=function(t){this._vt!==t&&(this._vt=t,this.qvt(this.$vt[t].innerText.substring(0,50)))},n.qvt=function(t){var n=this;this.oE.buildUrl("".concat(this.Hvt,"/amp/updatedepth")+"?rid=READER_ID&cid=CLIENT_ID(scroll1)&c=CANONICAL_URL&o=AMPDOC_URL&rd="+encodeURIComponent(t),!1).then((function(t){$(n.qi.win).fetch(t)}))},t}(),X=["Webkit","webkit","Moz","moz","ms","O","o"];function G(t,n,r,i,e){var o=function(t,n,r){if(n.startsWith("--"))return n;Z||(Z=u());var i=Z[n];if(!i||r){if(i=n,void 0===t[n]){var e=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),o=function(t,n){for(var r=0;r<X.length;r++){var i=X[r]+n;if(void 0!==t[i])return i}return""}(t,e);void 0!==t[o]&&(i=o)}r||(Z[n]=i)}return i}(t.style,n,e);if(o){var s,c=i?r+i:r;t.style.setProperty((s=o.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()})),X.some((function(t){return s.startsWith(t+"-")}))?"-".concat(s):s),c)}}var K=function(){function t(t){var n=this;this.Yd=t,this.Vvt=null,this.Vs=null,this.Jvt=null,this.Ge={"width":null,"left":null,"right":null},this.window=new Promise((function(t){n.Vvt=t}))}var n=t.prototype;return n.el=function(t,n,r){var i=a(this.Yd.win.document,t,n);return Array.isArray(r)&&r.forEach((function(t){return i.appendChild(t)})),i},n.mount=function(){var t=L(this.Vs);this.Yd.getBody().appendChild(t),Y(this.Yd).addToFixedLayer(t)},n.mutate=function(t){var n;(n=this.Yd.win,j(n,"vsync")).mutate(t)},n.toggleClass=function(t,n){var r=L(this.Vs).classList;n?r.add(t):r.remove(t)},n.toggleChecked=function(t){L(this.Vs).checked=!!t},n.updateHorizontalLayout=function(t){var n=this,r=!1;return Object.keys(this.Ge).forEach((function(i){if(s(t,i)){var e=n.cssSize(t[i]);n.Ge[i]!==e&&(n.Ge[i]=e,r=!0)}})),r},n.renderHorizontalLayout=function(){var t;!function(t,n){for(var r in n)G(t,r,n[r])}(L(this.Vs),(t=this.Ge,"display"in t&&function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];var e=x.apply(null,r);e.name=t||e.name,U(e)}("STYLE","`display` style detected. You must use toggle instead."),t))},n.cssSize=function(t){return"number"==typeof t?"".concat(t,"px"):t},t}();K.HorizontalLayout;var tt="1.2",nt=function(t){return"https://connect".concat(function(t){return w().development&&t.etld?t.etld:""}(t)||".scroll.com")};function rt(t,n){return t.buildUrl("".concat(n)+"?rid=READER_ID&cid=CLIENT_ID(scroll1)&c=CANONICAL_URL&o=AMPDOC_URL"+"&p=".concat(tt)+"&x=QUERY_PARAM(scrollx)",!1)}var it,et=function(t){q(r,t);var n=J(r);function r(t,r){var i;return(i=n.call(this,t)).oE=r,i.tc(),i}var i=r.prototype;return i.tc=function(){var t=this;this.mutate((function(){t.Jvt||(t.Zvt(),t.Vvt(t.Jvt.contentWindow)),t.renderHorizontalLayout()}))},i.Zvt=function(){var t=this;this.Jvt=this.el("iframe",{"scrolling":"no","frameborder":"0","allowtransparency":"true","title":"Twitter Blue bar","width":"100%","height":"100%","sandbox":"allow-scripts allow-same-origin allow-top-navigation allow-popups allow-popups-to-escape-sandbox"}),this.Vs=this.el("div",{"class":"amp-access-scroll-bar"},[this.Jvt]),this.mount(),rt(this.oE,nt(this.oE.getAdapterConfig())+"/html/amp/scrolltab").then((function(n){t.Jvt.setAttribute("src",n)}))},i.update=function(t){this.updateHorizontalLayout(t)&&this.tc()},r}(K),ot=function(){function t(t){var n,r,i,e,o,u;this.Wvt=[],this._r=[],this.i=t,this.Z=this.Z.bind(this),n=window,r=this.Z,i=void 0,e=n,o=r,u=function(){if(void 0!==it)return it;it=!1;try{var t={get capture(){return it=!0,!1}};self.addEventListener("test-options",null,t),self.removeEventListener("test-options",null,t)}catch(t){}return it}(),e.addEventListener("message",(function(t){try{return o(t)}catch(t){var n,r;throw null===(n=(r=self).__AMP_REPORT_ERROR)||void 0===n||n.call(r,t),t}}),!!u&&i)}var r=t.prototype;return r.Z=function(t){var r=this,i=t.data,e=t.origin===this.i,o="object"===n(i)&&"_scramp"in i,u=this.Wvt.indexOf(t.source)>-1;e&&u&&o&&(this._r.forEach((function(t){return t(i)})),this.Wvt.filter((function(n){return n!==t.source})).forEach((function(t){t.postMessage(i,r.i)})))},r.register=function(t,n){var r=this;n&&this._r.push(n),Promise.resolve(t).then((function(t){-1===r.Wvt.indexOf(t)&&r.Wvt.push(t)}))},t}(),ut=function(t){q(r,t);var n=J(r);function r(t){var r;return(r=n.call(this,t)).Xvt="Scroll Feature",r.Pi={url:"",open:!1,title:r.Xvt},r}var i=r.prototype;return i.update=function(t){var n=this,r=!1;switch(t._scramp){case"au":r=this.updateHorizontalLayout(t),["open","url","title"].forEach((function(i){s(t,i)&&t[i]!==n.Pi[i]&&(n.Pi[i]=t[i],r=!0)}));break;case"st":["revealed"].forEach((function(i){s(t,i)&&t[i]!==n.Pi[i]&&(n.Pi[i]=t[i],r=!0)}))}r&&this.tc(this.Pi)},i.tc=function(t){var n=this;this.mutate((function(){var r,i;n.Jvt||(n.Zvt(),n.Vvt(n.Jvt.contentWindow)),n.Jvt.src!==t.url&&n.Jvt.setAttribute("src",t.url),n.renderHorizontalLayout(),n.Jvt.setAttribute("title",t.title),r=n.Jvt,void 0===(i=t.open)&&(i=r.hasAttribute("hidden")),i?r.removeAttribute("hidden"):r.setAttribute("hidden","")}))},i.Zvt=function(){this.Jvt=this.el("iframe",{"class":"amp-access-scroll-sheet","scrolling":"no","frameborder":"0","allowtransparency":"true","title":this.Xvt,"sandbox":"allow-scripts allow-same-origin allow-top-navigation allow-popups allow-popups-to-escape-sandbox"}),this.Vs=this.Jvt,this.mount()},r}(K);function st(t,n,r){if(n[r])return n[r];var i=t.querySelector("style[".concat(r,"], link[").concat(r,"]"));return i?(n[r]=i,i):null}function ct(t,n){for(var r=t.styleSheets,i=0;i<r.length;i++)if(r[i].ownerNode==n)return!0;return!1}ut.State;var at,lt,ft=function(){function t(t){this.St=t,this.It=0,this.Ct=0,this.Ot=u()}var n=t.prototype;return n.has=function(t){return!!this.Ot[t]},n.get=function(t){var n=this.Ot[t];if(n)return n.access=++this.Ct,n.payload},n.put=function(t,n){this.has(t)||this.It++,this.Ot[t]={payload:n,access:this.Ct},this.Rt()},n.Rt=function(){if(!(this.It<=this.St)){var t,n=this.Ot,r=this.Ct+1;for(var i in n){var e=n[i].access;e<r&&(r=e,t=i)}void 0!==t&&(delete n[t],this.It--)}},t}(),ht=(new Set(["c","v","a","ad"]),function(t){return"string"==typeof t?function(t,n){return at||(at=self.document.createElement("a"),lt=self.__AMP_URL_CACHE||(self.__AMP_URL_CACHE=new ft(100))),function(t,n,r){if(r&&r.has(n))return r.get(n);t.href=n,t.protocol||(t.href=t.href);var i,e={href:t.href,protocol:t.protocol,host:t.host,hostname:t.hostname,port:"0"==t.port?"":t.port,pathname:t.pathname,search:t.search,hash:t.hash,origin:null};"/"!==e.pathname[0]&&(e.pathname="/"+e.pathname),("http:"==e.protocol&&80==e.port||"https:"==e.protocol&&443==e.port)&&(e.port="",e.host=e.hostname),i=t.origin&&"null"!=t.origin?t.origin:"data:"!=e.protocol&&e.host?e.protocol+"//"+e.host:e.href,e.origin=i;var o=e;return r&&r.put(n,o),o}(at,t,lt)}(t):t});function vt(t){return"https:"==(t=ht(t)).protocol||"localhost"==t.hostname||"127.0.0.1"==t.hostname||(r=".localhost",(i=(n=t.hostname).length-r.length)>=0&&n.indexOf(r,i)==i);var n,r,i}function pt(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"source";return O(null!=t,"%s %s must be available",n,r),O(vt(t)||/^\/\//.test(t),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',n,r,t),t}var dt="amp-access-client",mt=function(t){q(r,t);var n=J(r);function r(t,r){var i,e=r.getAdapterConfig(),o=nt(e);return i=n.call(this,t,function(t){return{"authorization":"".concat(t,"/amp/access")+"?rid=READER_ID&cid=CLIENT_ID(scroll1)&c=CANONICAL_URL&o=AMPDOC_URL&x=QUERY_PARAM(scrollx)"+"&p=".concat(tt),"pingback":"".concat(t,"/amp/pingback")+"?rid=READER_ID&cid=CLIENT_ID(scroll1)&c=CANONICAL_URL&o=AMPDOC_URL&r=DOCUMENT_REFERRER&x=QUERY_PARAM(scrollx)&d=AUTHDATA(scroll)&v=AUTHDATA(visitId)"+"&p=".concat(tt),"namespace":"scroll"}}(o),{buildUrl:r.buildUrl.bind(r),collectUrlVars:r.collectUrlVars.bind(r)}),function(t,n,r,i,e){var o=t.getHeadNode(),s=function(t,n,r,i){var e=t.__AMP_CSS_SM;e||(e=t.__AMP_CSS_SM=u());var o="amp-extension=".concat(i);if(o){var s=st(t,e,o);if(s)return"STYLE"==s.tagName&&s.textContent!==n&&(s.textContent=n),s}var a=(t.ownerDocument||t).createElement("style");a.textContent=n;return a.setAttribute("amp-extension",i),function(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(r){var i=r.nextSibling;t.insertBefore(n,i)}else c(t,n)}(t,a,st(t,e,"amp-runtime")),o&&(e[o]=a),a}(o,function(t,n){var r=t.__AMP_CSS_TR;return r?r(n):n}(o,".amp-access-scroll-bar{bottom:0;height:60px;left:auto;right:0px;width:48px;margin:0;padding:0}.amp-access-scroll-bar,.amp-access-scroll-sheet{position:fixed;background:transparent;z-index:2147483647}@media (max-width:599px){.amp-access-scroll-sheet{bottom:60px;height:100px;left:0!important;right:0!important;width:100%!important}}@media (min-width:600px){.amp-access-scroll-sheet{bottom:76px;height:56px;left:auto;right:16px;width:475px}}\n/*# sourceURL=/extensions/amp-access-scroll/0.1/amp-access-scroll.css*/"),0,"amp-access-scroll-elt");if(r){var a=t.getRootNode();if(ct(a,s))return s;var l=setInterval((function(){ct(a,s)&&clearInterval(l)}),4)}}(t,0,(function(){})),i.oE=r,i.Qw=o,i}return r.prototype.authorize=function(){var n=this;return t.prototype.authorize.call(this).then((function(t){var r=n.ampdoc.getRootNode().querySelector("amp-story[standalone]");if(t&&t.scroll){if(!r){var i=new et(n.ampdoc,n.oE),e=new ut(n.ampdoc),o=new ot(n.Qw);o.register(e.window,(function(t){"au"!==t._scramp&&"st"!==t._scramp||e.update(t)})),o.register(i.window,(function(t){"st"===t._scramp&&(e.update(t),i.update(t))}));var u=n.oE.getAdapterConfig();!function(t,n){if(!n.disableAnalytics){var r=t.win.document,i={"trigger":"immediate"};n.dataConsentId&&(i["data-block-on-consent"]="");var e,o=a(r,"amp-analytics",i),u=a(r,"script",{"type":"application/json"}),s=(e=nt(n),{"requests":{"scroll":"".concat(e,"/amp/analytics")+"?rid=ACCESS_READER_ID&cid=CLIENT_ID(scroll1)&c=CANONICAL_URL&o=AMPDOC_URL&r=DOCUMENT_REFERRER&x=QUERY_PARAM(scrollx)&d=AUTHDATA(scroll.scroll)&v=AUTHDATA(scroll.visitId)&h=SOURCE_HOSTNAME&s=${totalEngagedTime}"+"&p=".concat(tt)},"triggers":{"trackInterval":{"on":"timer","timerSpec":{"interval":15,"maxTimerLength":7200},"request":"scroll"}}});u.textContent=JSON.stringify(s),o.appendChild(u),o.CONFIG=s,(c=t.win,j(c,"extensions")).installExtensionForDoc(t,"amp-analytics"),t.getBody().appendChild(o)}var c}(n.ampdoc,u),t.features&&t.features.d&&new W(n.ampdoc,n.oE,nt(u))}}else t&&t.blocker&&bt.shouldCheck(n.ampdoc)&&new bt(n.ampdoc,n.oE,t.features&&t.features.r).check();return t}))},r}(function(){function t(t,n,r){this.ampdoc=t,this.Qn=r,this.Kvt=O(n.authorization,'"authorization" URL must be specified'),pt(this.Kvt,'"authorization"'),this.Dpt=!n.noPingback,this.Qpt=n.pingback,this.Dpt&&(O(this.Qpt,'"pingback" URL must be specified'),pt(this.Qpt,'"pingback"')),this.Wpt=this.Gpt(n),this.Sr=$(t.win),this.js=M(t.win,"timer")}var n=t.prototype;return n.Gpt=function(t){if(!t.authorizationTimeout)return 3e3;var n=t.authorizationTimeout;return O("number"==typeof n,'"authorizationTimeout" must be a number'),w().development||(n=Math.min(n,3e3)),n},n.getConfig=function(){return{"authorizationUrl":this.Kvt,"pingbackEnabled":this.Dpt,"pingbackUrl":this.Qpt,"authorizationTimeout":this.Wpt}},n.getAuthorizationUrl=function(){return this.Kvt},n.isAuthorizationEnabled=function(){return!0},n.getAuthorizationTimeout=function(){return this.Wpt},n.authorize=function(){var t=this;return D().fine(dt,"Start authorization via ",this.Kvt),this.Qn.buildUrl(this.Kvt,!1).then((function(n){return D().fine(dt,"Authorization URL: ",n),t.js.timeoutPromise(t.Wpt,t.Sr.fetchJson(n,{credentials:"include"})).then((function(t){return t.json()}))}))},n.isPingbackEnabled=function(){return this.Dpt},n.pingback=function(){var t=this;return this.Qn.buildUrl(L(this.Qpt),!0).then((function(n){return D().fine(dt,"Pingback URL: ",n),t.Sr.sendSignal(n,{method:"POST",credentials:"include",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:""})}))},n.postAction=function(){},t}()),bt=function(){function t(t,n,r){this.qi=t,this.oE=n,this.Kpt=r}t.shouldCheck=function(t){return!b(t.win.location.search).scrollnoblockerrefresh};var n=t.prototype;return n.check=function(){var t=this;$(this.qi.win).fetchJson("https://block.scroll.com/check.json").then((function(t){return t.json().then((function(t){return!0===t.dns}))}),(function(n){return t.tdt(n.message)})).then((function(n){!0===n&&t.ndt()}))},n.ndt=function(){var t,n=this;if(this.Kpt&&(t=this.qi.win.location,!p.cdnProxyRegex.test(ht(t).origin)))rt(this.oE,"https://scroll.com/loginwithapp").then((function(t){var r;(r=n.qi,S(r,"navigation")).navigateTo(n.qi.win,function(t,n,r,i){return function(t,n,r){if(!n)return t;var i=t.split("#",2),e=i[0].split("?",2);return e[0]+(e[1]?"?".concat(e[1],"&").concat(n):"?".concat(n))+(i[1]?"#".concat(i[1]):"")}(t,"".concat(encodeURIComponent("feature"),"=").concat(encodeURIComponent("r")))}(t))}));else{var r=nt(this.oE.getAdapterConfig()),i=new et(this.qi,this.oE);new ot(r).register(i.window,(function(t){"st"===t._scramp&&i.update(t)}))}},n.tdt=function(t){return 0===t.indexOf("XHR Failed fetching (https://block.scroll.com/...): Resource blocked by content blocker")},t}();t.registerServiceForDoc("scroll",(function(t){return(n=t.getHeadNode(),F(n,"access","amp-access")).then((function(n){var r=n.getVendorSource("scroll"),i=new mt(t,r);return r.getAdapter().registerVendor(i),i}));var n}))}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-access-scroll-0.1.js.map