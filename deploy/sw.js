if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const t=e=>n(e,r),l={module:{uri:r},exports:o,require:t};i[r]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(c(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-XpNs9TY3.css",revision:null},{url:"assets/index-Zirl9YS6.js",revision:null},{url:"index.html",revision:"ca6b5a1d60e8f8dc71bc11c3cc07d18c"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"pwa-64x64.png",revision:"84fbb16ba789c343407c0dce3aaaddf6"},{url:"pwa-192x192.png",revision:"22c475e54717a0cdf720c9ec566276f9"},{url:"pwa-512x512.png",revision:"003c56a007b0429202107b4ee7aa9c3c"},{url:"maskable-icon-512x512.png",revision:"1b47c700b033b9e1721a99991ca010c4"},{url:"manifest.webmanifest",revision:"da5fc573cec8e57c47dbd125ef8a7967"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
