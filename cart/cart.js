import CartItem from './cart-item.js'

export default class Cart {

    #goodsList
    #totalPrice

    constructor(database, renderCallback) {
        this.#goodsList = []
        this.#totalPrice = 0
        this.db = database
        this.render = renderCallback
    }

    addCartItem(id, price, count) {
        const product = this.#goodsList.find((cartItem) => cartItem.id === id)
        if (product) {
            product.count += count
        } else {
            this.#goodsList.push(
                new CartItem(
                    {
                        id: id,
                        price: price,
                        count: count,
                    }
                )
            )
        }
        this.solveFullPrice()
        this.render([...this.#goodsList], this.#totalPrice)
    }

    removeCartItem(id) {
        const product = this.#goodsList.find((cartItem) => cartItem.id === id)
        if (product.count > 1) {
            product.count--
        } else {
            const productIndex = this.#goodsList.findIndex((cartItem) => cartItem.id === id)
            this.#goodsList.splice(productIndex, 1)
        }
        this.solveFullPrice()
        this.render([...this.#goodsList], this.#totalPrice)
    }

    solveFullPrice() {
        this.#totalPrice = this.#goodsList.reduce((totalPrice, cartItem) => {
            const productInfo = this.db.getProductInfoById(cartItem.id)
            const itemPrice = cartItem.count * productInfo.price
            return totalPrice + itemPrice
        }, 0)
    }


    // getPrice() {
    //     return this.#totalPrice
    // }
}
