"use strict";(self.webpackChunkvsb_subjects=self.webpackChunkvsb_subjects||[]).push([[4195],{3261:(e,s,r)=>{r.r(s),r.d(s,{default:()=>u});var t=r(7294),i=r(512),n=(r(3692),r(2263)),a=r(6040);const l={features:"features_t9lD",featureSvg:"featureSvg_GfXr",sliderContainer:"sliderContainer_aOwf",slider:"slider_zjVg",slide:"slide_hXCO"};var c=r(5893);const d=[{imgSrc:"memes/dvorsky_be_like.jpg",title:"Dvorsk\xfd be like"},{imgSrc:"memes/edison_scared.png",title:""},{imgSrc:"memes/vondrakova_beloved.gif",title:""}];function o(){const[e,s]=(0,t.useState)(0);return(0,t.useEffect)((()=>{const e=setInterval((()=>{s((e=>(e+1)%(d.length-2)))}),5e3);return()=>clearInterval(e)}),[]),(0,c.jsx)("section",{className:l.features,children:(0,c.jsx)("div",{className:l.sliderContainer,children:(0,c.jsx)("div",{className:l.slider,style:{transform:`translateX(-${e*(100/3)}%)`,transition:"transform 1s"},children:d.map(((s,r)=>(0,c.jsxs)("div",{className:(0,i.Z)(l.slide,{[l.active]:r===e}),children:[(0,c.jsx)("div",{className:"text--center",children:(0,c.jsx)("img",{className:l.featureSvg,src:s.imgSrc,alt:s.title})}),(0,c.jsx)("div",{className:"text--center padding-horiz--md",children:(0,c.jsx)("h3",{children:s.title})})]},r)))})})})}const h={heroBanner:"heroBanner_qdFl"};function m(){const{siteConfig:e}=(0,n.Z)();return(0,c.jsx)("header",{className:(0,i.Z)("hero hero--primary",h.heroBanner),children:(0,c.jsxs)("div",{className:"container",children:[(0,c.jsx)("h1",{className:"hero__title",children:e.title}),(0,c.jsx)("p",{className:"hero__subtitle",children:e.tagline})]})})}function u(){const{siteConfig:e}=(0,n.Z)();return(0,c.jsxs)(a.Z,{title:`${e.title}`,description:"<head />",children:[(0,c.jsx)(m,{}),(0,c.jsx)("main",{children:(0,c.jsx)(o,{})})]})}}}]);