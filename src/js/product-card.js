document.addEventListener("DOMContentLoaded", function() {

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
})

