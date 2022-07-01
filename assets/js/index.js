import {
    globalConfigure,
    root,
    menu
} from './global.js';

const logo = document.querySelector('.logo');
const miniLogo = document.querySelector('.mini-logo');
const slogan = document.querySelector('.slogan');
const bannerContainer = document.querySelector('.banner-container');

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

let last = 0, delta = 0;

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
    root.scrollTo(0, 0);

    logoRect = logo.getBoundingClientRect();
    miniLogoRect = miniLogo.getBoundingClientRect();
    sloganRect = slogan.getBoundingClientRect();
    bannerContainerRect = slogan.getBoundingClientRect();

    const animations = () => {
        bannerAnimation();
    };

    configurations = () => {
        miniLogoRect = miniLogo.getBoundingClientRect();
        globalConfigure();
        bannerOpacityConfigure();
        pageScrollConfigure();
    };

    animations();
    configurations();
}

CSSVariables();

window.addEventListener('scroll', configurations);
window.addEventListener('resize', CSSVariables);
