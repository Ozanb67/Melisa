let portfolioData = [];
let currentImageIndex = 0;
let portfolioModal = null;

function navigateImage(direction) {
    currentImageIndex = (currentImageIndex + direction + portfolioData.length) % portfolioData.length;
    updateModal(currentImageIndex);
}

function updateModal(index) {
    const data = portfolioData[index];
    console.log('Updating modal with data:', data);
    
    const modalImage = document.getElementById('modal-image');
    if (!modalImage) {
        console.error('Modal image element not found');
        return;
    }
    
    // Update modal content using IDs
    modalImage.src = data.image;
    modalImage.alt = data.title;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-date').textContent = `Date: ${data.date}`;
    document.getElementById('modal-medium').textContent = `Medium: ${data.medium}`;
    document.getElementById('modal-size').textContent = `Size: ${data.size}`;
    
    // Show the modal
    portfolioModal.style.display = 'block';
    
    // Get the modal content element
    const modalContent = portfolioModal.querySelector('.modal-content');
    modalContent.classList.remove('show');
    
    // Wait for the next animation frame to ensure the class is removed
    requestAnimationFrame(() => {
        modalContent.classList.add('show');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize and populate portfolioData by extracting data attributes from .portfolio-item elements
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioData = Array.from(portfolioItems).map(item => ({
        element: item,
        title: item.getAttribute('data-title'),
        date: item.getAttribute('data-date'),
        medium: item.getAttribute('data-medium'),
        size: item.getAttribute('data-size'),

        image: item.querySelector('img').src
    }));

    console.log('Portfolio Data:', portfolioData);

    // Portfolio modal functionality
    portfolioModal = document.getElementById('portfolio-modal');

    // Open modal when clicking on portfolio item
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            portfolioModal.style.display = 'block';
            updateModal(index);
        });
    });

    // Close modal
    function closeModal() {
        portfolioModal.style.display = 'none';
    }

    // Close modals when clicking the close button or outside
    portfolioModal.addEventListener('click', function(event) {
        if (event.target === portfolioModal || event.target.classList.contains('close')) {
            closeModal();
        }
    });

    // Close modal when pressing escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Navigate with arrow keys
    document.addEventListener('keydown', function(event) {
        if (portfolioModal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (event.key === 'ArrowRight') {
                navigateImage(1);
            }
        }
    });

    // Navigation arrows
    document.querySelector('.nav-arrow.prev').addEventListener('click', () => {
        navigateImage(-1);
    });

    // Resume link is now handled directly in HTML

    document.querySelector('.nav-arrow.next').addEventListener('click', () => {
        navigateImage(1);
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value
            };

            try {
                // Send email via API
                const response = await fetch('/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (result.success) {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('Sorry, there was an error sending your message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            }
        });
    }
});
