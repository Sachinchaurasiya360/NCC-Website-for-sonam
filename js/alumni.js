document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const searchInput = document.querySelector('.search-box input');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const alumniItems = document.querySelectorAll('.alumni-item');

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        alumniItems.forEach(item => {
            const name = item.querySelector('h3').textContent.toLowerCase();
            const designation = item.querySelector('.designation').textContent.toLowerCase();
            const journey = item.querySelector('.journey').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || 
                designation.includes(searchTerm) || 
                journey.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            alumniItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all alumni cards and testimonials
    document.querySelectorAll('.alumni-card, .testimonial-card').forEach(item => {
        observer.observe(item);
    });

    // Initialize testimonial slider if Swiper.js is available
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }

    // Form submission for "Share Your Story"
    const shareStoryForm = document.getElementById('shareStoryForm');
    if (shareStoryForm) {
        shareStoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            alert('Thank you for sharing your story! We will review and publish it soon.');
            this.reset();
        });
    }

    // Dynamic image loading with lazy loading
    const images = document.querySelectorAll('.alumni-image img, .testimonial-images img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
        
        images.forEach(img => {
            img.classList.add('lazyload');
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        });
    }

    // Video Modal Functionality
    const playButtons = document.querySelectorAll('.btn-play');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const videoModal = document.getElementById(videoId);
            
            // Show modal
            videoModal.classList.add('active');
            
            // Start playing video
            const video = videoModal.querySelector('video');
            video.play();
            
            // Close modal on click outside
            videoModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    video.pause();
                    video.currentTime = 0;
                }
            });
            
            // Close modal on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                    videoModal.classList.remove('active');
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });
    });
}); 