const menBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
const menu = document.querySelector('.menu');

const offset = 50;

menBtn.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
});

window.addEventListener("scroll", () => {
    if (pageYOffset > offset) {
        navbar.classList.add('navbar-active');
    } else {
        navbar.classList.remove('navbar-active');
    }
});

const title = document.querySelector('.title');
const cap = document.querySelectorAll('.captions > div');
const pag = document.querySelectorAll('.pag');
const slideNum = document.querySelector('.slide-count');
const header = document.querySelector('header');

let id = 0;

const images = [
    './',
    './',
    './', 
];

function slider(i) {
    header.style.background = 'url(${images[i]}) no-repeat center';

    for(let i = 0; i < pag.length; i++) {
        pag[i].classList.remove('pag-active');
        cap[i].classList.remove('cap-active');
    };
    pag[i].classList.add('pag-active');
    cap[i].classList.add('cap-active');

    title.innerText = cap[i].lastElementChild.innerText;
    title.classList.add('animate_fadeInUp');
    setTimeout(() => {
        title.classList.remove('animate_fadeInUp');
    }, 300);

    slideNum.innerHTML = '0${i + 1}/<sup>0${pag.length}</sup>';
}

for (let i = 0; i < pag.length; i++) {
    pag[i].addEventListener('click', () => {
        slider(i);

        id = i;

        stopAutoSlide()
    });
}

function nextSlide() {
    id++;

    if(id > pag.length - 1) {
        id = 0;
    }

    slider(id);
} 

let autoSlide = setInterval(nextSlide, 10000);

function stopAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(nextSlide, 10000);
}