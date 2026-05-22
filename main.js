/* =========================================================
   NAVBAR ACTIVE BUTTON
========================================================= */

const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach((button)=>{

    button.addEventListener('click', ()=>{

        navButtons.forEach((btn)=>{
            btn.classList.remove('active');
        });

        button.classList.add('active');

    });

});





/* =========================================================
   SLIDER
========================================================= */

const slides = document.querySelectorAll('.slide');

const dots = document.querySelectorAll('.dot');

const slider = document.querySelector('.slider');

let currentSlide = 0;

let sliderInterval;




/* ================= SHOW SLIDE ================= */

function showSlide(index){

    slides.forEach((slide)=>{
        slide.classList.remove('active');
    });

    dots.forEach((dot)=>{
        dot.classList.remove('active');
    });

    if(slides[index]){
        slides[index].classList.add('active');
    }

    if(dots[index]){
        dots[index].classList.add('active');
    }

    currentSlide = index;

}




/* ================= NEXT ================= */

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}




/* ================= PREVIOUS ================= */

function prevSlide(){

    currentSlide--;

    if(currentSlide < 0){

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}




/* ================= AUTO SLIDER ================= */

function startSlider(){

    sliderInterval = setInterval(()=>{

        nextSlide();

    }, 5000);

}




/* ================= RESET ================= */

function resetSlider(){

    clearInterval(sliderInterval);

    startSlider();

}




/* ================= DOT CLICK ================= */

dots.forEach((dot, index)=>{

    dot.addEventListener('click', ()=>{

        showSlide(index);

        resetSlider();

    });

});





/* =========================================================
   TOUCH + MOUSE SWIPE
========================================================= */

let startX = 0;

let endX = 0;




/* TOUCH START */

if(slider){

    slider.addEventListener('touchstart', (e)=>{

        startX = e.touches[0].clientX;

    });

}




/* TOUCH END */

if(slider){

    slider.addEventListener('touchend', (e)=>{

        endX = e.changedTouches[0].clientX;

        handleGesture();

    });

}




/* MOUSE DOWN */

if(slider){

    slider.addEventListener('mousedown', (e)=>{

        startX = e.clientX;

    });

}




/* MOUSE UP */

if(slider){

    slider.addEventListener('mouseup', (e)=>{

        endX = e.clientX;

        handleGesture();

    });

}




/* ================= HANDLE GESTURE ================= */

function handleGesture(){

    let difference = startX - endX;



    /* LEFT */

    if(difference > 50){

        nextSlide();

        resetSlider();

    }



    /* RIGHT */

    else if(difference < -50){

        prevSlide();

        resetSlider();

    }

}




/* ================= START SLIDER ================= */

if(slides.length > 0){

    showSlide(currentSlide);

    startSlider();

}





/* =========================================================
   DRAG SCROLL FUNCTION
========================================================= */

function enableDragScroll(container){

    if(!container) return;

    let isDown = false;

    let startX;

    let scrollLeft;



    /* MOUSE DOWN */

    container.addEventListener('mousedown', (e)=>{

        isDown = true;

        container.classList.add('active-drag');

        startX = e.pageX - container.offsetLeft;

        scrollLeft = container.scrollLeft;

    });




    /* MOUSE LEAVE */

    container.addEventListener('mouseleave', ()=>{

        isDown = false;

        container.classList.remove('active-drag');

    });




    /* MOUSE UP */

    container.addEventListener('mouseup', ()=>{

        isDown = false;

        container.classList.remove('active-drag');

    });




    /* MOUSE MOVE */

    container.addEventListener('mousemove', (e)=>{

        if(!isDown) return;

        e.preventDefault();

        const x = e.pageX - container.offsetLeft;

        const walk = (x - startX) * 2;

        container.scrollLeft = scrollLeft - walk;

    });




    /* TOUCH START */

    container.addEventListener('touchstart', (e)=>{

        startX = e.touches[0].pageX - container.offsetLeft;

        scrollLeft = container.scrollLeft;

    });




    /* TOUCH MOVE */

    container.addEventListener('touchmove', (e)=>{

        const x = e.touches[0].pageX - container.offsetLeft;

        const walk = (x - startX) * 2;

        container.scrollLeft = scrollLeft - walk;

    });

}





/* =========================================================
   ENABLE DRAG SCROLL
========================================================= */

const offerScroll =
    document.querySelector('.offers-scroll');

const categoryScroll =
    document.querySelector('.category-scroll');

const bestSellerScroll =
    document.querySelector('.best-seller-scroll');

enableDragScroll(offerScroll);

enableDragScroll(categoryScroll);

enableDragScroll(bestSellerScroll);






/* =========================================================
   MENU FILTER + SEARCH
========================================================= */

document.addEventListener('DOMContentLoaded', ()=>{


    const filterButtons =
        document.querySelectorAll('.filter-btn');

    const menuCards =
        document.querySelectorAll('.menu-card');

    const searchInput =
        document.getElementById('searchInput');



    /* IF MENU PAGE NOT EXISTS */

    if(
        filterButtons.length === 0
        ||
        menuCards.length === 0
        ||
        !searchInput
    ){
        return;
    }



    let currentCategory = "all";




    /* ================= CATEGORY FILTER ================= */

    filterButtons.forEach((button)=>{

        button.addEventListener('click', ()=>{


            /* REMOVE ACTIVE */

            filterButtons.forEach((btn)=>{

                btn.classList.remove('active');

            });



            /* ADD ACTIVE */

            button.classList.add('active');



            /* GET CATEGORY */

            currentCategory =
                button.getAttribute('data-category');



            filterProducts();

        });

    });





    /* ================= SEARCH ================= */

    searchInput.addEventListener('input', ()=>{

        filterProducts();

    });






    /* ================= FILTER FUNCTION ================= */

    function filterProducts(){


        const searchValue =
            searchInput.value
            .toLowerCase()
            .trim();




        menuCards.forEach((card)=>{


            const category =
                card.getAttribute('data-category')
                .toLowerCase();




            const title =
                card.querySelector('h3')
                .textContent
                .toLowerCase();





            const categoryMatch =

                currentCategory === "all"

                ||

                category === currentCategory;





            const searchMatch =

                title.includes(searchValue);





            if(categoryMatch && searchMatch){

                card.style.display = "block";

            }

            else{

                card.style.display = "none";

            }

        });

    }

});