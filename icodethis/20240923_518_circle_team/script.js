const selectedpic = document.getElementById("center-circle");
const userpics = document.querySelectorAll(".user-pic");

console.log(userpics);
console.log(userpics.length);

for (var i = 0; i < userpics.length; i++) {
    userpics[i].addEventListener("click", () => {
        console.log(target);
        console.log(target.style.backgroundColor);
    })
}