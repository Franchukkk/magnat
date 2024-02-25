// function updateCartBtnsOnFunc () {
//     cart()
// }




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




const cartWaitTimeout = setTimeout(function () {
    cart()
}, 1000)


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
