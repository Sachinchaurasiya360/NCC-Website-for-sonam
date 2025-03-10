// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the hero carousel
    const heroCarousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
        interval: 5000, // Change slide every 5 seconds
        pause: 'hover', // Pause on mouse hover
        wrap: true, // Loop through slides
        keyboard: true // Enable keyboard navigation
    });

    // Initialize all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scrolling for navigation links
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Form submission handling
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your interest in joining NCC! We will contact you soon.');
            this.reset();
        });
    }

    // Dynamic gallery loading
    const galleryImages = [
        { src: 'images/gallery1.jpg', title: 'Annual Parade' },
        { src: 'images/gallery2.jpg', title: 'Drill Competition' },
        { src: 'images/gallery3.jpg', title: 'Adventure Camp' },
        { src: 'images/gallery4.jpg', title: 'Social Service' },
        { src: 'images/gallery5.jpg', title: 'Sports Day' },
        { src: 'images/gallery6.jpg', title: 'Cultural Event' }
    ];

    const galleryContainer = document.querySelector('#gallery .row');
    if (galleryContainer) {
        galleryImages.forEach(image => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-lg-4 fade-in';
            col.innerHTML = `
                <div class="gallery-item">
                    <img src="${image.src}" alt="${image.title}" class="img-fluid">
                    <div class="gallery-overlay">
                        <h5>${image.title}</h5>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(col);
        });
    }

    // Dynamic events loading
    const events = [
        {
            date: '2024-03-15',
            title: 'Annual NCC Day Celebration',
            description: 'Join us for the grand celebration of NCC Day with various cultural programs and competitions.'
        },
        {
            date: '2024-03-20',
            title: 'Adventure Training Camp',
            description: 'Registration open for the upcoming adventure training camp at the mountain base.'
        },
        {
            date: '2024-04-01',
            title: 'Social Service Drive',
            description: 'Participate in our monthly social service initiative to help the community.'
        }
    ];

    const eventsList = document.querySelector('.events-list');
    if (eventsList) {
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item fade-in';
            eventElement.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                        <small class="text-muted">Date: ${new Date(event.date).toLocaleDateString()}</small>
                    </div>
                </div>
            `;
            eventsList.appendChild(eventElement);
        });
    }

    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize Google Maps
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Replace with your actual Google Maps API key and coordinates
        const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=NCC+Office,College+Campus`;
        mapContainer.innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapUrl}" allowfullscreen></iframe>`;
    }
}); 