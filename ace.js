function togglePage(){
    $('a').each(function(idx, val){
        $(this).toggleClass('pulse');
    });
}

// function showButtons(){
// }

// function hideButtons(){
// }

links = [];
$('a').each(function(idx, val){
    links.push({
        "index": idx,
        "target": val,
        "title": $(this).html()
    });
});

for(var i=0, len=links.length; i < len; i++){
    console.log("index: ", links[i].index);
    console.log("target: ", links[i].target);
    console.log("title: ", links[i].title);
}

togglePage();
alert('a');
togglePage();

