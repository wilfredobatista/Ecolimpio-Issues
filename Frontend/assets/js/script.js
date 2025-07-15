// Global state
let currentFidelity = 'high-fi';
let currentScreen = 'home';
let serviceData = {
    wasteType: '',
    amount: '',
    location: '',
    photos: 0,
    price: 0
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setFidelity('high-fi');
    showScreen('home');
    updateContinueButton();
});

// Fidelity management
function setFidelity(fidelity) {
    currentFidelity = fidelity;
    
    // Remove all fidelity classes
    document.body.classList.remove('wireframe', 'low-fi', 'high-fi');
    
    // Add current fidelity class
    document.body.classList.add(fidelity);
    
    // Update button states
    document.querySelectorAll('.fidelity-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(fidelity + '-btn').classList.add('active');
    
    // Update content based on fidelity
    updateContentForFidelity();
}

function updateContentForFidelity() {
    const logoText = document.querySelector('.logo-text');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const serviceTitles = document.querySelectorAll('.service-title');
    const serviceDescriptions = document.querySelectorAll('.service-description');
    const testimonialNames = document.querySelectorAll('.testimonial-name');
    const testimonialRoles = document.querySelectorAll('.testimonial-role');
    const testimonialTexts = document.querySelectorAll('.testimonial-text');
    
    if (currentFidelity === 'wireframe') {
        logoText.textContent = 'LOGO';
        heroTitle.textContent = 'MAIN HEADLINE';
        heroDescription.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.';
        
        serviceTitles.forEach((title, index) => {
            title.textContent = `SERVICE ${index + 1}`;
        });
        
        serviceDescriptions.forEach(desc => {
            desc.textContent = 'Lorem ipsum dolor sit amet consectetur.';
        });
        
        testimonialNames.forEach(name => {
            name.textContent = 'USER NAME';
        });
        
        testimonialRoles.forEach(role => {
            role.textContent = 'User Title';
        });
        
        testimonialTexts.forEach(text => {
            text.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
        });
        
    } else {
        logoText.textContent = 'EcoLimpio';
        heroTitle.textContent = 'Eco-Friendly Waste Collection';
        heroDescription.textContent = 'Professional waste collection services for your home. We make recycling easy and convenient while protecting our environment.';
        
        const serviceNames = ['Organic Waste', 'Plastic Recycling', 'Electronic Waste'];
        serviceTitles.forEach((title, index) => {
            title.textContent = serviceNames[index];
        });
        
        serviceDescriptions.forEach(desc => {
            desc.textContent = 'Professional collection and processing service';
        });
        
        const names = ['Maria Rodriguez', 'Carlos Martinez'];
        const roles = ['Environmental Advocate', 'Eco Enthusiast'];
        const texts = [
            'EcoLimpio made waste management so easy! Their service is reliable and truly helps the environment.',
            'Amazing service! They handle everything professionally and make recycling effortless.'
        ];
        
        testimonialNames.forEach((name, index) => {
            name.textContent = names[index];
        });
        
        testimonialRoles.forEach((role, index) => {
            role.textContent = roles[index];
        });
        
        testimonialTexts.forEach((text, index) => {
            text.textContent = texts[index];
        });
    }
}

// Screen management
function showScreen(screenName) {
    currentScreen = screenName;
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show current screen
    document.getElementById(screenName + '-screen').classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(screenName + '-nav').classList.add('active');
    
    // Update checkout summary when showing checkout
    if (screenName === 'checkout') {
        updateCheckoutSummary();
    }
}

// Service selection functions
function selectWasteType(type) {
    serviceData.wasteType = type;
    
    // Update UI
    document.querySelectorAll('.selection-card').forEach(card => {
        if (card.id.includes('organic') || card.id.includes('plastic') || card.id.includes('electronic')) {
            card.classList.remove('selected');
        }
    });
    document.getElementById(type + '-card').classList.add('selected');
    
    calculatePrice();
    updateContinueButton();
}

function selectAmount(amount) {
    serviceData.amount = amount;
    
    // Update UI
    document.querySelectorAll('.selection-card').forEach(card => {
        if (card.id.includes('small') || card.id.includes('medium') || card.id.includes('large')) {
            card.classList.remove('selected');
        }
    });
    document.getElementById(amount + '-card').classList.add('selected');
    
    calculatePrice();
    updateContinueButton();
}

function calculatePrice() {
    if (!serviceData.wasteType || !serviceData.amount) {
        serviceData.price = 0;
        return;
    }
    
    const basePrice = serviceData.wasteType === 'electronic' ? 25 : 
                     serviceData.wasteType === 'plastic' ? 15 : 12;
    const multiplier = serviceData.amount === 'large' ? 2 : 
                      serviceData.amount === 'medium' ? 1.5 : 1;
    
    serviceData.price = basePrice * multiplier;
}

function updateContinueButton() {
    const continueBtn = document.getElementById('continue-btn');
    const hasRequiredData = serviceData.wasteType && serviceData.amount;
    
    continueBtn.disabled = !hasRequiredData;
    
    if (hasRequiredData) {
        continueBtn.classList.remove('disabled');
    } else {
        continueBtn.classList.add('disabled');
    }
}

function uploadPhoto() {
    serviceData.photos++;
    document.getElementById('photo-count').textContent = `${serviceData.photos} photo${serviceData.photos > 1 ? 's' : ''} uploaded`;
}

function proceedToCheckout() {
    const locationInput = document.getElementById('location-input');
    serviceData.location = locationInput.value;
    
    if (!serviceData.wasteType || !serviceData.amount) {
        alert('Please select waste type and amount before proceeding.');
        return;
    }
    
    showScreen('checkout');
}

// Checkout functions
function updateCheckoutSummary() {
    document.getElementById('summary-waste-type').textContent = 
        serviceData.wasteType ? serviceData.wasteType.charAt(0).toUpperCase() + serviceData.wasteType.slice(1) : 'Not selected';
    
    document.getElementById('summary-amount').textContent = 
        serviceData.amount ? serviceData.amount.charAt(0).toUpperCase() + serviceData.amount.slice(1) : 'Not selected';
    
    document.getElementById('summary-location').textContent = 
        serviceData.location || 'Not provided';
    
    document.getElementById('summary-photos').textContent = serviceData.photos;
    
    document.getElementById('summary-price').textContent = 
        currentFidelity === 'wireframe' ? '$XX.XX' : `$${serviceData.price}`;
}

function selectPayment(method) {
    document.querySelectorAll('.payment-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    if (method === 'card') {
        document.getElementById('card-payment').classList.add('selected');
    } else {
        document.getElementById('paypal-payment').classList.add('selected');
    }
}

function confirmOrder() {
    const message = currentFidelity === 'wireframe' ? 
        'Order confirmed!' : 
        'Order confirmed! We\'ll contact you soon to schedule the pickup.';
    
    alert(message);
}

// Form functions
function submitForm() {
    const message = currentFidelity === 'wireframe' ? 
        'Form submitted!' : 
        'Thank you! We\'ll get back to you soon.';
    
    alert(message);
}

// Handle location input
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location-input');
    if (locationInput) {
        locationInput.addEventListener('input', function() {
            serviceData.location = this.value;
        });
    }
});

// Smooth scrolling for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add smooth scroll when changing screens
const originalShowScreen = showScreen;
showScreen = function(screenName) {
    originalShowScreen(screenName);
    smoothScrollToTop();
};

// Handle responsive navigation
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Add mobile navigation styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
    }
`;
document.head.appendChild(style);