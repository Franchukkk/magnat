function displayReviews(numReviews, targetClass, lastCard, reviewsArr) {
    // alert(12)
    console.log(reviewsArr);
    console.log(targetClass);
    const reviewsList = document.querySelector(`.${targetClass}`)

    const numReviewsToDisplay = Math.min(reviewsArr.length, numReviews)

    for (let i = reviewsArr.length - 1 - lastCard; i >= reviewsArr.length - numReviewsToDisplay - lastCard; i--) {
        if (!reviewsArr[i]) {
            document.getElementById('moreReviewsBtn').classList.add("d-none")
            break
        }

        let reviewerName = reviewsArr[i].name,
            reviewDate = reviewsArr[i].date,
            reviewDescription = reviewsArr[i].review,
            reviewRate = reviewsArr[i].rate,
            reviewRateHtml = ""

        for (let j = 1; j <= 5; j++) {
            if (j <= parseFloat(reviewRate)) {
                reviewRateHtml += "<div class='star active'></div>";
            } else {
                reviewRateHtml += "<div class='star'></div>";
            }
        }

        let reviewCard = `
            <div class="review-card">
                <div class="review-block-hidden">
                    <div class="flex-between items-center">
                        <span>${reviewerName}</span>
                        <span class="date">${reviewDate}</span>
                    </div>
                    <div class="stars flex">
                        ${reviewRateHtml}
                    </div>
                    <p>${reviewDescription}</p>
                </div>
            </div>
        `

        reviewsList.insertAdjacentHTML('beforeend', reviewCard)
    }
}
// let reviewsArr
function loadReviews() {
    return fetch('reviews.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('reviews error')
            }
            console.log(response.json())
            return response.json()
        })
        .catch(error => {
            console.error('Error:', error)
            return []
        })
}

fetch('reviews.json')
    .then(response => response.json())
    .then(data => {

        const reviewsArr = data
        console.log(reviewsArr)


        if (document.querySelector(".reviews-popup")) {
            if (document.querySelector(".reviews-popup").getAttribute("data-value") === "set") {
                document.querySelector(".reviews-popup-list").innerHTML = ""
                document.querySelector(".review-details").style.display = "block"
                document.querySelector(".reviews-popup-list").classList.remove("reviews-popup-list-flex")
                document.querySelector(".reviews-and-btn").classList.remove("w-100")
                console.log("reviewsArr" + reviewsArr);
                displayReviews(3, "reviews-popup-list", 0, reviewsArr)
                document.getElementById('moreReviewsBtn').classList.add("d-none")
                document.querySelector(".allReviewsPopup").classList.add("d-block")
                loadReviews().then(function (reviewsArr) {
                    let howMuchCardsActive = 0



                    const stars = document.querySelectorAll('.star-review')
                    const userRateInput = document.getElementById('userRate')
                    const showMoreReviews = document.getElementById('moreReviewsBtn')

                    for (let i = 0; i < stars.length; i++) {
                        stars[i].addEventListener('click', function () {
                            setRating(this.getAttribute('data-value'))
                        })
                    }

                    function setRating(rating) {
                        rating = parseInt(rating)

                        for (let i = 0; i < stars.length; i++) {
                            if (i < rating) {
                                stars[i].classList.add('active')
                            } else {
                                stars[i].classList.remove('active')
                            }
                        }

                        userRateInput.value = rating
                    }

                    showMoreReviews.addEventListener("click", function () {
                        howMuchCardsActive += 10

                        displayReviews(10, "reviews-popup-list", howMuchCardsActive, reviewsArr)
                    })



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

                })
            } else if (document.querySelector(".reviews-popup").getAttribute("data-value") === "all") {
                document.querySelector(".reviews-popup-list").innerHTML = ""
                document.querySelector(".review-details").style.display = "none"
                document.querySelector(".reviews-popup-list").classList.add("reviews-popup-list-flex")
                document.querySelector(".reviews-and-btn").classList.add("w-100")
                displayReviews(reviewsArr.length, "reviews-popup-list", 0, reviewsArr)
                document.getElementById('moreReviewsBtn').classList.add("d-none")
                document.querySelector(".allReviewsPopup").classList.add("d-block")
            }

        }




    })
    .catch(error => {
        console.error('Помилка завантаження або обробки даних:', error)
    })