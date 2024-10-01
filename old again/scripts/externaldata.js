const datapath = "./data.json";
var data;
var windowloaded = false;

async function update() {
    data = await fetch(datapath);
    data = await data.text();
    
    data = JSON.parse(data);

    console.log(data);
    
    if (!windowloaded)
        window.addEventListener("load", () => { updateContent(); });
    else
        updateContent();
}

window.addEventListener("load", () => { windowloaded = true; });

update();

function updateContent() {
    document.getElementsByClassName("progressbartext")[0].textContent = "$"+data['raised']+" raised / $"+data['goal'];
    document.body.style.setProperty("--progressbarprogress", ((data['raised']/data['goal'])*100)+"%")
    const pbarfill = document.getElementsByClassName("progressbarfill")[0];
    pbarfill.style.width = getComputedStyle(document.body).getPropertyValue("--progressbarprogress");
}