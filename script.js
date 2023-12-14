const form = document.querySelector("form");
const inputArea = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more-button");
const sarrera = "HUBfBOYAY2krhsIhIpu7c0OgMgGPY3ru198GUXrXBy0";
let page = 1;

search("hello");

async function search(input) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${sarrera}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.text = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  search(inputArea.value);
});

showMoreButton.addEventListener("click", () => {
  search(inputArea.value);
});
