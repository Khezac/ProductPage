if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready())
} else {
    ready()
}

function ready() {
    const removeButtons = document.getElementsByClassName("remove-button")
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", removeProduct)
    }

    const cartButtons = document.getElementsByClassName("cart-button")
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].addEventListener("click", addToCart)
    }


}

function addToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement.parentElement.parentElement
    const productName = productInfos.getElementsByClassName("product-name")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    const newCartProduct = document.createElement("div")
    newCartProduct.classList.add("cart-product")
    newCartProduct.innerHTML = `
    <div class="product-leftinfo">
        <img class="product-img" src="" alt="" />
        <div class="product-info">
            <p class="product-name">${productName}</p>
            <p>R$ <span class="product-price">${productPrice}</span></p>
        </div>
    </div>
    <button class="remove-button">
        <i class="fa-solid fa-trash"></i>
    </button>
    `

    const cart = document.querySelector(".cart-products")
    cart.appendChild(newCartProduct)

    updatePrice()
    newCartProduct.getElementsByClassName("remove-button")[0].addEventListener("click",removeProduct)
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updatePrice()
}

function updatePrice() {
    let totalPrice = 0
    const cartProducts = document.getElementsByClassName("cart-product")
    for (let i = 0; i < cartProducts.length; i++) {
        const cartPrice = cartProducts[i].getElementsByClassName("product-price")[0].innerText.replace("R$ ", "").replace(",", ".")
        totalPrice = totalPrice + Number(cartPrice)
    }
    totalPrice = totalPrice.toFixed(2)
    totalPrice = totalPrice.replace(".", ",")
    document.querySelector(".cart-price-value").innerText = totalPrice
}