const swiper = new Swiper(".swiper", {
    slidesPerView: "auto", 
    spaceBetween: 22,
    slideToClickedSlide: true, 
    centeredSlides: true,
}
);

swiper.on("click", function(){

    const swiperEl = document.querySelector(".swiper"); 
    if(swiper.clickedIndex === swiper.activeIndex && swiperEl.classList.contains("is-magazine"))
    {
        swiperEl.classList.remove("is-magazine");
    }
    else 
    {
        swiperEl.classList.add("is-magazine");
    }
});
