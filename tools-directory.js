"use strict";
const q=document.getElementById("toolSearch");
const cards=[...document.querySelectorAll(".link-card")];
const status=document.getElementById("directoryStatus");
const filters=Object.freeze({
  calculator:["calculator","change","interest","margin","roi","break-even","tip","bmi","date","business","loan","compound","discount","percentage","aspect"],
  image:["image"],
  text:["word","json","case","password","random","aspect","timestamp","base64"],
  all:[]
});

function updateStatus(count,query){
  if(status) status.textContent=query
    ? count+" tool"+(count===1?"":"s")+" found"
    : count+" tools in the toolbox";
}

function showMatches(value){
  const query=String(value||"").trim();
  if(q && q.value!==query) q.value=query;
  const normalized=query.toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const search=(card.dataset.search||"").toLowerCase();
    const match=!normalized||search.includes(normalized);
    card.hidden=!match;
    if(match) visible++;
  });
  updateStatus(visible,normalized);
}

function applyFilter(value){
  const filter=String(value||"all").toLowerCase();
  const terms=filters[filter]||[filter];
  if(q) q.value=filter==="all"?"":filter;
  let visible=0;
  cards.forEach(card=>{
    const search=(card.dataset.search||"").toLowerCase();
    const tokens=search.split(/[^a-z0-9-]+/).filter(Boolean);
    const match=filter==="all"||terms.some(term=>tokens.includes(term));
    card.hidden=!match;
    if(match) visible++;
  });
  updateStatus(visible,filter==="all"?"":filter);
}

if(q){
  q.addEventListener("input",()=>showMatches(q.value));
  document.addEventListener("keydown",event=>{
    if(event.key==="/"&&document.activeElement!==q){
      event.preventDefault();
      q.focus();
    }
  });
  const params=new URLSearchParams(window.location.search);
  showMatches(params.get("q")||"");
}else{
  applyFilter("all");
}

document.querySelectorAll("[data-filter]").forEach(link=>{
  link.addEventListener("click",()=>applyFilter(link.dataset.filter));
});
