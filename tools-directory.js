"use strict";
const q=document.getElementById("toolSearch");
const cards=[...document.querySelectorAll(".link-card")];
const filters=Object.freeze({
  calculator:["calculator","change","interest","margin","roi","break-even","tip","bmi","date","business","loan"],
  image:["image"],
  text:["word","json","case","password","random","aspect","timestamp","base64"]
});
function applyFilter(value){
  const filter=String(value||"all").toLowerCase();
  if(q) q.value=filter==="all"?"":filter;
  const terms=filters[filter]||[filter];
  cards.forEach(card=>{
    const search=(card.dataset.search||"").toLowerCase();
    card.hidden=filter!=="all"&&!terms.some(term=>search.includes(term));
  });
}
if(q){
  q.addEventListener("input",()=>{
    const value=q.value.trim().toLowerCase();
    cards.forEach(card=>{
      card.hidden=Boolean(value)&&!(card.dataset.search||"").toLowerCase().includes(value);
    });
  });
}
document.querySelectorAll("[data-filter]").forEach(link=>{
  link.addEventListener("click",()=>applyFilter(link.dataset.filter));
});
