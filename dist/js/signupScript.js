const form = document.querySelector("form");
const BASE_URL = document.querySelector("form");
const firstnameError = document.querySelector(".firstname.error");
const lastnameError = document.querySelector(".lastname.error");
const nicknameError = document.querySelector(".nickname.error");
const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // reset errors
  firstnameError.textContent = "";
  lastnameError.textContent = "";
  nicknameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";

  // get values
  const firstname = form.firstname.value;
  const lastname = form.lastname.value;
  const nickname = form.nickname.value;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch(`${BASE_URL.dataset.url}`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        nickname,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      firstnameError.textContent = data.errors.firstname;
      lastnameError.textContent = data.errors.lastname;
      nicknameError.textContent = data.errors.nickname;
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (error) {
    console.log(error);
  }
});
