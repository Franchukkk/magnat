const reviewsArr = [
    {
        name: "Шамрай Артем",
        date: "30.12.2023",
        rate: "1",
        review: "В принципі за свої гроші доволі не поганий товар. Виглядають надійно як і по матеріалах так і як виконанні.Як будуть носитися ще подивимося, поки в місті майже 10 як для зими.З нюансів це вага. Трохи не дуже сучасно зараз але вибирав за ціною."
    },
    {
        name: "Шамрай Артем",
        date: "30.12.2023",
        rate: "2",
        review: "В принципі за свої гроші доволі не поганий товар. Виглядають надійно як і по матеріалах так і як виконанні.Як будуть носитися ще подивимося, поки в місті майже 10 як для зими.З нюансів це вага. Трохи не дуже сучасно зараз але вибирав за ціною."
    },
    {
        name: "Шамрай Артем",
        date: "30.12.2023",
        rate: "3",
        review: "В принципі за свої гроші доволі не поганий товар. Виглядають надійно як і по матеріалах так і як виконанні.Як будуть носитися ще подивимося, поки в місті майже 10 як для зими.З нюансів це вага. Трохи не дуже сучасно зараз але вибирав за ціною."
    },
    {
        name: "Шамрай Артем",
        date: "30.12.2023",
        rate: "4",
        review: "В принципі за свої гроші доволі не поганий товар. Виглядають надійно як і по матеріалах так і як виконанні.Як будуть носитися ще подивимося, поки в місті майже 10 як для зими.З нюансів це вага. Трохи не дуже сучасно зараз але вибирав за ціною."
    },
    {
        name: "Шамрай Артем",
        date: "30.12.2023",
        rate: "5",
        review: "В принципі за свої гроші доволі не поганий товар. Виглядають надійно як і по матеріалах так і як виконанні.Як будуть носитися ще подивимося, поки в місті майже 10 як для зими.З нюансів це вага. Трохи не дуже сучасно зараз але вибирав за ціною."
    },
]





function displayReviews(numReviews, targetClass) {
    const reviewsList = document.querySelector(`.${targetClass}`)
    const numReviewsToDisplay = Math.min(reviewsArr.length, numReviews)

    for (let i = reviewsArr.length - 1; i >= reviewsArr.length - numReviewsToDisplay; i--) {
        let reviewerName = reviewsArr[i].name,
            reviewDate = reviewsArr[i].date,
            reviewDescription = reviewsArr[i].review,
            reviewRate = reviewsArr[i].rate,
            reviewRateHtml = ""

        for (let j = 1; j <= 5; j++) {
            if (j <= parseFloat(reviewRate)) {
                reviewRateHtml += "<div class='star active'></div>"
            } else {
                reviewRateHtml += "<div class='star'></div>"
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





document.addEventListener("DOMContentLoaded", function() {
    displayReviews(5, "reviews-list")
    displayReviews(reviewsArr.length, "reviews-popup-list")
})
