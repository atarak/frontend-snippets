var keysToRemove = [];
const letterBtns = document.getElementsByClassName("letter");
const alphanumBtns = document.getElementsByClassName("alphanum");
const spacebar = document.getElementById("spacebar");
const backbtn = document.getElementById("backspace");
const root = document.querySelector(":root");

const displayText = document.getElementById("display-text");

for (var i = 0; i < letterBtns.length; i++) {
    letterBtns[i].addEventListener("click", (event) => {
        var ch = event.target.textContent;
        if (event.target.classList.contains("lowercase")) {
            ch = ch.toLowerCase();
        }
        displayText.value += ch;
    });
}

for (var i = 0; i < alphanumBtns.length; i++) {
    alphanumBtns[i].addEventListener("click", (event) => {
        displayText.value += event.target.textContent;
    });
}

spacebar.addEventListener("click", () => {
    displayText.value += " ";
})

backspace.addEventListener("click", () => {
    displayText.value = String(displayText.value).substring(0, displayText.value.length - 1);
})

addEventListener("keydown", (event) => {
    highlightKey(event.key);
});

setInterval(() => { setRandomFloatingChar() }, 5000);

function setRandomFloatingChar() {
    if (displayText.value.length > 0) {
        var randomCharIdx = displayText.value.length - 1;
        document.getElementById("main").setAttribute("data-after", String(displayText.value).substring(randomCharIdx, randomCharIdx + 1));
        root.style.setProperty("--top-val", getRandomInt(5) + "em");
        root.style.setProperty("--left-val", getRandomInt(20) + "em");
    } else {
        document.getElementById("main").setAttribute("data-after", "");
    }
}

function clickChangeCase() {
    toggleClassList(letterBtns, "lowercase");
}

function clickChangeAlphanum() {
    toggleClassList(letterBtns, "hidden");
    toggleClassList(alphanumBtns, "hidden");
}

function toggleClassList(list, className) {
    for (var i = 0; i < list.length; i++) {
        list[i].classList.toggle(className);
    }
}

function highlightKey(ch) {
    var letterKeys = document.getElementsByClassName("letter");
    findPressedKey(letterKeys, ch);

    letterKeys = document.getElementsByClassName("alphanum");
    findPressedKey(letterKeys, ch);
}

function findPressedKey(letterKeys, ch) {
    for (var i = 0; i < letterKeys.length; i++) {
        var letterKey = letterKeys[i];
        if (letterKey.textContent === ch.toUpperCase()) {
            letterKey.classList.toggle("highlight");
            keysToRemove = keysToRemove.concat(letterKey);
            setTimeout(function () { addHighlight(letterKey); }, 500);
        }
    }
}

function addHighlight() {
    for (var i = 0; i < keysToRemove.length; i++) {
        if (keysToRemove[i].classList.contains("highlight")) {
            keysToRemove[i].classList.toggle("highlight");
        }
        keysToRemove.shift();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
