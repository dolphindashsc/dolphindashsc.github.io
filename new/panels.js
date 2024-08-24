const dragOverThreshold = 100;
const smoothness = .2;

var dragging = false;

var curX = 0;
var curY = 0;

var dragStartX = 0;
var dragStartY = 0;

var panels;

var dragStartTargetX = 0;
var targetX = 0;
var realX = 0;

var width = 0;
var midpoint = 0;

window.addEventListener("load", () => {
    panels = document.getElementsByClassName("eventitem");
    updatesizes();

    const events = document.getElementsByClassName("eventscontent")[0];
    events.addEventListener("mousedown", function() {
        dragging = true;

        dragStartX = curX;
        dragStartY = curY;
        dragStartTargetX = targetX;
    });
});
window.addEventListener("resize", updatesizes());

function updatesizes() {
    if (!panels) return;

    width = panels[0].getBoundingClientRect().width;
    midpoint = document.body.clientWidth / 2;
}

window.addEventListener("mouseup", function() {
    if (targetX - dragStartTargetX > dragOverThreshold) targetX = Math.ceil(targetX / width) * width;
    else if (targetX - dragStartTargetX < -dragOverThreshold) targetX = Math.floor(targetX / width) * width;
    else targetX = dragStartTargetX;
    console.log(`enddrag ${targetX} width ${width}`);
    
    dragging = false;
});


document.addEventListener('mousemove', function(event) {
    curX = event.clientX;
    curY = event.clientY;

    if (dragging) {

        targetX = dragStartTargetX + dragStartX - curX;    

        console.log(targetX);
    }
});
  

function smoothstep (x) {
    return 3 * (x ** 2) - 2 * (x ** 3);
}

function lerp(a, b, t) {
    return t * (b - a) + a;
}

function mod(n, m) {
    return ((n % m) + m) % m;
  }
  

function recalculatePositions() {
    if (!panels) return;

    realX = lerp(realX, -targetX, smoothness);
    console.log(realX);

    
    // https://www.desmos.com/calculator/qcjjhio8jw
    for (let i = 0; i < panels.length; i++) {
        let xPos = mod((realX + width * i), (panels.length * width)) - width;
        panels[i].style.left = xPos+"px";
        panels[i].style.width = width+"px";
        
        let opacity = 0;
        let offX = xPos - midpoint + width / 2; 
        if (offX < -width) { opacity = 0; }
        else if (offX > width) { opacity = 0; }
        else {
            opacity = .5 * Math.cos((Math.PI * offX) / width) + .5;
        }  
        panels[i].style.opacity = opacity;
    }
}

setInterval(() => {
    recalculatePositions();
}, 15); // roughly 60+ fps