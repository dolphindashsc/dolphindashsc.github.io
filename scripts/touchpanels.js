// Constants
const dragOverThreshold = 100;
const smoothness = 0.2;
const targetFrameRate = 60;

// Variables
let dragging = false;
let curX = 0;
let curY = 0;
let dragStartX = 0;
let dragStartY = 0;
let panels;
let navIcons;
let dragStartTargetX = 0;
let targetX = 0;
let realX = 0;
let width = 0;
let midpoint = 0;
let curSlide = 0;

window.addEventListener("load", () => {
    requestAnimationFrame(recalculatePositions);

    panels = document.getElementsByClassName("eventitem");
    navIcons = document.getElementsByClassName("eventnavitem");
    updatesizes();

    const events = document.getElementsByClassName("eventscontent")[0];
    
    // Mouse events
    events.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", endDrag);
    
    // Touch events
    events.addEventListener("touchstart", startDrag);
    window.addEventListener("touchmove", drag);
    window.addEventListener("touchend", endDrag);

    for (let i = 0; i < navIcons.length; i++) {
        navIcons[i].addEventListener("click", () => {
            var before = curSlide;
            curSlide = i;
            updateNavIcons();

            if (curSlide > before) targetX += width * (curSlide - before);
            else if (curSlide < before) targetX -= width * (before - curSlide);
        });
    }

    document.getElementById("eventnavarrowleft").addEventListener("click", () => {
        curSlide = mod((curSlide - 1), panels.length);
        updateNavIcons();
        targetX -= width;
    });

    document.getElementById("eventnavarrowright").addEventListener("click", () => {
        curSlide = mod((curSlide + 1), panels.length);
        updateNavIcons();
        targetX += width;
    });
});

window.addEventListener("resize", updatesizes);

function updatesizes() {
    if (!panels) return;
    panels[0].style.width = "100%";
    width = panels[0].getBoundingClientRect().width;
    midpoint = document.body.clientWidth / 2;
}

function startDrag(e) {
    dragging = true;
    dragStartX = getEventX(e);
    dragStartY = getEventY(e);
    dragStartTargetX = targetX;
    e.preventDefault();
}

function drag(e) {
    curX = getEventX(e);
    curY = getEventY(e);

    if (dragging) {
        targetX = dragStartTargetX + dragStartX - curX;
        e.preventDefault();
    }
}

function endDrag() {
    if (targetX - dragStartTargetX > dragOverThreshold) targetX = Math.ceil(targetX / width) * width;
    else if (targetX - dragStartTargetX < -dragOverThreshold) targetX = Math.floor(targetX / width) * width;
    else targetX = dragStartTargetX;

    if (Math.abs(targetX - dragStartTargetX) > 10) curSlide = mod(Math.round(targetX / width), panels.length);
    updateNavIcons();
    
    dragging = false;
}

function updateNavIcons() {
    for (let icon of navIcons) {
        icon.classList.remove("eventnavitemselected");
    }
    navIcons[curSlide].classList.add("eventnavitemselected");
}

function getEventX(e) {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
}

function getEventY(e) {
    return e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
}

function smoothstep(x) {
    return 3 * (x ** 2) - 2 * (x ** 3);
}

function lerp(a, b, t) {
    return t * (b - a) + a;
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

// dt so animations play nice across fps
let dt = 0;
let lastUpdate = Date.now();

function recalculatePositions() {
    if (!panels) return;

    let now = Date.now();
    dt = (now - lastUpdate) / (1000 / targetFrameRate);
    lastUpdate = now;

    realX = lerp(realX, -targetX, smoothness * dt);
    
    // https://www.desmos.com/calculator/qcjjhio8jw
    for (let i = 1; i < panels.length + 1; i++) {
        let xPos = mod((realX + width * i), (panels.length * width)) - width;
        panels[i - 1].style.left = xPos + "px";
        panels[i - 1].style.width = width + "px";
        
        let opacity = 0;
        let offX = xPos - midpoint + width / 2; 
        if (offX < -width || offX > width) {
            opacity = 0;
        } else {
            opacity = 0.5 * Math.cos((Math.PI * offX) / width) + 0.5;
        }  
        panels[i - 1].style.opacity = opacity;
    }

    requestAnimationFrame(recalculatePositions);
}
