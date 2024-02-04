function updateCartBtns() {
    // alert(1)
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

document.addEventListener("DOMContentLoaded", function () {
    //бургер меню
    const burger = document.querySelector(".burger"),
        mobileMenu = document.querySelector(".top-nav"),
        sections = document.querySelectorAll(".scrollBurger")

    burger.addEventListener('click', function () {
        this.classList.toggle('active'),
            mobileMenu.classList.toggle('activemobile')
    })

    window.addEventListener('scroll', function () {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 0 && rect.bottom >= 0) {
                burger.classList.remove('active')
                mobileMenu.classList.remove('activemobile')
            }
        })
    })

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
    const productList = document.querySelector(".card-bott"),
        categoryFilter = document.querySelector(".filter-season"),
        productPopup = document.querySelector('.popap-card'),
        sameCard = document.querySelector(".same-card")

    const itemsPerPage = 2 //ск  карток товару має бути на сторінці

    let currentPage = 1,
        jsonData = []

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
                    setTimeout(updateCartBtns(), 0)
                    resetFilters()
                })
                createInputsForSizeKeys(jsonData[0])
                createInputRange()
            })
            .catch(error => console.error("Помилка завантаження даних:", error))
    }
    // displayProducts(jsonData, productList)

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
    //створення інпутів для фільтра
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

    let totalItems = 0

    function showData(pageNumber) {
        const selectedCategory = localStorage.getItem("lastSelectedCategory") || "all"
        const filteredData = jsonData.filter(product => {
            return selectedCategory === "all" || product.category === selectedCategory
        })

        totalItems = filteredData.length

        const startIndex = (pageNumber - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const pageData = filteredData.slice(startIndex, endIndex)

        displayProducts(pageData, productList)
        showPagination(pageNumber)
    }

    // створення карточки товару 
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

    function displayProducts(products, container) {
        container.innerHTML = "";
        const itemsPerPage = 2

        for (let i = 0; i < Math.min(products.length, itemsPerPage); i++) {
            const listItem = createCardElement(products[i])
            container.appendChild(listItem)
        }
    }
    let openedProductId

    // попап на карточку товару
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

            // стилі для кожного кольору
            const dynamicStyle = `
                input + .${color}::before {
                    width: 15rem;
                    height: 15rem;
                    background-color: ${color};
                }
            `
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
            // productPopup.style.display = "none"
            //додати відкриття кошика 
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
                // noSimilarProductsMessage.innerText = "схожі товари"
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

    const backPopapCard = document.querySelector(".back-to-main")

    backPopapCard.addEventListener("click", function (e) {
        e.preventDefault()
        productPopup.style.display = "none"

        document.querySelector(".same-card").innerHTML = ""
        sameCard.innerHTML = ""
    })

    //сортування карток товарів
    let anyCategoryMessage = null

    document.querySelectorAll('.input-min, .input-max').forEach(input => {
        input.addEventListener('input', function () {
            removeAnyMessage()
            updateFilters()
        })
    })

    const filterAside = document.querySelector(".filter")
    filterAside.addEventListener("change", function (event) {
        inputBlock = document.querySelectorAll(".card-bott input[type='checkbox'")
        inputBlock.forEach(elementSize => {
            elementSize.checked = false
            removeAnyMessage()
        })

        const target = event.target,
            isFilterCheckbox = target.tagName === "INPUT" && target.type === "checkbox" && target.closest('.filter')

        if (isFilterCheckbox) {
            const filters = {}
            const filterInputs = document.querySelectorAll("input[type='checkbox']:checked")

            filterInputs.forEach(checkbox => {
                const category = checkbox.name
                const value = checkbox.value

                if (!filters[category]) {
                    filters[category] = []
                }

                filters[category].push(value)
            })
            
            const minPrice = parseInt(document.querySelector('.input-min').value),
                maxPrice = parseInt(document.querySelector('.input-max').value),
                selectedCategory = localStorage.getItem("lastSelectedCategory") || "all",
                selectedColor = document.querySelector('input[name="color"]:checked') ? document.querySelector('input[name="color"]:checked').value : null

            const filteredProducts = jsonData.filter(product => {
                const element = document.querySelector(`[data-value="${product.id}"]`)
                return checkFilters(product, minPrice, maxPrice, selectedCategory, selectedColor)
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
        const minPrice = parseInt(document.querySelector('.input-min').value),
            maxPrice = parseInt(document.querySelector('.input-max').value),
            selectedCategory = localStorage.getItem("lastSelectedCategory") || "all",
            selectedColor = document.querySelector('input[name="color"]:checked') ? document.querySelector('input[name="color"]:checked').value : null,
            selectedFiltSizes = document.querySelector('input[name="size"]:checked')

        const filteredProducts = jsonData.filter(product => {
            const element = document.querySelector(`[data-value="${product.id}"]`)
            return checkFilters(product, minPrice, maxPrice, selectedCategory, selectedColor, selectedFiltSizes)
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
            selectedCategory = localStorage.getItem("lastSelectedCategory") || "all",
            selectedColor = document.querySelector('input[name="color"]:checked') ? document.querySelector('input[name="color"]:checked').value : null,
            selectedFiltSizes = document.querySelector('input[name="size"]:checked')

        let anyCategoryVisible = false;

        for (const product of jsonData) {
            const element = document.querySelector(`[data-value="${product.id}"]`)

            if (element) {
                const showElement = checkFilters(product, minPrice, maxPrice, selectedCategory, selectedColor, selectedFiltSizes)
                console.log(selectedColor)
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

    function checkFilters(product, minPrice, maxPrice, selectedCategory, selectedColor, selectedFiltSizes) {
        
        const priceValue = parseFloat(product.price) || 0,
        category = product.category,
        color = product.color,
        priceFilter = checkPrice(priceValue, minPrice, maxPrice),
        categoryFilter = selectedCategory === "all" || category === selectedCategory
        let colorFilter = null,
            selectedFiltSizesLet = null
        for (let i = 0; i < Object.keys(color).length; i++) {
            colorFilter = selectedColor == color[Object.keys(color)[i]] ? selectedColor : null
        }

        for (let i = 0; i < selectedFiltSizes.length; i++) {
            if (product.size.includes(selectedFiltSizes[i].value)) {
                selectedFiltSizesLet = selectedFiltSizes[i].value
            }
        }
        return priceFilter && categoryFilter && colorFilter && selectedFiltSizes
    }

    function checkPrice(priceValue, min, max) {
        return priceValue >= min && priceValue <= max
    }


    // вибір категорій і додавання до локального сховища, при завантажені сторінки підзавантажуються дані згідно вибраних категорій а не весь список

    const btnProduct = document.querySelectorAll(".card-cta-season"),
        bottomProduct = document.querySelectorAll(".bottom-cart-season"),
        categories = ["winter", "summer", "demiseason"]

    categoryFilter.addEventListener("change", (evt) => {
        if (evt.target.tagName === "INPUT" && evt.target.type === "checkbox" && evt.target.closest('.filter')) {
            updateProductDisplay(selectedCategory)
            removeAnyMessage()
        }
        showData(currentPage)
        showPagination(currentPage)
    })

    let selectedCategory = localStorage.getItem("lastSelectedCategory") || "all"

    const urlParams = new URLSearchParams(window.location.search)
    urlCategory = urlParams.get('category'),
        urlHash = window.location.hash,
        selectedHash = urlHash || "#catalog"

    selectedCategory = selectedCategory || "all"

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

            btnProduct.forEach((button) => {
                button.classList.remove("selected", "hovered")
            })

            item.classList.add("selected")

            let category = evt.target.getAttribute("data-href")
            if (category === "all") {
                category = "all"
                localStorage.setItem("lastSelectedCategory", category)
                const urlWithoutCategory = window.location.origin + window.location.pathname + window.location.hash
                window.history.replaceState({}, '', urlWithoutCategory)
            } else {
                // updateProductDisplay(category)
                const urlWithCategory = window.location.origin + window.location.pathname + `?category=${category}#catalog`
                window.history.replaceState({}, '', urlWithCategory)
                localStorage.setItem("lastSelectedCategory", category)
            }
            updateProductDisplay(selectedCategory)

            setTimeout(updateCartBtns(), 0)
            resetFilters()
        })
    })

    bottomProduct.forEach((item) => {
        item.addEventListener("click", (evt) => {
            evt.preventDefault()

            removeAnyMessage()

            let category = evt.target.getAttribute("data-href")
            const urlWithCategory = window.location.origin + window.location.pathname + (category ? `?category=${category}` : '') + "#catalog"
            window.history.replaceState({}, '', urlWithCategory)
            localStorage.setItem("lastSelectedCategory", category)

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

            updateProductDisplay(selectedCategory)
            setTimeout(updateCartBtns(), 0)
            resetFilters()
        })
    })

    function updateProductDisplay(category) {
        const filteredProducts = jsonData.filter(product => category === "all" || product.category === category)

        displayProducts(filteredProducts, productList)
        showData(currentPage)
        showPagination(currentPage)
        setTimeout(updateCartBtns, 0)
    }

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

    function showPagination(pageNumber) {
        var paginationContainer = document.querySelector('#pagination');
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages > 1) {

            paginationContainer.appendChild(createButton('←', 'arrow-pag prev', function () {
                if (currentPage > 1) {
                    currentPage--
                    showData(pageNumber)
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

    const images = document.querySelectorAll('.slider-images img'),
        arrLeft = document.querySelector(".arr-left"),
        arrRight = document.querySelector(".arr-right"),
        slideBlocks = document.querySelectorAll(".slide-description")
    let currentImgIndex = 0;

    function showPreviousImage() {
        slideBlocks[currentImgIndex].classList.remove('active')
        images[currentImgIndex].classList.remove('active')
        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length
        images[currentImgIndex].classList.add('active')
        slideBlocks[currentImgIndex].classList.add('active')
    }

    function showNextImage() {
        slideBlocks[currentImgIndex].classList.remove('active')
        images[currentImgIndex].classList.remove('active')
        currentImgIndex = (currentImgIndex + 1) % images.length
        images[currentImgIndex].classList.add('active')
        slideBlocks[currentImgIndex].classList.add('active')
    }

    showNextImage()

    let headerSlideInterval = setInterval(showNextImage, 3000)

    arrLeft.addEventListener("click", function () {
        clearInterval(headerSlideInterval)
        showPreviousImage()
        headerSlideInterval = setInterval(showNextImage, 3000)
    })

    arrRight.addEventListener("click", function () {
        clearInterval(headerSlideInterval)
        showNextImage()
        headerSlideInterval = setInterval(showNextImage, 3000)
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


    fetchData()

    let imgCarousel = document.querySelector('.img-carousel'),
        stepBlocks = document.querySelectorAll(".step-block")
    const imagesOrder = document.querySelectorAll(".img-carousel img")
    // console.log(imgCarousel)

    function carouselHeight() {
        let imgCarouselHeight = 0
        stepBlocks.forEach(function (e) {
            imgCarouselHeight += e.getBoundingClientRect().height
            // console.log(imgCarouselHeight);
        })
        if (window, innerHeight >= 960) {
            imgCarousel.style.height = imgCarouselHeight + 20 * 2 + "px"

        }
    }

    carouselHeight()

    let currentImgIndexOrder = 0

    function showNextImageOrder() {
        imagesOrder[currentImgIndexOrder].classList.remove('active')
        currentImgIndexOrder = (currentImgIndexOrder + 1) % imagesOrder.length
        imagesOrder[currentImgIndexOrder].classList.add('active')
    }

    setInterval(showNextImageOrder, 3000)
})

let orderDetailSum = document.querySelector(".order-total-price"),
    orderWithDiscountPrice = document.querySelector(".price-totally b"),
    orderWithDiscountPriceCalc = 0,
    numberOfProductsDOM = document.querySelector(".calc-added-products"),
    caclnumberOfProducts = 0,
    addedProductsList = document.querySelector(".added-products-list "),
    orderDiscount = document.querySelector(".order-discount"),
    orderDiscountCalc = 0
orders = {}

const cartWaitTimeout = setTimeout(function () {
    cart()
}, 1000)


function buyBtnFunc(e, size, quantityPopup, colorCheckbox) {
    if (size.length === 0) {
        showToast("Спочатку виберіть розмір товару", "info", 5000);
    } else {
        showToast("Товар успішно додано", "success", 5000);
        document.querySelector('.popap-card').style.display = "none"
        if (document.querySelector(".same-card")) {
            document.querySelector(".same-card").innerHTML = ""
        }
    }
    if (Object.keys(orders).length <= 3) {
        addedProductsList.innerHTML = ""
    }
    // console.log(e, size, quantityPopup);
    let productID = e.dataset.value


    let currentSizesList = ""
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(product => product.id === productID)
            if (product.saleprice === "") {
                product.saleprice = product.price;
            }
            if (true) {

                // console.log(size)
                for (let i = 0; i < size.length; i++) {
                    if (!orders[productID + size[i]]) {
                        document.querySelector(".added-products-list").classList.remove("empty-baket")
                        // alert("hasnotbeen")

                        orders[productID + size[i]] = {
                            product: product,
                            quantity: quantityPopup ? Number(quantityPopup) : 1
                        }

                        if (size) {
                            orders[productID + size[i]].size = size[i]
                        }

                        if (colorCheckbox) {
                            orders[productID + size[i]].color = product.color[colorCheckbox]
                        } else {
                            let colorProduct = Object.keys(product.color)
                            console.log(colorProduct);
                            orders[productID + size[i]].color = product.color[colorProduct[0]]
                        }

                        orders.orderSumWithNoDiscount += orders[productID + size[i]].product.saleprice != "" ? Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) * orders[productID + size[i]].quantity : 0
                        orders.orderSumWithDiscount += Number((orders[productID + size[i]].product.price).slice(0, -4)) * orders[productID + size[i]].quantity
                        updateCart(productID, orders[productID + size[i]].size, colorCheckbox)

                        // console.log(document.querySelector(".minus-quantity[data-value='" + productID + size[i] + "']"))
                        plusBtn(".plus-quantity[data-value='" + productID + size[i] + "']")
                        minBtn(".minus-quantity[data-value='" + productID + size[i] + "']")
                        if (quantityPopup) {
                            caclnumberOfProducts += Number(quantityPopup)
                        } else {
                            caclnumberOfProducts++

                        }
                        numberOfProductsDOM.innerText = caclnumberOfProducts
                        if (!quantityPopup) {
                            orderDiscountCalc += (Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) - Number((orders[productID + size[i]].product.price).slice(0, -4))) * orders[productID + size[i]].quantity
                        } else {
                            orderDiscountCalc += (Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) - Number((orders[productID + size[i]].product.price).slice(0, -4))) * Number(quantityPopup)
                        }
                        // console.log(1)
                        // console.log(orderDiscountCalc)
                        orderDiscount.innerText = orderDiscountCalc
                        orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
                        orderWithDiscountPrice.innerText = orders.orderSumWithDiscount
                    } else {

                        // alert("been")
                        if (quantityPopup) {
                            for (let j = quantityPopup; j > 0; j--) {
                                console.log(j);
                                document.querySelector(".plus-quantity[data-value='" + productID + size[i] + "']").click()

                            }

                        } else if (size.length > 1) {
                            document.querySelector(".plus-quantity[data-value='" + productID + size[i] + "']").click()

                        } else {

                            document.querySelector(".plus-quantity[data-value='" + productID + size[0] + "']").click()

                        }
                    }


                }
                // console.log(orders)
            }

        })
}




// function updateCart(id, sizesList, colorCheckbox) {
//     fetch('products.json')
//         .then(response => response.json())
//         .then(products => {
//             const product = products.find(product => product.id === id);
//             const card = document.createElement("div");
//             card.innerHTML = `
//                     <div class="basket-card flex-between" data-value=${product.id + "" + sizesList}>
//                         <img src=${product.img}>

//                         <div class="w-100 flex-between items-center">
//                             <div class="description">
//                                 <div>
//                                     <h3>${product.head}</h3>
//                                     <table>
//                                         <tr>
//                                             <td>колір</td>
//                                             <td>${colorCheckbox ? product.colorCheckbox : product.color}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>розмір</td>
//                                             <td class="size-span">${sizesList}</td>
//                                         </tr>
//                                         <tr>
//                                             <td>ціна</td>
//                                             <td>${product.price} <span>${product.saleprice}</span></td>
//                                         </tr>
//                                         <tr>
//                                             <td>кількість</td>
//                                             <td>
//                                                 <div class="quantity flex">
//                                                     <div class="minus-quantity" data-value="${product.id + "" + sizesList}">-</div>
//                                                     <div class="quantity-number">${orders[product.id + sizesList].quantity}</div>
//                                                     <div class="plus-quantity" data-value="${product.id + "" + sizesList}">+</div>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                     <div class="delete-product">видалити товар</div>
//                                 </div>
//                             </div>
//                             <div class="total-price">
//                                 <span>${Number((orders[product.id + sizesList].product.price).slice(0, -4)) * orders[product.id + sizesList].quantity + " грн"}</span>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             addedProductsList.appendChild(card);
//         });
// }


function updateCart(id, sizesList, colorCheckbox) {
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
                                    <td>${selectedColor}</td>
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

            // Додавання товару до списку, якщо колір співпадає
            // if (isColorMatch) {
            addedProductsList.appendChild(card);

            // }
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

                // console.log('Вибрані розміри для продукту з ID', productId, ':', selectedSizes);
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
                    // alert(checkbox.value)
                    // alert(checkbox.value)
                })

                document.querySelectorAll(`.popap-card input[name="color-popap"]:checked`).forEach(checkbox => {
                    selectColor = checkbox.value
                })

                let quantityFromPopup = document.querySelector('.popap-card .quantity-number');
                // console.log(quantityFromPopup);
                console.log(document.querySelectorAll(`choise-size_popap input[type="checkbox"][id^="popup-input-${productId}"]:checked`));
                console.log(ctaButton)
                console.log(selectedSizes)
                console.log(quantityFromPopup.innerText)
                // console.log('Вибрані розміри для продукту з ID', productId, ':', selectedSizes);
                buyBtnFunc(ctaButton, selectedSizes, quantityFromPopup.innerText, selectColor)

            })
        })

        // function buyBtnFunc(e, size, quantityPopup) {

        //     console.log(e, size, quantityPopup);
        //     let productID = e.dataset.value


        //     let currentSizesList = ""
        //     fetch('products.json')
        //         .then(response => response.json())
        //         .then(products => {
        //             const product = products.find(product => product.id === productID)
        //             if (product.saleprice === "") {
        //                 product.saleprice = product.price;
        //             }
        //             if (true) {

        //                 // console.log(size)
        //                 for (let i = 0; i < size.length; i++) {
        //                     if (!orders[productID + size[i]]) {

        //                         // alert("hasnotbeen")

        //                         orders[productID + size[i]] = {
        //                             product: product,
        //                             quantity: quantityPopup ? Number(quantityPopup) : 1
        //                         }

        //                         if (size) {
        //                             orders[productID + size[i]].size = size[i]
        //                         }

        //                         orders.orderSumWithNoDiscount += orders[productID + size[i]].product.saleprice != "" ? Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) * orders[productID + size[i]].quantity : 0
        //                         orders.orderSumWithDiscount += Number((orders[productID + size[i]].product.price).slice(0, -4)) * orders[productID + size[i]].quantity
        //                         updateCart(productID, orders[productID + size[i]].size)

        //                         // console.log(document.querySelector(".minus-quantity[data-value='" + productID + size[i] + "']"))
        //                         plusBtn(".plus-quantity[data-value='" + productID + size[i] + "']")
        //                         minBtn(".minus-quantity[data-value='" + productID + size[i] + "']")

        //                         caclnumberOfProducts++
        //                         numberOfProductsDOM.innerText = caclnumberOfProducts
        //                         orderDiscountCalc += (Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) - Number((orders[productID + size[i]].product.price).slice(0, -4))) * orders[productID + size[i]].quantity
        //                         // console.log(1)
        //                         // console.log(orderDiscountCalc)
        //                         orderDiscount.innerText = orderDiscountCalc * orders[productID + size[i]].quantity
        //                         orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
        //                         orderWithDiscountPrice.innerText = orders.orderSumWithDiscount
        //                     } else {
        //                         // alert("been")
        //                         for (let i = quantityPopup ? quantityPopup : 1; i > 0; i--) {

        //                             orders[productID + size[i]]
        //                             console.log(productID );
        //                             console.log(size);
        //                             // orders[productID + size].quantity++
        //                             document.querySelector(".plus-quantity[data-value='" + productID + size + "']").click()

        //                         }
        //                     }


        //                 }
        //                 // console.log(orders)
        //             }

        //         })
        // }
    }

    // function updateCart(id, sizesList) {

    //     fetch('products.json')
    //         .then(response => response.json())
    //         .then(products => {
    //             const product = products.find(product => product.id === id);
    //             const card = document.createElement("div");
    //             card.innerHTML = `
    //                 <div class="basket-card flex-between" data-value=${product.id + "" + sizesList}>
    //                     <img src=${product.img}>

    //                     <div class="w-100 flex-between items-center">
    //                         <div class="description">
    //                             <div>
    //                                 <h3>${product.head}</h3>
    //                                 <table>
    //                                     <tr>
    //                                         <td>колір</td>
    //                                         <td>${product.color}</td>
    //                                     </tr>
    //                                     <tr>
    //                                         <td>розмір</td>
    //                                         <td class="size-span">${sizesList}</td>
    //                                     </tr>
    //                                     <tr>
    //                                         <td>ціна</td>
    //                                         <td>${product.price} <span>${product.saleprice}</span></td>
    //                                     </tr>
    //                                     <tr>
    //                                         <td>кількість</td>
    //                                         <td>
    //                                             <div class="quantity flex">
    //                                                 <div class="minus-quantity" data-value="${product.id + "" + sizesList}">-</div>
    //                                                 <div class="quantity-number">${orders[product.id + sizesList].quantity}</div>
    //                                                 <div class="plus-quantity" data-value="${product.id + "" + sizesList}">+</div>
    //                                             </div>
    //                                         </td>
    //                                     </tr>
    //                                 </table>
    //                                 <div class="delete-product">видалити товар</div>
    //                             </div>
    //                         </div>
    //                         <div class="total-price">
    //                             <span>${Number((orders[product.id + sizesList].product.price).slice(0, -4)) * orders[product.id + sizesList].quantity + " грн"}</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             `;
    //             addedProductsList.appendChild(card);
    //         });
    // }
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
            let plusQuantity = document.querySelector(button)

            plusQuantity.addEventListener("click", function () {
                // alert("plbtn")
                let productBlock = this.dataset.value
                // console.log(productBlock)
                let productID = (this.dataset.value).slice(0, -2)
                const product = products.find(product => product.id === productID)
                const orderKey = productBlock

                if (orders[orderKey]) {
                    orders[orderKey].quantity += 1
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
                numberOfProductsDOM.innerText = caclnumberOfProducts
                orderDiscountCalc += Number((orders[productID + productBlock.slice(-2)].product.saleprice).slice(0, -4)) - Number((orders[productID + productBlock.slice(-2)].product.price).slice(0, -4))
                // console.log(4)
                // console.log(orderDiscountCalc)
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

                // console.log(productID)
                // console.log(orderKey)

                if (orders[orderKey] && orders[orderKey].quantity !== 1) {
                    orders[orderKey].quantity -= 1
                    const totalPriceSpan = addedProductsList.querySelector('[data-value="' + orderKey + '"]' + " .total-price span"),
                        totalQuantitySpan = addedProductsList.querySelector('[data-value="' + orderKey + '"]' + " .quantity-number")

                    orders[orderKey].totalPrice = Number((orders[orderKey].product.price).slice(0, -4)) * orders[orderKey].quantity

                    totalPriceSpan.innerText = orders[orderKey].totalPrice + " грн"
                    totalQuantitySpan.innerText = orders[orderKey].quantity

                    orders.orderSumWithNoDiscount -= orders[orderKey].product.saleprice != "" ? Number((orders[orderKey].product.saleprice).slice(0, -4)) : 0
                    orders.orderSumWithDiscount -= Number((orders[orderKey].product.price).slice(0, -4))

                    if (totalQuantitySpan !== 1) {
                        caclnumberOfProducts--
                    }

                    numberOfProductsDOM.innerText = caclnumberOfProducts
                    orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
                    orderWithDiscountPrice.innerText = orders.orderSumWithDiscount

                    orderDiscountCalc -= Number((orders[productID + productBlock.slice(-2)].product.saleprice).slice(0, -4)) - Number((orders[productID + productBlock.slice(-2)].product.price).slice(0, -4))
                    // console.log(5)
                    // console.log(orderDiscountCalc)
                    orderDiscount.innerText = orderDiscountCalc
                }
            })
        })
}

