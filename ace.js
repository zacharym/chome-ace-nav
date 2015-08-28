function keysToString(keys){
    var chars = keys.map(function(code){
        return String.fromCharCode(code);
    });
    chars = chars.join('');
    chars = chars.toLowerCase();
    return chars;
}

function addPage(){
    $('a').each(function(idx, val){
        $(this).removeClass('pulse').addClass('pulse');
    });
}

function isMatch(str, pattern){
    if(str.indexOf(pattern) > -1){
        return true;
    } else {
        return false;
    }
}

function filterPage(keys){
    var chars = keysToString(keys);
    var valids = [];
    $('a').each(function(idx, val){
        var title = $(this).html().toLowerCase();
        if ( !isMatch(title, chars) ){
            $(this).removeClass('pulse');
        } else {
            $(this).addClass('pulse');
            valids.push(val);
        }
    });
    return valids;
}

function followLink(valids){
    console.log("about to follow link");
    console.log("valids: ", valids);
    if(valids.length > 0){
        window.location.replace(valids[0]);
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
    addPage();
    var keys = [];
    var valids = [];
    $(document).keydown(function(e) {
        if (e.keyCode == 32) {
            e.preventDefault();
            keys.push(32);
        }
        else if (e.keyCode == 13) {
            console.log('got an enter key');
            console.log('current valids: ');
            alert('valids[0]: ', valids[0]);
            followLink(valids);
        } else if (e.keyCode == 46 || e.keyCode == 8) {
            e.preventDefault();
            keys.pop();
            valids = filterPage(keys);
            console.log("keys: ", keys);
        } else {
            keys.push(e.keyCode);
            valids = filterPage(keys);
            console.log("keys: ", keys);
        }
    });
});

