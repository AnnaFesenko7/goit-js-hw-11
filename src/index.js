import './sass/main.scss';
// import pictureCard from './partials/picture-card';
// import pictureCard from './partials/picture-card';
import NewsApiService from './js/news-servis';
import Notiflix from 'notiflix';

const newsApiService = new NewsApiService()



const refs = {
    searchForm: document.querySelector('.js-search-form'),
    showGallery: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('.js-load-more')
}

refs.loadMoreBtn.classList.add('.is-hidden');
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage()
    
    
    newsApiService.fetchPictures().then(data => {
        clearPicturesContainer()
        onFetchMessage(data.totalHits);
        renderCards(data.hits);
        refs.loadMoreBtn.classList.remove('.is-hidden');
        console.log(refs.loadMoreBtn)
    })
        .catch(onFetchError)
}

function onLoadMore(e) {
    newsApiService.fetchPictures().then(renderCards)
}


function onFetchError() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function onFetchMessage(totalHits) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
}



function renderCards(hits) {
    const markup = 
        hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
            `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes:${likes}</b>
        </p>
        <p class="info-item">
            <b>Views:${views}</b>
        </p>
        <p class="info-item">
            <b>Comments:${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads:${downloads}</b>
        </p>
    </div>
</div>`).join('')
    
    
    refs.showGallery.insertAdjacentHTML('beforeend', markup);
}

function clearPicturesContainer() {
    refs.showGallery.innerHTML=''
}