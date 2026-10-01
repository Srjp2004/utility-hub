const search=document.getElementById("search");
if(search){
  const cards=[...document.querySelectorAll("#grid .tool-card[data-search]")];
  const status=document.querySelector(".search-status");
  const updateSearch=()=>{
    const query=search.value.trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const match=!query||(card.dataset.search||"").toLowerCase().includes(query);
      card.hidden=!match;
      if(match)visible++;
    });
    if(status) status.textContent=query?(visible+" tool"+(visible===1?"":"s")+" found"):"Showing "+visible+" popular tools";
  };
  search.addEventListener("input",updateSearch);
  updateSearch();
}