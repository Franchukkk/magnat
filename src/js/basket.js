let orderToStorage = {},
    orders = {}


function setLocalStorage() {
    console.log("enterd");
    for (let orderId in orders) {
        if (orderId !== "orderSumWithNoDiscount" && orderId !== "orderSumWithDiscount" && orderId !== "orderSum") {
            let order = orders[orderId];
            let product = order.product;
            let id = product.id + "" + order.size;
            let color = order.color;
            let size = order.size;
            let quantity = order.quantity;
            
            // Записуємо в orderToStorage
            orderToStorage[id] = {
                id,
                color,
                size,
                quantity
            };
        }
    }
    // alert(1)
    localStorage.setItem('orders', JSON.stringify(orderToStorage));
    console.log(localStorage.getItem('orders'));
}

function btnSimilar() {
    let similarBtns = document.querySelectorAll(".popap-card .cta-card")
    similarBtns.forEach(function (e) {
        e.addEventListener("click", function () {
            let similarProductId = this.dataset.value,
                similarSizesArr = []


            document.querySelectorAll(`.popap-card input[type="checkbox"][id^="input-${similarProductId}"]:checked`).forEach(checkbox => {
                similarSizesArr.push(checkbox.value)
            })

            buyBtnFunc(e, similarSizesArr)
        })
    })
}


let orderDetailSum = document.querySelector(".order-total-price"),
    orderWithDiscountPrice = document.querySelector(".price-totally b"),
    orderWithDiscountPriceCalc = 0,
    numberOfProductsDOM = document.querySelector(".calc-added-products"),
    caclnumberOfProducts = 0,
    addedProductsList = document.querySelector(".added-products-list "),
    orderDiscount = document.querySelector(".order-discount"),
    orderDiscountCalc = 0

function buyBtnFunc(e, size, quantityPopup, colorCheckbox, isLocalStorage) {
    console.log(e, size, quantityPopup, colorCheckbox);
    if (size.length === 0) {
        showToast("Спочатку виберіть розмір товару", "info", 5000);
    } else if (!isLocalStorage) {
        showToast("Товар успішно додано", "success", 5000);
        document.querySelector('.popap-card').style.display = "none"
        if (document.querySelector(".same-card")) {
            document.querySelector(".same-card").innerHTML = ""
        }
    }
    if (Object.keys(orders).length <= 3) {
        addedProductsList.innerHTML = ""
    }
    let productID = isLocalStorage === true ? e.slice(0, -2) : e.dataset.value
    console.log(productID);
    let currentSizesList = ""
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(product => product.id === productID)
            if (product.saleprice === "") {
                product.saleprice = product.price;
            }
            for (let i = 0; i < size.length; i++) {
                if ((orders[productID + size[i]]) == undefined) {
                    document.querySelector(".added-products-list").classList.remove("empty-baket")

                    orders[productID + size[i]] = {
                        product: product,
                        quantity: quantityPopup ? Number(quantityPopup) : 1
                    }

                    if (size) {
                        orders[productID + size[i]].size = size[i]
                    }

                    if (colorCheckbox) {
                        orders[productID + size[i]].color = isLocalStorage === true ? colorCheckbox : product.color[colorCheckbox]
                    } else {
                        let colorProduct = Object.keys(product.color)
                        orders[productID + size[i]].color = product.color[colorProduct[0]]
                    }

                    orders.orderSumWithNoDiscount += orders[productID + size[i]].product.saleprice != "" ? Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) * orders[productID + size[i]].quantity : 0
                    orders.orderSumWithDiscount += Number((orders[productID + size[i]].product.price).slice(0, -4)) * orders[productID + size[i]].quantity
                    updateCart(productID, orders[productID + size[i]].size, colorCheckbox, isLocalStorage)


                    if (quantityPopup) {
                        caclnumberOfProducts += Number(quantityPopup)
                        document.querySelector(".calc-number-of-products-header-line span").innerText = caclnumberOfProducts = caclnumberOfProducts
                    } else {
                        caclnumberOfProducts++
                        document.querySelector(".calc-number-of-products-header-line span").innerText = caclnumberOfProducts = caclnumberOfProducts

                    }
                    numberOfProductsDOM.innerText = caclnumberOfProducts
                    if (!quantityPopup) {
                        orderDiscountCalc += (Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) - Number((orders[productID + size[i]].product.price).slice(0, -4))) * orders[productID + size[i]].quantity
                    } else {
                        orderDiscountCalc += (Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) - Number((orders[productID + size[i]].product.price).slice(0, -4))) * Number(quantityPopup)
                    }
                    orderDiscount.innerText = orderDiscountCalc
                    orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
                    orderWithDiscountPrice.innerText = orders.orderSumWithDiscount
                    setTimeout(() => {
                        plusBtn(".plus-quantity[data-value='" + productID + size[i] + "']")
                        minBtn(".minus-quantity[data-value='" + productID + size[i] + "']")

                    }, 0)
                } else {
                    if (quantityPopup) {
                        for (let j = quantityPopup; j > 0; j--) {
                            console.log(".plus-quantity[data-value='" + productID + size[i] + "']");
                            document.querySelector(".plus-quantity[data-value='" + productID + size[i] + "']").click()

                        }

                    } else if (size.length > 1) {
                        console.log(".plus-quantity[data-value='" + productID + size[i] + "']");
                        document.querySelector(".plus-quantity[data-value='" + productID + size[i] + "']").click()

                    } else {
                        console.log(".plus-quantity[data-value='" + productID + size[0] + "']");
                        document.querySelector(".plus-quantity[data-value='" + productID + size[0] + "']").click()

                    }

                    
                }


            }


        })
    console.log(1 + "" + orderToStorage);
    setLocalStorage()

}

