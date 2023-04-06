const editBlogForm = document.querySelector(".editBlogForm");
const Info = document.querySelector(".gubi-info");

editBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = event.target.action;
  const formData = new FormData(event.target);
  const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

  try {
    const res = await fetch(url, {
      method: "POST",
      body: jsonData,
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      window.location.reload();
    } else if (data.error) {
      Info.textContent = data.message;
    }
  } catch (error) {
    console.log(error);
  }
});
