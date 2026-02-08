
const selectPositions = {
    1: { left: "-1.3rem", width: "5rem" },
    2: { left: "3.6rem", width: "7rem" },
    3: { left: "10.5rem", width: "8rem" },
    4: { left: "18rem", width: "7rem" }
};

const selectPositionsResponsive = {
    1: { left: "-1rem", width: "4rem" },
    2: { left: "3rem", width: "6rem" },
    3: { left: "9rem", width: "7rem" },
    4: { left: "16rem", width: "6rem" }
};

const menuToggle = document.getElementById('menuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const body = document.body;

function openMobileMenu() {
    if (menuToggle && mobileMenuOverlay) {
        menuToggle.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    if (menuToggle && mobileMenuOverlay) {
        menuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.style.overflow = 'auto';
    }
}

function toggleMobileMenu() {
    if (mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function nextNav(type) {
    const select = document.querySelector(".select");
    const home = document.querySelector("#home");
    const about = document.querySelector("#about");
    const exp = document.querySelector("#exp");
    const contact = document.querySelector("#contact");

    if (window.innerWidth <= 768) {
        closeMobileMenu();
    }

    let positions;
    if (window.innerWidth < 768) {
        positions = selectPositionsResponsive;
        if (select) {
            select.style.height = "2.5rem";
            select.style.display = "none"; 
        }
    } else {
        positions = selectPositions;
        if (select) {
            select.style.height = "3rem";
            select.style.display = "block";
        }
    }

    home.style.display = "none";
    about.style.display = "none";
    exp.style.display = "none";
    contact.style.display = "none";
    
    home.style.opacity = "0%";
    about.style.opacity = "0%";
    exp.style.opacity = "0%";
    contact.style.opacity = "0%";

    switch (type) {
        case 1:
            if (select && window.innerWidth >= 768) {
                select.style.left = positions[1].left;
                select.style.width = positions[1].width;
            }
            home.style.display = "flex";
            setTimeout(() => { home.style.opacity = "100%"; }, 10);
            break;
        case 2:
            if (select && window.innerWidth >= 768) {
                select.style.left = positions[2].left;
                select.style.width = positions[2].width;
            }
            about.style.display = "flex";
            setTimeout(() => { about.style.opacity = "100%"; }, 10);
            break;
        case 3:
            if (select && window.innerWidth >= 768) {
                select.style.left = positions[3].left;
                select.style.width = positions[3].width;
            }
            exp.style.display = "flex";
            setTimeout(() => { exp.style.opacity = "100%"; }, 10);
            break;
        case 4:
            if (select && window.innerWidth >= 768) {
                select.style.left = positions[4].left;
                select.style.width = positions[4].width;
            }
            contact.style.display = "flex";
            setTimeout(() => { contact.style.opacity = "100%"; }, 10);
            break;
    }
}

const loading = document.getElementById('loading');
const bar = document.querySelector('.loading-progress');
const percent = document.getElementById('loading-percent');

let progress = 0;

const interval = setInterval(() => {
    progress++;
    bar.style.width = progress + '%';
    percent.innerText = progress + '%';

    if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
            loading.style.opacity = '0';
            loading.style.transition = 'opacity 0.4s';

            setTimeout(() => {
                loading.style.display = 'none';
                initMenuListeners();
            }, 400);
        }, 200);
    }
}, 60);

function initMenuListeners() {
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

window.addEventListener('resize', function() {
    const select = document.querySelector(".select");
    const home = document.querySelector("#home");
    const about = document.querySelector("#about");
    const exp = document.querySelector("#exp");
    const contact = document.querySelector("#contact");
    
    let currentType = 1;
    if (about.style.display === "flex") currentType = 2;
    if (exp.style.display === "flex") currentType = 3;
    if (contact.style.display === "flex") currentType = 4;
    
    let positions;
    if (window.innerWidth < 768) {
        positions = selectPositionsResponsive;
        if (select) {
            select.style.height = "2.5rem";
            select.style.display = "none";
        }
        document.querySelector('.header-container').style.padding = "0.8rem 1.5rem 0.8rem 3.5rem";
    } else {
        positions = selectPositions;
        if (select) {
            select.style.height = "3rem";
            select.style.display = "block";
        }
        document.querySelector('.header-container').style.padding = "clamp(1rem, 3vw, 2rem) clamp(1.5rem, 4vw, 4rem)";
    }
    
    if (select && window.innerWidth >= 768) {
        select.style.left = positions[currentType].left;
        select.style.width = positions[currentType].width;
    }
});

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const home = document.querySelector("#home");
    const about = document.querySelector("#about");
    const exp = document.querySelector("#exp");
    const contact = document.querySelector("#contact");
    
    let currentType = 1;
    if (about.style.display === "flex") currentType = 2;
    if (exp.style.display === "flex") currentType = 3;
    if (contact.style.display === "flex") currentType = 4;
    
    if (swipeDistance < -swipeThreshold && currentType < 4) {
        nextNav(currentType + 1);
    }
    else if (swipeDistance > swipeThreshold && currentType > 1) {
        nextNav(currentType - 1);
    }
}

window.addEventListener('load', function() {
    window.dispatchEvent(new Event('resize'));
    initMenuListeners();
});