import './css/styles.css';
import Notiflix from 'notiflix';
import fetchPhotos from './fetchPhotos';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { makeGalleryMarkup } from './galleryMarkup';
import { resetMarkup } from './galleryMarkup';

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const perPage = 40;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('is-hidden');

const lightbox = new simpleLightbox('.gallery a', {
  captionData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function onSearch(event) {
  event.preventDefault();
  resetMarkup();

  const searchQuery = event.currentTarget.elements.searchQuery.value;
  if (!searchQuery) {
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  event.currentTarget.elements.searchQuery.value = '';
  await loadPhotos(searchQuery, 1);
}

async function onLoadMore() {
  const { searchQuery, pageNumber } = loadMoreBtn.dataset;
  await loadPhotos(searchQuery, Number(pageNumber) + 1);
}

async function loadPhotos(searchQuery, pageNumber) {
  try {
    const { data, totalHits } = await fetchPhotos(searchQuery, pageNumber);
    // console.log(data);
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }
    if (pageNumber === 1) {
      makeGalleryMarkup(data.hits);
      lightbox.refresh();
      loadMoreBtn.dataset.searchQuery = searchQuery;
      loadMoreBtn.dataset.pageNumber = pageNumber;
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      makeGalleryMarkup(data.hits, true);

      loadMoreBtn.dataset.pageNumber = pageNumber;
      lightbox.refresh();
      loadMoreBtn.classList.remove('is-hidden');
    }
    const lastPage = Math.ceil(totalHits / perPage);
    console.log('lastPage', lastPage);
    console.log('pageNumber', pageNumber);
    if (lastPage === pageNumber) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}
