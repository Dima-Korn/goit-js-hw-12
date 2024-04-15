export function showLoadingAnimation() {
    document.querySelector('.loader').style.display = 'block';
  }
  
  export function hideLoadingAnimation() {
    document.querySelector('.loader').style.display = 'none';
  }
  
  export function clearGallery() {
    document.querySelector('.gallery').innerHTML = '';
  }
  
  export function renderGalleryItems(images) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = images.map(image => createMarkup(image)).join('');
  }
  
  function createMarkup({
    id,
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<li class="gallery-item">
      <a href="${largeImageURL}" id="image-${id}">
          <img src="${webformatURL}" alt="${tags}" width="360">
      </a>
      <div class="image-specs">
      <div class="specs-box"><p>Likes</p><p>${likes}</p></div>
      <div class="specs-box"><p>Views</p><p>${views}</p></div>
      <div class="specs-box"><p>Comments</p><p>${comments}</p></div>
      <div class="specs-box"><p>Downloads</p><p>${downloads}</p></div>
      </div>
  </li>`;
  }
  