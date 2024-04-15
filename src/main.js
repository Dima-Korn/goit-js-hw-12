import { fetchData } from '../src/js/pixabay-api.js';
import {
  showLoadingAnimation,
  hideLoadingAnimation,
  clearGallery,
  renderGalleryItems,
} from '../src/js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const searchButton = document.querySelector('.search-btn');
const lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = searchInput.value;
  if (searchQuery.length >= 3) {
    clearGallery();
    showLoadingAnimation();
    fetchData(searchQuery)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.info({
            title: 'Sorry',
            message: 'There are no images matching your search query. Please try again!',
            position: 'topCenter',
          });
        } else {
          renderGalleryItems(data.hits);
          lightbox.refresh();
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        hideLoadingAnimation();
      });
  }
});

searchInput.addEventListener('input', function () {
  searchButton.disabled = searchInput.value.length < 3;
});
