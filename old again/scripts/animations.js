const tiltCoef = 1;
const tiltShadowOffset = 3;

var darkmode = false;

window.addEventListener("load", ()=> {
    updateDarkmodeProperties();

    const pbarmain = document.getElementsByClassName("progressbarmain")[0];
    const pbartext = document.getElementsByClassName("progressbartext")[0];

    pbarmain.addEventListener("mouseover", ()=>{
        pbarmain.classList.add("progressbarmainhover");
        pbartext.style.opacity = "1";
    });

    pbarmain.addEventListener("mouseout", ()=>{
        pbarmain.classList.remove("progressbarmainhover");
        pbartext.style.opacity = "0";
    });

    setTimeout(() => {
        pbarmain.classList.add("progressbarmainhover");
        pbartext.style.opacity = "1";
    
        setTimeout(() => {
            pbarmain.classList.remove("progressbarmainhover");
            pbartext.style.opacity = "0";
        }, 2000);
    }, 1500);

    // night mode
    const themeswitcher = document.getElementById("themeswitcher");
    themeswitcher.addEventListener("mousedown", ()=>{
        darkmode = !darkmode;
        updateDarkmodeProperties();
    });

    // logo
    const logo = document.getElementById("headerlogo");
    const logocontainer = document.getElementById("headerlogocontainer");
    logocontainer.addEventListener("mousemove", (event)=>{
        const rect = logocontainer.getBoundingClientRect();
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        const relativeX = mouseX - centerX;
        const relativeY = mouseY - centerY;
        
        const tiltX = relativeX / tiltCoef;
        const tiltY = relativeY / tiltCoef;
        const totalTilt = (tiltX + tiltY) / 2;
        
        const rotation = rotationToAxisAngle(tiltY, -tiltX);

        logo.style.transform = `rotate3d(${rotation.axis[0]}, ${rotation.axis[1]}, ${rotation.axis[2]}, ${rotation.angle}deg)`;
        logo.style.boxShadow = `${-tiltX / tiltShadowOffset}px ${-tiltY / tiltShadowOffset}px 10px rgba(0,0,0,.3)`;
    });
    logocontainer.addEventListener("mouseout", ()=>{
        logo.style.transform = "";
        logo.style.boxShadow = "";
    });
});

function updateDarkmodeProperties() {
    const computed = getComputedStyle(document.body);
    const icon = document.getElementById("themeswitcher").getElementsByTagName("img")[0];
    if (darkmode) {

        icon.src="../resources/sun.svg";
        document.body.style.setProperty("--primary-color", computed.getPropertyValue("--dark-primary-color"));
        document.body.style.setProperty("--primary-tint", computed.getPropertyValue("--dark-primary-tint"));
        document.body.style.setProperty("--primary-dark", computed.getPropertyValue("--dark-primary-dark"));
    }
    else {
        icon.src="../resources/moon.svg";
        document.body.style.setProperty("--primary-color", computed.getPropertyValue("--light-primary-color"));
        document.body.style.setProperty("--primary-tint", computed.getPropertyValue("--light-primary-tint"));
        document.body.style.setProperty("--primary-dark", computed.getPropertyValue("--light    -primary-dark"));
    }
}

function rotationToAxisAngle(xAngle, yAngle) {
    // Convert angles to radians
    const xRad = xAngle * Math.PI / 180;
    const yRad = yAngle * Math.PI / 180;
  
    // Create rotation matrices for X and Y rotations
    const cosX = Math.cos(xRad);
    const sinX = Math.sin(xRad);
    const cosY = Math.cos(yRad);
    const sinY = Math.sin(yRad);
  
    // Combine rotations (Y * X)
    const m00 = cosY;
    const m01 = 0;
    const m02 = -sinY;
    const m10 = sinY * sinX;
    const m11 = cosX;
    const m12 = cosY * sinX;
    const m20 = sinY * cosX;
    const m21 = -sinX;
    const m22 = cosY * cosX;
  
    // Calculate the angle
    const angle = Math.acos((m00 + m11 + m22 - 1) / 2);
  
    // Calculate the axis
    let x, y, z;
    if (Math.abs(angle) < 1e-8) {
      // For very small angles, return a default axis
      x = 1;
      y = 0;
      z = 0;
    } else {
      x = (m21 - m12) / (2 * Math.sin(angle));
      y = (m02 - m20) / (2 * Math.sin(angle));
      z = (m10 - m01) / (2 * Math.sin(angle));
    }
  
    // Normalize the axis
    const length = Math.sqrt(x*x + y*y + z*z);
    x /= length;
    y /= length;
    z /= length;
  
    // Convert angle back to degrees
    const angleDeg = angle * 180 / Math.PI;
  
    return { axis: [x, y, z], angle: angleDeg };
  }

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
    //console.log(x);
    /*
    const whowearetitle = document.getElementsByClassName("whowearetitle")[0];

    // https://www.desmos.com/calculator/dvbr3h19gq
    const a = 500; 
    const b = 700;
    const l = 200;

    var opacity = 0;
    /*if (x < a - l) { opacity = 0; }
    else if (a - l < x && x < a) {
        const scrollshifted = (x - a + l) / l;
        opacity = 3 * (scrollshifted ** 2) - 2 * (scrollshifted ** 3);
    }*/
    /*
        if (x < a) { opacity = 1; }
    else if (a < x && x < b) { opacity = 1; }
    else if (b < x && x < b + l) {
        const scrollshifted = (-x + b + l) / l;
        opacity = 3 * (scrollshifted ** 2) - 2 * (scrollshifted ** 3);
    }
    else { opacity = 0; }

    whowearetitle.style.opacity = opacity;

    if (x > 1400) {
        document.getElementById("charitytitlename").classList.add("charitytitlenamescrolled");
    }
        */

    /*
    const headerinner = document.getElementsByClassName("headerinner")[0];
    const pbar = document.getElementsByClassName("progressbarcontainer")[0];
    const pbarfill = document.getElementsByClassName("progressbarfill")[0];

    if (x < 20) {
        headerinner.style.background = "transparent";
        pbar.style.borderRadius = "5px";
        pbarfill.style.borderRadius = "5px";
    }
    else {
        headerinner.style.background = "var(--primary-color)";
        pbar.style.borderRadius = "0 0 5px 5px";
        pbarfill.style.borderRadius = "0 0 5px 5px";
    }
        */
});

document.addEventListener('mousemove', (event) => {
    const y = event.clientY;

    if (y < 40) {
        const header = document.getElementsByTagName("header")[0];
        header.classList.remove("headerscrolling");
    }
});