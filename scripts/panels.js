// there is defo better way to do this but i couldn't find a tutorial so heres some bad code

const dragOverThreshold = 100;
const smoothness = .2;
const targetFrameRate = 60;

var dragging = false;

var curX = 0;
var curY = 0;

var dragStartX = 0;
var dragStartY = 0;

var panels;
var navIcons;

var dragStartTargetX = 0;
var targetX = 0;
var realX = 0;

var width = 0;
var midpoint = 0;

var curSlide = 0;

window.addEventListener("load", () => {
    requestAnimationFrame(recalculatePositions);

    panels = document.getElementsByClassName("eventitem");
    navIcons = document.getElementsByClassName("eventnavitem");
    updatesizes();

    const events = document.getElementsByClassName("eventscontent")[0];
    events.addEventListener("mousedown", function() {
        dragging = true;

        dragStartX = curX;
        dragStartY = curY;
        dragStartTargetX = targetX;
    });


    for (let i = 0; i < navIcons.length; i++) {
        navIcons[i].addEventListener("click", ()=>{
            var before = curSlide;
            curSlide = i;
            updateNavIcons();

            if (curSlide > before) targetX += width * (curSlide - before);
            else if (curSlide < before) targetX -= width * (before - curSlide);
        });
    }

    document.getElementById("eventnavarrowleft").addEventListener("click", ()=>{
        curSlide = mod((curSlide - 1), panels.length);
        updateNavIcons();
        
        targetX -= width;
    });

    document.getElementById("eventnavarrowright").addEventListener("click", ()=>{
        curSlide = mod((curSlide + 1), panels.length);
        updateNavIcons();
        
        targetX += width;
    });
});
window.addEventListener("resize", ()=>{
    updatesizes();
});

function updatesizes() {
    if (!panels) return;

    panels[0].style.width = "100%";
    width = panels[0].getBoundingClientRect().width;
    midpoint = document.body.clientWidth / 2;
}

window.addEventListener("mouseup", function() {
    if (targetX - dragStartTargetX > dragOverThreshold) targetX = Math.ceil(targetX / width) * width;
    else if (targetX - dragStartTargetX < -dragOverThreshold) targetX = Math.floor(targetX / width) * width;
    else targetX = dragStartTargetX;

    if (Math.abs(targetX - dragStartTargetX) > 10) curSlide = mod(Math.round(targetX / width), panels.length);
    updateNavIcons();
    
    dragging = false;
});

function updateNavIcons() {
    for (let icon of navIcons) {
        icon.classList.remove("eventnavitemselected");
    }
    navIcons[curSlide].classList.add("eventnavitemselected");
}


document.addEventListener('mousemove', function(event) {
    curX = event.clientX;
    curY = event.clientY;

    if (dragging) {
        targetX = dragStartTargetX + dragStartX - curX;    
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
  

// dt so animations play nice across fps
var dt = 0;
var lastUpdate = Date.now();

function recalculatePositions() {
    if (!panels) return;

    let now = Date.now();
    dt = (now - lastUpdate) / (1000 / targetFrameRate);
    lastUpdate = now;

    console.log(dt);

    realX = lerp(realX, -targetX, smoothness * dt);
    
    // https://www.desmos.com/calculator/qcjjhio8jw
    for (let i = 1; i < panels.length + 1; i++) {
        let xPos = mod((realX + width * i), (panels.length * width)) - width;
        panels[i - 1].style.left = xPos+"px";
        panels[i - 1].style.width = width+"px";
        
        let opacity = 0;
        let offX = xPos - midpoint + width / 2; 
        if (offX < -width) { opacity = 0; }
        else if (offX > width) { opacity = 0; }
        else {
            opacity = .5 * Math.cos((Math.PI * offX) / width) + .5;
        }  
        panels[i - 1].style.opacity = opacity;
    }

    requestAnimationFrame(recalculatePositions);
}