let ordersList = ""

console.log(orders);

function loadOrdersFromLocalStorage() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        ordersList = JSON.parse(savedOrders);
        updateCartUI(ordersList);
    }
}

function updateCartUI(orders) {
    addedProductsList.innerHTML = "";
    for (const orderId in orders) {
        if (orders.hasOwnProperty(orderId)) {
            const order = orders[orderId],
                size = [order.size]
            buyBtnFunc(order.id, size, order.quantity, order.color, true);
        }
    }
}


function updateCart(id, sizesList, colorCheckbox, isLocalStorage) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(product => product.id === id);

            let firstColor = Object.keys(product.color)[0]

            function colorInObjToStr() {
                if (colorCheckbox && product.color.hasOwnProperty(colorCheckbox)) {
                    const selectedColor = product.color[colorCheckbox]
                    return (selectedColor)
                }
            }
            const selectedColor = colorCheckbox ? colorInObjToStr() : product.color[firstColor]
            const isColorMatch = product.color === selectedColor;

            const card = document.createElement("div");
            card.innerHTML = `
            <div class="basket-card flex-between" data-value=${product.id + "" + sizesList}>
                <img src='${product.images.img}'>
                
                <div class="w-100 flex-between items-center">
                    <div class="description">
                        <div>
                            <h3>${product.head}</h3>
                            <table>
                                <tr>
                                    <td>колір</td>
                                    <td>${isLocalStorage == true ? colorCheckbox : selectedColor}</td>
                                </tr>
                                <tr>
                                    <td>розмір</td>
                                    <td class="size-span">${sizesList}</td>
                                </tr>
                                <tr>
                                    <td>ціна</td>
                                    <td>${product.price} <span>${product.saleprice}</span></td>
                                </tr>
                                <tr>
                                    <td>кількість</td>
                                    <td>
                                        <div class="quantity flex">
                                            <div class="minus-quantity" data-value="${product.id + "" + sizesList}">-</div>
                                            <div class="quantity-number">${orders[product.id + sizesList].quantity}</div>
                                            <div class="plus-quantity" data-value="${product.id + "" + sizesList}">+</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div class="delete-product">видалити товар</div>
                        </div>
                    </div>
                    <div class="total-price">
                        <span>${Number((orders[product.id + sizesList].product.price).slice(0, -4)) * orders[product.id + sizesList].quantity + " грн"}</span>
                    </div>
                </div>
            </div>
        `;

            addedProductsList.appendChild(card);
        });


    
}


function cart() {
    let sizesList = ""
    if (document.querySelectorAll(".cta-card")) {

        clearTimeout(cartWaitTimeout)
        let buyBtns = document.querySelectorAll(".cta-card"),
            orderConfirmProductsQuantity = document.querySelector("#orderConfirmProductsQuantity")

        document.querySelectorAll('.cta-card').forEach(ctaButton => {
            ctaButton.addEventListener('click', function (event) {
                event.preventDefault()

                const productId = this.getAttribute('data-value');
                const selectedSizes = []

                document.querySelectorAll(`input[type="checkbox"][id^="input-${productId}"]:checked`).forEach(checkbox => {
                    selectedSizes.push(checkbox.value)

                })

                buyBtnFunc(ctaButton, selectedSizes)

            })
        })

        document.querySelectorAll('.cta-popap').forEach(ctaButton => {
            ctaButton.addEventListener('click', function (event) {
                event.preventDefault()
                const productId = this.getAttribute('data-value');
                const selectedSizes = []
                let selectColor = ""

                document.querySelectorAll(`.popap-card input[type="checkbox"][id^="popup-input-${productId}"]:checked`).forEach(checkbox => {
                    selectedSizes.push(checkbox.value)
                })

                document.querySelectorAll(`.popap-card input[name="color-popap"]:checked`).forEach(checkbox => {
                    selectColor = checkbox.value
                })

                let quantityFromPopup = document.querySelector('.popap-card .quantity-number');
                buyBtnFunc(ctaButton, selectedSizes, quantityFromPopup.innerText, selectColor)

            })
        })

    }

}



