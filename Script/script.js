function nextNav(type) {
    const select = document.querySelector(".select");
    const home = document.querySelector("#home")
    const about = document.querySelector("#about")
    const exp = document.querySelector("#exp")
    const contact = document.querySelector("#contact")


    switch (type) {
        case 1:
            select.style.left = "-1.3rem";
            select.style.width = "5rem";

            home.style.display = "flex"
            about.style.display = "none"
            exp.style.display = "none"
            contact.style.display = "none"

            setTimeout(() => {
                home.style.opacity = "100%"
                about.style.opacity = "0%"
                exp.style.opacity = "0%"
                contact.style.opacity = "0%"
            }, 1);
            break;
        case 2:
            select.style.left = "3.6rem";
            select.style.width = "7rem";

            home.style.display = "none"
            about.style.display = "flex"
            exp.style.display = "none"
            contact.style.display = "none"

            setTimeout(() => {
                home.style.opacity = "0%"
                about.style.opacity = "100%"
                exp.style.opacity = "0%"
                contact.style.opacity = "0%"
            }, 1)

            break;
        case 3:
            select.style.left = "10.5rem";
            select.style.width = "8rem";

            home.style.display = "none"
            about.style.display = "none"
            exp.style.display = "flex"
            contact.style.display = "none"

            setTimeout(() => {
                home.style.opacity = "0%"
                about.style.opacity = "0%"
                exp.style.opacity = "100%"
                contact.style.opacity = "0%"
            }, 1)

            break;
        case 4:
            select.style.left = "18rem";
            select.style.width = "7rem";

            home.style.display = "none"
            about.style.display = "none"
            exp.style.display = "none"
            contact.style.display = "flex"

            setTimeout(() => {
                home.style.opacity = "0%"
                about.style.opacity = "0%"
                exp.style.opacity = "0%"
                contact.style.opacity = "100%"
            }, 1)

            break;
    }
}