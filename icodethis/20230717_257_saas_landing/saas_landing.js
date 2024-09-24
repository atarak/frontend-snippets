const navToggle = document.querySelector("button");
const wrapper = document.querySelector("#wrapper");

navToggle.addEventListener('click', () => {
    wrapper.classList.toggle('nav-open');
});