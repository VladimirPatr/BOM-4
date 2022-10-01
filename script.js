// import'./modules/acc.js'


const btnAdd = document.querySelectorAll('.header__btn');
const overlayModal= document.querySelectorAll('.overlay');
const btnClose = document.querySelectorAll('.close-modal');
const modalForm = document.querySelector('.wrapper-add');
const overlayForm = document.querySelector('.overlay-form')

const items = document.querySelectorAll('.questions__item');
const btns = document.querySelectorAll('.questions__item');
const textWrapper = document.querySelectorAll('.questions__text-wrapper');
let heightWrapper = 0;

const overlayMenu = document.querySelector('.overlay-menu');
const btnBurger = document.querySelector('.menu-burger');
const docEl = document.documentElement;
const pageWidth = document.documentElement.scrollWidth;
let left = - pageWidth;
let startTime = NaN;
const durationLeft = 500;

// модальное окно
btnAdd.forEach(item => {
    item.addEventListener('click', () => {
        overlayForm.classList.remove('unvisible');
        overlayForm.classList.add('visible');
        
    })      
});

overlayModal.forEach(item => {
    item.addEventListener('click', e => {
        const target = e.target;
        if (target === item || target.closest('.close')) {
            item.classList.remove('visible');
            item.classList.add('unvisible');
            overlayMenu.classList.remove('unvisible');
            overlayMenu.classList.toggle('active');
            overlayMenu.style.transform = "translateX(-100%)";
        }
    });
}) 


// Аккардеон
textWrapper.forEach(elem => {
    if (heightWrapper < elem.scrollHeight) {
        heightWrapper = elem.scrollHeight
    }
})


btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        for (let i = 0; i < items.length; i += 1 ) {  
            if (index === i) {
                textWrapper[i].style.height = items[i].classList.contains('questions__item-activ') ? '' : `${heightWrapper}px`;
                items[i].classList.toggle('questions__item-activ');
            } else {
                items[i].classList.remove('questions__item-activ');
                textWrapper[i].style.height = '';
            }
        };   
    });
});

// Бургер
const translateLeft = (timestamp) => {

    if (!startTime) {
        startTime = timestamp;
    }
    const progress = (timestamp - startTime)/durationLeft;
    left = (pageWidth * progress) -pageWidth;
    overlayMenu.style.transform = `translateX(${left}px)`;
    if (progress < 1 && left < -15) {
        requestAnimationFrame(translateLeft)
    }
    else {
        cancelAnimationFrame(translateLeft);
        startTime = NaN;
        left = - pageWidth;
    }
}

btnBurger.addEventListener('click', () => {
    requestAnimationFrame(translateLeft);
    
});

// let count = 0;

// const debounce = (fn) => {
//     let raf = NaN;
   
//     return (...args) => {
//         if (raf) return;

//         raf = requestAnimationFrame(() => {
//             fn(...args);
//             raf = NaN;
//         });
//     };
// };

// const translateLeft = (timestamp) => {
//         if (!startTime) {
//             startTime = timestamp;
//         }
//         const progress = (timestamp - startTime)/durationLeft;
//         left = (pageWidth * progress) -pageWidth;
//         overlayMenu.style.transform = `translateX(${left}px)`;
//         if (progress < 1 && left < -15) {
//             requestAnimationFrame(translateLeft)
//         }
//         else {
//             cancelAnimationFrame(translateLeft);
//             startTime = NaN;
//             left = - pageWidth;
//         };
//     };

// const debounceHandle = debounce(translateLeft);

// btnBurger.addEventListener('click', debounceHandle);