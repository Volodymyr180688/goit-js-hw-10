import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as s}from"./assets/vendor-77e16229.js";const r=document.querySelector(".form");r.addEventListener("submit",async function(i){i.preventDefault();const t=parseInt(this.elements.delay.value),o=this.elements.state.value;new Promise((e,m)=>{setTimeout(o==="fulfilled"?()=>{e(t)}:()=>{m(t)},t)}).then(e=>{s.success({title:"Fulfilled promise",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{s.error({title:"Rejected promise",message:`❌ Rejected promise in ${e}ms`})}),this.reset()});
//# sourceMappingURL=commonHelpers2.js.map