// document.addEventListener("DOMContentLoaded", function () {

//     let buyBtns = document.querySelectorAll(".cta-card")
//     console.log(buyBtns);
//     buyBtns.forEach(function (e) {
//         console.log(e);
//         e.addEventListener("click", function () {
//             let plusQuantity = document.querySelectorAll(".plus-quantity")
//             plusBtn()
//         })
//     })


// })


function sendData(orders) {
    // let orderDetails = ""
    // for (const key in orders) {
    //     if (Object.hasOwnProperty.call(orders, key)) {
    //         const order = orders[key]

    //         if (order && order.product) {
    //             orderDetails += `ID: ${encodeURIComponent(order.product.id)}, Розмір: ${encodeURIComponent(order.size)}, Кількість: ${encodeURIComponent(order.quantity)}%0A`;

    //         }
    //     }
    // }


    // console.log(orderDetails)


    // let ordersInput = document.querySelector("#orderProductsObject")
    // const jsonString = encodeURIComponent(orderDetails)


    // ordersInput.value = jsonString

    const phpOrdersObj = JSON.stringify(orders)
    let ordersInput = document.querySelector("#orderProductsObject")
    ordersInput.value = phpOrdersObj

}


document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-product')) {
            const productBlock = event.target.closest('.basket-card')
            const productID = productBlock.dataset.value

            if (orders[productID]) {
                const size = orders[productID].size;
                caclnumberOfProducts -= orders[productID].quantity
                numberOfProductsDOM.innerText = caclnumberOfProducts
                orders.orderSumWithNoDiscount -= Number((orders[productID].product.saleprice).slice(0, -4)) * orders[productID].quantity
                orderDetailSum.innerText = orders.orderSumWithNoDiscount
                orderDiscountCalc -= (Number((orders[productID].product.saleprice).slice(0, -4)) - Number((orders[productID].product.price).slice(0, -4))) * orders[productID].quantity
                orderDiscount.innerText = orderDiscountCalc
                orders.orderSumWithDiscount -= Number((orders[productID].product.price).slice(0, -4)) * orders[productID].quantity
                orderWithDiscountPrice.innerText = orders.orderSumWithDiscount
                delete orders[productID]
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
})

