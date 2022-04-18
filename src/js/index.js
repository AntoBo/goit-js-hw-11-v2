import '../sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import dataFoundAlert from './notify.js';
import getPictures from './fetch.js';
import * as Markup from './markup';
import * as TUI from './tui-pagination';

//get controls
const el = {
  formSearch: document.querySelector('#search-form'),
  endResultsText: document.querySelector('.end-results'),
  newSearchLink: document.querySelector('.new-search'),
};

let lightbox = new SimpleLightbox('.gallery a');

//listeners
el.formSearch.addEventListener('submit', onSearchSubmit);

//search vars
const search = {
  query: '',
  page: null,
};

//click handlers
//search
async function onSearchSubmit(event) {
  event.preventDefault();
  search.query = el.formSearch.searchQuery.value;

  //async part
  try {
    search.page = 1;

    //fetch data per page 1
    const data = await getPictures(search.query, search.page);

    //check if search result is not 0 and notify
    dataFoundAlert(data);

    //TUI pagination inside!
    const pagination = new Pagination('pagination', TUI.getOptions(data.totalHits));
    TUI.container.classList.remove('hidden');
    pagination.on('afterMove', event => {
      onPaginationClick(search.query, event.page);
    });

    //draw data here
    Markup.newDraw(data);

    //upd lightbox
    lightbox.refresh();
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}

async function onPaginationClick(query, page) {
  const data = await getPictures(query, page);
  Markup.newDraw(data);
  lightbox.refresh();
}
