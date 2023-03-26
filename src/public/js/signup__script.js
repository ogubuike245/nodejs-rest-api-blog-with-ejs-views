const signupForm = document.querySelector("form");
const errorInfo = document.querySelector(".gubi-error");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get values
  const firstname = signupForm.firstname.value;
  const lastname = signupForm.lastname.value;
  const profession = signupForm.profession.value;
  const email = signupForm.email.value;
  const nickname = signupForm.nickname.value;
  const password = signupForm.password.value;

  try {
    const res = await fetch(`/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        nickname,
        password,
        profession,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorInfo.textContent = data.message;
    }
    if (data.user) {
      errorInfo.textContent = data.message;
      setTimeout(() => {
        location.assign("/");
      }, 600);
    }
  } catch (error) {
    console.log(error);
  }
});
