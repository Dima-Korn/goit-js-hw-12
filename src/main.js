import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

document.addEventListener("DOMContentLoaded", () => {
  const loadMoreBtn = document.querySelector(".load-more-btn");
  const searchForm = document.getElementById("search-form");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", onBtnClick);
  }

  if (searchForm) {
    searchForm.addEventListener("submit", onFormSubmit);
  }
});

let page = 1;
let query = "";
const perPage = 15;

async function onFormSubmit(event) {
  event.preventDefault();
  showLoader();
  clearGallery();
  const searchInput = document.getElementById("search-input");
  query = searchInput.value.trim();
  if (query !== "") {
    page = 1;
    try {
      const images = await fetchImages(query, page);

      if (page * perPage >= images.totalHits) {
        console.log("last");
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
      searchInput.value = "";
      if (!images || !images.hits) {
        iziToast.info({
          title: "Information",
          message: "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
          backgroundColor: "red",
          maxWidth: "500px"
        });
        loadMoreBtn.style.display = "none";
      } else {
        renderImages(images.hits);
        // Оновлюємо галерею після додавання нових елементів
        lightbox.refresh();
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      // Приховуємо індикатор завантаження
      hideLoader();
    }
  }
}


async function onBtnClick() {
  page += 1;
  showLoader();
  try {
    const images = await fetchImages(query, page);

    if ((page * 15) >= images.totalHits) {
      loadMoreBtn.style.display = "none";
    }
    renderImages(images.hits);

    const totalHits = images.totalHits;
    const card = document.querySelector(".gallery-item");

    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        left: 0,
        top: cardHeight * 2,
        behavior: "smooth"
      });
    }
    if (images.length === 0 || (totalHits > 0 && page >= Math.ceil(totalHits / 15))) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        title: "Information",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
        backgroundColor: "red",
        maxWidth: "500px"
      });
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    alert(error.message);
  } finally {
    hideLoader();
  }
}

function showLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "block";
  }
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }
}

function clearGallery() {
  const gallery = document.querySelector(".gallery");
  if (gallery) {
    gallery.innerHTML = "";
  }
}
