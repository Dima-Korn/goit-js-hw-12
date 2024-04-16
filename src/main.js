import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay-api";
import { renderImages, showLoadingAnimation, hideLoadingAnimation, clearGallery } from "./js/render-functions";

const loadMoreBtn = document.querySelector(".load-more-btn");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.querySelector(".search-btn");
searchForm.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", onBtnClick);

const perPage = 15;
let page = 1;
let query = "";

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

async function onFormSubmit(event) {
  event.preventDefault();
  searchBtn.disabled = true;
  showLoadingAnimation();
  clearGallery();
  loadMoreBtn.style.display = "none";
  query = searchInput.value.trim();
  if (query !== "") {
    page = 1;
    try {
      const images = await fetchImages(query, page);
      searchInput.value = "";
      if (!images || !images.data || !images.data.hits || images.data.hits.length === 0 || images.totalHits === 0) {
        iziToast.info({
          title: "Information",
          message: "Вибачте, за вашим запитом не знайдено зображень. Будь ласка, спробуйте ще раз!",
          position: "topRight",
          backgroundColor: "red",
          maxWidth: "500px"
        });
      } else {
        renderImages(images.data.hits);
        lightbox.refresh();
        if (images.data.hits.length < perPage) {
          loadMoreBtn.style.display = "none";
        } else {
          loadMoreBtn.style.display = "block";
        }
      }
    } catch (error) {
      console.error("Помилка під час отримання зображень:", error);
    } finally {
      searchBtn.disabled = false;
      hideLoadingAnimation();
    }
  }
}


async function onBtnClick() {
  page += 1;
  showLoadingAnimation();
  try {
    const images = await fetchImages(query, page);

    renderImages(images.data.hits);

    const totalHits = images.totalHits;

    if ((page * perPage) >= totalHits || images.data.hits.length < perPage) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }

    if (images.data.hits.length < perPage) {
      loadMoreBtn.style.display = "none"; 
    }

    const card = document.querySelector(".gallery-item");

    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        left: 0,
        top: cardHeight * 2,
        behavior: "smooth"
      });
    }
    if (images.data.hits.length === 0 || (totalHits > 0 && page >= Math.ceil(totalHits / perPage))) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        title: "Information",
        message: "Вибачте, але ви досягли кінця результатів пошуку.",
        position: "topRight",
        backgroundColor: "red",
        maxWidth: "500px"
      });
      loadMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    alert(error.message);
  } finally {
    hideLoadingAnimation();
  }
}
