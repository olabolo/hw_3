import Cart from './cart/cart.js'
import DataBase from './cart/database.js'

const db = new DataBase()

const productElement = document.getElementById('products')
const cartElement = document.getElementById('cart')
const priceElement = document.getElementById('price')

const cart = new Cart(db, (cartList, total) => {
  renderCart(cartList, total)
})

onload = function () {
  renderCart([], 0)
  db.getProducts()
      .then((products) => {
        renderProducts(products)
      })
}

function renderProducts(productList) {
  productElement.innerHTML = ''
  productList.forEach((product) => {
    const listItem = createProductCard(product)
    productElement.appendChild(listItem)
  })
}

function renderCart(cartList, totalPrice) {
  cartElement.innerHTML = ''
  cartList.forEach((cartItem) => {
    const productInfo = db.getProductInfoById(cartItem.id)
    const listItem = createProductCard({...productInfo, count: cartItem.count }, { buttons: ['add','remove'], count: true})
    cartElement.appendChild(listItem)
  })
  priceElement.innerText = totalPrice
}

function createProductCard(product, options = { buttons: ['add'], count: false}) {
  const listItem = document.createElement('li')
  const count = `<p>Количество: ${product.count}</p>`
  listItem.classList.add('goods-item')
  listItem.innerHTML =
      `<h3>${product.product_name}</h3>
       <p>Цена: <span>${product.price}</span></p>
       <p>${ options.count ? count : ''}</p>`
  options.buttons.forEach((type) => {
    listItem.appendChild(createButton(type, product))
  })
  return listItem
}

function createButton(type, product) {
    const button = document.createElement('button')
    if (type === 'add') {
      button.innerText = 'Добавить'
      button.addEventListener('click', () => {
          cart.addCartItem(product.id_product, product.price, 1)
      })
    } else if (type === 'remove') {
      button.innerText = 'Удалить'
      button.addEventListener('click', () => {
          cart.removeCartItem(product.id_product)

      })
    }

  return button
}

// const regex = new RegExp('^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$')
//
// if (regex.test('+77777777')) {
//
// } 


