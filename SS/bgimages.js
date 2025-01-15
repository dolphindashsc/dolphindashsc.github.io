const bgimagedir = "../resources/background images/"
const changeInterval = 5000;
var loadedimages = []

setInterval(() => {
    randomizebg();
}, changeInterval);

function randomizebg() {
    const bg = document.getElementsByClassName("titlecontainer")[0];
    var src = loadedimages[Math.floor(Math.random() * loadedimages.length)];
    bg.style.backgroundImage = `url("${src}")`;
}


const loadBackgroundImages = async () => {
    try {
        const response = await fetch(bgimagedir+"allfiles.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const backgroundImages = await response.json();

        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                img.src = src;
                loadedimages.push(src)
            });
        };

        const imagePromises = Object.entries(backgroundImages).map(([key, value]) => {
            console.log(`Loading ${value}`);
            return loadImage(bgimagedir + value);
        });

        await Promise.all(imagePromises);
        console.log("Finished loading all images");
    } catch (error) {
        console.error('Error in loadBackgroundImages:', error);
    }
};

// Call the function
loadBackgroundImages();