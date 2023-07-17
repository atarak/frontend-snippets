// Add JavaScript code here

const mediaResources = document.getElementsByClassName("media-resource");
const downloadBtns = document.getElementsByClassName("download-img");

console.log("reset!");

for (var i = 0; i < mediaResources.length; i++) {
    mediaResources[i].addEventListener("click", (event) => {
        hoverMedia(event);
    });
}

for (var i = 0; i < downloadBtns.length; i++) {
    downloadBtns[i].addEventListener("click", (event) => {
        downloadImage(event.target);
    });
}


function hoverMedia(event) {
    var mediaBtn = event.target.parentNode;
    var downloadSpan = mediaBtn.querySelector(".download-img");
    downloadSpan.classList.toggle("hide");
    mediaBtn.classList.toggle("active");
}

//https://dev.to/sbodi10/download-images-using-javascript-51a9
// Using fetch
async function downloadImage(downloadBtn) {
    var imageSrc = downloadBtn.parentNode.querySelector("img").src;
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL;
    link.download = 'iCodeThisImg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}