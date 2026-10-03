"use strict";

const q=document.getElementById("toolSearch");
const cards=[...document.querySelectorAll(".link-card")];
const status=document.getElementById("directoryStatus");
const searchEngine=window.UtilityHubSearch;
const originalOrder=new Map(cards.map((card,index)=>[card,index]));
const filters=Object.freeze({
  calculator:["calculator"],
  image:["image"],
  text:["word","json","case","password","random","timestamp","base64"],
  all:[]
});

function cardContent(card){
  return [
    card.dataset.search || "",
    card.textContent || "",
    card.getAttribute("href") || ""
  ].join(" ");
}

function updateStatus(count,query){
  if(!status) return;
  if(query && count===0) {
    status.textContent="No tools found for “"+query+"”. Try a broader task or keyword.";
    return;
  }
  status.textContent=query
    ? count+" tool"+(count===1?"":"s")+" found"
    : count+" tools in the toolbox";
}

function renderMatches(matches,query){
  const matched=new Set(matches.map(item=>item.element));
  matches.forEach(item=>document.getElementById("toolGrid").appendChild(item.element));
  cards.forEach(card=>{card.hidden=!matched.has(card);});
  if(!query) {
    cards.slice().sort((a,b)=>originalOrder.get(a)-originalOrder.get(b)).forEach(card=>{
      document.getElementById("toolGrid").appendChild(card);
    });
  }
  updateStatus(matches.length,query);
}

function showMatches(value){
  const query=String(value||"").trim();
  if(q && q.value!==query) q.value=query;
  const matches=searchEngine
    ? searchEngine.search(cards,query,cardContent)
    : [];
  renderMatches(matches,query);
}

function applyFilter(value){
  const filter=String(value||"all").toLowerCase();
  const terms=filters[filter]||searchEngine.tokens(filter);
  const matches=cards.map((card,index)=>({
    element:card,
    index:originalOrder.get(card),
    score:terms.some(term=>searchEngine.tokens(cardContent(card)).includes(term)) ? 1 : 0
  })).filter(item=>item.score).sort((a,b)=>a.index-b.index);
  if(q) q.value=filter==="all"?"":filter;
  renderMatches(filter==="all"
    ? cards.map((card)=>({element:card,index:originalOrder.get(card),score:0}))
    : matches,
    filter==="all"?"":filter);
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
  link.addEventListener("click",()=>{
    applyFilter(link.dataset.filter);
  });
});
