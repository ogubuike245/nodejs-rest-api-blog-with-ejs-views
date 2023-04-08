const createBlogForm = document.querySelector(".create-blog-form");
const Info = document.querySelector(".create-blog-info");

createBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get form values

  const formData = new FormData(event.target);
  const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

  try {
    const res = await fetch(`/api/v1/blog/create/post`, {
      method: "POST",
      body: jsonData,
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      Info.textContent = data.message;
    } else if (data.error) {
      Info.textContent = data.message;
    }
  } catch (error) {
    console.log(error);
  }
});
