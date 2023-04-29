import axios from 'axios';

export default async function fetchPhotos(searchQuery, pageNumber) {
  const API_KEY = '35840272-25b71e9b06347bf3cb03a4874';
  const BASE_URL = 'https://pixabay.com/api/';

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`;

  const response = await fetch(url);
  const data = await response.json();

  return { data, totalHits: data.totalHits };
}
