import Product from "./product.js";
const apiUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

export default class DataBase {

    #products

    getProducts() {
        return makeGETRequest(`${apiUrl}/catalogData.json`)
            .then((goods) => {
                this.#products = JSON.parse(goods)
                return Promise.resolve(this.#products)
            })
    }

    getProductInfoById(id) {
        const product = this.#products.find((product) => product.id_product === id)
        return { ...product }
    }
}

function makeGETRequest(url, value = null) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    })
}
