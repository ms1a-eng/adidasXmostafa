const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 8, 
    breakpoints: {
        768:{
            spaceBetween: 14
        },
        1024:
        {
            spaceBetween:21
        }
    },
    slideToClickedSlide: true, 
    centeredSlides: false,
}
);

swiper.on("click", function(){

    const clicked = swiper.clickedSlide; 
    if(!clicked) return;
    const swiperEl = document.querySelector(".swiper");
    const isAlreadyActive = clicked.classList.contains("is-active");
    for(const card of document.querySelectorAll(".card"))
    {
        card.classList.remove("is-active");
    }

    if(isAlreadyActive)
    {
        swiperEl.classList.remove("is-magazine");
    }
    else
    {
        clicked.classList.add("is-active");
        swiperEl.classList.add("is-magazine");
    }
});