"use strict";(self.webpackChunkvsb_subjects=self.webpackChunkvsb_subjects||[]).push([[9578],{8305:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>t});var s=i(5893),r=i(1151);const l={sidebar_position:10,title:"CUDA"},c=void 0,d={id:"subjects/APPS/teorie/cuda",title:"CUDA",description:"- Roz\u0161\xedren\xed jazyka C/C++",source:"@site/docs/subjects/APPS/teorie/cuda.md",sourceDirName:"subjects/APPS/teorie",slug:"/subjects/APPS/teorie/cuda",permalink:"/vsb-informatika/docs/subjects/APPS/teorie/cuda",draft:!1,unlisted:!1,editUrl:"https://github.com/Makhuta/vsb-informatika/tree/source/docs/subjects/APPS/teorie/cuda.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"CUDA"},sidebar:"APPS",previous:{title:"Disky",permalink:"/vsb-informatika/docs/subjects/APPS/teorie/disky"},next:{title:"RP2040 a ARM Cortex-A77",permalink:"/vsb-informatika/docs/subjects/APPS/teorie/rp2040_arm"}},o={},t=[{value:"V\xfdhody GPU/cudy?",id:"v\xfdhody-gpucudy",level:3},{value:"\u010c\xedm se mus\xed \u0159\xeddit program\xe1tor p\u0159i pr\xe1ci s CUDA ?",id:"\u010d\xedm-se-mus\xed-\u0159\xeddit-program\xe1tor-p\u0159i-pr\xe1ci-s-cuda-",level:3},{value:"Organizace m\u0159\xed\u017eky ?",id:"organizace-m\u0159\xed\u017eky-",level:3},{value:"Jak\xfd je postup ?",id:"jak\xfd-je-postup-",level:3},{value:"Roz\u0161\xed\u0159en\xed jazyka C/C++ ?",id:"roz\u0161\xed\u0159en\xed-jazyka-cc-",level:3}];function a(e){const n={code:"code",h3:"h3",img:"img",li:"li",p:"p",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Roz\u0161\xedren\xed jazyka C/C++"}),"\n",(0,s.jsx)(n.li,{children:"Funguje jen na Nvidia kart\xe1ch"}),"\n",(0,s.jsxs)(n.li,{children:["Warp je skupina jader, kter\xe1 je ovl\xe1d\xe1na schedulerem","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Ka\u017ed\xfd warp m\xe1 sv\u016fj dekoder instrukc\xed a scheduler"}),"\n",(0,s.jsx)(n.li,{children:"Ka\u017ed\xe9 j\xe1dro m\xe1 FP unit a INT unit"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"v\xfdhody-gpucudy",children:"V\xfdhody GPU/cudy?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Masivn\xed Paralelizace"}),"\n",(0,s.jsx)(n.li,{children:"GPU je navr\u017eena pro zpracov\xe1n\xed v\xfdpo\u010detn\u011b n\xe1ro\u010dn\xe9ho k\xf3du s omezen\xfdm po\u010dtem podm\xedn\u011bn\xfdch skok\u016f (Nejl\xe9pe bez IF\u016f)"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"\u010d\xedm-se-mus\xed-\u0159\xeddit-program\xe1tor-p\u0159i-pr\xe1ci-s-cuda-",children:"\u010c\xedm se mus\xed \u0159\xeddit program\xe1tor p\u0159i pr\xe1ci s CUDA ?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"J\xe1dra mus\xed b\xfd na sob\u011b nez\xe1visl\xe1 (GPU negarantuje po\u0159ad\xed exekuce threadu)"}),"\n",(0,s.jsx)(n.li,{children:"Mus\xed ur\u010dit spr\xe1vn\xfd po\u010det blok\u016f a vl\xe1ken"}),"\n",(0,s.jsx)(n.li,{children:"Nepou\u017e\xedvat IFy (a cykly)"}),"\n",(0,s.jsx)(n.li,{children:"TODOOOO: Unified Memory ???"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"organizace-m\u0159\xed\u017eky-",children:"Organizace m\u0159\xed\u017eky ?"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"cuda_grid",src:i(3146).Z+"",width:"656",height:"536"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"K\xf3d kernelu mus\xed bt p\u0159izp\u016fsoben m\u0159\xed\u017ece"}),"\n",(0,s.jsxs)(n.li,{children:["Pro ur\u010den\xed pozice threadu v m\u0159\xed\u017ece lze pou\u017e\xedt p\u0159eddefinovan\xe9 prom\u011bnn\xe9 (blockIdx, ..)","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"x = blockIdx.x * blockDim.x + threadIdx.x;"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"y = blockIdx.y * blockDim.y + threadIdx.y;"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"jak\xfd-je-postup-",children:"Jak\xfd je postup ?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"(alokuje se m\xedsto na GPU)"}),"\n",(0,s.jsx)(n.li,{children:"p\u0159ekop\xedruj\xed se data z hostu do device"}),"\n",(0,s.jsx)(n.li,{children:"zapnou se thready v GPU multiprocesoru"}),"\n",(0,s.jsx)(n.li,{children:"vykonaj\xed se thready v GPU multiprocesoru"}),"\n",(0,s.jsx)(n.li,{children:"p\u0159ekop\xedruj\xed se data z GPU zp\xe1tky do host"}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"roz\u0161\xed\u0159en\xed-jazyka-cc-",children:"Roz\u0161\xed\u0159en\xed jazyka C/C++ ?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Modifik\xe1tory funkc\xed:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"__device__"})," - Pouze GPU (Vykon\xe1na na GPU, zavol\xe1na z GPU)"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"__global__"})," - Pro oboje (Vykon\xe1na na grafick\xe9 kart\u011b, ale zavol\xe1na z procesoru)"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"__host__"})," - Pouze pro procesor"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Kvantifik\xe1tory (qualifier) prom\u011bnn\xfdch (nikdy jsme je irl nepou\u017eili):","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"__device__"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"__constant__"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"__shared__"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Datov\xe9 typy s p\u0159\xedponou 1,2,3,4 .. nap\u0159 ",(0,s.jsx)(n.code,{children:"int3"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"char"}),"\n",(0,s.jsx)(n.li,{children:"uchar"}),"\n",(0,s.jsx)(n.li,{children:"int"}),"\n",(0,s.jsx)(n.li,{children:"uint"}),"\n",(0,s.jsx)(n.li,{children:"short"}),"\n",(0,s.jsx)(n.li,{children:"ushort"}),"\n",(0,s.jsx)(n.li,{children:"long"}),"\n",(0,s.jsx)(n.li,{children:"ulong"}),"\n",(0,s.jsx)(n.li,{children:"float"}),"\n",(0,s.jsx)(n.li,{children:"double (double1, double2)   (off-topic fact.. float a double unsigned neexistuj\xed)"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"dim3 je uint3"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"jmeno_funkce<<<pocet_bloku, pocet_vlaken>>>(parametry)"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"fermi",src:i(3462).Z+"",width:"443",height:"555"})})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},3146:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/cuda_grid-dc35071cf28a686ef90128636f3fcef7.png"},3462:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/fermi-ebb8608005a138d6f57e932895078969.png"},1151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>c});var s=i(7294);const r={},l=s.createContext(r);function c(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);