;
(self.AMP=self.AMP||[]).push({m:0,v:"2203281422000",n:"amp-call-tracking",ev:"0.1",l:!0,f:function(n,t){!function(){function t(n,r){return(t=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,r)}function r(n){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function i(n,t){if(t&&("object"===e(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}Array.isArray;var o=Object.prototype;o.hasOwnProperty,o.toString;var u=self.AMP_CONFIG||{},f=("string"==typeof u.thirdPartyFrameRegex?new RegExp(u.thirdPartyFrameRegex):u.thirdPartyFrameRegex,("string"==typeof u.cdnProxyRegex?new RegExp(u.cdnProxyRegex):u.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/);function c(n){if(!self.document||!self.document.head)return null;if(self.location&&f.test(self.location.origin))return null;var t=self.document.head.querySelector('meta[name="'.concat(n,'"]'));return t&&t.getAttribute("content")||null}u.thirdPartyUrl,u.thirdPartyFrameHost,u.cdnUrl||c("runtime-host"),u.errorReportingUrl,u.betaErrorReportingUrl,u.localDev,u.geoApiUrl||c("amp-geo-api"),self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var l=self.__AMP_LOG;function s(n){return l.user||(l.user=a()),function(n,t){return t&&t.ownerDocument.defaultView!=n}(l.user.win,n)?l.userForEmbed||(l.userForEmbed=a()):l.user}function a(n){return function(n,t){throw new Error("failed to call initLogConstructor")}()}function h(n,t,r,e,i,o,u,f,c,l,s){return n}function p(n,t,r,e,i,o,u,f,c,l,a){return s().assert(n,t,r,e,i,o,u,f,c,l,a)}function v(n,t){return m(n=function(n){return n.__AMP_TOP||(n.__AMP_TOP=n)}(n),t)}function d(n){return n.nodeType?(r=n,t=(r.ownerDocument||r).defaultView,v(t,"ampdoc")).getAmpDoc(n):n;var t,r}function m(n,t){h(y(n,t));var r=function(n){var t=n.__AMP_SERVICES;return t||(t=n.__AMP_SERVICES={}),t}(n)[t];return r.obj||(h(r.ctor),h(r.context),r.obj=new r.ctor(r.context),h(r.obj),r.context=null,r.resolve&&r.resolve(r.obj)),r.obj}function y(n,t){var r=n.__AMP_SERVICES&&n.__AMP_SERVICES[t];return!(!r||!r.ctor)}var b,g,w=function(){function n(n){this.St=n,this.It=0,this.Ct=0,this.Ot=Object.create(null)}var t=n.prototype;return t.has=function(n){return!!this.Ot[n]},t.get=function(n){var t=this.Ot[n];if(t)return t.access=++this.Ct,t.payload},t.put=function(n,t){this.has(n)||this.It++,this.Ot[n]={payload:t,access:this.Ct},this.Rt()},t.Rt=function(){if(!(this.It<=this.St)){var n,t=this.Ot,r=this.Ct+1;for(var e in t){var i=t[e].access;i<r&&(r=i,n=e)}void 0!==n&&(delete t[n],this.It--)}},n}(),j=(new Set(["c","v","a","ad"]),function(n){return"string"==typeof n?function(n,t){return b||(b=self.document.createElement("a"),g=self.__AMP_URL_CACHE||(self.__AMP_URL_CACHE=new w(100))),function(n,t,r){if(r&&r.has(t))return r.get(t);n.href=t,n.protocol||(n.href=n.href);var e,i={href:n.href,protocol:n.protocol,host:n.host,hostname:n.hostname,port:"0"==n.port?"":n.port,pathname:n.pathname,search:n.search,hash:n.hash,origin:null};"/"!==i.pathname[0]&&(i.pathname="/"+i.pathname),("http:"==i.protocol&&80==i.port||"https:"==i.protocol&&443==i.port)&&(i.port="",i.host=i.hostname),e=n.origin&&"null"!=n.origin?n.origin:"data:"!=i.protocol&&i.host?i.protocol+"//"+i.host:i.href,i.origin=e;var o=i;return r&&r.put(t,o),o}(b,n,g)}(n):n});function R(n){return"https:"==(n=j(n)).protocol||"localhost"==n.hostname||"127.0.0.1"==n.hostname||(r=".localhost",(e=(t=n.hostname).length-r.length)>=0&&t.indexOf(r,e)==e);var t,r,e}var x={},E=function(n){!function(n,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(r&&r.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),r&&t(n,r)}(f,n);var e,o,u=(e=f,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,t=r(e);if(o){var u=r(this).constructor;n=Reflect.construct(t,arguments,u)}else n=t.apply(this,arguments);return i(this,n)});function f(n){var t;return(t=u.call(this,n)).ZR=null,t.qR=null,t}var c=f.prototype;return c.isLayoutSupported=function(n){return function(n){return"fixed"==n||"fixed-height"==n||"responsive"==n||"fill"==n||"flex-item"==n||"fluid"==n||"intrinsic"==n}(n)||"container"==n},c.buildCallback=function(){this.qR=function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"source";return p(null!=n,"%s %s must be available",t,r),p(R(n)||/^\/\//.test(n),'%s %s must start with "https://" or "//" or be relative and served from either https or from localhost. Invalid value: %s',t,r,n),n}(this.element.getAttribute("config"),this.element),this.ZR=this.element.firstElementChild},c.layoutCallback=function(){var n,t,r,e,i,o,u=this;return(n=this.element,t=n,r="url-replace",e=d(t),o=(i=d(e)).isSingleDoc()?i.win:i,y(o,r)?m(o,r):null).expandUrlAsync(s().assertString(this.qR)).then((function(n){return function(n,t){return t in x||(x[t]=(r=n,v(r,"xhr")).fetchJson(t,{credentials:"include"}).then((function(n){return n.json()}))),x[t];var r}(u.win,n)})).then((function(n){n.phoneNumber?(u.ZR.setAttribute("href","tel:".concat(n.phoneNumber)),u.ZR.textContent=n.formattedPhoneNumber||n.phoneNumber):s().warn("amp-call-tracking","Response does not contain a phoneNumber field %s. Call tracking was not applied.",u.element)}))},f}(n.BaseElement);n.registerElement("amp-call-tracking",E)}();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */}});
//# sourceMappingURL=amp-call-tracking-0.1.js.map