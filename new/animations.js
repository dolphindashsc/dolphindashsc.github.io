document.addEventListener('wheel', function(event) {
    const delta = event.deltaY;

    // handle header
    const header = document.getElementsByTagName("header")[0];
    if (delta < 0) {
        header.classList.remove("headerscrolling");
    }
    else {
        header.classList.add("headerscrolling");
    }
});


document.addEventListener('scroll', function() {
    const x = window.scrollY;
    console.log(x);

    const whowearetitle = document.getElementsByClassName("whowearetitle")[0];

    // https://www.desmos.com/calculator/dvbr3h19gq
    const a = 500; 
    const b = 700;
    const l = 100;

    var opacity = 0;
    /*if (x < a - l) { opacity = 0; }
    else if (a - l < x && x < a) {
        const scrollshifted = (x - a + l) / l;
        opacity = 3 * (scrollshifted ** 2) - 2 * (scrollshifted ** 3);
    }*/
    if (x < a) { opacity = 1; }
    else if (a < x && x < b) { opacity = 1; }
    else if (b < x && x < b + l) {
        const scrollshifted = (-x + b + l) / l;
        opacity = 3 * (scrollshifted ** 2) - 2 * (scrollshifted ** 3);
    }
    else { opacity = 0; }

    whowearetitle.style.opacity = opacity;
});

document.addEventListener('mousemove', (event) => {
    const y = event.clientY;

    if (y < 40) {
        const header = document.getElementsByTagName("header")[0];
        header.classList.remove("headerscrolling");
    }
});