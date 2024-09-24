

window.onload = function () {
    let number = document.getElementById("number");
    let counter = 0;

    console.log("number is " + number.innerHTML);
    setInterval(() => {
        if (counter == 65) {
            clearInterval;
        } else {
            counter += 1;
            number.innerHTML = `${counter}%`;
        }
    }, 30);
};
