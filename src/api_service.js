import axios from 'axios';

const DEFAULT_PARAMS = {
  key: '33031696-4c793a1a13abfabbb42e32b0e',
  orientation: 'horizontal',
  image_type: 'photo',
  safesearch: true,
  per_page: 40,
};

export async function  fetchImages(query = '', page = 1) {
const result = await axios.get('https://pixabay.com/api/', {
  params: {
    ...DEFAULT_PARAMS,
    q: query,
    page,
  }
})
return result;
}
