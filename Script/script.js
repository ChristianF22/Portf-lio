function nextNav(type){
    const select = document.querySelector(".select");

    switch (type){
        case 1:
            select.style.left = "2.7rem";
            select.style.width = "5rem";
            break;
        case 2:
            select.style.left = "7.2rem";
            select.style.width = "8rem";
            break;
        case 3:
            select.style.left = "14.6rem";
            select.style.width = "8rem";
          break;
        case 4:
            select.style.left = "22rem";
            select.style.width = "7rem";
            break;  
          
    }
}