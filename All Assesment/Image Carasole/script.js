let currentSlideIndex = 0;
const slides = document.querySelectorAll('.image-carousel-container img');
const dots = document.querySelectorAll('.dot');


const showSlide = (index) => {
    slides.forEach((slide) => {
        slide.style.display = 'none';
    });
    dots.forEach((dot) => {
        dot.classList.remove('active');
    });

    slides[index].style.display = 'block';
    dots[index].classList.add('active');
};


const nextSlide = () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
};


const prevSlide = () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
};


document.querySelector('.btn-next').addEventListener('click', () => {
    nextSlide();
});

document.querySelector('.btn-prev').addEventListener('click', () => {
    prevSlide();
});


dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        currentSlideIndex = index;
    });
});


setInterval(() => {
    nextSlide();
}, 4000);