const inputMasks = document.querySelectorAll(".inputMask")

inputMasks.forEach(function (inputMask) {
    inputMask.value = "+38"

    inputMask.addEventListener("input", function () {
        let inputValue = inputMask.value

        let cleanedValue = inputValue.replace(/[^\d+]/g, "")

        inputMask.value = cleanedValue

        if (cleanedValue.length > 13) {
            inputMask.value = cleanedValue.slice(0, 13)
        }

        if (!cleanedValue.startsWith("+38")) {
            inputMask.value = "+38" + cleanedValue.slice(3)
        }
    })
})





function plusBtn(button) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            console.log(button);
            let plusQuantity = document.querySelector(button)

            plusQuantity.addEventListener("click", function () {
                let productBlock = this.dataset.value
                let productID = (this.dataset.value).slice(0, -2)
                const product = products.find(product => product.id === productID)
                const orderKey = productBlock

                if (orders[orderKey]) {
                    orders[orderKey].quantity += 1
                    orderToStorage[orderKey].quantity += 1
                    console.log(2 + "" + orderToStorage);
                    setLocalStorage()

                    const totalPriceSpan = addedProductsList.querySelector('[data-value="' + productBlock + '"]' + " .total-price span"),
                        totalQuantitySpan = addedProductsList.querySelector('[data-value="' + productBlock + '"]' + " .quantity-number")

                    totalPriceSpan.innerText = ((orders[orderKey].product.price).slice(0, -4)) * orders[orderKey].quantity + " грн"
                    totalQuantitySpan.innerText = orders[orderKey].quantity

                    orders.orderSumWithNoDiscount += orders[orderKey].product.saleprice !== 0 ? Number((orders[orderKey].product.saleprice).slice(0, -4)) : 0
                    orders.orderSumWithDiscount += Number((orders[orderKey].product.price).slice(0, -4))
                }
                orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
                orderWithDiscountPrice.innerText = orders.orderSumWithDiscount

                caclnumberOfProducts++
                document.querySelector(".calc-number-of-products-header-line span").innerText = caclnumberOfProducts = caclnumberOfProducts
                numberOfProductsDOM.innerText = caclnumberOfProducts
                orderDiscountCalc += Number((orders[productID + productBlock.slice(-2)].product.saleprice).slice(0, -4)) - Number((orders[productID + productBlock.slice(-2)].product.price).slice(0, -4))
                orderDiscount.innerText = orderDiscountCalc


                
            })
        })
    
}

function minBtn(button) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            let minusQuantity = document.querySelector(button)

            minusQuantity.addEventListener("click", function () {
                let productBlock = this.dataset.value
                let productID = (productBlock).slice(0, -2)
                const product = products.find(product => product.id === productID)
                const orderKey = productBlock


                if (orders[orderKey] && orders[orderKey].quantity !== 1) {
                    orders[orderKey].quantity -= 1
                    orderToStorage[orderKey].quantity -= 1
                    console.log(3 + "" + orderToStorage);
                    setLocalStorage()
                    const totalPriceSpan = addedProductsList.querySelector('[data-value="' + orderKey + '"]' + " .total-price span"),
                        totalQuantitySpan = addedProductsList.querySelector('[data-value="' + orderKey + '"]' + " .quantity-number")

                    orders[orderKey].totalPrice = Number((orders[orderKey].product.price).slice(0, -4)) * orders[orderKey].quantity

                    totalPriceSpan.innerText = orders[orderKey].totalPrice + " грн"
                    totalQuantitySpan.innerText = orders[orderKey].quantity

                    orders.orderSumWithNoDiscount -= orders[orderKey].product.saleprice != "" ? Number((orders[orderKey].product.saleprice).slice(0, -4)) : 0
                    orders.orderSumWithDiscount -= Number((orders[orderKey].product.price).slice(0, -4))

                    if (totalQuantitySpan !== 1) {
                        caclnumberOfProducts--
                        document.querySelector(".calc-number-of-products-header-line span").innerText = caclnumberOfProducts = caclnumberOfProducts
                    }

                    numberOfProductsDOM.innerText = caclnumberOfProducts
                    orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
                    orderWithDiscountPrice.innerText = orders.orderSumWithDiscount

                    orderDiscountCalc -= Number((orders[productID + productBlock.slice(-2)].product.saleprice).slice(0, -4)) - Number((orders[productID + productBlock.slice(-2)].product.price).slice(0, -4))
                    orderDiscount.innerText = orderDiscountCalc
                }
            })
        })
    console.log(4 + "" + orderToStorage);
    setLocalStorage()
}


