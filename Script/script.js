window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress-bar');
    const percentageText = document.querySelector('.loader-percentage');

    if (loader && progressBar && percentageText) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            percentageText.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('loader-hidden');

                    
                    setTimeout(() => {
                        startTypingAnimation();
                    }, 500);

                    loader.addEventListener('transitionend', () => {
                        if (loader.parentNode) {
                            loader.parentNode.removeChild(loader);
                        }
                    });
                }, 200);
            }
        }, 50);
    }
});

function startTypingAnimation() {
    const elementsToType = document.querySelectorAll('.animate-text');

    function processNext(index) {
        if (index >= elementsToType.length) {
            const buttons = document.querySelector('.hero-buttons');
            if (buttons) {
                buttons.style.opacity = '1';
                buttons.style.transform = 'translateY(0)';
            }
            return;
        }

        const element = elementsToType[index];

        typeWriter(element, () => {
            element.classList.remove('typing-cursor');
            processNext(index + 1);
        });
    }

    elementsToType.forEach(el => {
        if (!el.hasAttribute('data-typing-initialized')) {
            el.dataset.originalHtml = el.innerHTML;
            el.innerHTML = '';
            el.setAttribute('data-typing-initialized', 'true');
            el.style.visibility = 'visible'; 
        }
    });


    const buttons = document.querySelector('.hero-buttons');
    if (buttons) {
        buttons.style.opacity = '0';
        buttons.style.transform = 'translateY(20px)';
        buttons.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }

    processNext(0);
}

function typeWriter(element, callback) {
    element.classList.add('typing-cursor');
    const html = element.dataset.originalHtml;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const nodes = Array.from(tempDiv.childNodes);
    let currentNodeIndex = 0;

    function typeNode() {
        if (currentNodeIndex >= nodes.length) {
            if (callback) callback();
            return;
        }

        const node = nodes[currentNodeIndex];

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            let charIndex = 0;

            function typeChar() {
                if (charIndex < text.length) {
                    element.innerHTML += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50); 
                } else {
                    currentNodeIndex++;
                    typeNode();
                }
            }
            typeChar();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
 
            const newElement = document.createElement(node.tagName);

            Array.from(node.attributes).forEach(attr => {
                newElement.setAttribute(attr.name, attr.value);
            });

            element.appendChild(newElement);

        
            const innerText = node.textContent; 
            let charIndex = 0;

            function typeInnerChar() {
                if (charIndex < innerText.length) {
                    newElement.textContent += innerText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeInnerChar, 50);
                } else {
                    currentNodeIndex++;
                    typeNode();
                }
            }
            typeInnerChar();
        } else {
            currentNodeIndex++;
            typeNode();
        }
    }

    typeNode();
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('.hero, .section');
    const navItems = document.querySelectorAll('.nav-links a');

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });

        navItems.forEach(item => {
            item.classList.remove('active');
        });

        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        const activeLink = document.querySelector(`.nav-links a[href="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    const initialHash = window.location.hash || '#home';
    showSection(initialHash);

    navItems.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);

            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.querySelectorAll('.hero-buttons a').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            showSection(this.getAttribute('href'));
        });
    });

    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#home';
        showSection(hash);
    });

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Enviando...';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerText = 'Mensagem Enviada!';
            btn.style.backgroundColor = '#4caf50';
            btn.style.color = '#fff';
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.opacity = '1';
                btn.style.color = '';
            }, 3000);
        }, 1500);
    });

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about-text, .skill-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});