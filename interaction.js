var logo = null;
window.onload = function(){
    logo = document.getElementById("logo");
    scrolled();
    window.addEventListener("scroll", scrolled);
}
function scrolled() {
    const currentScroll = window.scrollY;
  
    if (currentScroll >= 800){
        logo.style.setProperty("--logo-size", "58px");
        logo.style.setProperty("--logo-hover-size", "63px");
    }
    else{
        logo.style.setProperty("--logo-size", "80px");
        logo.style.setProperty("--logo-hover-size", "83px");
    }
}

var folder = ".resources/";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $("body").append( "<img src='"+ folder + val +"'>" );
            } 
        });
    }
});
