const editBlogForm = document.querySelector(".editBlogForm");
const Info = document.querySelector(".gubi-info");

editBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // get form values

  const formData = new FormData(event.target);
  const url = event.target.action;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.success) {
      Info.textContent = data.message;
    } else if (data.error) {
      Info.textContent = data.message;
    }
  } catch (error) {
    console.log(error);
  }
});

// const form = document.querySelector(".editBlogForm");
// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const formData = new FormData(event.target);
//   const url = event.target.action;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     // Update the DOM with the new blog post data
//     const title = document.querySelector("#title");
//     const category = document.querySelector("#category");
//     const snippet = document.querySelector("#snippet");
//     const content = document.querySelector("#content");

//     title.value = data.blog.title;
//     category.value = data.blog.category;
//     snippet.value = data.blog.snippet;
//     content.value = data.blog.content;

//     const message = document.querySelector(".gubi-info");
//     message.textContent = "Blog post updated successfully!";
//   } catch (error) {
//     console.error(`Error: ${error.message}`);

//     const message = document.querySelector(".gubi-info");
//     message.textContent = "An error occurred while updating the blog post!";
//   }
// });
