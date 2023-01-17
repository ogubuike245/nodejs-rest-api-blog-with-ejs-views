const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // GET FORM VALUES
  const title = form.title.value;
  const snippet = form.snippet.value;
  const body = form.body.value;

  try {
    const res = await fetch(`/api/v1/blogs/`, {
      method: "POST",
      body: JSON.stringify({ title, snippet, body }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setTimeout(function () {
      alert(data.message);
      window.location.href = data.redirect;
    }, 3000);
  } catch (err) {
    console.log(err);
  }
});
