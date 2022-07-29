import {
    globalConfigure,
    root,
    menu
} from './global.js';

const header = document.querySelector('header');
const logo = document.querySelector('.logo');
const miniLogo = document.querySelector('.mini-logo');
const slogan = document.querySelector('.slogan');
const banner = document.querySelector('.banner');
const menuLogo = document.querySelector('.menu-logo');
const menuButton = document.querySelector('.menu-button');
const menuContainer = document.querySelector('.menu-container');
const nav = document.querySelector('nav');
const items = document.querySelectorAll('nav ul a');

let configurations;

let miniLogoRect, logoRect, sloganRect, bannerContainerRect;

const bannerImage = new Image();
bannerImage.src = './assets/img/banner.jpg';

const logoImage = new Image();
logoImage.src = './assets/img/logo-stroked.svg';

const RADIAN = Math.PI / 180;

let angle = 0;
let positions = {
    x: 0,
    y: 0
};

let last = 0, delta = 0, isOpen = false;

const handleMenu = () => {
    if(window.innerWidth < 1200) {
        isOpen = !isOpen;

        if(isOpen) {
            root.style.setProperty('--header-blend-mode', 'normal');
            root.style.overflow = 'hidden';
            banner.style.display = 'none';
            menu.style.height = '100vh';
            header.style.minHeight = '100vh';
        } else {
            if (window.scrollY >= window.innerHeight) {
                root.style.setProperty('--header-blend-mode', 'normal');
            } else {
                root.style.setProperty('--header-blend-mode', 'hard-light');
            }
            root.style.overflow = 'scroll';
            banner.style.display = 'block';
            header.style.minHeight = 'min-content';
            menu.style.height = '8vh';
        }
        
        nav.classList.toggle('open-menu', isOpen);
        menuLogo.classList.toggle('open-menu', isOpen);
        menuButton.classList.toggle('open-menu', isOpen);
        menuContainer.classList.toggle('open-menu', isOpen);
    }
};

menuButton.addEventListener('click', handleMenu);

items.forEach(item => {
    item.addEventListener('click', handleMenu);
});

const bannerAnimation = (now = 0) => {
    window.requestAnimationFrame(bannerAnimation);
    
    now *= 0.0001;
    delta = now - last;
    last = now;

    angle += 90 * delta;

    positions.x = bannerImage.width/2 + Math.cos(RADIAN * angle) * window.innerWidth/2 - window.innerWidth/2;
    positions.y = bannerImage.height/2 + Math.sin(RADIAN * angle) * window.innerHeight/2 - window.innerHeight/2;

    root.style.setProperty('--background-size', `${bannerImage.width / 16}rem ${bannerImage.height / 16}rem`);
    root.style.setProperty('--background-position', `-${positions.x / 16}rem -${positions.y / 16}rem`);
};

const bannerOpacityConfigure = () => {
    root.style.setProperty('--banner-opacity', `${Math.min(1 - window.scrollY / (window.innerHeight - menu.clientHeight), 1)}`);
};

const pageScrollConfigure = () => {
    root.style.setProperty('--page-scroll', `${window.scrollY / 16}rem`);
    root.style.setProperty('--logo-position', `${(miniLogoRect.x - logoRect.x) / 16}rem`);
    root.style.setProperty('--logo-scale', `${miniLogoRect.width / logoRect.width}`);
    root.style.setProperty('--slogan-position', `${(bannerContainerRect.y - logoRect.y) / 16}rem`);

    if (window.scrollY >= window.innerHeight) {
        root.style.setProperty('--header-blend-mode', 'normal');
        root.style.setProperty('--menu-logo-opacity', `${1}`);
        return;
    }

    root.style.setProperty('--header-blend-mode', 'hard-light');
    root.style.setProperty('--menu-logo-opacity', `${0}`);
};

const CSSVariables = () => {
    const a = window.scrollY;
    window.scrollTo(0, 0);

    logoRect = logo.getBoundingClientRect();
    miniLogoRect = miniLogo.getBoundingClientRect();
    sloganRect = slogan.getBoundingClientRect();
    bannerContainerRect = slogan.getBoundingClientRect();

    const animations = () => {
        bannerAnimation();
    };

    animations();
    //configurations();
    window.scrollTo(0, Math.max(a, 1));
}

configurations = () => {
    if(window.scrollY > window.innerHeight && window.innerWidth <= 1200) logo.style.display = 'none';
    else logo.style.display = 'block';
    miniLogoRect = miniLogo.getBoundingClientRect();
    globalConfigure();
    bannerOpacityConfigure();
    pageScrollConfigure();
};

window.addEventListener('load', CSSVariables);

window.addEventListener('scroll', configurations);
window.addEventListener('resize', CSSVariables);
