document.addEventListener("DOMContentLoaded", function () {

    const productList = document.querySelector(".card-block"),
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

            console.log(buyBtns);

            buyBtns.forEach(function (e) {
                e.addEventListener("click", function (i) {
                    let productID = this.dataset.value
                    fetch('products.json')
                        .then(response => response.json())
                        .then(products => {
                            const product = products.find(product => product.id === productID);
                            console.log(product);
                        });
                })
            })
        })
        .catch(error => console.error("Помилка завантаження даних:", error))

    // Функція для виведення товарів у вигляді списку
    function displayProducts(products) {
        // console.log(products)

        // Очистити список перед виведенням нових товарів
        productList.innerHTML = ""

        // Пройтися по кожному товару та додати його до списку
        products.forEach(product => {
            const listItem = document.createElement("figure"),
                figcaptionItems = document.createElement("figcaption")

                
            listItem.classList.add("card-box")
            listItem.appendChild(figcaptionItems)

            const cardClick = document.createElement("a")
            cardClick.classList.add("click-card")
            cardClick.href = "#"
            figcaptionItems.appendChild(cardClick)
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

            const sizes = ["40", "41", "42", "43", "44", "45"]

            for (const size of sizes) {
                const labelInput = document.createElement("label")
                labelInput.classList.add(`label${size}`)
                labelInput.innerText = `${size}`
                inputBlock.appendChild(labelInput)

                const inputSize = document.createElement("input")
                inputSize.type = "checkbox"
                inputSize.value = size
                labelInput.appendChild(inputSize)
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
})