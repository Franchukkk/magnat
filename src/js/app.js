// function updateCartBtnsOnFunc () {
//     cart()
// }




fetch('reviews.json')
    .then(response => response.json()) 
    .then(data => {
        const reviewsArr = data;
        console.log(reviewsArr)

        displayReviews(5, "reviews-list", 0, reviewsArr)
    })
    .catch(error => {
        console.error('Помилка завантаження або обробки даних:', error);
    });





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



    if (document.querySelector(".arr-right")) {
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
    }


    // const cart = document.querySelector(".cart"),
    //     basketPopup = document.querySelector("#basket-popup-outline"),
    //     returnBasket = document.querySelectorAll(".basket-back"),
    //     body = document.querySelector("body")


    // function basketToggle() {
    //     basketPopup.classList.toggle("d-block")
    //     body.classList.toggle("hidden")
    // }

    // cart.addEventListener("click", basketToggle)
    // returnBasket.forEach(function (e) {
    //     e.addEventListener("click", basketToggle)
    // })


    // fetchData()
    if (document.querySelector(".img-carousel")) {

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
    }
})




// const cartWaitTimeout = setTimeout(function () {
//     cart()
// }, 1000)


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

// function btnSimilar() {
//     let similarBtns = document.querySelectorAll(".popap-card .cta-card")
//     similarBtns.forEach(function (e) {
//         e.addEventListener("click", function () {
//             let similarProductId = this.dataset.value,
//                 similarSizesArr = []


//             document.querySelectorAll(`.popap-card input[type="checkbox"][id^="input-${similarProductId}"]:checked`).forEach(checkbox => {
//                 similarSizesArr.push(checkbox.value)
//             })

//             buyBtnFunc(e, similarSizesArr)
//         })
//     })
// }


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



if (document.querySelector("form[action='sendtelegram.php']")) {

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
}
