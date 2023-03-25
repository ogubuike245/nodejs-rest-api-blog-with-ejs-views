const signupForm = document.querySelector("form");
const errorInfo = document.querySelector(".gubi-error");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get values
  const firstname = signupForm.firstname.value;
  const lastname = signupForm.lastname.value;
  const email = signupForm.email.value;
  const nickname = signupForm.nickname.value;
  const password = signupForm.password.value;

  console.log(signupForm.firstname.value);

  try {
    const res = await fetch(`/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        nickname,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorInfo.textContent = data.error;
    }
    if (data.user) {
      location.assign("/");
    }
  } catch (error) {
    console.log(error);
  }
});
