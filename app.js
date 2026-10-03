"use strict";

const search=document.getElementById("search");
const finderForm=document.getElementById("utilityFinderForm");
const cards=[...document.querySelectorAll("#grid .tool-card[data-search]")];
const status=document.querySelector(".search-status");
const searchEngine=window.UtilityHubSearch;

function cardContent(card){
  return [
    card.dataset.search || "",
    card.textContent || "",
    card.querySelector("a")?.getAttribute("href") || ""
  ].join(" ");
}

function updateSearch(){
  if(!search || !searchEngine) return;
  const query=search.value.trim();
  const matches=searchEngine.search(cards,query,cardContent);
  const matched=new Set(matches.map(item=>item.element));

  cards.forEach(card=>{
    card.hidden=!matched.has(card);
  });

  if(status){
    if(!query) status.textContent="Showing "+cards.length+" popular tools";
    else if(matches.length) status.textContent=matches.length+" featured tool"+(matches.length===1?"":"s")+" found";
    else status.textContent="No featured tools found - press Enter to search all 28 tools";
  }
}

if(search){
  search.addEventListener("input",updateSearch);
  document.addEventListener("keydown",event=>{
    if(event.key==="/" && document.activeElement!==search){
      event.preventDefault();
      search.focus();
    }
  });
  updateSearch();
}

if(finderForm){
  finderForm.addEventListener("submit",event=>{
    event.preventDefault();
    const query=search ? search.value.trim() : "";
    const target="tools.html"+(query ? "?q="+encodeURIComponent(query) : "");
    window.location.assign(target);
  });
}
