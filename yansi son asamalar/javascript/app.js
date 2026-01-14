document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form"); // Doğru class adı

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Doğru yazım

      let email = loginForm.querySelector("input[type='email']").value;
      let username = email.split("@")[0];

      localStorage.setItem("yansikullanici", username);
      window.location.href = "sosyal.html"; // Yönlendirme
    });
  }
});

function getUser() {
  const u = localStorage.getItem("yansikullanici");
  return u ? u : "Anonim";
}

document.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("username-display");
  if (userBox) userBox.textContent = getUser();
});
