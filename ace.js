function togglePage(){
    $('a').each(function(idx, val){
        $(this).toggleClass('pulse');
    });
}

function followLink(links, keys){
    console.log("about to follow link");
    console.log("keys: ", keys);
    var chars = keys.map(function(code){
        return String.fromCharCode(code);
    });
    chars = chars.join('');
    chars = chars.toLowerCase();
    console.log("chars: ", chars);
    for(var i=0, len=links.length; i<len; i++){
        console.log("link title: ", links[i].title);
        if(links[i].title.indexOf(chars) > -1){
            window.location.replace(links[i].target);
        }
    }
}

var listener = new window.keypress.Listener();

listener.simple_combo("control j", function(){
    links = [];
    $('a').each(function(idx, val){
        links.push({
            "index": idx,
            "target": val,
            "title": $(this).html()
        });
    });
    togglePage();
    var keys = [];
    $(document).keydown(function(e) {
        if (e.keyCode == 13) {
            followLink(links, keys);
        } else {
            keys.push(e.keyCode);
            console.log("keys: ", keys);
        }
    });
});

