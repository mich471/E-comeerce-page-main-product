//Cambio de cantidad de articulos ingresados por el usuario

let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click',() =>{
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log( userInputNumber);
});

minusBtn.addEventListener('click', () => {
    userInputNumber--;
    if (userInputNumber <= 0) {
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber)
});

//Agregar el total de productos cuando se preciona el boton ADD TO CART

const addTocartbtn = document.querySelector('.input__button');
let cartNotification = document.querySelector('.header__cart--notication');
let lastValue = parseInt(cartNotification.innerText);


addTocartbtn.addEventListener('click', () => {
    lastValue = lastValue + userInputNumber;
    
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal();// funcion que agrega el html del detalle del producto 
    // priceModal.innerHTML = `$125.00 x ${lastValue} <span>$${lastValue*125}.00</span>`   
})

// Mostrar el modal con el detalle del carrito.

const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
// let priceModal = document.querySelector('.cart-modal__price')
const productContainer = document.querySelector('.cart-modal__checkout-container'); 


cartIconBtn.addEventListener('click', () => {
    cartModal.classList.toggle('show');
    if (lastValue === 0) {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    }else {
        drawProductInModal();
    }
//priceModal.innerHTML = `$125.00 x ${lastValue} <span>$${lastValue*125}.00</span>`

});

// Event listener para cerrar el modal al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (!cartModal.contains(event.target) && !cartIconBtn.contains(event.target)) {
        cartModal.classList.remove('show');
    }
});

//Borrar el contenido del carrito.
function deleteProduct() {
    const deleteProduct = document.querySelector('.cart-modal__delete');

    deleteProduct.addEventListener('click', () => {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
   
}

// Cambiar imagenes cuando se presionan los botones flecha

const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageContainer);
});

previusGalleryBtn.addEventListener('click', () => {
    changePreviusImage(imageContainer);
});

//Mostrar modal de imagenes cuando click en la imagen principal 
const imagesModal = document.querySelector('.modal-gallery__backgroung')
const closeModalBtn = document.querySelector('.modal-gallery__close')

imageContainer.addEventListener('click', () => {
    if (window.innerWidth < 768) {
        imagesModal.style.display = 'none';
    } else {
        imagesModal.style.display = 'grid';
    }
});


closeModalBtn.addEventListener('click', () => {
    imagesModal.style.display = 'none';
})

//Cambiar las imagenes principipales desde las imagenes miniaturas

let thumbnails = document.querySelectorAll('.gallery__thumail'); // Utiliza querySelectorAll para seleccionar todos los elementos
thumbnails = [...thumbnails];

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event => { // Cambia "Event" a "event"
        console.log(event.target.id); // Utiliza "event" en lugar de "Event"
        imageContainer.style.backgroundImage = `url('./images/image-product-${event.target.id}.jpg')`
    });
});

//Cambiar las imagenes principipales en el modal 
const modalImageContainer = document.querySelector('.modal-gallery__image-container')
let modalThumbnails = document.querySelectorAll('.modal-gallery__thumail'); // Utiliza querySelectorAll para seleccionar todos los elementos
modalThumbnails = [...modalThumbnails];

modalThumbnails.forEach(modalThumbnail => {
    modalThumbnail.addEventListener('click', event => { // Cambia "Event" a "event"
        console.log(event.target.id.slice(-1)); // Utiliza "event" en lugar de "Event"
        modalImageContainer.style.backgroundImage = `url('./images/image-product-${event.target.id.slice(-1)}.jpg')`
    });
});

//Cambiar imagen principal del modal con 
const previusBtnModal = document.querySelector('.modal-gallery__previus');
const nextBtnModal = document.querySelector('.modal-gallery__next')

nextBtnModal.addEventListener('click', () => {
    changeNextImage(modalImageContainer);
});

previusBtnModal.addEventListener('click', () => {
    changePreviusImage(modalImageContainer);
});

// mostrar menu amburguesa
const btnMenu = document.querySelector('.header__menu');
const menu = document.querySelector('.modal-content');
const btnMenuClose = document.querySelector('.modal-content__close-icon');

btnMenu.addEventListener('click', ()=> {
    menu.style.display = 'block'
})

btnMenuClose.addEventListener('click', ()=>{
    menu.style.display = 'none';
})



//funciones

//funcion que contiene el html del modal del carrito
function drawProductInModal() {
    productContainer.innerHTML = ` 
    <div class="cart-modal__details-container">
    <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="producto">
    <div>
      <p class="cart-modal__product">Autmn Limited Edition</p>
      <p class="cart-modal__price">$125.00 x 3 <span>$375.00</span></p>
    </div>
    <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
  </div>
  <button class="cart-modal__checkout">checkout</button>`
  deleteProduct(); //esta funcion se llama aqui para que sea posible eliminar el contenido del modal
  let priceModal = document.querySelector('.cart-modal__price')
  priceModal.innerHTML = `$125.00 x ${lastValue} <span>$${lastValue*125}.00</span>`
}

//Funcion para pasar al siguiente elemento 
function changeNextImage(imageContainer) {
    if (imgIndex === 4) {
        imgIndex = 1;
    }else {
        imgIndex++;
    }
   
    imageContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}

//Funcion para pasar al elemento anterior 
function changePreviusImage(imageContainer) {
    if (imgIndex === 1) {
        imgIndex = 4;
    }else {
        imgIndex--;
    }
   
    imageContainer.style.backgroundImage = `url('./images/image-product-${imgIndex}.jpg')`
}