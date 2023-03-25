const loginForm = document.querySelector(".loginForm");
const errorInfo = document.querySelector(".gubi-error");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get form values

  const email = loginForm.elements.email.value;

  const password = loginForm.password.value;

  try {
    const res = await fetch(`/api/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorInfo.textContent = data.message;
    }
    if (data.success) {
      location.assign("/");
    }
  } catch (error) {
    console.log(error);
  }
});
