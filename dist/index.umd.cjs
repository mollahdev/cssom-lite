(function(u,c){typeof exports=="object"&&typeof module<"u"?module.exports=c():typeof define=="function"&&define.amd?define(c):(u=typeof globalThis<"u"?globalThis:u||self,u.index=c())})(this,function(){"use strict";var v=Object.defineProperty;var m=(u,c,h)=>c in u?v(u,c,{enumerable:!0,configurable:!0,writable:!0,value:h}):u[c]=h;var d=(u,c,h)=>(m(u,typeof c!="symbol"?c+"":c,h),h);class u{constructor(){d(this,"devices",{});d(this,"css",{});d(this,"rules",{})}get uid(){return Math.floor(Math.random()*1e5)}sortDevices(){const e=this,t=Object.keys(e.devices);if(t.length<2)return;t.sort((s,n)=>e.devices[s]-e.devices[n]);const r={};t.forEach(function(s){r[s]=e.devices[s]}),e.devices=r}removeMultiWhiteSpace(e){return typeof e!="string"?e:e.trim().replace(/ +(?= )/g,"")}responsiveToHash(e){let t=[],r;for(r in e)t.push(r+"_"+e[r]);return t.join("-")}hashToResponsive(e){const t={};return e.split("-").filter(String).forEach(s=>{const[n,i]=s.split(/_(.+)/);t[n]=this.devices[i]}),t}sortHashes(){const e=this,{rules:t,hashToResponsive:r}=e,s=Object.keys(t);if(s.length<2)return t;s.sort(function(i,l){if(i==="all")return-1;if(l==="all")return 1;let o=r.call(e,i),a=r.call(e,l);if(o.max&&a.max)return a.max-o.max;if(o.min&&a.min)return a.min-o.min;const f=o.max??o.min;return(a.max??a.min)-f});const n={};return s.forEach(i=>{n[i]=t[i]}),n}createResponsiveFormat(e){const t=this.hashToResponsive.call(this,e),r=[];for(let s in t)r.push("("+s+"-width:"+t[s]+"px)");return"@media"+r.join(" and ")}convertProperties(e){let t="";for(let r in e)t+=r+":"+e[r]+";";return t}convertRules(e){let t="";for(let r in e){const s=this.convertProperties(e[r]);s&&(t+=r+"{"+s+"}")}return t}}class c extends u{addDevice(e,t){this.devices[e]=t,this.sortDevices()}addCSS(e){this.css[this.uid]=e}addRule(e,t,r){const s=this;let n="all",i={};if(e=s.removeMultiWhiteSpace(e),t=s.removeMultiWhiteSpace(t),r&&typeof r=="object"&&(n=s.responsiveToHash(r)),s.rules[n]||(s.rules[n]={}),!t&&e){const l=e.match(/[^{]+\{[^}]+}/g);if(!l)return;for(let o in l){const a=l[o].match(/([^{]+)\{([^}]+)}/);if(a){const f=a[1],p=a[2];s.addRule(f,p,r)}}return}if(s.rules[n][e]||(s.rules[n][e]={}),typeof t=="string"){i=t.split(";").filter(String);const l={};try{let o;for(o in i){const[a,f]=i[o].split(/:(.*)?/);l[a.trim()]=f.trim().replace(";","")}}catch{return}i=l}Object.assign(s.rules[n][e],i)}clear(){this.rules={},this.css={}}output(){const{css:e,convertRules:t,createResponsiveFormat:r,sortHashes:s}=this,n=s.call(this);let i="";for(let l in e)i+=e[l];for(let l in n){let o=t.call(this,n[l]);l!=="all"&&(o=r.call(this,l)+"{"+o+"}"),i+=o}return i.replace(/\s+/g," ")}}return c});