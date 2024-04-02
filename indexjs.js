document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const switchToSignupLink = document.getElementById("switch-to-signup");
  const switchToLoginLink = document.getElementById("switch-to-login");

  switchToSignupLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });

  switchToLoginLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle login form submission
    // You can add your login logic here
    console.log("Login form submitted");
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle signup form submission
    // You can add your signup logic here
    console.log("Sign up form submitted");
  });
});
