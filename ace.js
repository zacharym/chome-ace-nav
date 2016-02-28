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

function removePage(){
    $('a').each(function(idx, val){
        $(this).removeClass('pulse');
    });
}

function filterLinkSet(linkSet, word){
    var valids = [];
    $.each(linkSet, function(idx, val){
        var title = $(this).html().toLowerCase();
        if ( !isMatch(title, word) ){
            $(this).removeClass('pulse');
        } else {
            $(this).addClass('pulse');
            valids.push(val);
        }
    });
    return valids;
}

function filterPage(keys){
    var chars = keysToString(keys);
    var words = chars.split(' ');
    var linkSet = $('a');
    $.each(words, function(idx, val){
        linkSet = filterLinkSet(linkSet, val);
    });
    return linkSet;
}

function isMatch(str, pattern){
    if(str.indexOf(pattern) > -1){
        return true;
    } else {
        return false;
    }
}

function followLink(valids){
    console.log("about to follow link");
    console.log("valids: ", valids);
    if(valids.length > 0){
        window.location.replace(valids[0]);
    }
}

function addPrompt(){
    var promptDiv = document.createElement("div");
    document.body.insertBefore(promptDiv, document.body.firstChild);
    document.body.firstChild.innerHTML="<div id='user-prompt'></div>";
    $('#user-prompt').addClass('user-prompt');
}

function hidePrompt(){
    $('#user-prompt').html('');
    $('#user-prompt').hide();
}

var listener = new window.keypress.Listener();

listener.simple_combo("control j", function(){
    addPage();
    addPrompt();
    var keys = [];
    var valids = [];
    listener.simple_combo("control k", function(){
        hidePrompt();
        removePage();
        $(document).unbind("keydown");
    });

    var keysToIgnore = new Set([9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 91, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145])
    
    $(document).keydown(function(e) {
        if (e.keyCode == 13) {
            followLink(valids);
            reset();
        } else if (e.keyCode == 32) {
            e.preventDefault();
            keys.push(32);
        } else if (e.keyCode == 46 || e.keyCode == 8) {
            e.preventDefault();
            keys.pop();
        } else if (keysToIgnore.has(e.keyCode)) {
            // do nothing for special keys 
        } else {
            keys.push(e.keyCode);
        }
        valids = filterPage(keys);
        var currentChars = keysToString(keys);
        $('#user-prompt').html(currentChars);
    });
});

