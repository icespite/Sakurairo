(self.webpackChunksakurairo_scripts=self.webpackChunksakurairo_scripts||[]).push([[857],{3390:function(e){var n={exports:{}};function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(n){var i=e[n];"object"!=typeof i||Object.isFrozen(i)||t(i)})),e}n.exports=t,n.exports.default=t;var i=n.exports;class r{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function o(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function s(e,...n){const t=Object.create(null);for(const n in e)t[n]=e[n];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}const a=e=>!!e.kind;class c{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=o(e)}openNode(e){if(!a(e))return;let n=e.kind;n=e.sublanguage?`language-${n}`:((e,{prefix:n})=>{if(e.includes(".")){const t=e.split(".");return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")}return`${n}${e}`})(n,{prefix:this.classPrefix}),this.span(n)}closeNode(e){a(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class l{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n={kind:e,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{l._collapse(e)})))}}class u extends l{constructor(e){super(),this.options=e}addKeyword(e,n){""!==e&&(this.openNode(n),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,n){const t=e.root;t.kind=n,t.sublanguage=!0,this.add(t)}toHTML(){return new c(this,this.options).value()}finalize(){return!0}}function g(e){return e?"string"==typeof e?e:e.source:null}function d(e){return p("(?=",e,")")}function h(e){return p("(?:",e,")*")}function f(e){return p("(?:",e,")?")}function p(...e){return e.map((e=>g(e))).join("")}function b(...e){return"("+(function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e).capture?"":"?:")+e.map((e=>g(e))).join("|")+")"}function m(e){return new RegExp(e.toString()+"|").exec("").length-1}const w=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function E(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t;let i=g(e),r="";for(;i.length>0;){const e=w.exec(i);if(!e){r+=i;break}r+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?r+="\\"+String(Number(e[1])+n):(r+=e[0],"("===e[0]&&t++)}return r})).map((e=>`(${e})`)).join(n)}const x="[a-zA-Z]\\w*",y="[a-zA-Z_]\\w*",_="\\b\\d+(\\.\\d+)?",k="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",v="\\b(0b[01]+)",O={begin:"\\\\[\\s\\S]",relevance:0},N={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[O]},S={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[O]},M=function(e,n,t={}){const i=s({scope:"comment",begin:e,end:n,contains:[]},t);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const r=b("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:p(/[ ]+/,"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},R=M("//","$"),A=M("/\\*","\\*/"),j=M("#","$"),I={scope:"number",begin:_,relevance:0},T={scope:"number",begin:k,relevance:0},L={scope:"number",begin:v,relevance:0},B={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[O,{begin:/\[/,end:/\]/,relevance:0,contains:[O]}]}]},H={scope:"title",begin:x,relevance:0},C={scope:"title",begin:y,relevance:0},D={begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0};var P=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:x,UNDERSCORE_IDENT_RE:y,NUMBER_RE:_,C_NUMBER_RE:k,BINARY_NUMBER_RE:v,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=p(n,/.*\b/,e.binary,/\b.*/)),s({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},BACKSLASH_ESCAPE:O,APOS_STRING_MODE:N,QUOTE_STRING_MODE:S,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:M,C_LINE_COMMENT_MODE:R,C_BLOCK_COMMENT_MODE:A,HASH_COMMENT_MODE:j,NUMBER_MODE:I,C_NUMBER_MODE:T,BINARY_NUMBER_MODE:L,REGEXP_MODE:B,TITLE_MODE:H,UNDERSCORE_TITLE_MODE:C,METHOD_GUARD:D,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})}});function $(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}function U(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function z(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=$,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function K(e,n){Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}function W(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function X(e,n){void 0===e.relevance&&(e.relevance=1)}const G=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]})),e.keywords=t.keywords,e.begin=p(t.beforeMatch,d(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},Z=["of","and","for","in","not","or","if","then","parent","list","value"];function F(e,n,t="keyword"){const i=Object.create(null);return"string"==typeof e?r(t,e.split(" ")):Array.isArray(e)?r(t,e):Object.keys(e).forEach((function(t){Object.assign(i,F(e[t],n,t))})),i;function r(e,t){n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((function(n){const t=n.split("|");i[t[0]]=[e,J(t[0],t[1])]}))}}function J(e,n){return n?Number(n):function(e){return Z.includes(e.toLowerCase())}(e)?0:1}const V={},q=e=>{console.error(e)},Y=(e,...n)=>{console.log(`WARN: ${e}`,...n)},Q=(e,n)=>{V[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),V[`${e}/${n}`]=!0)},ee=new Error;function ne(e,n,{key:t}){let i=0;const r=e[t],o={},s={};for(let e=1;e<=n.length;e++)s[e+i]=r[e],o[e+i]=!0,i+=m(n[e-1]);e[t]=s,e[t]._emit=o,e[t]._multi=!0}function te(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw q("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ee;if("object"!=typeof e.beginScope||null===e.beginScope)throw q("beginScope must be object"),ee;ne(e,e.begin,{key:"beginScope"}),e.begin=E(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw q("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ee;if("object"!=typeof e.endScope||null===e.endScope)throw q("endScope must be object"),ee;ne(e,e.end,{key:"endScope"}),e.end=E(e.end,{joinWith:""})}}(e)}function ie(e){function n(n,t){return new RegExp(g(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=m(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(E(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,i)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=s(e.classNameAliases||{}),function t(r,o){const a=r;if(r.isCompiled)return a;[U,W,te,G].forEach((e=>e(r,o))),e.compilerExtensions.forEach((e=>e(r,o))),r.__beforeBegin=null,[z,K,X].forEach((e=>e(r,o))),r.isCompiled=!0;let c=null;return"object"==typeof r.keywords&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),c=r.keywords.$pattern,delete r.keywords.$pattern),c=c||/\w+/,r.keywords&&(r.keywords=F(r.keywords,e.case_insensitive)),a.keywordPatternRe=n(c,!0),o&&(r.begin||(r.begin=/\B|\b/),a.beginRe=n(a.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),r.end&&(a.endRe=n(a.end)),a.terminatorEnd=g(a.end)||"",r.endsWithParent&&o.terminatorEnd&&(a.terminatorEnd+=(r.end?"|":"")+o.terminatorEnd)),r.illegal&&(a.illegalRe=n(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(n){return s(e,{variants:null},n)})));if(e.cachedVariants)return e.cachedVariants;if(re(e))return s(e,{starts:e.starts?s(e.starts):null});if(Object.isFrozen(e))return s(e);return e}("self"===e?r:e)}))),r.contains.forEach((function(e){t(e,a)})),r.starts&&t(r.starts,o),a.matcher=function(e){const n=new i;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(a),a}(e)}function re(e){return!!e&&(e.endsWithParent||re(e.starts))}class oe extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const se=o,ae=s,ce=Symbol("nomatch");var le=function(e){const n=Object.create(null),t=Object.create(null),o=[];let s=!0;const a="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let l={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:u};function g(e){return l.noHighlightRe.test(e)}function m(e,n,t){let i="",r="";"object"==typeof n?(i=e,t=n.ignoreIllegals,r=n.language):(Q("10.7.0","highlight(lang, code, ...args) has been deprecated."),Q("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),r=e,i=n),void 0===t&&(t=!0);const o={code:i,language:r};N("before:highlight",o);const s=o.result?o.result:w(o.language,o.code,t);return s.code=o.code,N("after:highlight",s),s}function w(e,t,i,o){const c=Object.create(null);function u(){if(!O.keywords)return void S.addText(M);let e=0;O.keywordPatternRe.lastIndex=0;let n=O.keywordPatternRe.exec(M),t="";for(;n;){t+=M.substring(e,n.index);const r=y.case_insensitive?n[0].toLowerCase():n[0],o=(i=r,O.keywords[i]);if(o){const[e,i]=o;if(S.addText(t),t="",c[r]=(c[r]||0)+1,c[r]<=7&&(R+=i),e.startsWith("_"))t+=n[0];else{const t=y.classNameAliases[e]||e;S.addKeyword(n[0],t)}}else t+=n[0];e=O.keywordPatternRe.lastIndex,n=O.keywordPatternRe.exec(M)}var i;t+=M.substr(e),S.addText(t)}function g(){null!=O.subLanguage?function(){if(""===M)return;let e=null;if("string"==typeof O.subLanguage){if(!n[O.subLanguage])return void S.addText(M);e=w(O.subLanguage,M,!0,N[O.subLanguage]),N[O.subLanguage]=e._top}else e=E(M,O.subLanguage.length?O.subLanguage:null);O.relevance>0&&(R+=e.relevance),S.addSublanguage(e._emitter,e.language)}():u(),M=""}function d(e,n){let t=1;for(;void 0!==n[t];){if(!e._emit[t]){t++;continue}const i=y.classNameAliases[e[t]]||e[t],r=n[t];i?S.addKeyword(r,i):(M=r,u(),M=""),t++}}function h(e,n){return e.scope&&"string"==typeof e.scope&&S.openNode(y.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(S.addKeyword(M,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),M=""):e.beginScope._multi&&(d(e.beginScope,n),M="")),O=Object.create(e,{parent:{value:O}}),O}function f(e,n,t){let i=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,t);if(i){if(e["on:end"]){const t=new r(e);e["on:end"](n,t),t.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return f(e.parent,n,t)}function p(e){return 0===O.matcher.regexIndex?(M+=e[0],1):(I=!0,0)}function b(e){const n=e[0],i=t.substr(e.index),r=f(O,e,i);if(!r)return ce;const o=O;O.endScope&&O.endScope._wrap?(g(),S.addKeyword(n,O.endScope._wrap)):O.endScope&&O.endScope._multi?(g(),d(O.endScope,e)):o.skip?M+=n:(o.returnEnd||o.excludeEnd||(M+=n),g(),o.excludeEnd&&(M=n));do{O.scope&&S.closeNode(),O.skip||O.subLanguage||(R+=O.relevance),O=O.parent}while(O!==r.parent);return r.starts&&h(r.starts,e),o.returnEnd?0:n.length}let m={};function x(n,o){const a=o&&o[0];if(M+=n,null==a)return g(),0;if("begin"===m.type&&"end"===o.type&&m.index===o.index&&""===a){if(M+=t.slice(o.index,o.index+1),!s){const n=new Error(`0 width match regex (${e})`);throw n.languageName=e,n.badRule=m.rule,n}return 1}if(m=o,"begin"===o.type)return function(e){const n=e[0],t=e.rule,i=new r(t),o=[t.__beforeBegin,t["on:begin"]];for(const t of o)if(t&&(t(e,i),i.isMatchIgnored))return p(n);return t.skip?M+=n:(t.excludeBegin&&(M+=n),g(),t.returnBegin||t.excludeBegin||(M=n)),h(t,e),t.returnBegin?0:n.length}(o);if("illegal"===o.type&&!i){const e=new Error('Illegal lexeme "'+a+'" for mode "'+(O.scope||"<unnamed>")+'"');throw e.mode=O,e}if("end"===o.type){const e=b(o);if(e!==ce)return e}if("illegal"===o.type&&""===a)return 1;if(j>1e5&&j>3*o.index){throw new Error("potential infinite loop, way more iterations than matches")}return M+=a,a.length}const y=k(e);if(!y)throw q(a.replace("{}",e)),new Error('Unknown language: "'+e+'"');const _=ie(y);let v="",O=o||_;const N={},S=new l.__emitter(l);!function(){const e=[];for(let n=O;n!==y;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach((e=>S.openNode(e)))}();let M="",R=0,A=0,j=0,I=!1;try{for(O.matcher.considerAll();;){j++,I?I=!1:O.matcher.considerAll(),O.matcher.lastIndex=A;const e=O.matcher.exec(t);if(!e)break;const n=x(t.substring(A,e.index),e);A=e.index+n}return x(t.substr(A)),S.closeAllNodes(),S.finalize(),v=S.toHTML(),{language:e,value:v,relevance:R,illegal:!1,_emitter:S,_top:O}}catch(n){if(n.message&&n.message.includes("Illegal"))return{language:e,value:se(t),illegal:!0,relevance:0,_illegalBy:{message:n.message,index:A,context:t.slice(A-100,A+100),mode:n.mode,resultSoFar:v},_emitter:S};if(s)return{language:e,value:se(t),illegal:!1,relevance:0,errorRaised:n,_emitter:S,_top:O};throw n}}function E(e,t){t=t||l.languages||Object.keys(n);const i=function(e){const n={value:se(e),illegal:!1,relevance:0,_top:c,_emitter:new l.__emitter(l)};return n._emitter.addText(e),n}(e),r=t.filter(k).filter(O).map((n=>w(n,e,!1)));r.unshift(i);const o=r.sort(((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(k(e.language).supersetOf===n.language)return 1;if(k(n.language).supersetOf===e.language)return-1}return 0})),[s,a]=o,u=s;return u.secondBest=a,u}function x(e){let n=null;const i=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=l.languageDetectRe.exec(n);if(t){const n=k(t[1]);return n||(Y(a.replace("{}",t[1])),Y("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>g(e)||k(e)))}(e);if(g(i))return;if(N("before:highlightElement",{el:e,language:i}),e.children.length>0&&(l.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),l.throwUnescapedHTML)){throw new oe("One of your code blocks includes unescaped HTML.",e.innerHTML)}n=e;const r=n.textContent,o=i?m(r,{language:i,ignoreIllegals:!0}):E(r);e.innerHTML=o.value,function(e,n,i){const r=n&&t[n]||i;e.classList.add("hljs"),e.classList.add(`language-${r}`)}(e,i,o.language),e.result={language:o.language,re:o.relevance,relevance:o.relevance},o.secondBest&&(e.secondBest={language:o.secondBest.language,relevance:o.secondBest.relevance}),N("after:highlightElement",{el:e,result:o,text:r})}let y=!1;function _(){if("loading"===document.readyState)return void(y=!0);document.querySelectorAll(l.cssSelector).forEach(x)}function k(e){return e=(e||"").toLowerCase(),n[e]||n[t[e]]}function v(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{t[e.toLowerCase()]=n}))}function O(e){const n=k(e);return n&&!n.disableAutodetect}function N(e,n){const t=e;o.forEach((function(e){e[t]&&e[t](n)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){y&&_()}),!1),Object.assign(e,{highlight:m,highlightAuto:E,highlightAll:_,highlightElement:x,highlightBlock:function(e){return Q("10.7.0","highlightBlock will be removed entirely in v12.0"),Q("10.7.0","Please use highlightElement now."),x(e)},configure:function(e){l=ae(l,e)},initHighlighting:()=>{_(),Q("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){_(),Q("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,i){let r=null;try{r=i(e)}catch(e){if(q("Language definition for '{}' could not be registered.".replace("{}",t)),!s)throw e;q(e),r=c}r.name||(r.name=t),n[t]=r,r.rawDefinition=i.bind(null,e),r.aliases&&v(r.aliases,{languageName:t})},unregisterLanguage:function(e){delete n[e];for(const n of Object.keys(t))t[n]===e&&delete t[n]},listLanguages:function(){return Object.keys(n)},getLanguage:k,registerAliases:v,autoDetection:O,inherit:ae,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{e["before:highlightBlock"](Object.assign({block:n.el},n))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{e["after:highlightBlock"](Object.assign({block:n.el},n))})}(e),o.push(e)}}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="11.4.0",e.regex={concat:p,lookahead:d,either:b,optional:f,anyNumberOfTimes:h};for(const e in P)"object"==typeof P[e]&&i(P[e]);return Object.assign(e,P),e}({});e.exports=le,le.HighlightJS=le,le.default=le},637:function(e,n,t){t.r(n),t.d(n,{HighlightJS:function(){return i}});var i=t(8128);n.default=i}}]);
//# sourceMappingURL=857.js.map