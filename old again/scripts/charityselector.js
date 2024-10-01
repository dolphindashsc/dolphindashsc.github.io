let selected = 0;
let selectedElement;

const optionIndices = {
    "charitygoal" : 0,
    "whychose" : 1,
    "pastcharities" : 2
}

window.addEventListener("load", ()=> {
    const charityoptions = document.getElementsByClassName("charityoption");

    for (let option of charityoptions) {
        option.addEventListener("click", ()=>{
            selectedElement = option;
            selected = optionIndices[option.id];
            updateBar();        
        });
    }
});

function updateBar() {
    const bar = document.getElementById("charityselectedbarinner");

    var rect = selectedElement.getBoundingClientRect();
    var parentTop = document.getElementsByClassName("charitycontentmenu")[0].getBoundingClientRect().top;
    
    bar.style.top = (rect.top - parentTop) + "px";
    bar.style.height = rect.height + "px";
}