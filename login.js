document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Simulate successful login (replace with actual login logic)
    const isAuthenticated = true;

    if (isAuthenticated) {
      // Redirect to the user interface page after successful login
      window.location.href = "userinterface.html";
    } else {
      // Handle login failure
      alert("Invalid credentials. Please try again.");
    }
  });
});