document.addEventListener("DOMContentLoaded", function () {
    //попап оформлення замовлення
    const openConfirmPopup = document.querySelector("#openConfirmPopup"),
        confirmPopup = document.querySelector("#popup-confirm-outline"),
        confirmPopupClose = document.querySelectorAll(".confirm-back")

    openConfirmPopup.addEventListener("click", function () {
        if (Object.keys(orders).length > 3) {
            confirmPopup.classList.toggle("d-block")
            sendData(orders)
            let confirmPrice = document.querySelector("#confirmPrice"),
                confirmTotalPrice = document.querySelector("#confirmTotalPrice")
            orderConfirmProductsQuantity.innerText = caclnumberOfProducts + " "
            confirmTotalPrice.innerText = orders.orderSumWithDiscount + " грн"
            confirmPrice.innerText = orders.orderSumWithNoDiscount + " грн"

        } else {
            showToast("Спочатку оберіть бажаний товар", "info", 5000);
        }
    })

    confirmPopupClose.forEach(function (e) {
        e.addEventListener("click", function () {
            confirmPopup.classList.toggle("d-block")
        })
    })

})

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

// const reviewsPopup = document.querySelector(".allReviewsPopup"),
//     reviewsBack = document.querySelector(".reviews-back")


// openReviewsPopup.addEventListener("click", function (e) {
//     e.preventDefault()
//     reviewsPopup.classList.toggle("d-block")
// });

