"use strict";
const q=document.getElementById("toolSearch");
const cards=[...document.querySelectorAll(".link-card")];
const status=document.getElementById("directoryStatus");
const filters=Object.freeze({
  calculator:["calculator","change","interest","margin","roi","break-even","tip","bmi","date","business","loan","compound","discount","percentage"],
  image:["image"],
  text:["word","json","case","password","random","aspect","timestamp","base64"],
  all:[]
});
function updateStatus(count,query){
  if(status) status.textContent=query?count+" tool"+(count===1?"":"s")+" found":count+" tools in the toolbox";
}
function applyFilter(value){
  const filter=String(value||"all").toLowerCase();
  if(q) q.value=filter==="all"?"":filter;
  const terms=filters[filter]||[filter];
  let visible=0;
  cards.forEach(card=>{
    const search=(card.dataset.search||"").toLowerCase();
    const match=filter==="all"||terms.some(term=>search.includes(term));
    card.hidden=!match;
    if(match) visible++;
  });
  updateStatus(visible,filter==="all"?"":filter);
}
if(q){
  q.addEventListener("input",()=>{
    const value=q.value.trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const match=!value||(card.dataset.search||"").toLowerCase().includes(value);
      card.hidden=!match;
      if(match) visible++;
    });
    updateStatus(visible,value);
  });
}
document.addEventListener("keydown",event=>{
  if(event.key==="/"&&document.activeElement!==q&&q){event.preventDefault();q.focus();}
});
document.querySelectorAll("[data-filter]").forEach(link=>{
  link.addEventListener("click",()=>applyFilter(link.dataset.filter));
});
applyFilter("all");
