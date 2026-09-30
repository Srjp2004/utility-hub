const search=document.getElementById("search");
if(search){
  const cards=[...document.querySelectorAll("#grid .card[data-search]")];
  const status=document.createElement("p");
  status.className="search-status";
  status.setAttribute("role","status");
  status.setAttribute("aria-live","polite");
  search.insertAdjacentElement("afterend",status);
  const updateSearch=()=>{
    const query=search.value.trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const match=!query||card.dataset.search.toLowerCase().includes(query);
      card.hidden=!match;
      if(match)visible++;
    });
    status.textContent=query?(visible+" tool"+(visible===1?"":"s")+" found"):"Showing "+visible+" featured tools";
  };
  search.addEventListener("input",updateSearch);
  updateSearch();
}
