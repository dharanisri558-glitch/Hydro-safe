// ========================================
// HYDROSAFE - MAIN JAVASCRIPT
// ========================================


// ========================================
// FIREBASE IMPORTS
// ========================================

import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "./firebase.js";


// ========================================
// 1. WATER TDS ANALYSIS
// ========================================

function analyzeWater() {

    const tdsInput =
        document.getElementById("tdsInput");

    const errorMessage =
        document.getElementById("analysisError");

    const resultSection =
        document.getElementById("resultSection");

    const resultTds =
        document.getElementById("resultTds");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultDescription =
        document.getElementById("resultDescription");

    const resultTechnology =
        document.getElementById("resultTechnology");

    const resultCondition =
        document.getElementById("resultCondition");

    const resultReason =
        document.getElementById("resultReason");


    // Make sure this code only runs on analysis page

    if (!tdsInput) {
        return;
    }


    const tds =
        Number(tdsInput.value);


    // ========================================
    // VALIDATE TDS
    // ========================================

    if (
        tdsInput.value === "" ||
        tds < 0 ||
        tds > 2000
    ) {

        if (errorMessage) {
            errorMessage.textContent =
                "Please enter a valid TDS value between 0 and 2000 ppm.";
        }

        if (resultSection) {
            resultSection.style.display = "none";
        }

        return;
    }


    if (errorMessage) {
        errorMessage.textContent = "";
    }


    let condition;
    let technology;
    let description;
    let reason;


    // ========================================
    // TDS RULES
    // ========================================

    if (tds <= 150) {

        condition =
            "Good";

        technology =
            "UV";

        description =
            "Your water has a relatively low TDS level.";

        reason =
            "For lower TDS water, UV purification can help address microorganisms while retaining dissolved minerals.";

    }

    else if (tds <= 300) {

        condition =
            "Excellent";

        technology =
            "UV + UF";

        description =
            "Your water has a moderate TDS level.";

        reason =
            "UV can help address microorganisms while UF provides additional filtration without relying on RO.";

    }

    else if (tds <= 600) {

        condition =
            "Moderate";

        technology =
            "RO + UV";

        description =
            "Your water has a higher TDS level.";

        reason =
            "Higher TDS water may require RO to reduce dissolved solids, with UV providing additional microbial treatment.";

    }

    else {

        condition =
            "Poor";

        technology =
            "RO + UV + UF";

        description =
            "Your water has a very high TDS level.";

        reason =
            "Very high TDS may require multi-stage purification combining RO with additional filtration technologies.";

    }


    // ========================================
    // DISPLAY RESULTS
    // ========================================

    if (resultTds) {
        resultTds.textContent =
            tds + " ppm";
    }

    if (resultTitle) {
        resultTitle.textContent =
            "Your Water Analysis Result";
    }

    if (resultDescription) {
        resultDescription.textContent =
            description;
    }

    if (resultTechnology) {
        resultTechnology.textContent =
            technology;
    }

    if (resultCondition) {
        resultCondition.textContent =
            condition;
    }

    if (resultReason) {
        resultReason.textContent =
            reason;
    }


    // ========================================
    // SAVE LATEST ANALYSIS
    // FOR DASHBOARD
    // ========================================

    localStorage.setItem(
        "hydrosafeLatestAnalysis",
        JSON.stringify({
            tds: tds,
            condition: condition,
            technology: technology
        })
    );


    // ========================================
    // SHOW RESULT
    // ========================================

    if (resultSection) {

        resultSection.style.display =
            "block";


        // Scroll to result

        resultSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ========================================
// 2. USER LOGIN
// ========================================

async function loginUser() {

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    const message =
        document.getElementById("loginMessage");


    // Make sure this code only runs on login page

    if (
        !emailInput ||
        !passwordInput ||
        !message
    ) {
        return;
    }


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    // ========================================
    // VALIDATE FIELDS
    // ========================================

    if (
        email === "" ||
        password === ""
    ) {

        message.textContent =
            "Please enter your email and password.";

        message.style.color =
            "#D62828";

        return;
    }


    try {

        message.textContent =
            "Logging in...";

        message.style.color =
            "#777";


        // ========================================
        // FIREBASE LOGIN
        // ========================================

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        message.textContent =
            "Login successful!";

        message.style.color =
            "#16A34A";


        // ========================================
        // SAVE LOGIN STATUS
        // ========================================

        sessionStorage.setItem(
            "hydrosafeLoggedIn",
            "true"
        );


        // ========================================
        // GO TO HOME
        // ========================================

        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 800);

    }


    catch (error) {

        console.error(
            "Login error:",
            error
        );


        message.style.color =
            "#D62828";


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            message.textContent =
                "Invalid email or password.";

        }

        else if (
            error.code ===
            "auth/user-not-found"
        ) {

            message.textContent =
                "No account found with this email.";

        }

        else if (
            error.code ===
            "auth/wrong-password"
        ) {

            message.textContent =
                "Incorrect password.";

        }

        else {

            message.textContent =
                "Login failed. Please try again.";

        }

    }

}


