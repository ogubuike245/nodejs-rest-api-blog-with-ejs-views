const arrowBack = document.querySelector("a.goBack");
const form = document.querySelector("form");

arrowBack.addEventListener("click", () => {
  window.history.back();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // GET VALUES FROM THE FORM
  const title = form.title.value;
  const snippet = form.snippet.value;
  const body = form.body.value;

  try {
    const res = await fetch(`/api/v1/blogs/edit/${form.dataset.doc}`, {
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
