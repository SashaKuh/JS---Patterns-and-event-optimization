import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const ulRef = document.querySelector('.gallery');
let keydownListener = null;
let instance = null;

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

function openModal(source) {
  instance = basicLightbox.create(`
    <img src='${source}' width='800' height='600'> 
  `);
  instance.show();

  keydownListener = (e) => {
    if (e.code === 'Escape') {
      instance.close();
    }
  };

  ulRef.addEventListener('keydown', keydownListener);
}

function onImageClick(e) {
  blockStandardAction(e);

  if (e.target.nodeName != 'IMG') {
    return;
  }

  const source = e.target.dataset.source;
  openModal(source);
}

function blockStandardAction(e) {
  e.preventDefault();
}

function closeModal() {
  if (instance) {
    instance.close();
    instance = null;
  }
  ulRef.removeEventListener('keydown', keydownListener);
}

closeModal();
