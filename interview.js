// JavaScript section
const menu = document.querySelector('#mobile_menu');
const menuLinks = document.querySelector('.navbar_menu');
const navLogo = document.querySelector('#navbar_logo');

// Display mobile menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const homeMenu = document.querySelector('#home_page');
    const aboutMenu = document.querySelector('#about_page');
    const servicesMenu = document.querySelector('#services_page');
    let scrollPos = window.scrollY;

    // Add 'highlight' class to menu items based on scroll position
    if (window.innerWidth > 800 && scrollPos < 400) {
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
    } else if (window.innerWidth > 960 && scrollPos < 1275) {
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
        servicesMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
    }

    // Remove highlight class on smaller screens or if no match
    if (window.innerWidth < 960 && scrollPos < 0) {
        const elem = document.querySelector('.highlight');
        if (elem) elem.classList.remove('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// Close mobile menu on menu item click
const hideMobileMenu = () => {
    if (window.innerWidth <= 768 && menu.classList.contains('is-active')) {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);
