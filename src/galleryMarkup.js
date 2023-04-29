const gallery = document.querySelector('.gallery');

export function makeGalleryMarkup(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card"><a class="img-link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
      <div class="info">
          <p class="info-item">
          <b>Likes </b><span>${likes}</span>
          </p>
          <p class="info-item">
                  <b>Views </b><span>${views}</span>
          </p>
          <p class="info-item">
          <b>Comments </b><span>${comments}</span>
          </p>
          <p class="info-item">
          <b>Downloads </b><span>${downloads}</span>
          </p>
      </div>
      </div>`
    )
    .join('');
  addMarkup(gallery, markup);
}

export function resetMarkup() {
  gallery.innerHTML = '';
}

function addMarkup(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}
