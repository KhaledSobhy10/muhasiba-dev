if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const o=e=>n(e,c),a={module:{uri:c},exports:t,require:o};i[c]=Promise.all(s.map((e=>a[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-NRJpdLtz.js",revision:null},{url:"assets/index-wWxAU_rf.css",revision:null},{url:"index.html",revision:"5a631bc1fb6a1d3b930aa2fb2911adb8"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"pwa-64x64.png",revision:"84fbb16ba789c343407c0dce3aaaddf6"},{url:"pwa-192x192.png",revision:"22c475e54717a0cdf720c9ec566276f9"},{url:"pwa-512x512.png",revision:"003c56a007b0429202107b4ee7aa9c3c"},{url:"maskable-icon-512x512.png",revision:"1b47c700b033b9e1721a99991ca010c4"},{url:"manifest.webmanifest",revision:"da5fc573cec8e57c47dbd125ef8a7967"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
