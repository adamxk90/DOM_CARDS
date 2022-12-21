const initialItems = () =>{
  if(localStorage.getItem('items') !==null){
    document.querySelector('.all_items').innerHTML = localStorage.getItem('items')
  }
}
initialItems()

const updateStorageItems = () => {
  let parent = document.querySelector('.all_items')
  let html = parent.innerHTML
  console.log(html.length)
  if(html.length){
    localStorage.setItem('items', html)
  }else{
    localStorage.removeItem('items')
    calcCartSaved()
  }

}

/* ============== */

const initialSubtotal = () =>{
  
    document.querySelector('.subtotal').innerHTML = localStorage.getItem('subtotal')
  
}
initialSubtotal()

const updateSubtotal = () => {
  let parent = document.querySelector('.subtotal')
  let html = parent.innerHTML
  console.log(html.length)
  if(html.length){
    localStorage.setItem('subtotal', html)
  }else{
    localStorage.removeItem('subtotal')
    calcCartSaved()
  }

}


const initialState = () =>{
  if(localStorage.getItem('products') !==null){
    document.querySelector('.items-added').innerHTML = localStorage.getItem('products')
  }
}
initialState()

function calcCartSaved(){
  const itemsCalc = document.querySelectorAll('.productInCard')
  const subtotal = document.querySelector('.subtotal')
  let totalPrice = 0

  itemsCalc.forEach(function(item){
    const el = item.querySelector('.price')
    const amount = item.querySelector('.quantity')
    const currentPrice = parseInt(el.innerText) * parseInt(amount.innerText)
    totalPrice += currentPrice
  })
  subtotal.innerText = totalPrice
}

const updateStorage = () => {
  let parent = document.querySelector('.items-added')
  let html = parent.innerHTML
  console.log(html.length)
  if(html.length){
    localStorage.setItem('products', html)
  }else{
    localStorage.removeItem('products')
    calcCartSaved()
  }

}


/* Total Price */
function calcCartPrice(){
  const itemsCalc = document.querySelectorAll('.productInCard')
  const subtotal = document.querySelector('.subtotal')
  let totalPrice = 0

  itemsCalc.forEach(function(item){
    const el = item.querySelector('.price')
    const amount = item.querySelector('.quantity')
    const currentPrice = parseInt(el.innerText) * parseInt(amount.innerText)
    totalPrice += currentPrice
  })
  subtotal.innerText = totalPrice
}
/* Total Price */



const itemsAdded = document.querySelector('.items-added')
const itemsReturned = document.querySelector('.all_items')
let product
let stock
let quantity
let productInfo
let removed
/* Add to cart */
window.addEventListener('click', function(event){
  
    if (event.target.classList.contains('Add_to_cart')){
        product = event.target.closest('.product')
        stock = product.querySelector('.in-stock')
        if(stock.innerText>1){
          stock.innerText--
        }else{
              product.style.display = "none"
            } 
            

        productInfo = {
            id : product.dataset.id,
            imgSrc : product.querySelector('.product-img').getAttribute('src'),
            title : product.querySelector('.product-title').innerText,
            price : product.querySelector('.price').innerText,
        }

        /* Verify if item is added to basket */
        const itemInBasket = itemsAdded.querySelector(`[data-id="${productInfo.id}"]`)

        if(itemInBasket){
            quantity = itemInBasket.querySelector('.quantity')
            quantity.innerText++
            

        } 
        else{
        /* Verify if item is added to basket */
        const basketItemHTML = `<div class="productInCard flex py-4" data-id="${productInfo.id}">
        <div class="h-24 w-60 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src="${productInfo.imgSrc}" alt="${productInfo.title}" class="h-full w-full object-cover object-center">
        </div>

        <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div class="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href="#">${productInfo.title}</a>
                </h3>
                <p class="price ml-4">${productInfo.price}$</p>
              </div>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
              <p class="text-gray-500">Qty <span class="quantity">1</span></p>
            </div>
        </div>
    </div>`;

    itemsAdded.insertAdjacentHTML("beforeend", basketItemHTML)
      
    }
    }

    /* Remove from cart */
    if (event.target.classList.contains('remove')){
      basket = event.target.closest(`.basket`)
      removed = basket.querySelector('.items-added')
      removed.innerHTML = ""

      
      const productBack = document.querySelectorAll('.product')
      productBack.forEach(function(item){
          item.style.display = "flex" 
          item.querySelector('.in-stock').innerText = "5" 
      })


    }

    calcCartPrice()
    calcCartSaved()
    updateStorage()
    updateSubtotal()
    updateStorageItems()
})


/* Local Storage */