// setReview.addEventListener("click", function (e) {
//     e.preventDefault()
//     reviewsPopup.classList.toggle("d-block")
// })

// reviewsBack.addEventListener("click", function () {
//     reviewsPopup.classList.toggle("d-block")
// })

document.addEventListener("DOMContentLoaded", function () {
    let openPayAndDeliveryPopup = document.querySelectorAll(".openPayAndDeliveryPopup"),
        exchangeAndReturn = document.querySelectorAll(".exchangeAndReturn"),
        deliveryPopup = document.querySelector("#deliveryPopup"),
        exchangePopup = document.querySelector("#exchangePopup");

    function closeAndOpenPayAndDeliveryPopup() {
        deliveryPopup.classList.toggle("d-block");
    }

    function closeAndOpenExchangeAndReturn() {
        exchangePopup.classList.toggle("d-block");
    }

    function closeAndOpenPayAndDeliveryPopupHandler() {
        openPayAndDeliveryPopup.forEach(function (e) {
            e.addEventListener("click", function (i) {
                i.preventDefault()
                closeAndOpenPayAndDeliveryPopup();
            });
        });
    }

    function closeAndOpenExchangeAndReturnHandler() {
        exchangeAndReturn.forEach(function (e) {
            e.addEventListener("click", function (i) {
                i.preventDefault()
                closeAndOpenExchangeAndReturn();
            });
        });
    }

    closeAndOpenPayAndDeliveryPopupHandler();
    closeAndOpenExchangeAndReturnHandler();

    // privacyPolice
    const privacyPolice = document.querySelector(".privacyPolice"),
        privacyPolicePopap = document.querySelector("#privacyPolice"),
        backPrivacy = document.querySelector(".back-privacy"),
        ofertaPopap = document.querySelector("#oferta"),
        oferta = document.querySelector(".oferta"),
        ofertaBack = document.querySelector(".back-oferta")

    privacyPolice.addEventListener("click", function (e) {
        e.preventDefault()
        privacyPolicePopap.classList.add("d-block")
    })
    backPrivacy.addEventListener("click", function () {
        privacyPolicePopap.classList.remove("d-block")
    })

    oferta.addEventListener("click", function (e) {
        e.preventDefault()
        ofertaPopap.classList.add("d-block")
    })
    ofertaBack.addEventListener("click", function () {
        ofertaPopap.classList.remove("d-block")
    })

})

