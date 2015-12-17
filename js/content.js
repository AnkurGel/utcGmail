(function($) {
    var utc = strftime.utc();
    var nodes = [];
    var startedTime = new Date().getTime() + 4000, endedTime = new Date().getTime();
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var config = { attributes: true, subtree: true };
    var observer = new MutationObserver(function(mutations, observer) {
        if((startedTime - endedTime) / 1000 < 3) { 
            startedTime = new Date().getTime();
            return;
        }
        if($("table[role=presentation]:visible").length > 0){
            nodes = [];
            $("span[alt]").map(function(i, x) {
                nodes[nodes.length] = [$(x), new Date(($(x).attr('alt') || "").replace(/ at /, ' '))];
            });
            nodes = nodes.filter(function(x){
                return !isNaN(x[1]) && !$(x[0]).text().match(/UTC/) ;
            });
            nodes.forEach(function(node) {
                var new_title = strftime(" %H:%M IST, ", node[1]) + utc("%H:%M UTC", node[1]);
                node[0][0].setAttribute('title', new_title);
                node[0].text(node[0].text() + new_title);
            });
            endedTime = new Date().getTime();
        }
    });
    observer.observe(document, config);
})(jQuery);

