import { cart,addToCart} from "../data/cart.js";
import {products,loadProducts} from "../data/products.js"
import { renderSearch } from "../data/search.js";
loadProducts(renderProductsGrid);
loadProducts(renderSearch);

function renderProductsGrid(){
  let productsHTML='';
  products.forEach((product) => {
    const html=`
      <div class="product-container">
          <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class='js-quantity-selector-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
      </div>
    `;
    productsHTML+=html;
  });
  document.querySelector('.js-products-grid').innerHTML=productsHTML;
  let totalCartQuantity=0;
  updateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML=Number(localStorage.getItem("cartQuantity")) || 0;


  function updateCartQuantity(){
    let cartQuantity=0;

    cart.forEach((cartItem)=>{
      cartQuantity+=cartItem.quantity;
      
    })
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
    totalCartQuantity=cartQuantity;
    localStorage.setItem("cartQuantity",JSON.stringify(totalCartQuantity));
    
  }
  
  







  const addedMessageTimeouts = {};

  function addMessage(productId){
    const addedText=document.querySelector(`.js-added-to-cart-${productId}`);

    addedText.classList.add('click-added');
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedText.classList.remove('click-added');
    }, 2000);
    addedMessageTimeouts[productId] = timeoutId;
  }



  document.querySelectorAll('.js-add-to-cart')
    .forEach((button)=>{
      button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
        addToCart(productId);
        addMessage(productId);
        updateCartQuantity(); 
      })

    });
};