let icon = {
    success: '<span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="#20bf55" data-name="Flat Color"><path d="M12 22.75a10.75 10.75 0 0 1 0-21.5 10.53 10.53 0 0 1 4.82 1.15.75.75 0 0 1-.68 1.34 9 9 0 0 0-4.14-1A9.25 9.25 0 1 0 21.25 12a2 2 0 0 0 0-.25.75.75 0 1 1 1.5-.14V12A10.76 10.76 0 0 1 12 22.75z" fill="#045d22" opacity="1" data-original="#20bf55" class=""></path><path d="M11.82 15.41a.7.7 0 0 1-.52-.22l-4.83-4.74a.75.75 0 0 1 0-1.06.77.77 0 0 1 1.07 0l4.29 4.23 9.65-9.49a.77.77 0 0 1 1.07 0 .75.75 0 0 1 0 1.06l-10.18 10a.74.74 0 0 1-.55.22z" fill="#045d22" opacity="1" data-original="#20bf55" class=""></path></g></g></svg></span>',
    info: '<span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 330 330" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M165 0C74.019 0 0 74.02 0 165.001 0 255.982 74.019 330 165 330s165-74.018 165-164.999S255.981 0 165 0zm0 300c-74.44 0-135-60.56-135-134.999S90.56 30 165 30s135 60.562 135 135.001C300 239.44 239.439 300 165 300z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M164.998 70c-11.026 0-19.996 8.976-19.996 20.009 0 11.023 8.97 19.991 19.996 19.991 11.026 0 19.996-8.968 19.996-19.991 0-11.033-8.97-20.009-19.996-20.009zM165 140c-8.284 0-15 6.716-15 15v90c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></span>',
};

