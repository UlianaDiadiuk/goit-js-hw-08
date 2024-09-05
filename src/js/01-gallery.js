// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const galleryArray = createGallery(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryArray);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

gallery.addEventListener("click", onImageClick);

function onImageClick(e) {
  e.preventDefault();
  if (e.target.tagName !== "IMG") {
    return;
  }
  
  const fullSizeImage = e.target.getAttribute("data-source");


  const instance = basicLightbox.create(
    `<div class="modal">
       <img src = "${fullSizeImage}" />
    </div>`, {
    onShow: (instance) => {document.addEventListener('keydown', modalClose)},
    onClose: (instance) => { document.removeEventListener('keydown', modalClose)}
  })

  instance.show();

  gallery.addEventListener('keydown', modalClose);
  
 function modalClose(e) {
    if (e.code === "Escape") {
      document.removeEventListener("keydown", e);
      instance.close();
   }
}
};

