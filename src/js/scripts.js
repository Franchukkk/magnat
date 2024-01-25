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
        filterBlock = document.querySelector(".filter"),
        cancelFilter = document.querySelector(".cancel-filter"),
        activeFilter = document.querySelector(".active-filter")


    filterMobile.addEventListener("click", function (e) {
        e.preventDefault()
        filterBlock.classList.add("active-filter")
    })

    cancelFilter.addEventListener("click", function () {
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

    const itemsPerPage = 12

    let currentPage = 1,
        totalPages = 1,
        jsonData = []


    function fetchData() {
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                jsonData = data
                totalPages = Math.ceil(jsonData.length / itemsPerPage)
                showData(currentPage)
                showPagination()
                updateProductDisplay(selectedCategory)

            })
            .catch(error => console.error("Помилка завантаження даних:", error))
    }

    function showData(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage,
            endIndex = startIndex + itemsPerPage,
            pageData = jsonData.slice(startIndex, endIndex)
            displayProducts(pageData, productList)
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
    
        listItem.classList.add("card-box", product.category, product.color, product.model, product.material, product.style, product.size40, product.size41, product.size42, product.size43, product.size44, product.size45)
        listItem.appendChild(figcaptionItems)
    
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
        const priceValue = parseInt(product.price.replace(/\D/g, ''))
        listItem.dataset.price = priceValue
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
            inputSize.name = "size-radio"
            inputSize.id = `input-${product.id}-${size}`
            inputSize.value = size
    
            const labelInput = document.createElement("label")
            labelInput.classList.add(`label${size}`)
            labelInput.setAttribute("for", `input-${product.id}-${size}`)
            labelInput.innerText = `${size}`
    
            if (`size${size}` in product) {
                inputSize.disabled = false
            } else {
                inputSize.disabled = true
            }
    
            inputBlock.appendChild(inputSize)
            inputBlock.appendChild(labelInput)
        }
    
        const ctaBuy = document.createElement("a")
        ctaBuy.classList.add("cta-card")
        ctaBuy.setAttribute('data-value', product.id)
        ctaBuy.innerText = product.cta
        ctaBuy.href = "#"
        figcaptionItems.appendChild(ctaBuy)
    
        return listItem
    }
    
    function displayProducts(products, container) {
        container.innerHTML = ""
    
        products.forEach(product => {
            const listItem = createCardElement(product)
            container.appendChild(listItem)
        })
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
            descriptPopap = document.querySelector(".descript-popap"),
            producerCard = document.querySelector(".producer-card_popap"),
            countryCard = document.querySelector(".country-card_popap"),
            kindCard = document.querySelector(".kind-card_popap"),
            seasonCard = document.querySelector(".season-card_popap"),
            materialTop = document.querySelector(".material-top_popap"),
            materialBottom = document.querySelector(".material-bottom_popap"),
            materialSole = document.querySelector(".material-sole_popap"),
            styleCard = document.querySelector(".style-card_popap")
            
        //запис характеристик товару 
            producerInfo = document.createElement("p")
            producerInfo.innerText = "виробник"
            producerInfo2 = document.createElement("p")
            producerInfo2.classList.add("bold-card")
            producerInfo2.innerText = product.producer
            producerCard.appendChild(producerInfo)
            producerCard.appendChild(producerInfo2)

            countryInfo = document.createElement("p")
            countryInfo.innerText = "країна виробник"
            countryInfo2 = document.createElement("p")
            countryInfo2.innerText = product.country
            countryInfo2.classList.add("bold-card")
            countryCard.appendChild(countryInfo)
            countryCard.appendChild(countryInfo2)
            
            kindInfo = document.createElement("p")
            kindInfo.innerText = "вид взуття"
            kindInfo1 = document.createElement("p")
            kindInfo1.classList.add("bold-card")
            kindInfo1.innerText = product.kind
            kindCard.appendChild(kindInfo)
            kindCard.appendChild(kindInfo1)

            seasonInfo = document.createElement("p")
            seasonInfo.innerText = "сезон"
            seasonInfo1 = document.createElement("p")
            seasonInfo1.classList.add("bold-card")
            seasonInfo1.innerText = product.seasonHaract
            seasonCard.appendChild(seasonInfo)
            seasonCard.appendChild(seasonInfo1)
            
            materialTopInfo = document.createElement("p")
            materialTopInfo.innerText = "матеріал верху"
            materialTopInfo1 = document.createElement("p")
            materialTopInfo1.classList.add("bold-card")
            materialTopInfo1.innerText = product.materialTop
            materialTop.appendChild(materialTopInfo)
            materialTop.appendChild(materialTopInfo1)
            
            materialBottomInfo = document.createElement("p")
            materialBottomInfo.innerText = "матеріал підкладки"
            materialBottomInfo1 = document.createElement("p")
            materialBottomInfo1.classList.add("bold-card")
            materialBottomInfo1.innerText = product.materialBottom
            materialBottom.appendChild(materialBottomInfo)
            materialBottom.appendChild(materialBottomInfo1)
            
            materialSoleInfo = document.createElement("p")
            materialSoleInfo.innerText = "матеріал підошви"
            materialSoleInfo1 = document.createElement("p")
            materialSoleInfo1.classList.add("bold-card")
            materialSoleInfo1.innerText = product.materialSole
            materialSole.appendChild(materialSoleInfo)
            materialSole.appendChild(materialSoleInfo1)
            
            styleCardInfo = document.createElement("p")
            styleCardInfo.innerText = "стиль"
            styleCardInfo1 = document.createElement("p")
            styleCardInfo1.classList.add("bold-card")
            styleCardInfo1.innerText = product.styleCard
            styleCard.appendChild(styleCardInfo)
            styleCard.appendChild(styleCardInfo1)


            
        descrHead.innerText = product.head
        newPricePopap.innerText = product.price
        spanId.innerText = product.id
        cardSpanPrice.innerText = product.saleprice
        mainImgPopap.src = product.img
        mainImgPopap.alt = product.alt
        smallPopapImg1.src = product.imgPopap1
        smallPopapImg1.alt = product.altPopap1
        smallPopapImg2.src = product.imgPopap2
        smallPopapImg2.alt = product.altPopap2
        smallPopapImg3.src = product.imgPopap3
        smallPopapImg3.alt = product.altPopap3
        
        const listPopap = document.createElement("ol"),
        bottomDescript = document.createElement("p"),
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
        bottomDescript.innerText = product.bottomDescript
        descriptPopap.appendChild(bottomDescript)

        const sizes = ["40", "41", "42", "43", "44", "45"],
            choiseSizePopap = document.querySelector(".choise-size_popap")

        for (const size of sizes) {
            const inputSize = document.createElement("input")
            inputSize.type = "checkbox"
            inputSize.id = `input-${product.id}-${size}`
            inputSize.name = "size-popap"
            inputSize.value = size
        
            const labelInput = document.createElement("label")
            labelInput.classList.add(`label${size}`)
            labelInput.setAttribute("for", `input-${product.id}-${size}`)
            labelInput.innerText = `${size}`
        
            if (`size${size}` in product) {
                inputSize.disabled = false
            } else {
                inputSize.disabled = true
            }
        
            choiseSizePopap.appendChild(inputSize)
            choiseSizePopap.appendChild(labelInput)
        }
        // виведення кольору
        
            const formColor = document.createElement("form")
            formColor.classList.add("color-form-popap")
            choiseColorPopap.appendChild(formColor)

            let availableColors = [product.color, product.color1, product.color2].filter(Boolean)

            console.log(availableColors)
            availableColors.forEach(function (color) {
                const inputId = color + "-popap" + product.id
                
                const inputColorPopap = document.createElement('input');
                inputColorPopap.type = 'checkbox'
                inputColorPopap.id = inputId
                inputColorPopap.name = 'color-popap'
                inputColorPopap.value = color
        
                const labelColor = document.createElement('label')
                labelColor.htmlFor = inputId
                switch (color) {
                    case 'blue':
                        console.log("blue");
                        labelColor.classList.add("blue");
                        break;
                    case 'black':
                        console.log("black");
                        labelColor.classList.add("black");
                        break;
                    case 'green':
                        console.log("green");
                        labelColor.classList.add("haki");
                        break;
                    case 'brown':
                        console.log("brown");
                        labelColor.classList.add("brown");
                        break;
                    default:
                        break;
                }

                formColor.appendChild(inputColorPopap)
                formColor.appendChild(labelColor)   
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

            let popupCategory = product.color
            // скільки карточок виводиться в попапі
            const maxSimilarProducts = 4 

            sameCard.innerHTML = ''
        
            displaySimilarProducts(jsonData, popupCategory, sameCard, maxSimilarProducts)
                let ctaPopup = document.querySelector(".cta-popap")
                ctaPopup.setAttribute("data-value", product.id)
                ctaPopup.addEventListener("click", function (e) {
                    e.preventDefault()
                    productPopup.style.display = "none"
                    //додати відкриття кошика 
            })

    }

    //вивід карточок товару
    
    function displaySimilarProducts(products, popupCategory, container, maxCount) {
        let count = 0,
            hasSimilarProducts = false
        const noSimilarProductsMessage = document.querySelector(".text-same-card")

        products.forEach(product => {
            if (count < maxCount && popupCategory && product.color === popupCategory && openedProductId !== product.id) {
                const listItem = createCardElement(product)
                container.appendChild(listItem)
                count++
                hasSimilarProducts = true
                noSimilarProductsMessage.innerText = "схожі товари"
            }
        })
        if(!hasSimilarProducts) {
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
        countryCard.innerHTML = ''

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
    
    backPopapCard.addEventListener("click", function(e) {
        e.preventDefault()
        productPopup.style.display = "none"
    })

    // вибір категорій і додавання до локального сховища, при завантажені сторінки підзавантажуються дані згідно вибраних категорій а не весь список

    const btnProduct = document.querySelectorAll(".card-cta-season"),
        categories = ["winter", "summer", "demiseason"], 
        lastSelectedCategory = localStorage.getItem("lastSelectedCategory")

    function updateProductDisplay(category) {
        jsonData.forEach(product => {
            const element = document.querySelector(`.${product.category}`)
            if (element) {
                element.style.display = category === "#all" || category === `#${product.category}` ? "block" : "none"
            }
        })
    }
    
    categoryFilter.addEventListener("click", (evt) => {
        if (evt.target.tagName === "BUTTON") {
            selectedCategory = evt.target.getAttribute("data-href")
            localStorage.setItem("lastSelectedCategory", selectedCategory)
            resetFilters()
            updateProductDisplay(selectedCategory)
            showData(currentPage)
        }
    })

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
                break
            case 5:
                // Сортування за популярністю 
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
        showPagination()
        updatePaginationButtons()
    })

    //випадаючий список

    const btnReadMore = document.querySelectorAll(".readmore");

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

    
    //  пагінатор

    function showPagination() {
        var paginationContainer = document.querySelector('#pagination')
        paginationContainer.innerHTML = ''

        if (totalPages > 1) {

            paginationContainer.appendChild(createButton('←', 'arrow-pag prev', function () {
                if (currentPage > 1) {
                    currentPage--
                    showData(currentPage)
                    showPagination()
                    updatePaginationButtons()
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
                    showPagination()
                    updatePaginationButtons()
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
                        showPagination()
                        updatePaginationButtons()
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
                    showPagination()
                    updatePaginationButtons()
                }))
            }

            // Стрілка "Вперед"
            paginationContainer.appendChild(createButton('→', 'arrow-pag next', function () {
                if (currentPage < totalPages) {
                    currentPage++
                    showData(currentPage)
                    showPagination()
                    updatePaginationButtons()
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

    fetchData()

    //сортування карток товарів

    let selectedCategory = lastSelectedCategory

    btnProduct.forEach((button) => (button.style.color = "#191919"))

    if (!lastSelectedCategory) {
        selectedCategory = "#all"
        localStorage.setItem("lastSelectedCategory", selectedCategory)
    }

    const selectedItem = document.querySelector(`[data-href="${selectedCategory}"]`)
    if (selectedItem) {
        selectedItem.style.color = "#fff"
        selectedItem.style.backgroundColor = "#4E98B6"
    } 

    categories.forEach((category) => {
        const elements = document.querySelectorAll(`.${category}`)
        elements.forEach((element) => {
            element.style.display =
                selectedCategory === `${category}` || selectedCategory === "#all" ? "block" : "none"
        })
    })

    btnProduct.forEach((item) => {
        item.addEventListener("click", (evt) => {
            evt.preventDefault();

            btnProduct.forEach((button) => {
                button.style.color = "#191919"
                button.style.backgroundColor = "#fff"
            });
            item.style.color = "#fff";
            item.style.backgroundColor = "#4E98B6"

            let category = evt.target.getAttribute("data-href")

            localStorage.setItem("lastSelectedCategory", category)

            updateProductDisplay(category)
        })
    })

    function updateProductDisplay(category) {
        categories.forEach((cat) => {
            const elements = document.querySelectorAll(`.${cat}`)
            elements.forEach((element) => {
                element.style.display = category === `${cat}` || category === "#all" ? "block" : "none"
            })
        })
    }

    // фільтр
    document.querySelector(".submit-filter").addEventListener("click", function (e) {
        e.preventDefault()
        updateProductFilter()
    })
    
    function updateProductFilter() {
        const minPrice = parseInt(document.querySelector('.input-min').value) || 0,
            maxPrice = parseInt(document.querySelector('.input-max').value) || 10000,
            selectedSizes = getSelectedValues('size'),
            selectedColors = getSelectedValues('color'),
            selectedModels = getSelectedValues('model'),
            selectedSeasons = getSelectedValues('season'),
            selectedMaterials = getSelectedValues('material'),
            selectedStyles = getSelectedValues('style')
    
        categories.forEach((category) => {
            const elements = document.querySelectorAll(`.${category}`)
            elements.forEach((element) => {
                const showElement =
                    checkFilter(element.classList, selectedSizes) &&
                    checkFilter(element.classList, selectedColors) &&
                    checkFilter(element.classList, selectedModels) &&
                    checkFilter(element.classList, selectedSeasons) &&
                    checkFilter(element.classList, selectedMaterials) &&
                    checkFilter(element.classList, selectedStyles) &&
                    checkPrice(element, minPrice, maxPrice)
    
                element.style.display = showElement ? "grid" : "none"
            })
        })
    }
    
    function checkPrice(element, min, max) {
        const priceValue = parseInt(element.dataset.price) // значення з data-price
        return priceValue >= min && priceValue <= max
    }
    
    function getSelectedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value)
    }
    
    function checkFilter(elementClasses, selectedValues) {
        return selectedValues.length === 0 || selectedValues.some(value => elementClasses.contains(value))
    }
    // скидання фільтру
    document.querySelector('button.cta-transparent.reset-filter[type="reset"]').addEventListener("click", function (e) {
        e.preventDefault()
        resetFilters()
    })
    
    function resetFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false
        })
    
        document.querySelector('.input-min').value = '0'
        document.querySelector('.input-max').value = '10000'
        document.querySelector(".range-min").value = "0"
        document.querySelector(".range-max").value = "10000"
    
        document.querySelectorAll('.product-card').forEach(productCard => {
            productCard.style.display = "grid"
        })

        updateProductFilter()
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
        returnBasket = document.querySelector(".basket-back"),
        body = document.querySelector("body")


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

function cart() {
    let sizesList = ""
    if (document.querySelectorAll(".cta-card")) {
        clearInterval(cartWaitTimeout)
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

                console.log('Вибрані розміри для продукту з ID', productId, ':', selectedSizes);
                buyBtnFunc(ctaButton, selectedSizes)

            })
        })

        document.querySelectorAll('.cta-popap').forEach(ctaButton => {
            ctaButton.addEventListener('click', function (event) {
                event.preventDefault()
                const productId = this.getAttribute('data-value');
                const selectedSizes = []

                document.querySelectorAll(`input[type="checkbox"][id^="input-${productId}"]:checked`).forEach(checkbox => {
                    selectedSizes.push(checkbox.value)
                    alert(checkbox.value)
                })
                
                console.log('Вибрані розміри для продукту з ID', productId, ':', selectedSizes);
                buyBtnFunc(ctaButton, selectedSizes)

            })
        })

        function buyBtnFunc(e, size) {
            let productID = e.dataset.value


            let currentSizesList = ""
            fetch('products.json')
                .then(response => response.json())
                .then(products => {
                    const product = products.find(product => product.id === productID)
                    if (product.saleprice === "") {
                        product.saleprice = product.price;
                    }
                    if (size.length > 1) {

                        console.log(size)
                        for (let i = 0; i < size.length; i++) {
                            if (!orders[productID + size[i]]) {
                                orders[productID + size[i]] = {
                                    product: product,
                                    quantity: 1
                                }
                                
                                if (size) {
                                    orders[productID + size[i]].size = size[i]
                                }
                                
                                orders.orderSumWithNoDiscount += orders[productID + size[i]].product.saleprice != "" ? Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) : 0
                                orders.orderSumWithDiscount += Number((orders[productID + size[i]].product.price).slice(0, -4))
                                updateCart(productID, orders[productID + size[i]].size)

                                console.log(document.querySelector(".minus-quantity[data-value='" + productID + size[i] + "']"))
                                plusBtn(".plus-quantity[data-value='" + productID + size[i] + "']")
                                minBtn(".minus-quantity[data-value='" + productID + size[i] + "']")

                                caclnumberOfProducts++
                                numberOfProductsDOM.innerText = caclnumberOfProducts
                                orderDiscountCalc += Number((orders[productID + size[i]].product.saleprice).slice(0, -4)) - Number((orders[productID + size[i]].product.price).slice(0, -4))
                                console.log(1)
                                console.log(orderDiscountCalc)
                                orderDiscount.innerText = orderDiscountCalc
                                orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
                                orderWithDiscountPrice.innerText = orders.orderSumWithDiscount
                            } else {
                                document.querySelector(".plus-quantity[data-value='" + productID + size[i] + "']").click()
                            }
                            

                        }
                        console.log(orders)
                    } else {
                        
                        if (orders[productID + size]) {
                            caclnumberOfProducts++
                            numberOfProductsDOM.innerText = caclnumberOfProducts

                            if ((orders[productID + size].size)[0] != size) {
                                updateCart(productID, size)
                                setTimeout(() => {
                                    console.log(document.querySelector(".minus-quantity[data-value='" + productID + size + "']"))
                                    plusBtn('.basket-card[data-value="' + productID + size + '"]' + " .plus-quantity")
                                    minBtn(".minus-quantity[data-value='" + productID + size + "']")
                                }, 100)
                            } else {
                                orders[productID + size].quantity++
                            }
                            orders.orderSumWithNoDiscount += orders[productID + size].product.saleprice != "" ? Number((orders[productID + size].product.saleprice).slice(0, -4)) : 0
                            orders.orderSumWithDiscount += Number((orders[productID + size].product.price).slice(0, -4))
                            setTimeout(function () {
                                const totalPriceSpan = addedProductsList.querySelector('.basket-card[data-value="' + productID + size + '"]' + " .total-price span"),
                                    totalQuantitySpan = addedProductsList.querySelector('.basket-card[data-value="' + productID + size + '"]' + " .quantity-number");
                                orders[productID + size].totalPrice = Number((orders[productID + size].product.price).slice(0, -4)) * orders[productID + size].quantity
                                totalPriceSpan.innerText = orders[productID + size].totalPrice + " грн"
                                totalQuantitySpan.innerText = orders[productID + size].quantity
                            }, 10)
                            orderDiscountCalc += Number((orders[productID + size].product.saleprice).slice(0, -4)) - Number((orders[productID + size].product.price).slice(0, -4))
                            console.log(2)
                            console.log(orderDiscountCalc)
                            orderDiscount.innerText = orderDiscountCalc
                        } else {
                            orders[productID + size] = {
                                product: product,
                                quantity: 0
                            }
                            orders[productID + size].quantity += 1
                            if (size) {
                                orders[productID + size].size = size
                            }
                            orders.orderSumWithNoDiscount += orders[productID + size].product.saleprice != "" ? Number((orders[productID + size].product.saleprice).slice(0, -4)) : 0
                            orders.orderSumWithDiscount += Number((orders[productID + size].product.price).slice(0, -4))
                            updateCart(productID, orders[productID + size].size)

                            console.log(document.querySelector(".minus-quantity[data-value='" + productID + size + "']"))
                            plusBtn(".plus-quantity[data-value='" + productID + size + "']")
                            minBtn(".minus-quantity[data-value='" + productID + size + "']")
                            caclnumberOfProducts++
                            numberOfProductsDOM.innerText = caclnumberOfProducts
                            orderDiscountCalc += Number((orders[productID + size].product.saleprice).slice(0, -4)) - Number((orders[productID + size].product.price ).slice(0, -4))
                            console.log(3)
                            console.log(orderDiscountCalc)
                            orderDiscount.innerText = orderDiscountCalc
                        }
                        orderDetailSum.innerText = orders.orderSumWithNoDiscount != 0 ? orders.orderSumWithNoDiscount : orders.orderSumWithDiscount
                        orderWithDiscountPrice.innerText = orders.orderSumWithDiscount
                    }
                })
        }
    }

    function updateCart(id, sizesList) {

        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(product => product.id === id);
                const card = document.createElement("div");
                card.innerHTML = `
                    <div class="basket-card flex-between" data-value=${product.id + "" + sizesList}>
                        <img src=${product.img}>
                        
                        <div class="w-100 flex-between items-center">
                            <div class="description">
                                <div>
                                    <h3>${product.head}</h3>
                                    <table>
                                        <tr>
                                            <td>колір</td>
                                            <td>${product.color}</td>
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
}



const inputMask = document.querySelector(".inputMask")

inputMask.value = "+38"

inputMask.addEventListener("input", function () {
    let inputValue = inputMask.value

    if (inputValue.length > 13) {
        inputMask.value = inputValue.slice(0, 13)
        return
    }

    if (!inputValue.startsWith("+38")) {
        inputMask.value = "+38" + inputValue.slice(3)
    }
})


function plusBtn(button) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            let plusQuantity = document.querySelector(button)

            plusQuantity.addEventListener("click", function () {
                let productBlock = this.dataset.value
                console.log(productBlock)
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
                console.log(4)
                console.log(orderDiscountCalc)
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

                console.log(productID)
                console.log(orderKey)

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
                    console.log(5)
                    console.log(orderDiscountCalc)
                    orderDiscount.innerText = orderDiscountCalc
                }
            })
        })
}

document.addEventListener("DOMContentLoaded", function () {

    let buyBtns = document.querySelectorAll(".cta-card")
    console.log(buyBtns);
    buyBtns.forEach(function (e) {
        e.addEventListener("click", function () {
            let plusQuantity = document.querySelectorAll(".plus-quantity")
            plusBtn()
        })
    })


})


function sendData(orders) {
    let orderDetails = ""
    for (const key in orders) {
        if (Object.hasOwnProperty.call(orders, key)) {
            const order = orders[key]

            if (order && order.product) {
                orderDetails += `ID: ${order.product.id}, Розмір: ${order.size}, Кількість: ${order.quantity}     `
            }
        }
    }


    console.log(orderDetails)


    let ordersInput = document.querySelector("#orderProductsObject")
    const jsonString = JSON.stringify(orderDetails)

    ordersInput.value = jsonString

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

            }
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    //попап оформлення замовлення
    const openConfirmPopup = document.querySelector("#openConfirmPopup"),
        confirmPopup = document.querySelector("#popup-confirm-outline"),
        confirmPopupClose = document.querySelector(".confirm-back")

    openConfirmPopup.addEventListener("click", function() {
        if (Object.keys(orders).length > 3) {
            confirmPopup.classList.toggle("d-block")
            sendData(orders)
            let confirmPrice = document.querySelector("#confirmPrice"),
                confirmTotalPrice = document.querySelector("#confirmTotalPrice")
            orderConfirmProductsQuantity.innerText = caclnumberOfProducts + " "
            confirmTotalPrice.innerText = orders.orderSumWithDiscount + " грн"
            confirmPrice.innerText = orders.orderSumWithDiscount + " грн"

        }
    })

    confirmPopupClose.addEventListener("click", function() {
        confirmPopup.classList.toggle("d-block")
    })

})