const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {
    if (!Object.keys(icon).includes(toastType)) toastType = "info";
    let box = document.createElement("div");
    box.classList.add(
        "toast", `toast-${toastType}`);
    box.innerHTML = ` <div class="toast-content-wrapper"> 
                      <div class="toast-icon"> 
                      ${icon[toastType]} 
                      </div> 
                      <div class="toast-message">${message}</div> 
                      <div class="toast-progress"></div> 
                      </div>`;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration =
        `${duration / 1000}s`;

    let toastAlready =
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box)

    document.body.querySelector(".toast").style.zIndex = "100"

    let toastTimeout = setTimeout(function () {
        document.body.querySelector(".toast").style.zIndex = "-10"
    }, 5000)
};

let submit =
    document.querySelector(".custom-toast.success-toast");
let information =
    document.querySelector(".custom-toast.info-toast");
let failed =
    document.querySelector(".custom-toast.danger-toast");
let warn =
    document.querySelector(".custom-toast.warning-toast");


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form.order-confirm-form");

    form.addEventListener("submit", (event) => {
        const deliveryMethodInputs = form.querySelectorAll("input[name='deliveryMethod']");
        const paymentTypeInputs = form.querySelectorAll("input[name='paymenttype']");

        if (!isAnyRadioChecked(deliveryMethodInputs) || !isAnyRadioChecked(paymentTypeInputs)) {
            showToast("Заповніть всі обов'язкові поля.", "info", 5000);
            event.preventDefault();
            return;
        }

        const inputs = form.querySelectorAll(".order-form input");
        for (const input of inputs) {
            if (!input.value.trim()) {
                showToast("Заповніть всі обов'язкові поля.", "info", 5000);
                event.preventDefault();
                return;
            }
        }

        // Перевірка валідності номеру телефону
        const userPhoneInput = form.querySelector("input[name='userPhone']");
        if (!isValidPhoneNumber(userPhoneInput.value.trim())) {
            showToast("Введіть коректний номер телефону.", "info", 5000);
            event.preventDefault();
            return;
        }
    });

    function isAnyRadioChecked(inputs) {
        return Array.from(inputs).some(input => input.checked);
    }

    function isValidPhoneNumber(phoneNumber) {
        // Регулярний вираз для перевірки формату номеру телефону +380xxxxxxxxx
        const phoneRegex = /\+380[0-9]{9}$/;
        return phoneRegex.test(phoneNumber);
    }

});


