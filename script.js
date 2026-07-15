// ================= ACTIVE NAVBAR =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});





// ================= SCROLL REVEAL =================


const revealElements = document.querySelectorAll(
    "section, .featured-content, .info-card, .contact-card"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});



window.addEventListener("scroll", () => {


    revealElements.forEach(element => {


        const elementTop = element.getBoundingClientRect().top;


        if (elementTop < window.innerHeight - 100) {

            element.classList.add("active");

        }


    });


});





// ================= GLOWMATE GALLERY =================


const mainImage = document.querySelector(".main-project-image");

const galleryImages = document.querySelectorAll(".project-gallery img");



if(mainImage && galleryImages.length > 0){


    galleryImages.forEach(image => {


        image.addEventListener("click", () => {


            // animasi gambar berubah

            mainImage.style.opacity = "0";


            setTimeout(() => {


                mainImage.src = image.src;

                mainImage.style.opacity = "1";


            },200);



            // aktifkan border gambar kecil

            galleryImages.forEach(img => {

                img.classList.remove("active");

            });


            image.classList.add("active");


        });


    });


}





// ================= SMOOTH SCROLL =================


document.querySelectorAll("a[href^='#']").forEach(anchor => {


    anchor.addEventListener("click", function(e){


        const target = document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});





// ================= BACK TO TOP =================


const topButton = document.createElement("button");


topButton.innerHTML = "↑";


topButton.className = "back-top";


document.body.appendChild(topButton);



window.addEventListener("scroll",()=>{


    if(scrollY > 500){

        topButton.style.display = "block";

    }else{

        topButton.style.display = "none";

    }


});



topButton.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});
// ================= SMOOTH SCROLL =================

document.querySelectorAll("a[href^='#']").forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const href = this.getAttribute("href");

        // kalau hanya #
        if(href === "#"){
            e.preventDefault();
            window.scrollTo({
                top:0,
                behavior:"smooth"
            });
            return;
        }


        const target = document.querySelector(href);


        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
// ================= LOADER =================

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1800);

});
// ================= HERO PHOTO =================

const photos = document.querySelectorAll(".hero-photo");

const frame = document.querySelector(".image-frame");

let currentPhoto = 0;

frame.addEventListener("click",()=>{

    photos[currentPhoto].classList.remove("active");

    currentPhoto++;

    if(currentPhoto >= photos.length){

        currentPhoto = 0;

    }

    photos[currentPhoto].classList.add("active");

});
// ================= HERO 3D FLIP =================

const flipCard = document.querySelector(".flip-card");

if(flipCard){

    flipCard.parentElement.addEventListener("click",()=>{

        flipCard.classList.toggle("flip");

    });

}
// ================= ABOUT CARD =================

const aboutCard = document.querySelector(".about-image");

window.addEventListener("scroll",()=>{

    if(!aboutCard) return;

    const top = aboutCard.getBoundingClientRect().top;

    if(top < window.innerHeight - 120){

        aboutCard.classList.add("show");

    }

});