function sendData(orders) {
    const phpOrdersObj = JSON.stringify(orders)
    let ordersInput = document.querySelector("#orderProductsObject")
    ordersInput.value = phpOrdersObj

}

console.log(orders.orderSumWithDiscount);

document.addEventListener("DOMContentLoaded", function () {
    console.log(orders.orderSumWithDiscount);
    loadOrdersFromLocalStorage()
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-product')) {
            const productBlock = event.target.closest('.basket-card')
            const productID = productBlock.dataset.value

            if (orders[productID]) {
                const size = orders[productID].size;
                caclnumberOfProducts -= orders[productID].quantity
                document.querySelector(".calc-number-of-products-header-line span").innerText = caclnumberOfProducts = caclnumberOfProducts
                numberOfProductsDOM.innerText = caclnumberOfProducts
                orders.orderSumWithNoDiscount -= Number((orders[productID].product.saleprice).slice(0, -4)) * orders[productID].quantity
                orderDetailSum.innerText = orders.orderSumWithNoDiscount
                orderDiscountCalc -= (Number((orders[productID].product.saleprice).slice(0, -4)) - Number((orders[productID].product.price).slice(0, -4))) * orders[productID].quantity
                orderDiscount.innerText = orderDiscountCalc
                orders.orderSumWithDiscount -= Number((orders[productID].product.price).slice(0, -4)) * orders[productID].quantity
                orderWithDiscountPrice.innerText = orders.orderSumWithDiscount
                delete orders[productID]
                delete orderToStorage[productID]
                console.log(5 + "" + orderToStorage);
                setLocalStorage()
                productBlock.remove()
                if (Object.keys(orders).length <= 3) {
                    document.querySelector(".added-products-list").classList.add("empty-baket")
                    addedProductsList.innerHTML = `
                    <div class="basket-empty">
                        <p>Кошик порожній </p>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 90 90" viewBox="0 0 90 90" width="100" height="100"><path d="M50.065 35.729c4.385 0 8.703 1.913 12.391 5.438.973.851 1.041 2.348.15 3.28-.896.938-2.391.938-3.281.005-3.01-2.883-6.172-4.188-9.26-4.188-3.084 0-6.24 1.304-9.25 4.188-.434.427-1.027.662-1.637.646-2.031-.052-2.979-2.545-1.488-3.932C41.372 37.642 45.685 35.729 50.065 35.729zM59.513 26.78c1.813 0 3.287 1.477 3.287 3.291 0 1.815-1.475 3.285-3.287 3.285s-3.281-1.47-3.281-3.285C56.231 28.256 57.7 26.78 59.513 26.78zM40.628 26.78c1.813 0 3.281 1.477 3.281 3.291 0 1.815-1.469 3.285-3.281 3.285-1.818 0-3.287-1.47-3.287-3.285C37.341 28.256 38.81 26.78 40.628 26.78zM10.237 5.269c-4.422.125-5.125 6.795-.844 7.958l5.582 1.971 6.568 34.245c.787 4.098 2.088 7.807 3.906 10.998 2.672 4.699 7.313 8.167 13.037 8.167h28.426c5.131.093 5.131-8.116 0-8.021H38.487c-4.047-.516-5.725-2.555-7.209-5.544H68.8c3.441 0 5.363-3.056 6.213-6.591l8.207-27.92c.438-4.59-1.994-5.496-6.25-5.496l-53.904.041-1.449-4.428c-.391-1.318-1.391-2.336-2.645-2.69L10.237 5.269zM40.425 72.697c-3.359 0-6.084 2.727-6.084 6.086 0 3.363 2.725 6.09 6.084 6.09s6.078-2.727 6.078-6.09C46.503 75.424 43.784 72.697 40.425 72.697zM64.663 72.697c-3.354 0-6.078 2.727-6.078 6.086 0 3.363 2.725 6.09 6.078 6.09 3.359 0 6.084-2.727 6.084-6.09C70.747 75.424 68.022 72.697 64.663 72.697z" fill="#cccccc" class="color000 svgShape"></path></svg>
                    </div>
                    `
                }
            }
        }
        

    })


    const cart = document.querySelector(".cart"),
        basketPopup = document.querySelector("#basket-popup-outline"),
        returnBasket = document.querySelectorAll(".basket-back"),
        body = document.querySelector("body")


    function basketToggle() {
        basketPopup.classList.toggle("d-block")
        body.classList.toggle("hidden")
    }

    cart.addEventListener("click", basketToggle)
    returnBasket.forEach(function (e) {
        e.addEventListener("click", basketToggle)
    })



})

const cartWaitTimeout = setTimeout(function () {
    cart()
}, 1000)