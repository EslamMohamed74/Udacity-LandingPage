/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// Getting `Nav Bar List` Element.
const navBarElement = document.querySelector('#navbar__list');
// Gettiing Sections Elements.
const sectionsList = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Get current position of current section
const getSectionPosition = (section) => {
    return section?.getBoundingClientRect();
}

const isSectionInViewPort = (section) => {
    const currentSectionPosition = getSectionPosition(section);
    return currentSectionPosition.top < 50 && currentSectionPosition.bottom > 50; // Near Top
}

const removeActiveClassFromSection = (section) => {
    section.classList.remove('your-active-class')
}

const addActiveClassToSection = (section) => {
    section.classList.add('your-active-class');
}

// Handle Back to top button
const handleBackToTopButton = () => {
    const backToTopBtn = document.querySelector("#backToTop");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Switch Classes for Nav Bar
const handleNavBarActiveState = (hrefAttr) => {
    const navBarListItemsAnchors = document.querySelectorAll('#navbar__list .navbar__item .menu__link');

    navBarListItemsAnchors.forEach(anchor => {
        anchor.classList.remove('navbar__active');

        if ('#' + hrefAttr === anchor.getAttribute('href') || hrefAttr === anchor.getAttribute('href')) {
            anchor.classList.add('navbar__active');
        }
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build menu 
// build the nav
const addHomeItem = () => {
    
    // Create Item Element & add it's attributes
    const homeItem = document.createElement('li');
    homeItem.className = 'navbar__item';

    // Create ItemAnchor Element & add it's attributes
    const homeAnchorElement = document.createElement('a');
    homeAnchorElement.className = 'menu__link navbar__active';
    homeAnchorElement.textContent = 'Home';
    homeAnchorElement.setAttribute('href', '#navbar__list');
    homeAnchorElement.onclick = () => backToTop();

    // Add Anchor Element To List Item Element,
    // then add Home Element to Nav Bar
    homeItem.appendChild(homeAnchorElement);
    navBarElement.appendChild(homeItem);
}

// Call the method to execute
addHomeItem();

const navBarItemsBuilder = () => {
    // Create temp container.
    const tempDoc = document.createDocumentFragment();

    // Initialize some variables
    let sectionID;
    let sectionDataNav;
    let navBarItem;

    let itemAnchorElement;

    // Loop through `sections`
    sectionsList.forEach(section => {
        // get required section's data
        sectionID = section.id;
        sectionDataNav = section.getAttribute('data-nav');

        // Create Item Element & add it's attributes
        navBarItem = document.createElement('li');
        navBarItem.className = 'navbar__item';

        // Create ItemAnchor Element & add it's attributes
        itemAnchorElement = document.createElement('a');
        itemAnchorElement.className = 'menu__link';
        itemAnchorElement.setAttribute('href', `#${sectionID}`);
        itemAnchorElement.textContent = sectionDataNav;

        // Add Anchor Element To List Item Element,
        // then add Item Element to container
        navBarItem.appendChild(itemAnchorElement);
        tempDoc.appendChild(navBarItem);
    });

    // add that container to Nav Bar List
    navBarElement.appendChild(tempDoc);
}

// Call the method to execute
navBarItemsBuilder();

// Add class 'active' to section when near top of viewport
// Set sections as active
const handleSectionsActiveState = () => {
    handleBackToTopButton();

    let activeSectionID = '#navbar__list';

    sectionsList.forEach(section => {

        removeActiveClassFromSection(section);
        
        if (isSectionInViewPort(section)) {

            addActiveClassToSection(section);

            activeSectionID = section.id;
        }
    });

    handleNavBarActiveState(activeSectionID);
}

window.addEventListener('scroll', handleSectionsActiveState);

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
const scrollToSection = () => {
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const hrefAttr = this.getAttribute('href');

            const section = document.querySelector(hrefAttr);
            const topPosition = getSectionPosition(section)?.top + window.pageYOffset

            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });

            handleNavBarActiveState(hrefAttr);
        });
    });
}

// Call the method to execute
scrollToSection();

// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.navbar__menu ul');
const navLinks = document.querySelectorAll('.navbar__menu a');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
    // toggler icon click event
    navToggler.addEventListener('click', togglerClick);
    // nav links click event
    navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
    navToggler.classList.toggle('toggler-open');
    navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
    if (navMenu.classList.contains('open')) {
        navToggler.click();
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/


