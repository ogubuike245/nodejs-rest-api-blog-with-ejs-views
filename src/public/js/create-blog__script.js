const createBlogForm = document.querySelector(".createBlogForm");
const errorInfo = document.querySelector(".gubi-error");

createBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get form values
  const title = createBlogForm.elements.title.value;
  const category = createBlogForm.elements.category.value;
  const snippet = createBlogForm.elements.snippet.value;
  const content = createBlogForm.elements.content.value;

  try {
    const res = await fetch(`/api/v1/blog/create/post`, {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        snippet,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
