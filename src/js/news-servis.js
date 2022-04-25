// import {loadMoreBtn} from '../index.js'

const API_KEY = '26884137-1496ffbfb9f3a2601523745ce'
const BASE_URL = 'https://pixabay.com'
   


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
  }
    
  // fetchPictures() {
  //     this.incrementPage()
  //      const url = `${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=40&page=${this.page}&orientation=horizontal&safesearch=true`
  //       console.log(this)
  //     return fetch(url)
  //       .then(r => {
  //         if(!r.ok) {throw Error(r.statusText);
  //         }return r.json()})
  //        .then(data => {
  //          console.log ('new-servis',data)
  //          if(data.totalHits===0){throw Error(r.statusText)}
  //         
  //          return {data, page:this.page}
  //        });
  // }
  async fetchPictures() {
    this.incrementPage()
    const url = `${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=40&page=${this.page}&orientation=horizontal&safesearch=true`
    try {
      const r = await fetch(url);
    
    const data = await r.json()
    if (data.totalHits === 0) { throw Error(r.statusText) }
    return {data, page:this.page}
    } catch (error) {throw Error(r.statusText)}
    
  }
  

  
      
      incrementPage() {
      return  this.page += 1;
        // loadMoreBtn.page = this.page;
      }
      resetPage() {
        this.page = 0;
      }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
      }
      

    
}