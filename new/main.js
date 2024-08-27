// TODO: turn this into a json thing and maybe even actually 
// fetch from external server hosting data so entire website doesn't need to be recomped every time

const goal = 10000;
const progress = 5000;

window.addEventListener("load", ()=> {
    document.body.style.setProperty("--progressbarprogress", `${progress / goal * 100}%`);
    document.getElementsByClassName("progressbartext")[0].textContent = `$${progress} raised / $${goal}`;
});