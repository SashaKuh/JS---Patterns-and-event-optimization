import { galleryItems } from './gallery-items.js';

const ulRef = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  const galleryMarkup = items
    .map(
      (item) => `<div class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
        </a>
      </div>`
    )
    .join('');

  ulRef.insertAdjacentHTML('afterbegin', galleryMarkup);
}

function onImageClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  e.preventDefault();
}

createGalleryMarkup(galleryItems);

ulRef.addEventListener('click', onImageClick);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