// ========================================
// 3. USER SIGNUP
// ========================================

async function signupUser() {

    const nameInput =
        document.getElementById("signupName");

    const emailInput =
        document.getElementById("signupEmail");

    const passwordInput =
        document.getElementById("signupPassword");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const message =
        document.getElementById("signupMessage");


    // Make sure this code only runs on signup page

    if (
        !nameInput ||
        !emailInput ||
        !passwordInput ||
        !confirmPasswordInput ||
        !message
    ) {
        return;
    }


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    // ========================================
    // VALIDATE FIELDS
    // ========================================

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.textContent =
            "Please fill in all fields.";

        message.style.color =
            "#D62828";

        return;
    }


    // ========================================
    // PASSWORD LENGTH
    // ========================================

    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        message.style.color =
            "#D62828";

        return;
    }


    // ========================================
    // CONFIRM PASSWORD
    // ========================================

    if (
        password !== confirmPassword
    ) {

        message.textContent =
            "Passwords do not match.";

        message.style.color =
            "#D62828";

        return;
    }


    try {

        message.textContent =
            "Creating your account...";

        message.style.color =
            "#777";


        // ========================================
        // CREATE FIREBASE ACCOUNT
        // ========================================

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );


        message.textContent =
            "Account created successfully!";

        message.style.color =
            "#16A34A";


        // ========================================
        // GO TO LOGIN PAGE
        // ========================================

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1000);

    }


    catch (error) {

        console.error(
            "Signup error:",
            error
        );


        message.style.color =
            "#D62828";


        if (
            error.code ===
            "auth/email-already-in-use"
        ) {

            message.textContent =
                "An account already exists with this email.";

        }

        else if (
            error.code ===
            "auth/invalid-email"
        ) {

            message.textContent =
                "Please enter a valid email address.";

        }

        else if (
            error.code ===
            "auth/weak-password"
        ) {

            message.textContent =
                "Please choose a stronger password.";

        }

        else {

            message.textContent =
                "Unable to create account. Please try again.";

        }

    }

}


// ========================================
// 4. BUTTON EVENT LISTENERS
// ========================================


// Signup button

const signupButton =
    document.getElementById("signupButton");

if (signupButton) {

    signupButton.addEventListener(
        "click",
        signupUser
    );

}


// Login button

const loginButton =
    document.getElementById("loginButton");

if (loginButton) {

    loginButton.addEventListener(
        "click",
        loginUser
    );

}


// Analyze button

const analyzeButton =
    document.getElementById("analyzeButton");

if (analyzeButton) {

    analyzeButton.addEventListener(
        "click",
        analyzeWater
    );

}


// ========================================
// 5. PASSWORD SHOW / HIDE
// ========================================

function setupPasswordToggle(
    inputId,
    toggleId
) {

    const passwordInput =
        document.getElementById(inputId);

    const toggleButton =
        document.getElementById(toggleId);


    if (
        !passwordInput ||
        !toggleButton
    ) {

        return;

    }


    toggleButton.addEventListener(
        "click",
        () => {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

                const icon =
                    toggleButton.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-eye"
                    );

                    icon.classList.add(
                        "fa-eye-slash"
                    );

                }

            }

            else {

                passwordInput.type =
                    "password";

                const icon =
                    toggleButton.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-eye-slash"
                    );

                    icon.classList.add(
                        "fa-eye"
                    );

                }

            }

        }
    );

}


// ========================================
// SIGNUP PASSWORD
// ========================================

setupPasswordToggle(
    "signupPassword",
    "signupPasswordToggle"
);


// ========================================
// CONFIRM PASSWORD
// ========================================

setupPasswordToggle(
    "confirmPassword",
    "confirmPasswordToggle"
);


// ========================================
// LOGIN PASSWORD
// ========================================

setupPasswordToggle(
    "loginPassword",
    "loginPasswordToggle"
);


// ========================================
// 6. PASSWORD SHOW / HIDE
// SUPPORTS data-target BUTTONS
// ========================================

const passwordToggleButtons =
    document.querySelectorAll(
        ".password-toggle"
    );


passwordToggleButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );

                const passwordInput =
                    document.getElementById(
                        targetId
                    );


                if (!passwordInput) {
                    return;
                }


                const icon =
                    button.querySelector("i");


                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );

                    }

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                }

                else {

                    passwordInput.type =
                        "password";

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );

                    }

                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    }
);