document.addEventListener("DOMContentLoaded", () => {
    const formReview = document.querySelector("form.review-form");

    formReview.addEventListener("submit", (event) => {
        const userRate = document.getElementById("userRate");
        const userName = formReview.querySelector("input[name='userName']");
        const userFirstName = formReview.querySelector("input[name='userFirstName']");
        const userReview = formReview.querySelector("textarea[name='userReview']");

        if (!userRate.value.trim()) {
            showToast("Оцініть товар", "info", 5000);
            event.preventDefault();
            return;
        }

        if (!userName.value.trim() || !userFirstName.value.trim() || !userReview.value.trim()) {
            showToast("Заповніть всі обов'язкові поля", "info", 5000);
            event.preventDefault();
            return;
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const callMeForm = document.querySelector("form[action='sendtelegram.php']")

    callMeForm.addEventListener("submit", (event) => {
        const userTelInput = callMeForm.querySelector("input[name='userTel']")

        if (!userTelInput.value.trim() || !isValidPhoneNumber(userTelInput.value)) {
            showToast("Введіть коректний номер телефону", "info", 5000)
            event.preventDefault()
            return
        }
    })

    function isValidPhoneNumber(phoneNumber) {
        return /\+380[0-9]{9}$/.test(phoneNumber)
    }
})