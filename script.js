document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scrolling for Navbar
    const navLinks = document.querySelectorAll('.navbar-nav a, .navbar-brand');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    const navbarCollapse = document.getElementById('navbarNav');
                    if(navbarCollapse && navbarCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navbarCollapse).hide();
                    }
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 2. Weather API Integration
    const weatherWidget = document.getElementById('weather-widget');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const weatherIcon = document.getElementById('weather-icon');
    const API_KEY = '5f57213961984739b29123910261111'; 

    async function fetchWeather(destination) {
        try {
            weatherWidget.classList.remove('d-none');
            weatherWidget.classList.add('d-inline-flex'); 
            weatherWidget.classList.remove('d-flex'); 
            
            weatherTemp.innerText = '--°C';
            weatherDesc.innerText = 'Fetching...';
            weatherIcon.className = 'fa-solid fa-spinner fa-spin text-white fs-2';

            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${destination}&aqi=no`);
            if (!response.ok) throw new Error('Location not found');

            const data = await response.json();
            weatherTemp.innerText = `${data.current.temp_c}°C`;
            weatherDesc.innerText = data.current.condition.text;
            
            const conditionText = data.current.condition.text.toLowerCase();
            
            if (conditionText.includes('rain') || conditionText.includes('drizzle') || conditionText.includes('shower')) {
                weatherIcon.className = 'fa-solid fa-cloud-showers-heavy text-info fs-2'; 
            } else if (conditionText.includes('cloud') || conditionText.includes('overcast')) {
                weatherIcon.className = 'fa-solid fa-cloud text-secondary fs-2'; 
            } else if (conditionText.includes('snow') || conditionText.includes('ice')) {
                weatherIcon.className = 'fa-solid fa-snowflake text-light fs-2'; 
            } else if (conditionText.includes('thunder') || conditionText.includes('storm')) {
                weatherIcon.className = 'fa-solid fa-bolt text-warning fs-2'; 
            } else {
                weatherIcon.className = 'fa-solid fa-sun text-warning fs-2'; 
            }

        } catch (error) {
            weatherTemp.innerText = 'Error';
            weatherDesc.innerText = 'Not found';
            weatherIcon.className = 'fa-solid fa-triangle-exclamation text-danger fs-2';
        }
    }

    // 3. Search Button & Weather Trigger
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('dest-input'); 

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        const destination = searchInput.value.trim();
        if(destination === "") {
            alert("Please enter a destination to search!");
        } else {
            fetchWeather(destination);
            const destinationsSection = document.getElementById('destinations');
            if (destinationsSection) {
                destinationsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // 4. Booking Form Logic
    const openFormBtns = [document.getElementById('open-form-btn'), document.getElementById('open-form-btn-2')];
    const bookingModalElement = document.getElementById('booking-modal');
    const bookingModal = new bootstrap.Modal(bookingModalElement);
    const bookingForm = document.getElementById('booking-form');

    openFormBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', (e) => { e.preventDefault(); bookingModal.show(); });
        }
    });

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const destFormInput = document.getElementById('destination'); 
    const dateInput = document.getElementById('travel-date');
    const guestsInput = document.getElementById('guests');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const destError = document.getElementById('destination-error');
    const dateError = document.getElementById('date-error');
    const guestsError = document.getElementById('guests-error');

    function validateName() {
        if (nameInput.value.trim().length < 3) { nameError.textContent = "Name must be at least 3 characters."; return false; } 
        else { nameError.textContent = ""; return true; }
    }
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) { emailError.textContent = "Please enter a valid email."; return false; } 
        else { emailError.textContent = ""; return true; }
    }
    function validatePhone() {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) { phoneError.textContent = "Please enter 10-digit phone number."; return false; } 
        else { phoneError.textContent = ""; return true; }
    }
    function validateDestination() {
        if (destFormInput.value === "") { destError.textContent = "Please select a destination."; return false; } 
        else { destError.textContent = ""; return true; }
    }
    function validateDate() {
        if (dateInput.value === "") { dateError.textContent = "Please select a date."; return false; } 
        else { dateError.textContent = ""; return true; }
    }
    function validateGuests() {
        if (guestsInput.value === "" || guestsInput.value < 1) { guestsError.textContent = "At least 1 guest required."; return false; } 
        else { guestsError.textContent = ""; return true; }
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    destFormInput.addEventListener('change', validateDestination);
    dateInput.addEventListener('change', validateDate);
    guestsInput.addEventListener('input', validateGuests);

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDestValid = validateDestination();
        const isDateValid = validateDate();
        const isGuestsValid = validateGuests();

        if (isNameValid && isEmailValid && isPhoneValid && isDestValid && isDateValid && isGuestsValid) {
            alert(`Booking Confirmed for ${destFormInput.value}! We will contact you soon. 🌴`);
            bookingForm.reset(); 
            bookingModal.hide(); 
        }
    });
});