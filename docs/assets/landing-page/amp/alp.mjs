self.AMP_CONFIG={"v":"012203281422000","type":"production","allow-doc-opt-in":["amp-next-page"],"allow-url-opt-in":[],"canary":0,"a4aProfilingRate":0.01,"doubleclickSraExp":0.01,"doubleclickSraReportExcludedBlock":0.1,"flexAdSlots":0.05,"flexible-bitrate":0.1,"ios-fixed-no-transfer":0,"story-ad-placements":0.01,"story-disable-animations-first-page":1,"story-load-inactive-outside-viewport":1,"amp-sticky-ad-to-amp-ad-v4":0,"esm":1};/*AMP_CONFIG*/;
(()=>{var{isArray:t}=Array;function n(t,n){const r=[];let e=0;for(let o=0;o<t.length;o++){const i=t[o];n(i,o,t)?r.push(i):(e<o&&(t[e]=i),e++)}return e<t.length&&(t.length=e),r}function r(t){return"string"==typeof t}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}function o(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var{hasOwnProperty:i,toString:u}=Object.prototype;function s(t){const n=Object.create(null);return t&&Object.assign(n,t),n}function c(t){return 1==(null==t?void 0:t.nodeType)}var l="​​​";function f(t){return c(t)?(t=t).tagName.toLowerCase()+(t.id?`#${t.id}`:""):t}function a(t){return t.indexOf(l)>=0}function p(t,r,e="Assertion failed",o){var i,u;if(r)return r;t&&-1==e.indexOf(t)&&(e+=t);let s=3;const c=e.split("%s");let l=c.shift();const a=[l];for(;c.length;){const t=arguments[s++],n=c.shift();l+=f(t)+n,a.push(t,n.trim())}const p=new Error(l);throw p.messageArray=n(a,(t=>""!==t)),null===(i=(u=self).__AMP_REPORT_ERROR)||void 0===i||i.call(u,p),p}function d(n,r,e,o,i){return t(i)?n(e,i.concat([r])):n(e,`${i||o}: %s`,r),r}function h(t){const n=Object.getOwnPropertyDescriptor(t,"message");if(null!=n&&n.writable)return t;const{message:r,stack:e}=t,o=new Error(r);for(const n in t)o[n]=t[n];return o.stack=e,o}function v(t){let n=null,r="";for(var e,i=o(arguments,!0);!(e=i()).done;){const t=e.value;t instanceof Error&&!n?n=h(t):(r&&(r+=" "),r+=t)}return n?r&&(n.message=r+": "+n.message):n=new Error(r),n}function m(t){const n=v.apply(null,arguments);return n.expected=!0,n}var g=/(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;function y(t,n=""){try{return decodeURIComponent(t)}catch(t){return n}}function w(t){const n=s();if(!t)return n;let r;for(;r=g.exec(t);){const t=y(r[1],r[1]),e=r[2]?y(r[2].replace(/\+/g," "),r[2]):"";n[t]=e}return n}function A(t){const{location:n}=t||self;return w(n.originalHash||n.hash)}var E=self.AMP_CONFIG||{},b=("string"==typeof E.thirdPartyFrameRegex?new RegExp(E.thirdPartyFrameRegex):E.thirdPartyFrameRegex)||/^d-\d+\.ampproject\.net$/,$=("string"==typeof E.cdnProxyRegex?new RegExp(E.cdnProxyRegex):E.cdnProxyRegex)||/^https:\/\/([a-zA-Z0-9_-]+\.)?cdn\.ampproject\.org$/;function _(t){if(!self.document||!self.document.head)return null;if(self.location&&$.test(self.location.origin))return null;const n=self.document.head.querySelector(`meta[name="${t}"]`);return n&&n.getAttribute("content")||null}var P={thirdParty:E.thirdPartyUrl||"https://3p.ampproject.net",thirdPartyFrameHost:E.thirdPartyFrameHost||"ampproject.net",thirdPartyFrameRegex:b,cdn:E.cdnUrl||_("runtime-host")||"https://cdn.ampproject.org",cdnProxyRegex:$,localhostRegex:/^https?:\/\/localhost(:\d+)?$/,errorReporting:E.errorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r",betaErrorReporting:E.betaErrorReportingUrl||"https://us-central1-amp-error-reporting.cloudfunctions.net/r-beta",localDev:E.localDev||!1,trustedViewerHosts:[/(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/,/(^|\.)gmail\.(com|dev)$/],geoApi:E.geoApiUrl||_("amp-geo-api")},R="";function M(t){var n;return R||(R=(null===(n=t.AMP_CONFIG)||void 0===n?void 0:n.v)||"012203281422000"),R}function x(t,n){const r=n||A(t);return["1","actions","amp","amp4ads","amp4email"].includes(r.development)||!!t.AMP_DEV_MODE}var S=()=>{},I=(t,n)=>n.reduce(((t,n)=>`${t}&s[]=${j(n)}`),`https://log.amp.dev/?v=012203281422000&id=${encodeURIComponent(t)}`),j=t=>encodeURIComponent(String(f(t))),O=t=>parseInt(A(t).log,10);self.__AMP_LOG=self.__AMP_LOG||{user:null,dev:null,userForEmbed:null};var k=self.__AMP_LOG,U=null;function C(t,n){if(!U)throw new Error("failed to call initLogConstructor");return new U(self,t,n)}function T(t){return C(((t,n)=>n||t>=1?4:2),t)}function V(){return k.dev||(k.dev=C((t=>t>=3?4:t>=2?3:0)))}function L(t,n,r,e,o,i,u,s,c,l,f){return t}new Set(["c","v","a","ad"]);var N,F,z=t=>"string"==typeof t?D(t):t;function D(t,n){return N||(N=self.document.createElement("a")),function(t,n,r){return t.href="",new URL(n,t.href)}(N,t)}function J(t){return P.cdnProxyRegex.test(z(t).origin)}function H(t){const n=function(t,n,r){let e;for(e=t;e&&void 0!==e;e=e.parentElement)if(n(e))return e;return null}(t.target,(t=>"A"==t.tagName&&t.href));if(n)return{eventualUrl:B(n),a:n}}function B(t){const n=t.getAttribute("data-url-param-name")||"adurl",r=w(t.search)[n];if(r&&J(r)&&D(r).pathname.startsWith("/c/"))return r}function W(t){return t.head||t.documentElement}function Z(t,n){let r=t;for(let t=0;t<n;t++)r=r.parent;return r}function q(t,n){return K(t=function(t){return t.__AMP_TOP||(t.__AMP_TOP=t)}(t),n)}function X(t,n){return K(function(t){const n=G(t);return n.isSingleDoc()?n.win:n}(G(t)),n)}function G(t){return t.nodeType?function(t){return q(t,"ampdoc")}((n=t,(n.ownerDocument||n).defaultView)).getAmpDoc(t):t;var n}function K(t,n){L(function(t,n){const r=t.__AMP_SERVICES&&t.__AMP_SERVICES[n];return!(!r||!r.ctor)}(t,n));const r=function(t){let n=t.__AMP_SERVICES;return n||(n=t.__AMP_SERVICES={}),n}(t)[n];return r.obj||(L(r.ctor),L(r.context),r.obj=new r.ctor(r.context),L(r.obj),r.context=null,r.resolve&&r.resolve(r.obj)),r.obj}var Q,Y=t=>q(t,"ampdoc"),tt=["Webkit","webkit","Moz","moz","ms","O","o"];function nt(t,n,r,e,o){const i=function(t,n,r){if(n.startsWith("--"))return n;Q||(Q=s());let e=Q[n];if(!e||r){if(e=n,void 0===t[n]){const r=function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(n),o=function(t,n){for(let r=0;r<tt.length;r++){const e=tt[r]+n;if(void 0!==t[e])return e}return""}(t,r);void 0!==t[o]&&(e=o)}r||(Q[n]=e)}return e}(t.style,n,o);if(!i)return;const u=e?r+e:r;t.style.setProperty(function(t){const n=t.replace(/[A-Z]/g,(t=>"-"+t.toLowerCase()));return tt.some((t=>n.startsWith(t+"-")))?`-${n}`:n}(i),u)}var rt=!1,et=self.__AMP_ERRORS||[];self.__AMP_ERRORS=et;var ot,it,ut,st=function(t){return(st=function(t){const n=function(t){let n=0;return()=>{let t=Math.pow(1.5,n++);return t+=function(t,n){let r=t*(n=n||.3)*Math.random();return Math.random()>.5&&(r*=-1),r}(t),1e3*t}}();return t=>setTimeout(t,n())}())(t)};function ct(t,n,r,e,o){var i;!this||!this.document||o&&o.expected||(L((i=this.document).defaultView),rt||(rt=!0,function(t){!function(t,n){for(const r in n)nt(t,r,n[r])}(t.body,{opacity:1,visibility:"visible","animation":"none"})}(i)));let u=!1;try{u=function(t){if(!t.document)return!1;const n=t.document.querySelectorAll("script[src]");for(let t=0;t<n.length;t++)if(!J(n[t].src.toLowerCase()))return!0;return!1}(self)}catch(t){}if(u&&Math.random()>.01)return;const s=function(t,n,r,e,o,i){t=function(t,n){return n&&(t=n.message?n.message:String(n)),t||(t="Unknown error"),t}(t,o);let u=!(!o||!o.expected);if(/_reported_/.test(t))return;if("CANCELLED"==t)return;const s=!(self&&self.window),c=Math.random();if((function(t){return-1!=t.indexOf("Failed to load:")}(t)||"Script error."==t||s)&&(u=!0,c>.001))return;const f=a(t);if(f&&c>.1)return;const p=Object.create(null);p.v=function(t){const n=t||self;return n.__AMP_MODE?n.__AMP_MODE:n.__AMP_MODE=function(t){return{localDev:!1,development:x(t,A(t)),esm:!0,test:!1,rtvVersion:M(t)}}(n)}().rtvVersion,p.noAmp=i?"1":"0",p.m=t.replace(l,""),p.a=f?"1":"0",p.ex=u?"1":"0",p.dw=s?"1":"0";let d="1p";var h,v;if(d="esm",p.esm="1",p.rt="esm",p.ca=null!==(v=self.AMP_CONFIG)&&void 0!==v&&v.canary?"1":"0",p.bt=(null===(h=self.AMP_CONFIG)||void 0===h?void 0:h.type)||"unknown",self.location.ancestorOrigins&&self.location.ancestorOrigins[0]&&(p.or=self.location.ancestorOrigins[0]),self.viewerState&&(p.vs=self.viewerState),self.parent&&self.parent!=self&&(p.iem="1"),self.AMP&&self.AMP.viewer){const t=self.AMP.viewer.getResolvedViewerUrl(),n=self.AMP.viewer.maybeGetMessagingOrigin();t&&(p.rvu=t),n&&(p.mso=n)}const m=[],g=self.__AMP__EXPERIMENT_TOGGLES||null;var y,w,E;for(const t in g){const n=g[t];m.push(`${t}=${n?"1":"0"}`)}return p.exps=m.join(","),o?(p.el=(null===(y=o.associatedElement)||void 0===y?void 0:y.tagName)||"u",o.args&&(p.args=JSON.stringify(o.args)),f||o.ignoreStack||!o.stack||(p.s=o.stack),o.message&&(o.message+=" _reported_")):(p.f=n||"",p.l=r||"",p.c=e||""),p.r=self.document?self.document.referrer:"",p.ae=et.join(","),p.fr=self.location.originalHash||self.location.hash,"production"===p.bt&&(p.pt="1"),E=t,(w=et).length>=25&&w.splice(0,w.length-25+1),w.push(E),p}(t,n,r,e,o,u);s&&st((()=>{try{return function(t,n){return n.pt&&Math.random()<.9?F||(F=Promise.resolve(void 0)):function(t,n){const r=Y(t);if(!r.isSingleDoc())return Promise.resolve(!1);const e=r.getSingleDoc();if(!e.getRootNode().documentElement.hasAttribute("report-errors-to-viewer"))return Promise.resolve(!1);const o=X(e,"viewer");return o.hasCapability("errorReporter")?o.isTrustedViewer().then((t=>{return!!t&&(o.sendMessage("error",{"m":(r=n).m,"a":r.a,"s":r.s,"el":r.el,"ex":r.ex,"v":r.v,"pt":r.pt}),!0);var r})):Promise.resolve(!1)}(t,n).then((t=>{if(!t){const t=new XMLHttpRequest;t.open("POST",Math.random()<.1?P.betaErrorReporting:P.errorReporting,!0),t.send(JSON.stringify(n))}}))}(this,s).catch((()=>{}))}catch(t){}}))}U=class{constructor(t,n,r=""){this.win=t,this.ht=n,this.ft=this.dt(),this.bt=r,this.vt=null,this.gt=function(t){let n=!1,r=null,e=t;return(...t)=>(n||(r=e.apply(self,t),n=!0,e=null),r)}((()=>{t.fetch(`${P.cdn}/rtv/012203281422000/log-messages.simple.json`).then((t=>t.json()),S).then((t=>{t&&(this.vt=t)}))})),this.wt=this.assert.bind(this)}dt(){var t;const{win:n}=this;return null!==(t=n.console)&&void 0!==t&&t.log&&0!=O(n)?this.yt():0}yt(t){return this.ht(O(t),!1)}jt(t,n,e){var o;if(n>this.ft)return!1;const i=this.win.console,u=null!==(o={1:i.error,3:i.info,2:i.warn}[n])&&void 0!==o?o:i.log,s=this.At(e),c=`[${t}]`;return r(s[0])?s[0]=c+" "+s[0]:s.unshift(c),u.apply(i,s),!0}fine(t,...n){this.jt(t,4,n)}info(t,...n){this.jt(t,3,n)}warn(t,...n){this.jt(t,2,n)}error(t,...n){if(!this.jt(t,1,n)){var r,e;const o=this.createError.apply(this,n);o.name=t||o.name,null===(r=(e=self).__AMP_REPORT_ERROR)||void 0===r||r.call(e,o)}}expectedError(t,...n){var r,e;this.jt(t,1,n)||null===(r=(e=self).__AMP_REPORT_ERROR)||void 0===r||r.call(e,this.createExpectedError.apply(this,n))}createError(t){return this.xt(v.apply(null,arguments))}createExpectedError(t){return this.xt(m.apply(null,arguments))}xt(t){return t=h(t),this.bt?t.message?-1==t.message.indexOf(this.bt)&&(t.message+=this.bt):t.message=this.bt:a(t.message)&&(t.message=t.message.replace(l,"")),t}At(n){return t(n[0])?this.Pt(n[0]):n}Pt(t){var n;const r=t.shift();return null!==(n=this.vt)&&void 0!==n&&n[r]?[this.vt[r]].concat(t):[`More info at ${I(r,t)}`]}assert(n,r,e){return t(r)?this.assert.apply(this,[n].concat(this.Pt(r))):p.apply(null,[this.bt].concat(Array.prototype.slice.call(arguments)))}assertElement(t,n){return function(t,n,r){return d(t,n,c(n),"Element expected",r)}(this.wt,t,n)}assertString(t,n){return function(t,n,e){return d(t,n,r(n),"String expected",e)}(this.wt,t,n)}assertNumber(t,n){return function(t,n,r){return d(t,n,"number"==typeof n,"Number expected",r)}(this.wt,t,n)}assertArray(n,r){return function(n,r,e){return d(n,r,t(r),"Array expected",e)}(this.wt,n,r)}assertBoolean(t,n){return function(t,n,r){return d(t,n,!!n===n,"Boolean expected",r)}(this.wt,t,n)}},V(),k.user||(k.user=T(l)),function(t,n){return n&&n.ownerDocument.defaultView!=t}(k.user.win,ut)?k.userForEmbed||(k.userForEmbed=T("​​​​")):k.user,ot=function(t,n){try{let r;if(t)if(void 0!==t.message)t=h(t),r=!0;else{const n=t;(t=new Error(function(t){try{return JSON.stringify(t)}catch(n){return String(t)}}(n))).origError=n}else t=new Error("Unknown error");if(t.reported)return t;if(t.reported=!0,t.messageArray){const n=function(t,n){for(let n=0;n<t.length;n++)if(null==(r=t[n])?void 0:r.tagName)return n;var r;return-1}(t.messageArray);n>-1&&(t.associatedElement=t.messageArray[n])}const e=n||t.associatedElement;if(e&&e.classList&&e.classList.add("i-amphtml-error"),self.console&&(a(t.message)||!t.expected)){const n=console.error||console.log;t.messageArray?n.apply(console,t.messageArray):e?n.call(console,t.message,e):n.call(console,t.message)}e&&e.dispatchCustomEventForTesting&&e.dispatchCustomEventForTesting("amp:error",t.message),ct.call(self,void 0,void 0,void 0,void 0,t)}catch(t){setTimeout((function(){throw t}))}return t},self.__AMP_REPORT_ERROR=ot,(it=window).document.documentElement.addEventListener("click",(function(t,n){if(t.defaultPrevented)return;if(0!=t.buttons&&1!=t.buttons)return;if(t.ctrlKey||t.altKey||t.shiftKey||t.metaKey)return;const r=H(t);if(!r||!r.eventualUrl)return;if(!1===t.isTrusted)return;const e="click="+encodeURIComponent((!0,function(t,n,r){if(!n)return t;const e=t.split("#",2),o=e[0].split("?",2);let i=o[0]+(o[1]?`?${n}&${o[1]}`:`?${n}`);return i+=e[1]?`#${e[1]}`:"",i}(r.a.href,`${encodeURIComponent("amp")}=${encodeURIComponent("1")}`)));let o=r.eventualUrl;-1==r.eventualUrl.indexOf("#")?o+="#"+e:o+="&"+e;const i=r.a.ownerDocument.defaultView,u=i.location.ancestorOrigins;u&&"http://localhost:8000"==u[u.length-1]&&(o=o.replace(`${D(r.eventualUrl).host}/c/`,"http://localhost:8000/max/")),t.preventDefault(),n?n(o):function(t,n,r){const e=(n.target||"_top").toLowerCase(),o=function(t){if(!t.location.ancestorOrigins)return null;const n=t.location.ancestorOrigins;if(n.length<2)return null;if(-1==n[n.length-1].indexOf(".google."))return null;const r=n[n.length-2];return J(r)||function(t){return P.localhostRegex.test(z(t).origin)}(r)?{win:Z(t,n.length-1),origin:r}:null}(t);o?o.win.postMessage("a2a;"+JSON.stringify({"url":r}),o.origin):function(t,n,r,e){let o;try{o=t.open(n,r,void 0)}catch(t){V().error("DOM","Failed to open url on target: ",r,t)}var i;!o&&"_top"!=r&&("number"!=typeof i&&(i=0),i+"noopener".length>"".length||-1==="".indexOf("noopener",i))&&(o=t.open(n,"_top"))}(t,r,e)}(i,r.a,o)})),it.document.documentElement.addEventListener("touchstart",(function(t){const n=H(t);if(!n||!n.eventualUrl)return;const r=document.createElement("link");r.rel="preload",r.href=n.eventualUrl;const e=document.createElement("link");e.rel="preload",e.as="fetch",e.href=n.eventualUrl;const o=W(t.target.ownerDocument);o.appendChild(r),o.appendChild(e)})),function(t){(new t.Image).src=`${P.cdn}/preconnect.gif`;const n=document.createElement("link");n.rel="preload",n.setAttribute("as","script"),n.href=`${P.cdn}/v0.js`,W(t.document).appendChild(n)}(window)})();
/*! https://mths.be/cssescape v1.5.1 by @mathias | MIT license */
//# sourceMappingURL=alp.mjs.map