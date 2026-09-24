// ========================================
// HYDROSAFE INTRO
// ========================================

const intro = document.querySelector(".intro-screen");

const introShown = sessionStorage.getItem("hydrosafeIntroShown");

if (introShown) {

    // Intro already shown in this browser session
    if (intro) {
        intro.remove();
    }

} else {

    // Mark intro as shown
    sessionStorage.setItem("hydrosafeIntroShown", "true");

    // Wait 5 seconds, then go to Login
    setTimeout(() => {

        if (intro) {
            intro.remove();
        }

        window.location.href = "login.html";

    }, 3000);
}