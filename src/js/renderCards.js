export default function renderCards(hits, container) {
    console.log('container',container)
    const markup = 
        hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<a class="gallery__item" href="${largeImageURL}">
        <div class="photo-card">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes:</b> </br> ${likes}
                </p>
                <p class="info-item">
                    <b>Views:</b> </br> ${views}
                </p>
                <p class="info-item">
                    <b>Comments:</b> </br> ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads:</b> </br> ${downloads}
                </p>
            </div>
        </div>
        </a>`).join('')
    
    
    container.insertAdjacentHTML('beforeend', markup);
    const lightbox = new SimpleLightbox('.gallery a', {
   
    });
}