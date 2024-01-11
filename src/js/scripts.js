document.addEventListener("DOMContentLoaded", function () {

    const productList = document.querySelector(".card-bott"),
        categoryFilter = document.querySelector(".filter-season")

    // Завантажити дані з JSON-файлу
    fetch("products.json")
        .then(response => response.json())
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

            buyBtns.forEach(function (e) {
                e.addEventListener("click", function (i) {
                    let productID = this.dataset.value
                    fetch('products.json')
                        .then(response => response.json())
                        .then(products => {
                            const product = products.find(product => product.id === productID)
                            console.log(product)
                        })
                })
            })
        })
        .catch(error => console.error("Помилка завантаження даних:", error))

    // Функція для виведення товарів у вигляді списку
    function displayProducts(products) {
        // console.log(products)

        // Очистити список перед виведенням нових товарів
        // productList.innerHTML = ""

        // Пройтися по кожному товару та додати його до списку
        products.forEach(product => {
            const listItem = document.createElement("figure"),
                figcaptionItems = document.createElement("figcaption")

            listItem.classList.add("card-box")
            listItem.appendChild(figcaptionItems)
            // const cardClick = document.createElement("a")
            // cardClick.href = "#"
            // cardClick.classList.add("click-card")
            // figcaptionItems.appendChild(cardClick)
            // Створити та додати зображення
            const imgElement = document.createElement("img")
            imgElement.src = product.img
            imgElement.alt = product.alt
            figcaptionItems.appendChild(imgElement)
            // створити звголовок 
            const headerCard = document.createElement("h2")
            headerCard.classList.add("header-card")
            headerCard.innerText = product.head
            figcaptionItems.appendChild(headerCard)
            // створити елемент старої ціни
            const oldPrice = document.createElement("p")
            oldPrice.classList.add("old-price")
            oldPrice.innerText = product.saleprice
            figcaptionItems.appendChild(oldPrice)
            // створити елемент нової ціни
            const newPrice = document.createElement("p")
            newPrice.classList.add("new-price")
            newPrice.innerText = product.price
            figcaptionItems.appendChild(newPrice)

            // створити інпути з розмірами

            const inputBlock = document.createElement("div")
            inputBlock.classList.add("input-block")
            figcaptionItems.appendChild(inputBlock)

            const sizes = ["40", "41", "42", "43", "44", "45"];

            for (const size of sizes) {
                const labelInput = document.createElement("label");
                labelInput.classList.add(`label${size}`);
                labelInput.setAttribute("for", `label${size}`);
                labelInput.innerText = `${size}`;
                inputBlock.appendChild(labelInput);

                const inputSize = document.createElement("input");
                inputSize.type = "checkbox";
                inputSize.id = `label${size}`;
                inputSize.value = size;
                inputBlock.appendChild(inputSize);
            }


            // створити кнопку
            const ctaBuy = document.createElement("a")
            ctaBuy.classList.add("cta-card")
            ctaBuy.setAttribute('data-value', product.id) // id товару для додання у кошик
            ctaBuy.innerText = product.cta
            ctaBuy.href = product.href
            figcaptionItems.appendChild(ctaBuy)

            // Додати елемент до списку
            productList.appendChild(listItem)
        })
    }      

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
})