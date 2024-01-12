document.addEventListener("DOMContentLoaded", function () {

    // const productList = document.querySelector(".card-bott"),
    //     categoryFilter = document.querySelector(".filter-season")

    // // Завантажити дані з JSON-файлу
    // fetch("products.json")
    //     .then(response => response.json())
    //     .then(data => {
    //         categoryFilter.addEventListener("change", function () {
    //             // Фільтрувати товари за вибраною категорією
    //             const selectedCategory = categoryFilter.value
    //             const filteredProducts = (selectedCategory === "all") ? data : data.filter(product => product.category === selectedCategory)

    //             // Вивести відфільтровані товари
    //             displayProducts(filteredProducts)
    //         })

    //         displayProducts(data)

    //         // вивожу у консоль id вибраного товару
    //         const buyBtns = document.querySelectorAll(".cta-card")

    //         console.log(buyBtns)


    //         let numberOfProductsDOM = document.querySelector(".calc-added-products"),
    //             caclnumberOfProducts = 0,
    //             addedProductsList = document.querySelector(".added-products-list "),
    //             orders = {}
    //         buyBtns.forEach(function (e) {
    //             e.addEventListener("click", function (i) {
    //                 let productID = this.dataset.value
    //                 fetch('products.json')
    //                     .then(response => response.json())
    //                     .then(products => {
    //                         caclnumberOfProducts++
    //                         const product = products.find(product => product.id === productID)
    //                         numberOfProductsDOM.innerText = caclnumberOfProducts
    //                         // console.log(product)

    //                         if (orders[product.id]) {
    //                             orders[product.id].quantity++
    //                             const totalPriceSpan = addedProductsList.querySelector("#" + product.id + " .total-price span"),
    //                                 totalQuantitySpan = addedProductsList.querySelector("#" + product.id + " .quantity-number")
    //                             console.log(totalQuantitySpan)
    //                             orders[product.id].totalPrice = Number((orders[product.id].product.price).slice(0, -4)) * orders[product.id].quantity
    //                             totalPriceSpan.innerText = orders[product.id].totalPrice + " грн"
    //                             totalQuantitySpan.innerText = orders[product.id].quantity
    //                         } else {
    //                             orders[product.id] = {
    //                                 product: product,
    //                                 quantity: 1,
    //                             }

    //                             const card = document.createElement("div")
    //                             card.innerHTML = `
    //                                     <div class="basket-card flex items-center" id=${product.id}>
    //                                         <div class="basket-product-description flex items-center">
    //                                             <img src=${product.img}>
    //                                             <div class="description">
    //                                                 <h3>${product.head}</h3>
    //                                                 <table>
    //                                                     <tr>
    //                                                         <td>колір</td>
    //                                                         <td></td>
    //                                                     </tr>
    //                                                     <tr>
    //                                                         <td>розмір</td>
    //                                                         <td></td>
    //                                                     </tr>
    //                                                     <tr>
    //                                                         <td>ціна</td>
    //                                                         <td>${product.price} <span>${product.saleprice}</span></td>
    //                                                     </tr>
    //                                                     <tr>
    //                                                         <td>кількість</td>
    //                                                         <td><div class="quantity flex">
    //                                                             <div class="minus-quantity" data-value="${product.id}">-</div>

    //                                                             <div class="quantity-number">${orders[product.id].quantity}</div>

    //                                                             <div class="plus-quantity" data-value="${product.id}">+</div>
    //                                                         </div></td>
    //                                                     </tr>
    //                                                 </table>
    //                                                 <div class="delete-product">видалити товар</div>
    //                                             </div>
    //                                         </div>
    //                                         <div class="total-price">
    //                                             <span>${Number((orders[product.id].product.price).slice(0, -4))*orders[product.id].quantity + " грн"}</span> 
    //                                         </div>
    //                                     </div>
    //                                 `
    //                             addedProductsList.appendChild(card)
    //                         }
    //                         console.log(orders)



    //                     })
    //             })
    //         })
    //     })
    //     .catch(error => console.error("Помилка завантаження даних:", error))

    // // Функція для виведення товарів у вигляді списку
    // function displayProducts(products) {
    //     // console.log(products)

    //     // Очистити список перед виведенням нових товарів
    //     productList.innerHTML = ""

    //     // Пройтися по кожному товару та додати його до списку
    //     products.forEach(product => {
    //         const listItem = document.createElement("figure"),
    //             figcaptionItems = document.createElement("figcaption")

    //         listItem.classList.add("card-box")
    //         listItem.appendChild(figcaptionItems)
    //         // const cardClick = document.createElement("a")
    //         // cardClick.href = "#"
    //         // cardClick.classList.add("click-card")
    //         // figcaptionItems.appendChild(cardClick)
    //         // Створити та додати зображення
    //         const imgElement = document.createElement("img")
    //         imgElement.src = product.img
    //         imgElement.alt = product.alt
    //         figcaptionItems.appendChild(imgElement)
    //         // створити звголовок 
    //         const headerCard = document.createElement("h2")
    //         headerCard.classList.add("header-card")
    //         headerCard.innerText = product.head
    //         figcaptionItems.appendChild(headerCard)
    //         // створити елемент старої ціни
    //         const oldPrice = document.createElement("p")
    //         oldPrice.classList.add("old-price")
    //         oldPrice.innerText = product.saleprice
    //         figcaptionItems.appendChild(oldPrice)
    //         // створити елемент нової ціни
    //         const newPrice = document.createElement("p")
    //         newPrice.classList.add("new-price")
    //         newPrice.innerText = product.price
    //         figcaptionItems.appendChild(newPrice)

    //         // створити інпути з розмірами

    //         const inputBlock = document.createElement("div")
    //         inputBlock.classList.add("input-block")
    //         figcaptionItems.appendChild(inputBlock)

    //         const sizes = ["40", "41", "42", "43", "44", "45"]

    //         for (const size of sizes) {
    //             const inputSize = document.createElement("input")
    //             inputSize.type = "checkbox"
    //             inputSize.id = `input-${product.id}-${size}`
    //             inputSize.value = size

    //             const labelInput = document.createElement("label")
    //             labelInput.classList.add(`label${size}`)
    //             labelInput.setAttribute("for", `input-${product.id}-${size}`)
    //             labelInput.innerText = `${size}`

    //             inputBlock.appendChild(inputSize)
    //             inputBlock.appendChild(labelInput)
    //         }

    //         // створити кнопку
    //         const ctaBuy = document.createElement("a")
    //         ctaBuy.classList.add("cta-card")
    //         ctaBuy.setAttribute('data-value', product.id) // id товару для додання у кошик
    //         ctaBuy.innerText = product.cta
    //         ctaBuy.href = product.href
    //         figcaptionItems.appendChild(ctaBuy)

    //         productList.appendChild(listItem)
    //     })
    // }

    //  пагінатор

    const productList = document.querySelector(".card-bott"),
        categoryFilter = document.querySelector(".filter-season")

    const itemsPerPage = 1
    currentPage = 1
    totalPages = 1
    jsonData = []

    function fetchData() {
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                jsonData = data
                totalPages = Math.ceil(jsonData.length / itemsPerPage)
                showData(currentPage)
                showPagination()
                    .then(data => {
                        categoryFilter.addEventListener("change", function () {
                            // Фільтрувати товари за вибраною категорією
                            const selectedCategory = categoryFilter.value
                            const filteredProducts = (selectedCategory === "all") ? data : data.filter(product => product.category === selectedCategory)

                            // Вивести відфільтровані товари
                            displayProducts(filteredProducts)
                        })

                        displayProducts(data)

                        // вивожу у консоль id вибраного товару
                        const buyBtns = document.querySelectorAll(".cta-card")

                        console.log(buyBtns)


                        let numberOfProductsDOM = document.querySelector(".calc-added-products"),
                            caclnumberOfProducts = 0,
                            addedProductsList = document.querySelector(".added-products-list "),
                            orders = {}
                        buyBtns.forEach(function (e) {
                            e.addEventListener("click", function (i) {
                                let productID = this.dataset.value
                                fetch('products.json')
                                    .then(response => response.json())
                                    .then(products => {
                                        caclnumberOfProducts++
                                        const product = products.find(product => product.id === productID)
                                        numberOfProductsDOM.innerText = caclnumberOfProducts
                                        // console.log(product)

                                        if (orders[product.id]) {
                                            orders[product.id].quantity++
                                            const totalPriceSpan = addedProductsList.querySelector("#" + product.id + " .total-price span"),
                                                totalQuantitySpan = addedProductsList.querySelector("#" + product.id + " .quantity-number")
                                            console.log(totalQuantitySpan)
                                            orders[product.id].totalPrice = Number((orders[product.id].product.price).slice(0, -4)) * orders[product.id].quantity
                                            totalPriceSpan.innerText = orders[product.id].totalPrice + " грн"
                                            totalQuantitySpan.innerText = orders[product.id].quantity
                                        } else {
                                            orders[product.id] = {
                                                product: product,
                                                quantity: 1,
                                            }

                                            const card = document.createElement("div")
                                            card.innerHTML = `
                                        <div class="basket-card flex items-center" id=${product.id}>
                                            <div class="basket-product-description flex items-center">
                                                <img src=${product.img}>
                                                <div class="description">
                                                    <h3>${product.head}</h3>
                                                    <table>
                                                        <tr>
                                                            <td>колір</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>розмір</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>ціна</td>
                                                            <td>${product.price} <span>${product.saleprice}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <td>кількість</td>
                                                            <td><div class="quantity flex">
                                                                <div class="minus-quantity" data-value="${product.id}">-</div>
    
                                                                <div class="quantity-number">${orders[product.id].quantity}</div>
    
                                                                <div class="plus-quantity" data-value="${product.id}">+</div>
                                                            </div></td>
                                                        </tr>
                                                    </table>
                                                    <div class="delete-product">видалити товар</div>
                                                </div>
                                            </div>
                                            <div class="total-price">
                                                <span>${Number((orders[product.id].product.price).slice(0, -4))*orders[product.id].quantity + " грн"}</span> 
                                            </div>
                                        </div>
                                    `
                                            addedProductsList.appendChild(card)
                                        }
                                        console.log(orders)



                                    })
                            })
                        })
                    })

            })
            .catch(error => console.error("Помилка завантаження даних:", error))
    }

    function showData(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage,
            endIndex = startIndex + itemsPerPage,
            pageData = jsonData.slice(startIndex, endIndex)
        displayProducts(pageData)
    }

    function displayProducts(products) {
        productList.innerHTML = ""

        products.forEach(product => {
            const listItem = document.createElement("figure"),
                figcaptionItems = document.createElement("figcaption")

            listItem.classList.add("card-box")
            listItem.appendChild(figcaptionItems)

            const imgElement = document.createElement("img")
            imgElement.src = product.img
            imgElement.alt = product.alt
            figcaptionItems.appendChild(imgElement)

            const headerCard = document.createElement("h2")
            headerCard.classList.add("header-card")
            headerCard.innerText = product.head
            figcaptionItems.appendChild(headerCard)

            const oldPrice = document.createElement("p")
            oldPrice.classList.add("old-price")
            oldPrice.innerText = product.saleprice
            figcaptionItems.appendChild(oldPrice)

            const newPrice = document.createElement("p")
            newPrice.classList.add("new-price")
            newPrice.innerText = product.price
            figcaptionItems.appendChild(newPrice)

            const inputBlock = document.createElement("div")
            inputBlock.classList.add("input-block")
            figcaptionItems.appendChild(inputBlock)

            const sizes = ["40", "41", "42", "43", "44", "45"]

            for (const size of sizes) {
                const inputSize = document.createElement("input")
                inputSize.type = "checkbox"
                inputSize.id = `input-${product.id}-${size}`
                inputSize.value = size

                const labelInput = document.createElement("label")
                labelInput.classList.add(`label${size}`)
                labelInput.setAttribute("for", `input-${product.id}-${size}`)
                labelInput.innerText = `${size}`

                inputBlock.appendChild(inputSize)
                inputBlock.appendChild(labelInput)
            }

            const ctaBuy = document.createElement("a")
            ctaBuy.classList.add("cta-card")
            ctaBuy.setAttribute('data-value', product.id)
            ctaBuy.innerText = product.cta
            ctaBuy.href = product.href
            figcaptionItems.appendChild(ctaBuy)

            productList.appendChild(listItem)
        })
    }

    function showPagination() {
        var paginationContainer = document.getElementById('pagination')
        paginationContainer.innerHTML = ''
    
        // Стрілка "Назад"
        var prevButton = document.createElement('button')
        prevButton.innerText = '←'
        prevButton.onclick = function () {
            if (currentPage > 1) {
                currentPage--
                showData(currentPage)
                updatePaginationButtons()
            }
        };
        paginationContainer.appendChild(prevButton)
    
        // Кнопки сторінок
        for (var i = 1; i <= totalPages; i++) {
            var button = document.createElement('button')
            button.innerText = i
            button.onclick = function () {
                currentPage = parseInt(this.innerText)
                showData(currentPage)
                updatePaginationButtons()
            }
            paginationContainer.appendChild(button)
        }
    
        // Стрілка "Вперед"
        var nextButton = document.createElement('button')
        nextButton.innerText = '→'
        nextButton.onclick = function () {
            if (currentPage < totalPages) {
                currentPage++
                showData(currentPage)
                updatePaginationButtons()
            }
        }
        paginationContainer.appendChild(nextButton)
    
        updatePaginationButtons()
    }

    function updatePaginationButtons() {
        var paginationButtons = document.getElementById('pagination').getElementsByTagName('button')

        for (var i = 0; i < paginationButtons.length; i++) {
            var pageNumber = parseInt(paginationButtons[i].innerText)

            if (pageNumber === currentPage) {
                paginationButtons[i].disabled = true
            } else {
                paginationButtons[i].disabled = false
            }
        }
    }

    fetchData()

    //рейндж з інпутом

    const container = document.querySelector(".header-carousel"),
        seasonWinter = document.querySelector(".winter"),
        seasonSummer = document.querySelector(".summer"),
        arrLeft = document.querySelector(".arr-left"),
        arrRight = document.querySelector(".arr-right")
    let currentFrame = 0,
        backgroundCarousel

    function animateBackground() {
        if (currentFrame === 0 || currentFrame === 100) {
            container.style.backgroundImage = 'url(../img/header-bg-1.jpg)'
            updateSeasonDisplay(seasonSummer, 0, "none", "0")
            updateSeasonDisplay(seasonWinter, 1, "inline", "1")
        } else if (currentFrame === 50) {
            container.style.backgroundImage = 'url(../img/header-background-2.jpg)'
            updateSeasonDisplay(seasonWinter, 0, "none", "0")
            updateSeasonDisplay(seasonSummer, 1, "inline", "1")
        }

        currentFrame = (currentFrame + 1) % 101
    }

    function updateSeasonDisplay(season, opacityStart, displayValue, opacityEnd) {
        season.style.opacity = opacityStart
        season.style.display = displayValue
        let opacityInterval = setInterval(() => {
            season.style.opacity = opacityEnd
            clearInterval(opacityInterval)
        }, 0)
    }

    function startAnimation() {
        animateBackground()
        backgroundCarousel = setInterval(animateBackground, 100)
    }

    startAnimation()

    arrLeft.addEventListener("click", changeSlideArr)
    arrRight.addEventListener("click", changeSlideArr)
    let canClick = true

    function changeSlideArr() {
        if (!canClick) {
            return
        } else {
            canClick = false
            clearInterval(backgroundCarousel)
            if (seasonWinter.style.opacity == "1") {
                container.style.backgroundImage = 'url(../img/header-background-2.jpg)'
                updateSeasonDisplay(seasonWinter, 0, "none", "0")
                updateSeasonDisplay(seasonSummer, 1, "inline", "1")
            } else {
                console.log(2)
                container.style.backgroundImage = 'url(../img/header-bg-1.jpg)'
                updateSeasonDisplay(seasonSummer, 0, "none", "0")
                updateSeasonDisplay(seasonWinter, 1, "inline", "1")
            }

            let arrowDelay = setInterval(() => {
                canClick = true
                clearInterval(arrowDelay)
            }, 1000)

            startAnimation()
        }
    }

    const cart = document.querySelector(".cart"),
        basketPopup = document.querySelector(".basket-popup"),
        returnBasket = document.querySelector(".basket-back")

    function basketToggle() {
        basketPopup.classList.toggle("d-block")
    }

    cart.addEventListener("click", basketToggle)
    returnBasket.addEventListener("click", basketToggle)

    //input range 
    const rangeInput = document.querySelectorAll(".range-input input"),
        priceInput = document.querySelectorAll(".price-input input"),
        range = document.querySelector(".slider .progress")
    let priceGap = 1000;

    priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value)

            if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minPrice;
                    range.style.left = (minPrice / rangeInput[0].max) * 100 + "%"
                } else {
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%"
                }
            }
        })
    })

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value)

            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxVal - priceGap
                } else {
                    rangeInput[1].value = minVal + priceGap
                }
            } else {
                priceInput[0].value = minVal
                priceInput[1].value = maxVal
                range.style.left = (minVal / rangeInput[0].max) * 100 + "%"
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
            }
        })
    })

})