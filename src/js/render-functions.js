export function showLoadingAnimation() {
  document.querySelector('.loader').style.display = 'block';
}

export function hideLoadingAnimation() {
  document.querySelector('.loader').style.display = 'none';
}

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt'
});
const gallery = document.querySelector(".gallery");

function galleryItemsMarkup(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, id }) =>
      `<li class="gallery-item">
          <a href="${largeImageURL}" id="image-${id}">
              <img src="${webformatURL}" alt="${tags}" width="360">
          </a>
          <div class="image-specs">
              <div class="specs-box"><p>Likes</p><p>${likes}</p></div>
              <div class="specs-box"><p>Views</p><p>${views}</p></div>
              <div class="specs-box"><p>Comments</p><p>${comments}</p></div>
              <div class="specs-box"><p>Downloads</p><p>${downloads}</p></div>
          </div>
      </li>`
  ).join('');
}

export function renderImages(images) {
  const newImagesMarkup = galleryItemsMarkup(images);
  gallery.insertAdjacentHTML("beforeend", newImagesMarkup);
  lightbox.refresh();
}

export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = "";
  }
}
