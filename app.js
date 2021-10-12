class Product {
    constructor(price, calories) {
        this.price = price
        this.calories = calories
        this.list = []
    }

    getPrice() {
        return this.price + this.list.reduce((total, item) => {
            return total + item.getPrice()
        }, 0)
    }

    getCalories() {
        return this.calories + this.list.reduce((total, item) => {
            return total + item.getCalories()
        }, 0)
    }
}

class Burger extends Product {

    constructor(price, calories) {
        super(price, calories)
    }

    addTopping(toppings = []) {
        toppings.forEach((topping) => {
            this.list.push(topping)
        })
    }
}

class Topping extends Product {
    constructor(price, calories) {
        super(price, calories)
    }
}

class BurgerFactory {
    getSmallBurger() {
        return new Burger(50, 20)
    }
    getBigBurger() {
        return new Burger(100, 40)
    }
}

class ToppingFactory {
    getCheese() {
        return new Topping(10, 20)
    }
    getPotato() {
        return new Topping(15, 10)
    }
    getSalad() {
        return new Topping(20, 5)
    }
    getSpicy() {
        return new Topping(15, 0)
    }
    getSouce() {
        return new Topping(20, 5)
    }
}

const burgerFactory = new BurgerFactory()
const toppingFactory = new ToppingFactory()

const bigBurger = burgerFactory.getBigBurger()

bigBurger.addTopping([
    toppingFactory.getCheese(),
    toppingFactory.getCheese(),
    toppingFactory.getPotato(),
    toppingFactory.getSalad(),
    toppingFactory.getSpicy(),
])

console.log(bigBurger)



// 3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
// ### Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.
