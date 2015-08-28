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
    listener.simple_combo("control f", function(){
        hidePrompt();
        removePage();
        $(document).unbind("keydown");
    });
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
        } else {
            keys.push(e.keyCode);
        }
        valids = filterPage(keys);
        var currentChars = keysToString(keys);
        console.log(currentChars);
        $('#user-prompt').html(currentChars);
        console.log("currentChars: ", currentChars);
    });
});

