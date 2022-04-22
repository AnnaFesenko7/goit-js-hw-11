const API_KEY = '26884137-1496ffbfb9f3a2601523745ce'
const BASE_URL = 'https://pixabay.com'
   


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
    
    fetchPictures() {
       const url = `${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=40&page=${this.page}&orientation=horizontal&safesearch=true`
        console.log(this)
      return fetch(url)
        .then(r => {
          if(!r.ok) {throw Error(r.statusText);
          }return r.json()})
         .then(data => {
           console.log (data)
           if(data.totalHits===0){throw Error(r.statusText)}
           this.incrementPage()
           return data
         });
      }
      
      incrementPage() {
        this.page += 1;
      }
      resetPage() {
        this.page = 1;
      }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
      }
      

    
}