document.addEventListener("DOMContentLoaded", function () {
    //бургер меню
    const burger = document.querySelector(".burger"),
        mobileMenu = document.querySelector(".top-nav")

    burger.addEventListener('click', function () {
        this.classList.toggle('active'),
            mobileMenu.classList.toggle('activemobile')
    })

    // filter-mobile
    const filterMobile = document.querySelector(".mobile-filter"),
        filterBlock = document.querySelector(".filter")

    filterMobile.addEventListener("click", function (e) {
        e.preventDefault()
        filterBlock.classList.toggle("active-filter")
    })

    orders.orderSum = 0

    const productList = document.querySelector(".card-bott"),
        categoryFilter = document.querySelector(".filter-season")

    const itemsPerPage = 12
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



    //  пагінатор

    function showPagination() {
        var paginationContainer = document.querySelector('#pagination')
        paginationContainer.innerHTML = ''

        paginationContainer.appendChild(createButton('←', 'arrow-pag prev', function () {
            if (currentPage > 1) {
                currentPage--
                showData(currentPage)
                updatePaginationButtons()
            }
        }))

        // Кнопки сторінок
        var maxVisiblePages = 4,
            halfVisiblePages = Math.floor(maxVisiblePages / 2),
            startPage = Math.max(1, currentPage - halfVisiblePages),
            endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (startPage > 1) {
            paginationContainer.appendChild(createButton(1, '', function () {
                currentPage = 1
                showData(currentPage)
                updatePaginationButtons()
            }))

            if (startPage > 2) {
                paginationContainer.appendChild(createButton('...', 'ellipsis', function () {}));
            }
        }

        for (var i = startPage; i <= endPage; i++) {
            paginationContainer.appendChild(createButton(i, (i === currentPage) ? 'active' : '', function () {
                currentPage = parseInt(this.innerText)
                showData(currentPage)
                updatePaginationButtons()
            }))
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationContainer.appendChild(createButton('...', 'ellipsis', function () {}))
            }

            paginationContainer.appendChild(createButton(totalPages, '', function () {
                currentPage = totalPages
                showData(currentPage)
                updatePaginationButtons();
            }))
        }

        // Стрілка "Вперед"
        paginationContainer.appendChild(createButton('→', 'arrow-pag next', function () {
            if (currentPage < totalPages) {
                currentPage++
                showData(currentPage)
                updatePaginationButtons()
            }
        }))

        updatePaginationButtons()
    }

    function createButton(text, className, clickHandler) {
        var button = document.createElement('button')
        button.innerText = text
        button.className = className
        button.onclick = clickHandler
        return button
    }

    function updatePaginationButtons() {
        var paginationButtons = document.getElementById('pagination').getElementsByTagName('button')

        for (var i = 0; i < paginationButtons.length; i++) {
            var pageNumber = parseInt(paginationButtons[i].innerText)

            if (pageNumber === currentPage) {
                paginationButtons[i].classList.add("current-page")
                paginationButtons[i].disabled = true
            } else {
                paginationButtons[i].classList.remove("current-page")
                paginationButtons[i].disabled = false
            }
        }
    }

    fetchData()

    const images = document.querySelectorAll('.slider-images img'),
        arrLeft = document.querySelector(".arr-left"),
        arrRight = document.querySelector(".arr-right")
    let currentImgIndex = 0;

    function showNextImage() {
        images[currentImgIndex].classList.remove('active')
        currentImgIndex = (currentImgIndex + 1) % images.length
        images[currentImgIndex].classList.add('active')
    }

    showNextImage()

    const headerSlideInterval = setInterval(showNextImage, 5000)

    arrLeft.addEventListener("click", function () {
        clearInterval(headerSlideInterval)
        showNextImage()
    })
    arrRight.addEventListener("click", function () {
        clearInterval(headerSlideInterval)
        showNextImage()
    })

    const cart = document.querySelector(".cart"),
        basketPopup = document.querySelector(".basket-popup"),
        returnBasket = document.querySelector(".basket-back"),
        productsScrollHeight = document.querySelector(".added-products-list"),
        body = document.querySelector("body")

    productsScrollHeight.style.height = (window.innerHeight - 300) + "px"

    function basketToggle() {
        basketPopup.classList.toggle("d-block")
        body.classList.toggle("hidden")
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



    let imgCarousel = document.querySelector('.img-carousel'),
        stepBlocks = document.querySelectorAll(".step-block")
    const imagesOrder = document.querySelectorAll(".img-carousel img")
    console.log(imgCarousel)

    function carouselHeight() {
        let imgCarouselHeight = 0
        stepBlocks.forEach(function (e) {
            imgCarouselHeight += e.getBoundingClientRect().height
            console.log(imgCarouselHeight);
        })

        imagesOrder.forEach(function (e) {
            e.style.height = imgCarouselHeight + 20 * 2 + "px"

        })
    }

    carouselHeight()

    
    let currentImgIndexOrder = 0

    function showNextImageOrder() {
        imagesOrder[currentImgIndexOrder].classList.remove('active')
        currentImgIndexOrder = (currentImgIndexOrder + 1) % imagesOrder.length
        imagesOrder[currentImgIndexOrder].classList.add('active')
    }



    setInterval(showNextImageOrder, 5000)


})

let orderDetailSum = document.querySelector(".order-total-price"),
    numberOfProductsDOM = document.querySelector(".calc-added-products"),
    caclnumberOfProducts = 0,
    addedProductsList = document.querySelector(".added-products-list "),
    orders = {}

const cartWaitTimeout = setTimeout(function () {
    cart()
}, 1000)

