import './sass/main.scss';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';



import renderCards from './js/renderCards';
import NewsApiService from './js/news-servis';
// import LoadMoreBtn from './js/load-more-btn';


const newsApiService = new NewsApiService()



const refs = {
    searchForm: document.querySelector('.js-search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.js-load-more')
}


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearch(e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage()
    
    
    newsApiService.fetchPictures()
        .then(({ data, page }) => {
        console.log('page',page)
        clearPicturesContainer()
        onFetchMessage(data.totalHits);
        renderCards(data.hits, refs.galleryContainer);
        hasNextPage(data.totalHits, page)
    })
        .catch(onFetchError)
}

function onLoadMore(e) {
    newsApiService.fetchPictures()
    .then(({ data, page }) => {
        renderCards(data.hits, refs.galleryContainer);
        hasNextPage(data.totalHits, page)
    }
    )}

function hasNextPage(totalHits, page) {
    const limit = 40;
    const totalPage = Math.ceil(totalHits / limit);
    console.log('totalPage',totalPage,page)
    if (totalPage > page) {
        refs.loadMoreBtn.classList.remove('is-hidden')
        
    }else{refs.loadMoreBtn.classList.add('is-hidden')}
     
}




function onFetchError() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

function onFetchMessage(totalHits) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
}





function clearPicturesContainer() {
    refs.galleryContainer.innerHTML=''
}


