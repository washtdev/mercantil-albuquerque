export const root = document.querySelector(':root');
export const menu = document.querySelector('.menu');

export const menuHeight = menu.clientHeight;

export const globalConfigure = () => {
    root.style.setProperty('--menu-height', `${menu.clientHeight / 16}rem`);
}
