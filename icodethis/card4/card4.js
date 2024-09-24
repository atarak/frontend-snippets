
const readmoreBtns = document.getElementsByClassName("read-more-hero-text");

for (var i = 0; i < readmoreBtns.length; i++) {
    readmoreBtns[i].addEventListener("click", (event) => {
        var readmoreBtn = event.target;
        console.log(readmoreBtn);
        console.log(readmoreBtn.parentNode.innerHTML);
        var blogText = readmoreBtn.parentNode.querySelector(".blog-text");
        blogText.classList.toggle("height50");
        if (readmoreBtn.textContent == "... Read More") {
            readmoreBtn.textContent = "Read Less";
        } else {
            readmoreBtn.textContent = "... Read More";
        }
    })
}