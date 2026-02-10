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
        }, 40);
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
    if (form) {
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
    }

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

    const translations = {
        pt: {
            nav: {
                home: "Home",
                about: "Sobre",
                skills: "Skills",
                experience: "Experiência",
                education: "Formação",
                contact: "Contato"
            },
            hero: {
                greeting: "Olá, sou o",
                role: "Desenvolvedor Fullstack",
                description: "Transformando ideias em experiências digitais modernas e robustas."
            },
            about: {
                title: "Sobre Mim",
                description: "Formado em Análise e Desenvolvimento de Sistemas e atuo como Desenvolvedor de Software Júnior. Sou proativo, comunicativo e colaborativo, com foco em desenvolver soluções eficientes e aprimorar continuamente minhas habilidades técnicas. Possuo experiência em Java, Spring Boot, Angular, Oracle PL/SQL e JSF. Minha trajetória inclui atuação como Analista de Service Desk e Analista de Sistemas, com destaque em suporte a sistemas corporativos, administração de usuários, automação de processos em PL/SQL e criação de relatórios personalizados. Em agosto de 2025, iniciei minha pós-graduação em Engenharia de Software."
            },
            skills: {
                title: "Minhas Skills",
                backend: "Backend",
                frontend: "Frontend"
            },
            experience: {
                title: "Experiência Profissional",
                job1: {
                    title: "Desenvolvedor de Software Júnior",
                    date: "2025 • Atual",
                    desc: "Minhas principais responsabilidades incluem a manutenção da aplicação, correção de problemas, implementação de melhorias, realização de testes e participação no desenvolvimento de novos projetos."
                },
                job2: {
                    title: "Analista de Sistemas",
                    date: "2024 • 2025",
                    desc: "Trabalhei com banco de dados Oracle PL/SQL, realizando a criação de usuários, configuração de permissões e o desenvolvimento de scripts em PL/SQL para automatização de demandas do sistema. Além disso, desenvolvi telas e scripts para facilitar a geração de relatórios, permitindo que os usuários obtenham informações com mais autonomia e simplicidade."
                },
                job3: {
                    title: "Analista de Service Desk",
                    date: "2023 • 2024",
                    desc: "Responsável pelo suporte a sistemas corporativos, incluindo criação e administração de usuários, concessão de permissões e gestão de acessos em plataformas como EBS, Power BI, AccessOne, Gesplan, Autentique, DocuSign, OIC e SYSPDV. Atuação no suporte N1 aos sistemas MV (MVPEP, MVSOUL, MVPACS e Painel de Indicadores). Participação na implantação do módulo de Oncologia no sistema MV, fornecendo suporte técnico e treinamento especializado para médicos."
                }
            },
            education: {
                title: "Formação Acadêmica",
                course1: {
                    title: "Pós-graduação em Engenharia de Software, Computação em Nuvem e DevOps",
                    date: "Jul 2027 (Previsão)",
                    desc: "Especialização na análise, desenvolvimento e implementação de soluções em gestão ágil de projetos de software e inovações tecnológicas. O programa abrange práticas avançadas em Engenharia de Software, DevOps e Computação em Nuvem, com ênfase na otimização de processos, aumento da eficiência operacional e entrega de soluções de alto desempenho para organizações e sociedade."
                },
                course2: {
                    title: "Análise e Desenvolvimento de Sistemas",
                    date: "Concluído em 2024",
                    desc: "Formação focada no ciclo completo de desenvolvimento de software, desde a engenharia de requisitos até a implementação e testes. O curso proporcionou uma base sólida em lógica de programação, banco de dados (SQL e NoSQL), arquitetura de sistemas e metodologias ágeis (Scrum/Kanban), preparando para a criação de soluções tecnológicas eficientes e escaláveis."
                }
            },
            contact: {
                title: "Entre em Contato",
                text: "Estou sempre aberto a novas oportunidades e parcerias. Sinta-se à vontade para entrar em contato comigo através dos canais abaixo:",
                socials: "Redes Sociais"
            },
            footer: {
                developed: "Desenvolvido por Christian Fonseca"
            }
        },
        en: {
            nav: {
                home: "Home",
                about: "About",
                skills: "Skills",
                experience: "Experience",
                education: "Education",
                contact: "Contact"
            },
            hero: {
                greeting: "Hello, I'm",
                role: "Fullstack Developer",
                description: "Transforming ideas into modern and robust digital experiences."
            },
            about: {
                title: "About Me",
                description: "Graduated in Systems Analysis and Development, I work as a Junior Software Developer. I am proactive, communicative, and collaborative, focused on developing efficient solutions and continuously improving my technical skills. I have experience in Java, Spring Boot, Angular, Oracle PL/SQL, and JSF. My background includes roles as Service Desk Analyst and Systems Analyst, highlighting support for corporate systems, user administration, PL/SQL process automation, and custom report creation. In August 2025, I started my postgraduate studies in Software Engineering."
            },
            skills: {
                title: "My Skills",
                backend: "Backend",
                frontend: "Frontend"
            },
            experience: {
                title: "Professional Experience",
                job1: {
                    title: "Junior Software Developer",
                    date: "2025 • Present",
                    desc: "My main responsibilities include application maintenance, bug fixing, implementing improvements, testing, and participating in the development of new projects."
                },
                job2: {
                    title: "Systems Analyst",
                    date: "2024 • 2025",
                    desc: "Worked with Oracle PL/SQL databases, managing user creation, permission configuration, and developing PL/SQL scripts to automate system demands. Additionally, I developed screens and scripts to facilitate report generation, allowing users to obtain information with greater autonomy and simplicity."
                },
                job3: {
                    title: "Service Desk Analyst",
                    date: "2023 • 2024",
                    desc: "Responsible for supporting corporate systems, including user creation and administration, permission granting, and access management on platforms such as EBS, Power BI, AccessOne, Gesplan, Autentique, DocuSign, OIC, and SYSPDV. N1 support for MV systems (MVPEP, MVSOUL, MVPACS, and Indicator Panel). Participated in the implementation of the Oncology module in the MV system, providing technical support and specialized training for doctors."
                },
            },
            education: {
                title: "Academic Background",
                course1: {
                    title: "Postgraduate in Software Engineering, Cloud Computing, and DevOps",
                    date: "Jul 2027 (Forecast)",
                    desc: "Specialization in analysis, development, and implementation of solutions in agile software project management and technological innovations. The program covers advanced practices in Software Engineering, DevOps, and Cloud Computing, emphasizing process optimization, increased operational efficiency, and delivery of high-performance solutions for organizations and society."
                },
                course2: {
                    title: "Systems Analysis and Development",
                    date: "Completed in 2024",
                    desc: "Education focused on the full software development lifecycle, from requirements engineering to implementation and testing. The course provided a solid foundation in programming logic, databases (SQL and NoSQL), system architecture, and agile methodologies (Scrum/Kanban), preparing for the creation of efficient and scalable technological solutions."
                }
            },
            contact: {
                title: "Get in Touch",
                text: "I am always open to new opportunities and partnerships. Feel free to contact me through the channels below:",
                socials: "Social Networks"
            },
            footer: {
                developed: "Developed by Christian Fonseca"
            }
        },
        es: {
            nav: {
                home: "Inicio",
                about: "Sobre Mí",
                skills: "Habilidades",
                experience: "Experiencia",
                education: "Educación",
                contact: "Contacto"
            },
            hero: {
                greeting: "Hola, soy",
                role: "Desarrollador Fullstack",
                description: "Transformando ideas en experiencias digitales modernas y robustas."
            },
            about: {
                title: "Sobre Mí",
                description: "Graduado en Análisis y Desarrollo de Sistemas, trabajo como Desarrollador de Software Junior. Soy proactivo, comunicativo y colaborativo, enfocado en desarrollar soluciones eficientes y mejorar continuamente mis habilidades técnicas. Tengo experiencia en Java, Spring Boot, Angular, Oracle PL/SQL y JSF. Mi trayectoria incluye roles como Analista de Service Desk y Analista de Sistemas, destacando en soporte a sistemas corporativos, administración de usuarios, automatización de procesos en PL/SQL y creación de informes personalizados. En agosto de 2025, comencé mi posgrado en Ingeniería de Software."
            },
            skills: {
                title: "Mis Habilidades",
                backend: "Backend",
                frontend: "Frontend"
            },
            experience: {
                title: "Experiencia Profesional",
                job1: {
                    title: "Desarrollador de Software Junior",
                    date: "2025 • Actual",
                    desc: "Mis principales responsabilidades incluyen el mantenimiento de la aplicación, corrección de errores, implementación de mejoras, realización de pruebas y participación en el desarrollo de nuevos proyectos."
                },
                job2: {
                    title: "Analista de Sistemas",
                    date: "2024 • 2025",
                    desc: "Trabajé con bases de datos Oracle PL/SQL, realizando creación de usuarios, configuración de permisos y desarrollo de scripts en PL/SQL para automatizar demandas del sistema. Además, desarrollé pantallas y scripts para facilitar la generación de informes, permitiendo a los usuarios obtener información con mayor autonomía y simplicidad."
                },
                job3: {
                    title: "Analista de Service Desk",
                    date: "2023 • 2024",
                    desc: "Responsable del soporte a sistemas corporativos, incluyendo creación y administración de usuarios, concesión de permisos y gestión de accesos en plataformas como EBS, Power BI, AccessOne, Gesplan, Autentique, DocuSign, OIC y SYSPDV. Soporte N1 a los sistemas MV (MVPEP, MVSOUL, MVPACS y Panel de Indicadores). Participación en la implementación del módulo de Oncología en el sistema MV, brindando soporte técnico y capacitación especializada para médicos."
                }
            },
            education: {
                title: "Formación Académica",
                course1: {
                    title: "Posgrado en Ingeniería de Software, Computación en la Nube y DevOps",
                    date: "Jul 2027 (Previsión)",
                    desc: "Especialización en análisis, desarrollo e implementación de soluciones en gestión ágil de proyectos de software e innovaciones tecnológicas. El programa abarca prácticas avanzadas en Ingeniería de Software, DevOps y Computación en la Nube, con énfasis en la optimización de procesos, aumento de la eficiencia operativa y entrega de soluciones de alto rendimiento para organizaciones y la sociedad."
                },
                course2: {
                    title: "Análisis y Desarrollo de Sistemas",
                    date: "Completado en 2024",
                    desc: "Formación centrada en el ciclo completo de desarrollo de software, desde la ingeniería de requisitos hasta la implementación y pruebas. El curso proporcionó una base sólida en lógica de programación, bases de datos (SQL y NoSQL), arquitectura de sistemas y metodologías ágiles (Scrum/Kanban), preparando para a creación de soluciones tecnológicas eficientes y escalables."
                }
            },
            contact: {
                title: "Ponerse en Contacto",
                text: "Siempre estoy abierto a nuevas oportunidades y asociaciones. Siéntase libre de contactarme a través de los canales a continuación:",
                socials: "Redes Sociales"
            },
            footer: {
                developed: "Desarrollado por Christian Fonseca"
            }
        }
    };

    function changeLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);

        document.querySelectorAll('.lang-option').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[lang];

            keys.forEach(k => {
                if (value) {
                    value = value[k];
                }
            });

            if (value) {
                element.innerHTML = value;
                if (element.classList.contains('animate-text')) {
                    element.dataset.originalHtml = value;
                }
            }
        });

        document.documentElement.lang = lang;
    }

    const savedLang = localStorage.getItem('selectedLanguage') || 'pt';
    changeLanguage(savedLang);

    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
});