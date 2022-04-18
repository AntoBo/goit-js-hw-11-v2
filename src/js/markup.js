import cardTemplate from '../hbs/card.hbs';

const galleryEl = document.querySelector('.gallery');

export function newDraw(data) {
  const markup = data.hits.map(cardTemplate);
  galleryEl.innerHTML = markup.join('');
}
