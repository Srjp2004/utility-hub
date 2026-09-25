const search=document.getElementById("search");
if(search){
  search.addEventListener("input",event=>{
    const query=event.target.value.trim().toLowerCase();
    document.querySelectorAll("#grid .card[data-search]").forEach(card=>{
      card.style.display=!query||card.dataset.search.toLowerCase().includes(query)?"flex":"none";
    });
  });
}
