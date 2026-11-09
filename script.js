
"use strict";

// =====================================
// 1. MOBILE NAVIGATION
// =====================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}


// =====================================
// 2. TUTOR AND SUBJECT SELECTION
// =====================================

const tutorSelect = document.getElementById("tutor");
const subjectSelect = document.getElementById("subject");

const tutorSubjects = {
    "Ayesha": ["Computer Science"],
    "Nimra": ["English", "Biology"],
    "Muhammad Ahmad": ["Mathematics", "Physics"],
    "Warda": ["Chemistry"],
    "Iram": ["Urdu", "Pakistan Studies"],
    "Fozia": [
        "Islamiat",
        "Quran with Tajweed",
        "Translation of the Holy Quran"
    ]
};

function updateSubjects() {
    if (!tutorSelect || !subjectSelect) return;

    const tutor = tutorSelect.value;
    const subjects = tutorSubjects[tutor] || [];

    subjectSelect.innerHTML =
        '<option value="">Choose a subject</option>';

    subjects.forEach(subject => {
        const option = document.createElement("option");

        option.value = subject;
        option.textContent = subject;

        subjectSelect.appendChild(option);
    });

    subjectSelect.disabled = subjects.length === 0;

    if (subjects.length === 1) {
        subjectSelect.value = subjects[0];
    }
}

if (tutorSelect && subjectSelect) {

    tutorSelect.addEventListener("change", updateSubjects);

    updateSubjects();

    document.querySelectorAll("[data-tutor]").forEach(link => {

        link.addEventListener("click", () => {

            tutorSelect.value = link.dataset.tutor;

            updateSubjects();

        });

    });
}


// =====================================
// 3. BRIGHTPATH ACADEMY INQUIRY FORM
// =====================================

const inquiryForm = document.getElementById("studentInquiryForm");
const formStatus = document.getElementById("formStatus");

if (inquiryForm) {

    inquiryForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        // Check required fields
        if (!inquiryForm.reportValidity()) {
            return;
        }

        const submitButton = inquiryForm.querySelector(
            'button[type="submit"]'
        );

        if (!submitButton) return;

        // Prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        if (formStatus) {
            formStatus.style.color = "#493b94";
            formStatus.textContent = "Please wait! Sending your inquiry...";
        }

        try {

            // Collect all form information
            const formData = new FormData(inquiryForm);

            const data = Object.fromEntries(formData.entries());

            // Send information to FormSubmit
            const response = await fetch(inquiryForm.action, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                body: JSON.stringify(data)

            });

            // Read server response
            const result = await response.json();

            console.log("FormSubmit HTTP Status:", response.status);
            console.log("FormSubmit Result:", result);

            // Confirm successful submission
            const success =
                response.ok &&
                (
                    result.success === true ||
                    String(result.success).toLowerCase() === "true"
                );

            if (!success) {

                throw new Error(
                    result.message ||
                    result.error ||
                    "The server could not confirm your submission."
                );

            }

            // Success message
            if (formStatus) {

                formStatus.style.color = "green";

                formStatus.textContent =
                    "Thank you! Your inquiry has been sent successfully.";

            }

            // Redirect to thank-you page
            setTimeout(() => {

                window.location.href =
                    "https://ayeshazafarcs-774.github.io/BrightPath-Academy/thank-you.html";

            }, 1500);

        }

        catch (error) {

            console.error("Inquiry Error:", error);

            if (formStatus) {

                formStatus.style.color = "#d93025";

                formStatus.textContent =
                    "Unable to send your inquiry. " +
                    error.message +
                    " Please try again or contact us through WhatsApp.";

            }

            submitButton.disabled = false;

            submitButton.textContent = "Send My Inquiry ↗";

        }

    });

}


// =====================================
// 4. IMAGE FALLBACK
// =====================================

document.querySelectorAll(".teacher-photo img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.display = "none";

        if (img.parentElement.querySelector(".image-placeholder")) {
            return;
        }

        const placeholder = document.createElement("div");

        placeholder.className = "image-placeholder";
        placeholder.textContent = "✦";

        placeholder.style.cssText = `
            display: grid;
            place-items: center;
            height: 100%;
            font-size: 80px;
            color: #493b94;
        `;

        img.parentElement.appendChild(placeholder);

    });

});


// =====================================
// 5. AUTOMATIC FOOTER YEAR
// =====================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}
