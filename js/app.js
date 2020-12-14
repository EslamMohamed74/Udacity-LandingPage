const navBarElement = document.querySelector('#navbar__list');
const sectionsList = document.querySelectorAll('section');

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

const handleNavBarActiveState = (hrefAttr) => {
    const navBarListItemsAnchors = document.querySelectorAll('#navbar__list .navbar__item .menu__link');

    navBarListItemsAnchors.forEach(anchor => {
        anchor.classList.remove('navbar__active');

        if ('#' + hrefAttr === anchor.getAttribute('href') || hrefAttr === anchor.getAttribute('href')) {
            anchor.classList.add('navbar__active');
        }
    });
}

const addHomeItem = () => {
    const homeItem = document.createElement('li');
    homeItem.className = 'navbar__item';

    const homeAnchorElement = document.createElement('a');
    homeAnchorElement.className = 'menu__link navbar__active';
    homeAnchorElement.textContent = 'Home';
    homeAnchorElement.setAttribute('href', '#navbar__list');
    homeAnchorElement.onclick = () => backToTop();

    homeItem.appendChild(homeAnchorElement);
    navBarElement.appendChild(homeItem);
}

addHomeItem();

const navBarItemsBuilder = () => {
    const tempDoc = document.createDocumentFragment();
    let sectionID;
    let sectionDataNav;
    let navBarItem;

    let itemAnchorElement;

    sectionsList.forEach(section => {
        sectionID = section.id;
        sectionDataNav = section.getAttribute('data-nav');

        navBarItem = document.createElement('li');
        navBarItem.className = 'navbar__item';

        itemAnchorElement = document.createElement('a');
        itemAnchorElement.className = 'menu__link';
        itemAnchorElement.setAttribute('href', `#${sectionID}`);
        itemAnchorElement.textContent = sectionDataNav;

        navBarItem.appendChild(itemAnchorElement);
        tempDoc.appendChild(navBarItem);
    });

    navBarElement.appendChild(tempDoc);
}

navBarItemsBuilder();

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

scrollToSection();