// ========================================
// 7. FIND MY PURIFIER
// ========================================

function findMyPurifier() {

    const tdsInput =
        document.getElementById("finderTds");

    const waterSource =
        document.getElementById("waterSource");

    const familySize =
        document.getElementById("familySize");

    const budget =
        document.getElementById("budget");

    const result =
        document.getElementById("finderResult");

    const technology =
        document.getElementById("finderTechnology");

    const explanation =
        document.getElementById("finderExplanation");


    // Make sure this code only runs
    // when Find My Purifier section exists

    if (
        !tdsInput ||
        !waterSource ||
        !familySize ||
        !budget ||
        !result ||
        !technology ||
        !explanation
    ) {

        return;

    }


    const tds =
        Number(tdsInput.value);

    const source =
        waterSource.value;

    const family =
        familySize.value;

    const selectedBudget =
        budget.value;


    // ========================================
    // VALIDATION
    // ========================================

    if (
        tdsInput.value === "" ||
        tds < 0 ||
        tds > 2000
    ) {

        alert(
            "Please enter a valid TDS value between 0 and 2000 ppm."
        );

        return;
    }


    if (source === "") {

        alert(
            "Please select your water source."
        );

        return;
    }


    if (family === "") {

        alert(
            "Please select your family size."
        );

        return;
    }


    if (selectedBudget === "") {

        alert(
            "Please select your preferred budget."
        );

        return;
    }


    // ========================================
    // PURIFICATION TECHNOLOGY
    // MAINLY BASED ON TDS
    // ========================================

    let recommendedTechnology;
    let reason;


    if (tds <= 150) {

        recommendedTechnology =
            "UV Purifier";

        reason =
            "Your TDS level is relatively low, so a UV-based purification solution may be suitable for your water condition.";

    }

    else if (tds <= 300) {

        recommendedTechnology =
            "UV + UF Purifier";

        reason =
            "Your TDS level falls in the moderate range, so a UV + UF purification solution may provide additional filtration.";

    }

    else if (tds <= 600) {

        recommendedTechnology =
            "RO + UV Purifier";

        reason =
            "Your TDS level is higher, so an RO-based solution with UV may be appropriate for reducing dissolved solids and providing additional treatment.";

    }

    else {

        recommendedTechnology =
            "RO + UV + UF Purifier";

        reason =
            "Your TDS level is very high, so a multi-stage RO + UV + UF solution may be appropriate.";

    }


    // ========================================
    // ADD WATER SOURCE INFORMATION
    // ========================================

    let sourceText;


    if (source === "municipal") {

        sourceText =
            "Your selected source is municipal water.";

    }

    else if (source === "borewell") {

        sourceText =
            "Your selected source is borewell water.";

    }

    else if (source === "tanker") {

        sourceText =
            "Your selected source is tanker water.";

    }

    else {

        sourceText =
            "You are unsure about your water source.";

    }


    // ========================================
    // DISPLAY RESULT
    // ========================================

    technology.textContent =
        recommendedTechnology;


    explanation.textContent =
        reason + " " +
        sourceText +
        " Family size and budget have also been considered as household preferences.";


    // ========================================
    // SHOW RESULT
    // ========================================

    result.style.display =
        "flex";


    // ========================================
    // SAVE RECOMMENDATION
    // ========================================

    localStorage.setItem(
        "hydrosafePurifierFinderResult",
        JSON.stringify({

            tds: tds,

            technology:
                recommendedTechnology,

            waterSource:
                source,

            familySize:
                family,

            budget:
                selectedBudget

        })
    );


    // ========================================
    // SCROLL TO RESULT
    // ========================================

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ========================================
// FIND PURIFIER BUTTON
// ========================================

const findPurifierButton =
    document.getElementById(
        "findPurifierButton"
    );


if (findPurifierButton) {

    findPurifierButton.addEventListener(
        "click",
        findMyPurifier
    );

}


// ========================================
// 8. CONTACT FORM
// ========================================

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("contactName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("contactEmail")
                    .value
                    .trim();

            const subject =
                document
                    .getElementById("contactSubject")
                    .value
                    .trim();

            const message =
                document
                    .getElementById("contactMessage")
                    .value
                    .trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                alert(
                    "Please fill in all the fields."
                );

                return;
            }


            const emailBody =
`Hello HydroSafe Team,

Name: ${name}
Email: ${email}

Message:
${message}

Thank you.`;


            const mailtoLink =
                "mailto:hydrosafe.oo1@gmail.com" +
                "?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(emailBody);


            window.location.href =
                mailtoLink;

        }
    );

}


// ========================================
// IMPORTANT
// ========================================
// DO NOT PUT THE INTRO REDIRECT HERE.
// The intro is handled by intro.js.
// ========================================
