import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './api_service';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more_button');
let page = 1;
let query = '';
loadMoreBtn.style.display = 'none';

loadMoreBtn.addEventListener('click', loadMoreHandler);
form.addEventListener('submit', submiteHandler);

async function loadMoreHandler() {
  page += 1;
  try {
    loadMoreBtn.style.display = 'none';
    const { data } = await fetchImages(query, page);
    markupImages(data);
    // lightbox.refresh()
    // console.log(data);
    if (gallery.children.length >= data.totalHits) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.style.display = 'none';
      return;
    }
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    console.log(error);
  }
}

async function submiteHandler(event) {
  page = 1;
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();
  if (!query) return;
  try {
    const { data } = await fetchImages(query);
    if (!data.total) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    markupImages(data);
    // lightbox.refresh()
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    console.log(error);
  }
}
function markupImages(data) {
  const markup = data.hits
    .map(
      hit => `  
      <div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hit.downloads}</b>
    </p>
  </div>
</div>
`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
