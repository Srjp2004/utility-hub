const search=document.getElementById("search");
const finderForm=document.getElementById("utilityFinderForm");
const cards=[...document.querySelectorAll("#grid .tool-card[data-search]")];
const status=document.querySelector(".search-status");

function updateSearch(){
  if(!search) return;
  const query=search.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const match=!query||(card.dataset.search||"").toLowerCase().includes(query);
    card.hidden=!match;
    if(match) visible++;
  });
  if(status) status.textContent=query
    ? visible+" featured tool"+(visible===1?"":"s")+" found"
    : "Showing "+visible+" popular tools";
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
