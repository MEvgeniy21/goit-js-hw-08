// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const galleryRef = document.querySelector('.gallery');

const galleryItemsMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<a class="gallery__item gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`;
  })
  .join('');

galleryRef.innerHTML = galleryItemsMarkup;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
// lightbox.on('show.simplelightbox', function () {
//    // do something…
// });
