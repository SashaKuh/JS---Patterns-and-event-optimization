import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const ulRef = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items
    .map(
      (item) => `<div class='gallery__item'>
        <a class='gallery__link' href='${item.original}'>
        <img class='gallery__image' src='${item.preview}' data-source='${
        item.original
      }' alt='${item.description}'/>
         </a>
         </div> `
    )
    .join('');
}

const galleryMarkup = createGalleryMarkup(galleryItems);

ulRef.innerHTML = galleryMarkup;

ulRef.addEventListener('click', onImageClick);

function onImageClick(e) {
  blockStandardAction(e);

  if (e.target.nodeName != 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
    <img src='${e.target.dataset.source}' width='800' height='600'> 
  `); 
  instance.show();

  ulRef.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      instance.close();
    }
  });
}

function blockStandardAction(e) {
  e.preventDefault();
}
