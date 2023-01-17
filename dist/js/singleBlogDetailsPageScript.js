const trashcan = document.querySelector("button.delete");

trashcan.addEventListener("click", (e) => {
  const endpoint = `/api/v1/blogs/${trashcan.dataset.doc}`;

  fetch(endpoint, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) =>
      setTimeout(function () {
        alert(data.message);
        window.location.href = data.redirect;
      }, 3000)
    )
    .catch((error) => console.log(error));
});
