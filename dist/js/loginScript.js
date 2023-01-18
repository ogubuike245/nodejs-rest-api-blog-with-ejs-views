
const form = document.querySelector("form");
const BASE_URL = document.querySelector("form");
const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // reset errors
  emailError.textContent = "";
  passwordError.textContent = "";

  // get values
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch(`${BASE_URL.dataset.url}`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json",
        "Accept":"application/json" },
    });
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
