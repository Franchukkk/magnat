const itemsPerPage = 18 //ск  карток товару має бути на сторінці
let currentPage = 1,
    jsonData = []



function updatePopupContent(product) {

    const descrHead = document.querySelector('.description-card_popap'),
        newPricePopap = document.querySelector(".new-price-popap"),
        spanId = document.querySelector('.code-card_popap'),
        cardSpanPrice = document.querySelector(".price-popap"),
        mainImgPopap = document.querySelector(".main-card-img"),
        smallPopapImg1 = document.querySelector(".small-img-first"),
        smallPopapImg2 = document.querySelector(".small-img-second"),
        smallPopapImg3 = document.querySelector(".small-img-last"),
        choiseColorPopap = document.querySelector(".choise-color_popap"),
        descriptPopap = document.querySelector(".descript-popap")

    const querySelector = (className) => document.querySelector(className)

    const elements = {
        descriptPopap: querySelector(".descript-popap"),
        producerCard: querySelector(".producer-card_popap"),
        countryCard: querySelector(".country-card_popap"),
        kindCard: querySelector(".kind-card_popap"),
        seasonCard: querySelector(".season-card_popap"),
        materialTop: querySelector(".material-top_popap"),
        materialBottom: querySelector(".material-bottom_popap"),
        materialSole: querySelector(".material-sole_popap"),
        styleCard: querySelector(".style-card_popap"),
    }

    const appendInfo = (parent, label, value) => {
        const infoElement = document.createElement("p")
        infoElement.innerText = label

        const valueElement = document.createElement("p")
        valueElement.innerText = value
        valueElement.classList.add("bold-card")

        parent.appendChild(infoElement)
        parent.appendChild(valueElement)
    }

    appendInfo(elements.producerCard, "виробник", product.technicalHaracteristic.producer)
    appendInfo(elements.countryCard, "країна виробник", product.technicalHaracteristic.country)
    appendInfo(elements.kindCard, "вид взуття", product.technicalHaracteristic.kind)
    appendInfo(elements.seasonCard, "сезон", product.technicalHaracteristic.seasonHaract)
    appendInfo(elements.materialTop, "матеріал верху", product.technicalHaracteristic.materialTop)
    appendInfo(elements.materialBottom, "матеріал підкладки", product.technicalHaracteristic.materialBottom)
    appendInfo(elements.materialSole, "матеріал підошви", product.technicalHaracteristic.materialSole)
    appendInfo(elements.styleCard, "стиль", product.technicalHaracteristic.styleCard)

    descrHead.innerText = product.head
    newPricePopap.innerText = product.price
    spanId.innerText = product.id
    cardSpanPrice.innerText = product.saleprice
    mainImgPopap.src = product.images.img
    mainImgPopap.alt = product.images.alt
    smallPopapImg1.src = product.images.imgPopap1
    smallPopapImg1.alt = product.images.altPopap1
    smallPopapImg2.src = product.images.imgPopap2
    smallPopapImg2.alt = product.images.altPopap2
    smallPopapImg3.src = product.images.imgPopap3
    smallPopapImg3.alt = product.images.altPopap3

    // додавання маленьких  у велику

    function openBigImage(src, alt) {
        const bigImgPopap = document.createElement("div"),
            cancelImg = document.createElement("a"),
            bigImg = document.createElement("img")

        const previousBigImgPopap = document.querySelector(".open-img")
        if (previousBigImgPopap) {
            previousBigImgPopap.remove()
        }

        bigImgPopap.classList.add("open-img")
        bigImg.setAttribute('loading', "lazy")
        bigImg.src = src
        bigImg.alt = alt
        cancelImg.classList.add('cancel-size-popap')
        cancelImg.setAttribute('href', '#')
        cancelImg.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.267146 0.181446C0.506963 -0.0604821 0.895783 -0.0604821 1.1356 0.181446L5 4.07987L8.8644 0.181446C9.10422 -0.0604821 9.49304 -0.0604821 9.73285 0.181446C9.97267 0.423375 9.97267 0.815619 9.73285 1.05755L5.86845 4.95597L9.82014 8.94245C10.06 9.18438 10.06 9.57662 9.82014 9.81855C9.58032 10.0605 9.1915 10.0605 8.95168 9.81855L5 5.83207L1.04832 9.81855C0.8085 10.0605 0.419679 10.0605 0.179863 9.81855C-0.0599542 9.57662 -0.0599542 9.18438 0.179863 8.94245L4.13155 4.95597L0.267146 1.05755C0.0273296 0.815619 0.0273296 0.423375 0.267146 0.181446Z" fill="#4E98B6"/>
                </svg>
            `
        bgSizeDark.style.display = "block"
        bigImgPopap.appendChild(bigImg)
        bigImgPopap.appendChild(cancelImg)
        productPopup.appendChild(bigImgPopap)

        cancelImg.addEventListener("click", function () {
            bgSizeDark.style.display = "none"
            bigImgPopap.remove()
        })
        bgSizeDark.addEventListener("click", function () {
            bgSizeDark.style.display = "none"
            bigImgPopap.remove()

        })
    }

    mainImgPopap.addEventListener("click", function () {
        openBigImage(mainImgPopap.src, mainImgPopap.alt)
    })

    let isMainImgPopap1 = false

    smallPopapImg1.addEventListener("click", function () {
        if (isMainImgPopap1) {
            mainImgPopap.src = product.images.img
            mainImgPopap.alt = product.images.alt
            smallPopapImg1.src = product.images.imgPopap1
            smallPopapImg1.alt = product.images.altPopap1
        } else {
            mainImgPopap.src = product.images.imgPopap1
            mainImgPopap.alt = product.images.altPopap1
            smallPopapImg1.src = product.images.img
            smallPopapImg1.alt = product.images.alt
        }

        smallPopapImg2.src = product.images.imgPopap2
        smallPopapImg2.alt = product.images.altPopap2
        smallPopapImg3.src = product.images.imgPopap3
        smallPopapImg3.alt = product.images.altPopap3

        isMainImgPopap1 = !isMainImgPopap1
    })

    let isMainImgPopap2 = false

    smallPopapImg2.addEventListener("click", function () {
        if (isMainImgPopap2) {
            mainImgPopap.src = product.images.img
            mainImgPopap.alt = product.images.alt
            smallPopapImg2.src = product.images.imgPopap2
            smallPopapImg2.alt = product.images.altPopap2
        } else {
            mainImgPopap.src = product.images.imgPopap2
            mainImgPopap.alt = product.images.altPopap2
            smallPopapImg2.src = product.images.img
            smallPopapImg2.alt = product.images.alt
        }

        smallPopapImg1.src = product.images.imgPopap1
        smallPopapImg1.alt = product.images.altPopap1
        smallPopapImg3.src = product.images.imgPopap3
        smallPopapImg3.alt = product.images.altPopap3

        isMainImgPopap2 = !isMainImgPopap2
    })

    let isMainImgPopap3 = false

    smallPopapImg3.addEventListener("click", function () {
        if (isMainImgPopap3) {
            mainImgPopap.src = product.images.img
            mainImgPopap.alt = product.images.alt
            smallPopapImg3.src = product.images.imgPopap3
            smallPopapImg3.alt = product.images.altPopap3
            smallPopapImg1.src = product.images.imgPopap1
            smallPopapImg1.alt = product.images.altPopap1
            smallPopapImg2.src = product.images.imgPopap2
            smallPopapImg2.alt = product.images.altPopap2
        } else {
            mainImgPopap.src = product.images.imgPopap3
            mainImgPopap.alt = product.images.altPopap3
            smallPopapImg3.src = product.images.img
            smallPopapImg3.alt = product.images.alt
        }
        smallPopapImg1.src = product.images.imgPopap1
        smallPopapImg1.alt = product.images.altPopap1
        smallPopapImg2.src = product.images.imgPopap2
        smallPopapImg2.alt = product.images.altPopap2

        isMainImgPopap3 = !isMainImgPopap3
    })

    const listPopap = document.createElement("ol"),
        topdescript = document.createElement("p")

    descriptPopap.appendChild(topdescript)
    topdescript.innerText = product.descript

    const arrListPopap = [product.list1, product.list2, product.list3, product.list4, product.list5, product.list6].filter(Boolean);
    for (const listItem of arrListPopap) {
        const listPopapChild = document.createElement('li')
        listPopapChild.innerText = listItem
        listPopap.appendChild(listPopapChild)
    }

    descriptPopap.appendChild(listPopap)

    if (product.bottomDescript) {
        const bottomDescript = document.createElement("p")
        bottomDescript.innerText = product.bottomDescript
        descriptPopap.appendChild(bottomDescript)
    }

    const sizes = ["40", "41", "42", "43", "44", "45"]
    const choiseSizePopap = document.querySelector(".choise-size_popap")

    sizes.forEach(size => {
        const inputSize = document.createElement("input")
        inputSize.type = "checkbox"
        inputSize.id = `popup-input-${product.id}-${size}`
        inputSize.name = "size-popap"
        inputSize.value = size

        const labelSize = document.createElement("label")
        labelSize.classList.add(`label${size}`)
        labelSize.setAttribute("for", `popup-input-${product.id}-${size}`)
        labelSize.innerText = size

        if (!product.size.includes(size)) {
            inputSize.disabled = true
        }

        choiseSizePopap.appendChild(inputSize)
        choiseSizePopap.appendChild(labelSize)
    })

    // виведення кольору

    const formColor = document.createElement("form")
    formColor.classList.add("color-form-popap")
    choiseColorPopap.appendChild(formColor)


    const dynamicStyles = document.createElement('style')
    document.head.appendChild(dynamicStyles)

    const availableColors = Object.keys(product.color)

    availableColors.forEach(function (color) {
        const inputId = color + "-popap-" + product.id

        const inputColorPopap = document.createElement('input')
        inputColorPopap.type = 'radio'
        inputColorPopap.id = inputId
        inputColorPopap.name = 'color-popap'
        inputColorPopap.value = color

        const labelColor = document.createElement('label')
        labelColor.htmlFor = inputId
        labelColor.classList.add(color)

        formColor.appendChild(inputColorPopap)
        formColor.appendChild(labelColor)
        let dynamicStyle
        // стилі для кожного кольору
        if (color == "white") {
            dynamicStyle = `
                    input + label.${color}::before {
                        width: 14rem;
                        height: 14rem;
                        background-color: ${color};
                        border: 0.5rem solid #ccc;
                    }
                `
        } else {
            dynamicStyle = `
                    input + .${color}::before {
                        width: 15rem;
                        height: 15rem;
                        background-color: ${color};
                    }
                `
        }
        dynamicStyles.sheet.insertRule(dynamicStyle, dynamicStyles.sheet.cssRules.length)
    })

    // лічильник на кількість товару який буде в кошику
    const minCount = document.querySelector(".min-count_card"),
        maxCountCard = document.querySelector(".max-count_card"),
        numbCountCard = document.querySelector(".num-count-card")

    let currentCount = 1

    const increaseCount = () => {
        if (currentCount < 10) {
            currentCount++
            numbCountCard.innerText = currentCount
        }
    }
    const decreaseCount = () => {
        if (currentCount > 1) {
            currentCount--
            numbCountCard.innerText = currentCount
        }
    }

    minCount.addEventListener("click", decreaseCount)
    maxCountCard.addEventListener("click", increaseCount)

    let popupCategory = product.category
    // скільки карточок виводиться в попапі
    const maxSimilarProducts = 4

    sameCard.innerHTML = ''

    displaySimilarProducts(jsonData, popupCategory, sameCard, maxSimilarProducts)
    let ctaPopup = document.querySelector(".cta-popap")
    ctaPopup.setAttribute("data-value", product.id)
    ctaPopup.addEventListener("click", function (e) {
        e.preventDefault()
    })
    btnSimilar()
}

//вивід карточок товару

function displaySimilarProducts(products, popupCategory, container, maxCount) {
    let count = 0,
        hasSimilarProducts = false
    const noSimilarProductsMessage = document.querySelector(".text-same-card")

    products.forEach(product => {
        if (count < maxCount && popupCategory && product.category === popupCategory && openedProductId !== product.id) {
            const listItem = createCardElement(product)
            container.appendChild(listItem)
            count++
            hasSimilarProducts = true
        }
    })
    if (!hasSimilarProducts) {
        noSimilarProductsMessage.innerText = 'Нажаль схожих товарів не знайдено.'
        container.appendChild(noSimilarProductsMessage)
    }
}


function clearPopup() {
    const choiseSizePopap = document.querySelector(".choise-size_popap"),
        choiseColorPopap = document.querySelector(".choise-color_popap"),
        sameCard = document.querySelector(".same-card"),
        descriptPopap = document.querySelector(".descript-popap"),
        producerCard = document.querySelector(".producer-card_popap"),
        countryCard = document.querySelector(".country-card_popap"),
        kindCard = document.querySelector(".kind-card_popap"),
        seasonCard = document.querySelector(".season-card_popap"),
        materialTop = document.querySelector(".material-top_popap"),
        materialBottom = document.querySelector(".material-bottom_popap"),
        materialSole = document.querySelector(".material-sole_popap"),
        styleCard = document.querySelector(".style-card_popap")

    choiseSizePopap.innerHTML = ''
    descriptPopap.innerHTML = ''
    producerCard.innerHTML = ''
    countryCard.innerHTML = ''
    kindCard.innerHTML = ''
    seasonCard.innerHTML = ''
    materialTop.innerHTML = ''
    materialBottom.innerHTML = ''
    materialSole.innerHTML = ''
    countryCard.innerHTML = ''
    styleCard.innerHTML = ''

    const formColor = document.querySelector(".color-form-popap");
    if (formColor && formColor.parentNode === choiseColorPopap) {
        choiseColorPopap.removeChild(formColor);
    }
    availableColors = []
    if (sameCard) {
        sameCard.innerHTML = ''
    }
}


function openPopup(event, productId) {
    if (productId) {
        openedProductId = productId
        const selectedProduct = jsonData.find(product => product.id === productId)

        if (selectedProduct) {
            clearPopup()
            updatePopupContent(selectedProduct)
            productPopup.style.display = 'grid'
        }
    } else {
        console.error('error')
    }
}

function createInputRange() {
    const rangeInput = document.querySelectorAll(".range-input input"),
        priceInput = document.querySelectorAll(".price-input input"),
        range = document.querySelector(".slider .progress"),
        minPriceInput = Math.min(...jsonData.map(item => parseInt(item.price))),
        maxPriceInput = Math.max(...jsonData.map(item => parseInt(item.price)))

    let priceGap = 10

    priceInput.forEach((input) => {
        priceInput[0].setAttribute("value", minPriceInput)
        priceInput[1].setAttribute("value", maxPriceInput)
        input.addEventListener("input", (e) => {

            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value)

            if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minPrice
                    range.style.left = (minPrice / rangeInput[0].max) * 100 + "%"
                } else {
                    rangeInput[1].value = maxPrice
                    range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%"
                }
            }
        })
    })

    rangeInput.forEach((input) => {
        rangeInput[0].setAttribute("value", minPriceInput)
        rangeInput[1].setAttribute("value", maxPriceInput)
        rangeInput[0].setAttribute("min", minPriceInput)
        rangeInput[0].setAttribute("max", maxPriceInput)
        rangeInput[1].setAttribute("min", minPriceInput)
        rangeInput[1].setAttribute("max", maxPriceInput)
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

}


function createInputsForSizeKeys(product) {
    const sizeInputsContainer = document.querySelector(".check-size"),
        colorInputContainer = document.querySelector(".color-filter")
    let uniqueSizes = []

    jsonData.forEach(product => {
        if (product.size && Array.isArray(product.size)) {
            product.size.forEach(size => {
                if (!uniqueSizes.includes(size)) {
                    uniqueSizes.push(size)

                    const inputSizeFilter = document.createElement("input")
                    const labelSizeFilter = document.createElement("label")

                    inputSizeFilter.setAttribute("type", "checkbox")
                    inputSizeFilter.setAttribute("name", "size")
                    inputSizeFilter.setAttribute("id", size)
                    inputSizeFilter.setAttribute("value", size)

                    labelSizeFilter.setAttribute("for", size)
                    labelSizeFilter.innerText = size

                    sizeInputsContainer.appendChild(inputSizeFilter)
                    sizeInputsContainer.appendChild(labelSizeFilter)
                }
            })
        }
    })

    //колір
    let uniqueColorValues = []

    jsonData.forEach(product => {
        const productColors = product.color || {}

        Object.values(productColors).forEach(colorValue => {
            if (!uniqueColorValues.includes(colorValue)) {
                uniqueColorValues.push(colorValue)

                const inputColorFilter = document.createElement("input")
                const labelColorFilter = document.createElement("label")

                inputColorFilter.setAttribute("type", "checkbox")
                inputColorFilter.setAttribute("name", "color")
                inputColorFilter.setAttribute("id", colorValue)
                inputColorFilter.setAttribute("value", colorValue)

                labelColorFilter.setAttribute("for", colorValue)
                labelColorFilter.innerText = colorValue

                colorInputContainer.appendChild(inputColorFilter)
                colorInputContainer.appendChild(labelColorFilter)
            }
        })
    })
    // створення інпутів на фільтр
    function createCheckbox(labelText, idPrefix, container) {
        const inputCheckbox = document.createElement("input")
        inputCheckbox.setAttribute("type", "checkbox")
        inputCheckbox.setAttribute("name", idPrefix)
        inputCheckbox.setAttribute("id", `${idPrefix}-${labelText}`)
        inputCheckbox.setAttribute("value", labelText)

        const labelCheckbox = document.createElement("label")
        labelCheckbox.setAttribute("for", `${idPrefix}-${labelText}`)
        labelCheckbox.innerText = labelText

        container.appendChild(inputCheckbox)
        container.appendChild(labelCheckbox)
    }

    let uniqueMaterials = [],
        uniqueModels = [],
        uniqueStyle = []

    jsonData.forEach(product => {
        if (product.material) {
            uniqueMaterials = uniqueMaterials.concat(Array.isArray(product.material) ? product.material : [product.material])
        }

        if (product.model) {
            uniqueModels.push(product.model)
        }

        if (product.style) {
            uniqueStyle.push(product.style)
        }
    })

    uniqueMaterials = [...new Set(uniqueMaterials)]
    uniqueModels = [...new Set(uniqueModels)]
    uniqueStyle = [...new Set(uniqueStyle)]

    // чекбокси для матеріалів
    const materialInputContainer = document.querySelector(".material")
    uniqueMaterials.forEach(material => createCheckbox(material, "material", materialInputContainer))

    //  чекбокси для моделей
    const modelInputContainer = document.querySelector(".model")
    uniqueModels.forEach(model => createCheckbox(model, "model", modelInputContainer))

    //  чекбокси для моделей
    const styleInputContainer = document.querySelector(".style")
    uniqueStyle.forEach(style => createCheckbox(style, "style", styleInputContainer))
}


function fetchData() {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            jsonData = data
            totalPages = Math.ceil(jsonData.length / itemsPerPage)
            showData(currentPage)
            showPagination(currentPage)
            updateProductDisplay(selectedCategory)
            // виведення товарів зі знижками по нижній кнопці
            const discountButton = document.querySelector('a.bottom-cart-season[data-href="all"]');
            discountButton.addEventListener("click", function (e) {
                e.preventDefault()
                const saleProducts = jsonData.filter(product => product.saleprice !== "");
                displayProducts(saleProducts, productList)
                // setTimeout(updateCartBtns(), 0)
                resetFilters()
            })
            createInputsForSizeKeys(jsonData[0])
            createInputRange()
        })
        .catch(error => console.error("Помилка завантаження даних:", error))
}

function showData(pageNumber) {
    const selectedCategory = localStorage.getItem("lastSelectedCategory") || "all"
    let filteredData

    const storedFilteredProducts = localStorage.getItem('filteredProducts')

    if (storedFilteredProducts) {
        filteredData = JSON.parse(storedFilteredProducts)
    } else {
        filteredData = jsonData.filter(product => {
            return selectedCategory === "all" || product.category === selectedCategory
        })
    }

    totalItems = filteredData.length
    totalPages = Math.ceil(totalItems / itemsPerPage)

    const startIndex = (pageNumber - 1) * itemsPerPage,
        endIndex = startIndex + itemsPerPage,
        pageData = filteredData.slice(startIndex, endIndex)

    displayProducts(pageData, productList)
    showPagination(pageNumber)
}

function displayProducts(products, container) {
    container.innerHTML = ""
    const itemsPerPage = 18

    for (let i = 0; i < Math.min(products.length, itemsPerPage); i++) {
        const listItem = createCardElement(products[i])
        container.appendChild(listItem)
    }
}

const productList = document.querySelector(".card-bott"),
    categoryFilter = document.querySelector(".filter-season"),
    productPopup = document.querySelector('.popap-card'),
    sameCard = document.querySelector(".same-card")

function showPagination(pageNumber) {
    var paginationContainer = document.querySelector('#pagination')
    paginationContainer.innerHTML = ''

    let totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages > 1) {

        paginationContainer.appendChild(createButton('←', 'arrow-pag prev', function () {
            if (currentPage > 1) {
                currentPage--
                showData(currentPage)
                showPagination(currentPage)
                updatePaginationButtons()
                updateProductFilter()
            }
        }))

        // Кнопки сторінок
        const maxVisiblePages = 4,
            halfVisiblePages = Math.floor(maxVisiblePages / 2),
            startPage = Math.max(1, currentPage - halfVisiblePages),
            endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (startPage > 1) {
            paginationContainer.appendChild(createButton(1, '', function () {
                currentPage = 1
                showData(currentPage)
                showPagination(currentPage)
                updatePaginationButtons()
                updateProductFilter()
            }))

            if (startPage > 2) {
                paginationContainer.appendChild(createButton('...', 'ellipsis', function () {}))
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            (function (pageNumber) {
                paginationContainer.appendChild(createButton(pageNumber, (pageNumber === currentPage) ? 'active' : '', function () {
                    currentPage = pageNumber
                    showData(currentPage)
                    showPagination(currentPage)
                    updatePaginationButtons()
                    updateProductFilter()
                }))
            })(i)
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationContainer.appendChild(createButton('...', 'ellipsis', function () {}))
            }

            paginationContainer.appendChild(createButton(totalPages, '', function () {
                currentPage = totalPages
                showData(currentPage)
                showPagination(currentPage)
                updatePaginationButtons()
                updateProductFilter()
            }))
        }

        // Стрілка "Вперед"
        paginationContainer.appendChild(createButton('→', 'arrow-pag next', function () {
            if (currentPage < totalPages) {
                currentPage++
                showData(currentPage)
                showPagination(currentPage)
                updatePaginationButtons()
                updateProductFilter()
            }
        }))
    }
}

function createCardElement(product) {
    const listItem = document.createElement("figure"),
        figcaptionItems = document.createElement("figcaption")

    if (product.saleprice !== "") {
        const saleFlag = document.createElement("span"),
            sale = 100 - (parseFloat(product.price) * 100) / parseFloat(product.saleprice)
        saleFlag.classList.add("card-flag")
        saleFlag.innerText = `sale -${sale.toFixed(0)}%`
        figcaptionItems.appendChild(saleFlag)
    }
    // дата атрибути для фільтра
    listItem.classList.add("card-box", product.category)
    listItem.dataset.sizes = JSON.stringify(product.size)
    listItem.dataset.colors = JSON.stringify(Object.values(product.color))
    listItem.dataset.model = product.model
    listItem.dataset.material = product.material
    listItem.dataset.style = product.style
    listItem.dataset.price = product.price
    listItem.appendChild(figcaptionItems)

    // відкриття попапу з карточкою товару клік
    const clickFigure = document.createElement("a")
    clickFigure.classList.add("click-card")
    clickFigure.href = "#"
    clickFigure.setAttribute("data-value", product.id)
    clickFigure.addEventListener("click", function (event) {
        event.preventDefault()
        openPopup(event, product.id)
        cart()

    })
    figcaptionItems.appendChild(clickFigure)

    const imgElement = document.createElement("img")
    imgElement.src = product.images.img
    imgElement.alt = product.images.alt
    imgElement.setAttribute('data-src', product.images.img)
    imgElement.setAttribute('data-alt', product.images.alt)
    imgElement.setAttribute('loading', "lazy")
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
    const priceValue = parseInt(product.price.replace(/\D/g, ''))
    listItem.dataset.price = priceValue
    newPrice.classList.add("new-price")
    newPrice.innerText = product.price
    figcaptionItems.appendChild(newPrice)

    const inputBlock = document.createElement("div")
    inputBlock.classList.add("input-block")
    figcaptionItems.appendChild(inputBlock)

    const sizes = ["40", "41", "42", "43", "44", "45"]

    sizes.forEach(size => {
        const inputSize = document.createElement("input")
        inputSize.type = "checkbox"
        inputSize.name = "size-popap"
        inputSize.id = `input-${product.id}-${size}`
        inputSize.value = size

        const labelSize = document.createElement("label")
        labelSize.classList.add(`label${size}`)
        labelSize.setAttribute("for", `input-${product.id}-${size}`)
        labelSize.innerText = size

        if (!product.size.includes(size)) {
            inputSize.disabled = true
        }

        inputBlock.appendChild(inputSize)
        inputBlock.appendChild(labelSize)
    })

    const ctaBuy = document.createElement("a")
    ctaBuy.classList.add("cta-card")
    ctaBuy.setAttribute('data-value', product.id)
    ctaBuy.innerText = "купити"
    ctaBuy.href = "#"
    figcaptionItems.appendChild(ctaBuy)

    return listItem
}

function updateProductDisplay(category) {
    const filteredProducts = jsonData.filter(product => category === "all" || product.category === category)

    displayProducts(filteredProducts, productList)
    showData(currentPage)
    showPagination(currentPage)
    // setTimeout(updateCartBtns, 0)
}

const minPrice = parseInt(document.querySelector('.input-min').value),
    maxPrice = parseInt(document.querySelector('.input-max').value),
    selectedCategory = localStorage.getItem("lastSelectedCategory") || "all"
















document.addEventListener("DOMContentLoaded", function () {

    function updateCartBtns() {
        // alert(32189)
        console.log(document.querySelectorAll('.cta-card'));
        document.querySelector(".same-card").innerHTML = ""
        document.querySelectorAll('.cta-card').forEach(ctaButton => {
            ctaButton.addEventListener('click', function (event) {
                // alert(2)
                event.preventDefault()

                const productId = this.getAttribute('data-value');
                const selectedSizes = []

                document.querySelectorAll(`input[type="checkbox"][id^="input-${productId}"]:checked`).forEach(checkbox => {
                    selectedSizes.push(checkbox.value)
                })

                // console.log('Вибрані розміри для продукту з ID', productId, ':', selectedSizes);
                buyBtnFunc(ctaButton, selectedSizes)

            })
        })
    }
    // filter-mobile
    const filterMobile = document.querySelector(".mobile-filter"),
        filterBlock = document.querySelector(".filter"),
        cancelFilter = document.querySelector(".cancel-filter")


    filterMobile.addEventListener("click", function (e) {
        e.preventDefault()
        filterBlock.classList.add("active-filter")
    })

    cancelFilter.addEventListener("click", function (e) {
        e.preventDefault()
        filterBlock.classList.remove("active-filter")
    })

    // select 
    const selects = document.querySelectorAll('.select')

    selects.forEach(select => {
        const selectIn = select.querySelector('.select__in'),
            selectItems = select.querySelectorAll('.select__item'),
            thisInput = select.querySelector('.select__input'),
            event = new Event('change')

        selectIn.addEventListener('click', () => {
            selects.forEach(_select => {
                if (_select !== select)
                    _select.classList.remove('is-opened')
            })
            select.classList.toggle('is-opened')
        })

        selectItems.forEach(item => {
            item.addEventListener('click', () => {
                thisInput.value = item.dataset.value
                thisInput.dispatchEvent(event)
                selectIn.innerHTML = item.innerHTML
                selectItems.forEach(_item => {
                    _item.classList.remove('is-active')
                });
                item.classList.add('is-active')
                select.classList.remove('is-opened')
            })
        })
    })

    document.addEventListener('click', e => {
        if (!e.target.closest('.select')) {
            selects.forEach(select => {
                if (select.classList.contains('is-opened'))
                    select.classList.remove('is-opened')
            })
        }
    })

    document.addEventListener('keyup', e => {
        if (e.key == 'Escape') {
            selects.forEach(select => {
                if (select.classList.contains('is-opened'))
                    select.classList.remove('is-opened')
            })
        }
    })


    

    orders.orderSumWithNoDiscount = 0
    orders.orderSumWithDiscount = 0

    orders.orderSum = 0



    // карточки товару





    //створення інпутів для фільтра

    let totalItems



    // створення карточки товару 


    let openedProductId

    // попап на карточку товару






    const backPopapCard = document.querySelector(".back-to-main")

    backPopapCard.addEventListener("click", function (e) {
        e.preventDefault()
        productPopup.style.display = "none"

        document.querySelector(".same-card").innerHTML = ""
        sameCard.innerHTML = ""
    })


    //сортування карток товарів
    let anyCategoryMessage = null,
        filters = {}

    document.querySelectorAll('.input-min, .input-max').forEach(input => {
        input.addEventListener('input', function (e) {
            e.preventDefault()
            removeAnyMessage()
            updateFilters()
        })
    })

    const filterAside = document.querySelector(".filter")
    filterAside.addEventListener("change", function (event) {
        event.preventDefault()
        inputBlock = document.querySelectorAll(".card-bott input[type='checkbox'")
        inputBlock.forEach(elementSize => {
            elementSize.checked = false
            removeAnyMessage()
        })

        const target = event.target,
            isFilterCheckbox = target.tagName === "INPUT" && target.type === "checkbox" && target.closest('.filter')

        if (isFilterCheckbox) {
            const filterInputs = document.querySelectorAll("input[type='checkbox']:checked")

            filterInputs.forEach(checkbox => {
                const category = checkbox.name
                const value = checkbox.value

                if (!filters[category]) {
                    filters[category] = []
                }
                //додавання в масив того що було чекнуто користувачем
                if (!filters[category].includes(value)) {
                    filters[category].push(value);
                }
            })
            //видалення з масиву категорій і значень
            const uncheckedCheckboxes = document.querySelectorAll("input[type='checkbox']:not(:checked)");
            uncheckedCheckboxes.forEach(checkbox => {
                const category = checkbox.name
                const value = checkbox.value

                if (filters[category]) {
                    const index = filters[category].indexOf(value)
                    if (index !== -1) {
                        filters[category].splice(index, 1)
                    }

                    if (filters[category].length === 0) {
                        delete filters[category]
                    }
                }
            })

            const filteredProducts = jsonData.filter(product => {
                return checkFilters(product, minPrice, maxPrice, selectedCategory, filters)
            })

            removeAnyMessage()
            showData(currentPage)
            showPagination(currentPage)
            updateProductFilter()
            updateProductDisplay(filteredProducts)
            displayProducts(filteredProducts, productList)
        }
        updateFilters()
        updateCartBtns()
    })

    showData(currentPage)

    function removeAnyMessage() {
        if (anyCategoryMessage) {
            anyCategoryMessage.remove()
            anyCategoryMessage = null
        }
    }

    function updateFilters() {
        currentPage = 1
        const minPrice = parseInt(document.querySelector('.input-min').value),
            maxPrice = parseInt(document.querySelector('.input-max').value),
            selectedCategory = localStorage.getItem("lastSelectedCategory") || "all"

        const filteredProducts = jsonData.filter(product => {
            const element = document.querySelector(`[data-value="${product.id}"]`)
            return checkFilters(product, minPrice, maxPrice, selectedCategory, filters)
        })

        removeAnyMessage()
        showData(currentPage)
        showPagination(currentPage)
        updateProductFilter()
        updateProductDisplay(filteredProducts);
        displayProducts(filteredProducts, productList)
    }

    async function updateProductFilter() {
        const minPrice = parseInt(document.querySelector('.input-min').value),
            maxPrice = parseInt(document.querySelector('.input-max').value),
            selectedCategory = localStorage.getItem("lastSelectedCategory") || "all"

        const filteredProducts = jsonData.filter(product => {
            return checkFilters(product, minPrice, maxPrice, selectedCategory, filters)
        })
        localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts))
        let anyCategoryVisible = filteredProducts.length > 0
        for (const product of jsonData) {
            const element = document.querySelector(`[data-value="${product.id}"]`)

            if (element) {
                const showElement = checkFilters(product, minPrice, maxPrice, selectedCategory, filters)
                // console.log(filters)
                if (showElement) {
                    anyCategoryVisible = true
                }
            }
        }
        if (!anyCategoryVisible) {
            const cardBlock = document.querySelector(".card-block")
            anyCategoryMessage = document.createElement("div")
            anyCategoryMessage.classList.add("any-block")

            const spanIconAnyCategory = document.createElement("span")
            spanIconAnyCategory.classList.add("icon-no-card")
            spanIconAnyCategory.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-80q-83 0-141.5-58.5T80-280q0-83 58.5-141.5T280-480q83 0 141.5 58.5T480-280q0 83-58.5 141.5T280-80Zm544-40L568-376q-12-13-25.5-26.5T516-428q38-24 61-64t23-88q0-75-52.5-127.5T420-760q-75 0-127.5 52.5T240-580q0 6 .5 11.5T242-557q-18 2-39.5 8T164-535q-2-11-3-22t-1-23q0-109 75.5-184.5T420-840q109 0 184.5 75.5T680-580q0 43-13.5 81.5T629-428l251 252-56 56Zm-615-61 71-71 70 71 29-28-71-71 71-71-28-28-71 71-71-71-28 28 71 71-71 71 28 28Z"/></svg>'

            const anyCategoryText = document.createElement("p")
            anyCategoryText.classList.add("no-card")
            anyCategoryText.innerText = "Нажаль, за вашим вибором не знайдено жодного товару"

            anyCategoryMessage.appendChild(spanIconAnyCategory)
            anyCategoryMessage.appendChild(anyCategoryText)
            cardBlock.appendChild(anyCategoryMessage)
        }
    }
    //фільтрування по категоріях з масивів
    function checkFilters(product, minPrice, maxPrice, selectedCategory, filters) {
        const priceValue = parseFloat(product.price) || 0,
            productCategory = product.category

        const priceFilter = checkPrice(priceValue, minPrice, maxPrice),
            categoryFilter = selectedCategory === "all" || productCategory === selectedCategory
        const allFiltersMatch = Object.keys(filters).every(filterCategory => {
            const productFilterValue = product[filterCategory]

            if (filterCategory === "color") {
                const productColors = Array.isArray(product.color) ? product.color : Object.values(product.color || {})
                return filters[filterCategory].some(selectedColor => productColors.includes(selectedColor))
            }
            if (Array.isArray(productFilterValue)) {
                return productFilterValue.some(value => filters[filterCategory].includes(value))
            } else {
                return filters[filterCategory].includes(productFilterValue)
            }
        })

        return priceFilter && categoryFilter && allFiltersMatch
    }

    function checkPrice(priceValue, min, max) {
        return priceValue >= min && priceValue <= max
    }

    localStorage.removeItem('filteredProducts')
    // вибір категорій і додавання до локального сховища, при завантажені сторінки підзавантажуються дані згідно вибраних категорій а не весь список

    const btnProduct = document.querySelectorAll(".card-cta-season"),
        bottomProduct = document.querySelectorAll(".bottom-cart-season"),
        categories = ["winter", "summer", "demiseason"]

    categoryFilter.addEventListener("change", (evt) => {
        evt.preventDefault()
        if (evt.target.tagName === "INPUT" && evt.target.type === "checkbox" && evt.target.closest('.filter')) {
            updateProductDisplay(selectedCategory)
            removeAnyMessage()
        }
        showData(currentPage)
        showPagination(currentPage)
        setTimeout(updateCartBtns(), 0)
    })

    let selectedCategory = localStorage.getItem("lastSelectedCategory") || "all"

    const urlParams = new URLSearchParams(window.location.search)
    urlCategory = urlParams.get('category'),
        urlHash = window.location.hash,
        selectedHash = urlHash || "#catalog"


    btnProduct.forEach((button) => {
        button.classList.add("card-cta-season")

        button.addEventListener("mouseenter", function () {
            if (!button.classList.contains("selected")) {
                button.classList.add("hovered")
            }
        })

        button.addEventListener("mouseleave", function () {
            button.classList.remove("hovered")
        })
    })


    if (!selectedCategory) {
        selectedCategory = "all"
        localStorage.setItem("lastSelectedCategory", selectedCategory)
        localStorage.removeItem('filteredProducts')
    } else if (!categories.includes(selectedCategory)) {
        selectedCategory = "all"
        localStorage.setItem("lastSelectedCategory", selectedCategory)
        localStorage.removeItem('filteredProducts')
    }

    const selectedItem = document.querySelector(`[data-href="${selectedCategory}"]`)
    if (selectedItem) {
        selectedItem.classList.add("selected")
    }

    // updateProductDisplay(selectedCategory)

    btnProduct.forEach((item) => {
        item.addEventListener("click", (evt) => {
            evt.preventDefault()
            removeAnyMessage()
            currentPage = 1

            btnProduct.forEach((button) => {
                button.classList.remove("selected", "hovered")
            })

            item.classList.add("selected")

            let category = evt.target.getAttribute("data-href")
            if (category === "all") {
                category = "all"
                localStorage.setItem("lastSelectedCategory", category)
                localStorage.removeItem('filteredProducts')
                const urlWithoutCategory = window.location.origin + window.location.pathname + window.location.hash
                window.history.replaceState({}, '', urlWithoutCategory)
            } else {
                // updateProductDisplay(category)
                const urlWithCategory = window.location.origin + window.location.pathname + `?category=${category}#catalog`
                window.history.replaceState({}, '', urlWithCategory)
                localStorage.setItem("lastSelectedCategory", category)
                localStorage.removeItem('filteredProducts')
            }
            updateProductDisplay(selectedCategory)
            showPagination(currentPage)
            setTimeout(updateCartBtns(), 0)
            resetFilters()
        })
    })

    bottomProduct.forEach((item) => {
        item.addEventListener("click", (evt) => {
            evt.preventDefault()
            currentPage = 1
            removeAnyMessage()

            let category = evt.target.getAttribute("data-href")
            const urlWithCategory = window.location.origin + window.location.pathname + (category ? `?category=${category}` : '') + "#catalog"
            window.history.replaceState({}, '', urlWithCategory)
            localStorage.setItem("lastSelectedCategory", category)
            localStorage.removeItem('filteredProducts')

            const catalogElement = document.getElementById("catalog")

            catalogElement.scrollIntoView({
                behavior: "smooth"
            })

            btnProduct.forEach((button) => {
                button.classList.remove("selected", "hovered")
            })

            btnProduct.forEach((button) => {
                if (button.getAttribute("data-href") === category) {
                    button.classList.add("selected", "hovered")
                }
            })

            item.classList.add("selected")
            showPagination(currentPage)
            updateProductDisplay(selectedCategory)
            setTimeout(updateCartBtns(), 0)
            resetFilters()
        })
    })


    function resetFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false
        })

    }
    // сщртування по селекту

    function sortProducts(data) {
        const sortSelect = document.querySelector(".select__input"),
            selectedValue = parseInt(sortSelect.value)

        switch (selectedValue) {
            case 2:
                // Сортування за спаданням ціни
                data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                break
            case 3:
                // Сортування за зростанням ціни
                data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                break
            case 4:
                // Сортування за новизною
                data.sort((a, b) => new Date(b.date) - new Date(a.date))
                break
            case 5:
                // сортування за популярністю
                data.sort((a, b) => b.popularity - a.popularity)
                break
            default:
                break
        }

        return data
    }

    const selectInput = document.querySelector(".select__input")
    selectInput.addEventListener("change", function () {
        const sortedData = sortProducts(jsonData)
        showData(currentPage)
        showPagination(currentPage)
        updatePaginationButtons()
        updateCartBtns()

    })

    //випадаючий список

    const btnReadMore = document.querySelectorAll(".readmore")

    btnReadMore.forEach((item) => {
        item.addEventListener("click", function () {
            const descriptionMore = item.nextElementSibling
            descriptionMore.classList.toggle("visible")
            item.classList.toggle("readmore-active")
        })
    })

    //розмірна сітка

    const ctaSizePopap = document.querySelector(".cta-size-popap"),
        closePopapSize = document.querySelector(".cancel-size-popap"),
        sizeBlockPopap = document.querySelector(".size-block_popap"),
        bgSizeDark = document.querySelector(".bg-size-popap")

    ctaSizePopap.addEventListener("click", function () {
        sizeBlockPopap.style.display = "block"
        bgSizeDark.style.display = "block"
        sizeBlockPopap.classList.add("active-size-popap")
    })

    closePopapSize.addEventListener("click", function () {
        sizeBlockPopap.style.display = "none"
        bgSizeDark.style.display = "none"
        sizeBlockPopap.classList.remove("active-size-popap")
    })
    bgSizeDark.addEventListener("click", function () {
        sizeBlockPopap.style.display = "none"
        bgSizeDark.style.display = "none"
        sizeBlockPopap.classList.remove("active-size-popap")

    })

    //  пагінатор
    showPagination(currentPage)


    function createButton(text, className, clickHandler) {
        const button = document.createElement('button')
        button.innerText = text
        button.className = className
        button.onclick = clickHandler
        return button
    }

    function updatePaginationButtons() {
        const paginationButtons = document.querySelector('#pagination').getElementsByTagName('button')

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
})

fetchData()