window.addEventListener("load", () => {
    const eventitems = document.getElementsByClassName("eventitem");
    var maxheight = 0;
    for (let i = 0; i < eventitems.length; i++) {
        var item = eventitems.item(i);
        item.style.height = "fit-content";
        var height = item.offsetHeight;
        item.style.height = "100%";
        
        if (height > maxheight) {
            maxheight = height;
        }
    }

    document.body.style.setProperty("--eventsmaxheight", maxheight + "px");
});