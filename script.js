document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 2. Smooth Scrolling for Navbar
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                navLinks.classList.remove('active');
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. SEARCH BUTTON LOGIC
    const searchBtn = document.getElementById('search-btn');
    const destInput = document.getElementById('dest-input');

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Page reload aagama thadukkum
        
        const destination = destInput.value.trim();
        
        if(destination === "") {
            // Type pannama click panna alert varum
            alert("Please enter a destination to search!");
        } else {
            // Type pannirundha, destination section ku smooth ah scroll aagum
            const destinationsSection = document.getElementById('destinations');
            if (destinationsSection) {
                destinationsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

        // 4. BOOKING FORM LOGIC & VALIDATION
    const openFormBtn = document.getElementById('open-form-btn');
    const closeFormBtn = document.getElementById('close-form-btn');
    const bookingModal = document.getElementById('booking-modal');
    const bookingForm = document.getElementById('booking-form');

    // Open Modal
    openFormBtn.addEventListener('click', (e) => { e.preventDefault(); bookingModal.classList.add('active'); });

        // --- CTA "BOOK CONSULTATION" BUTTON  ---
    const openFormBtn2 = document.getElementById('open-form-btn-2');
    openFormBtn2.addEventListener('click', (e) => {
        e.preventDefault();
        bookingModal.classList.add('active');
    });

    //Close Modal
    
    closeFormBtn.addEventListener('click', () => { bookingModal.classList.remove('active'); });
    window.addEventListener('click', (e) => { if (e.target === bookingModal) bookingModal.classList.remove('active'); });

    // Input Elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const destInput = document.getElementById('destination');
    const dateInput = document.getElementById('travel-date');
    const guestsInput = document.getElementById('guests');

    // Error Elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const destError = document.getElementById('destination-error');
    const dateError = document.getElementById('date-error');
    const guestsError = document.getElementById('guests-error');

    // Validation Functions
    function validateName() {
        if (nameInput.value.trim().length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            nameInput.classList.add('invalid'); return false;
        } else { nameError.textContent = ""; nameInput.classList.remove('invalid'); return true; }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            emailInput.classList.add('invalid'); return false;
        } else { emailError.textContent = ""; emailInput.classList.remove('invalid'); return true; }
    }

    function validatePhone() {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = "Please enter a valid 10-digit phone number.";
            phoneInput.classList.add('invalid'); return false;
        } else { phoneError.textContent = ""; phoneInput.classList.remove('invalid'); return true; }
    }

    function validateDestination() {
        if (destInput.value === "") {
            destError.textContent = "Please select a destination.";
            destInput.classList.add('invalid'); return false;
        } else { destError.textContent = ""; destInput.classList.remove('invalid'); return true; }
    }

    function validateDate() {
        if (dateInput.value === "") {
            dateError.textContent = "Please select a date.";
            dateInput.classList.add('invalid'); return false;
        } else { dateError.textContent = ""; dateInput.classList.remove('invalid'); return true; }
    }

    function validateGuests() {
        if (guestsInput.value === "" || guestsInput.value < 1) {
            guestsError.textContent = "At least 1 guest required.";
            guestsInput.classList.add('invalid'); return false;
        } else { guestsError.textContent = ""; guestsInput.classList.remove('invalid'); return true; }
    }

    // Real-time Validation (Input & Change Events)
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    destInput.addEventListener('change', validateDestination);
    dateInput.addEventListener('change', validateDate);
    guestsInput.addEventListener('input', validateGuests);

    // Form Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDestValid = validateDestination();
        const isDateValid = validateDate();
        const isGuestsValid = validateGuests();

        if (isNameValid && isEmailValid && isPhoneValid && isDestValid && isDateValid && isGuestsValid) {
            alert(`Booking Confirmed for ${destInput.value}! We will contact you soon. 🌴`);
            bookingForm.reset(); 
            bookingModal.classList.remove('active'); 
        } else {
            if(!isNameValid) nameInput.focus();
            else if(!isEmailValid) emailInput.focus();
            else if(!isPhoneValid) phoneInput.focus();
            else if(!isDestValid) destInput.focus();
            else if(!isDateValid) dateInput.focus();
            else if(!isGuestsValid) guestsInput.focus();
        }
    });