function cart() {
    let sizesList = ""
    if (document.querySelectorAll(".cta-card")) {
        clearInterval(cartWaitTimeout)
        let buyBtns = document.querySelectorAll(".cta-card")

        document.querySelectorAll('.cta-card').forEach(ctaButton => {
            ctaButton.addEventListener('click', function (event) {
                event.preventDefault();

                const productId = this.getAttribute('data-value');
                const selectedSizes = [];

                // Отримати вибрані розміри
                document.querySelectorAll(`input[type="checkbox"][id^="input-${productId}"]:checked`).forEach(checkbox => {
                    selectedSizes.push(checkbox.value);
                });

                // Тепер ви можете використовувати selectedSizes для отримання вибраних розмірів
                console.log('Вибрані розміри для продукту з ID', productId, ':', selectedSizes);
                buyBtnFunc(ctaButton, selectedSizes)
                // Додайте інші дії за необхідності, наприклад, додавання товару до кошика
            });
        });

        // buyBtns.forEach(function (e) {
        //     e.addEventListener("click", function () {
        //         console.log("btn clicked");
        //         console.log(e);
        //         console.log();
        //         buyBtnFunc(e)
        //     });
        // });

        function buyBtnFunc(e, size) {
            let productID = e.dataset.value
            fetch('products.json')
                .then(response => response.json())
                .then(products => {
                    caclnumberOfProducts++
                    const product = products.find(product => product.id === productID)
                    numberOfProductsDOM.innerText = caclnumberOfProducts
                    if (orders[product.id]) {
                        orders[product.id].quantity++
                        orders.orderSum += Number((orders[product.id].product.price).slice(0, -4))
                        const totalPriceSpan = addedProductsList.querySelector('[data-value="' + product.id + '"]' + " .total-price span"),
                            totalQuantitySpan = addedProductsList.querySelector('[data-value="' + product.id + '"]' + " .quantity-number")
                        orders[product.id].totalPrice = Number((orders[product.id].product.price).slice(0, -4)) * orders[product.id].quantity
                        totalPriceSpan.innerText = orders[product.id].totalPrice + " грн"
                        totalQuantitySpan.innerText = orders[product.id].quantity
                    } else {

                        orders[product.id] = {
                            product: product,
                            quantity: 0
                        }
                        if (size) {
                            if (size.length === 1) {
                                sizesList = sizesList + "" + size
                                // alert(sizesList)
                                orders[product.id].quantity += 1
                            } else {
                                orders[product.id].quantity += size.length
                                for (let i = 0; i < size.length; i++) {
                                    if (i === 0) {
                                        sizesList = "" + size[i]
                                    } else {
                                        sizesList = sizesList + ", " + size[i]
                                    }
                                }
                                // alert(sizesList)
                                // alert(orders[product.id].quantity)
                            }
                        }

                        orders.orderSum += Number((orders[product.id].product.price).slice(0, -4))


                    }

                    updateCart(productID)


                    orderDetailSum.innerText = orders.orderSum
                })




        }


    }

    function updateCart(id) {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {

                const product = products.find(product => product.id === id)
                const card = document.createElement("div")
                card.innerHTML = `
                                    <div class="basket-card flex items-center" data-value=${product.id}>
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
                                                        <td>${sizesList}</td>
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

                plusBtn()
                minBtn()
            })

    }

    function plusBtn() {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                let plusQuantity = document.querySelectorAll(".plus-quantity")
                plusQuantity.forEach(function () {
                    console.log("очищення")
                })
                plusQuantity.forEach(function (e) {
                    e.addEventListener("click", function (i) {
                        let productID = this.dataset.value
                        const product = products.find(product => product.id === productID)

                        if (orders[product.id]) {
                            orders[product.id].quantity = orders[product.id].quantity + 1
                            const totalPriceSpan = addedProductsList.querySelector('[data-value="' + product.id + '"]' + " .total-price span"),
                                totalQuantitySpan = addedProductsList.querySelector('[data-value="' + product.id + '"]' + " .quantity-number")
                            orders[product.id].totalPrice = Number((orders[product.id].product.price).slice(0, -4)) * orders[product.id].quantity
                            totalPriceSpan.innerText = orders[product.id].totalPrice + " грн"
                            totalQuantitySpan.innerText = orders[product.id].quantity
                            orders.orderSum += Number((orders[product.id].product.price).slice(0, -4))
                        }
                        orderDetailSum.innerText = orders.orderSum

                    })
                })
            })

    }

    function minBtn() {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                let minusQuantity = document.querySelectorAll(".minus-quantity")
                minusQuantity.forEach(function () {
                    console.log("очищення")
                })
                minusQuantity.forEach(function (e) {
                    e.addEventListener("click", function (i) {

                        let productID = this.dataset.value
                        const product = products.find(product => product.id === productID)

                        if (orders[product.id] && orders[product.id].quantity != 1) {
                            orders[product.id].quantity = orders[product.id].quantity - 1
                            const totalPriceSpan = addedProductsList.querySelector('[data-value="' + product.id + '"]' + " .total-price span"),
                                totalQuantitySpan = addedProductsList.querySelector('[data-value="' + product.id + '"]' + " .quantity-number")
                            orders[product.id].totalPrice = Number((orders[product.id].product.price).slice(0, -4)) * orders[product.id].quantity
                            totalPriceSpan.innerText = orders[product.id].totalPrice + " грн"
                            totalQuantitySpan.innerText = orders[product.id].quantity
                            orders.orderSum -= Number((orders[product.id].product.price).slice(0, -4))

                        }
                        orderDetailSum.innerText = orders.orderSum

                    })
                })

            })



    }




}