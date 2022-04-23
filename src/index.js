import './sass/main.scss';
// import pictureCard from './partials/picture-card';
import renderCards from './js/renderCards';
import NewsApiService from './js/news-servis';
import LoadMoreBtn from './js/load-more-btn';
import Notiflix from 'notiflix';

const newsApiService = new NewsApiService()



const refs = {
    searchForm: document.querySelector('.js-search-form'),
    showGallery: document.querySelector('.js-gallery'),
    loadMore: document.querySelector('.js-load-more')
}


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage()
    
    
    newsApiService.fetchPictures().then(data => {
        clearPicturesContainer()
        onFetchMessage(data.totalHits);
        renderCards(data.hits, refs.showGallery);
        // refs.loadMoreBtn.classList.remove('is-hidden');
        // console.log(refs.loadMore)
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





function clearPicturesContainer() {
    refs.showGallery.innerHTML=''
}