var logo = null;
window.onload = function(){
    logo = document.getElementById("logo");
    scrolled();
    window.addEventListener("scroll", scrolled);

    document.getElementById("downarrow").addEventListener("click", previewScroll);
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

    if (currentScroll >= 150) {
        document.getElementById("downarrow").style.display = "none";
    }
}
function previewScroll(){
    window.scrollTo(0, 150)
}