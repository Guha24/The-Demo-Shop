import {cart,emptyCart} from '../../data/cart.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';
export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
    const productId=cartItem.productId;
    let product = getProduct(productId);
    productPriceCents+=product.priceCents*cartItem.quantity;
    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents+=deliveryOption.priceCents
  });

  const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
  const taxCents=totalBeforeTaxCents*0.1;
  const totalCents=totalBeforeTaxCents+taxCents;

  const paymentSummaryHTML=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">
        $${(productPriceCents/100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${(shippingPriceCents/100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${(totalBeforeTaxCents/100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${(taxCents/100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${(totalCents/100).toFixed(2)}
      </div>
    </div>
    <button class="place-order-button button-primary js-place-order-button" >
      Place your order
    </button>
  `;

  
  document.querySelector('.js-payment-summary')
    .innerHTML=paymentSummaryHTML;


  document.querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      try{
        const response= await fetch('https://supersimplebackend.dev/orders',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json();
      addOrder(order);
      console.log(order);
      }catch(error){
        console.log('Unexpected error.Try again later');
      }
      
      window.location.href="orders.html"
      emptyCart();
      


    });


}


