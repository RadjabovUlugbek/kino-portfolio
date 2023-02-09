window.addEventListener("DOMContentLoaded", () => {
    let kinolar = movies.slice(0, 30)
    let form = renderElement("form")
    let template = renderElement("template").content
    let boxes = renderElement(".boxes")
    let text = renderElement(".text")
    let janr = renderElement(".jant_select")
    let sort = renderElement(".sort_select")
    let inp = renderElement("input")

    function renders(e) {
        boxes.innerHTML = null
        if (e.length === 0) {
            let h1 = createTag("h1")
            h1.textContent = "Toilmadi"
            text.appendChild(h1)
            console.log("topilmadi ishlamoqda");
        } else if (inp.value === "") {
            let h2 = createTag("h2")
            h2.textContent = "bo'sh"
            text.appendChild(h2)
        }
        e.map((item) => {
            text.innerHTML = null
            let clone = template.cloneNode(true)
            let img = clone.querySelector("img")
            img.src = item.bigPoster
            let name = clone.querySelector("h2")
            name.textContent = item.title
            let trelier = clone.querySelector("a")
            trelier.href = item.trailer
            let year = clone.querySelector("h3")
            year.innerHTML = item.year + " yil"
            let about = clone.querySelector("p")
            about.textContent = item.summary
            boxes.appendChild(clone)
        })
    }
    renders(kinolar)
    let result = []
    let renderCategories = (e) => {
        e.forEach((item) => {
            let categories = item.categories
            for (let i = 0; i < categories.length; i++) {
                if (!result.includes(categories[i])) {
                    result.push(categories[i])
                }
            }
        });
        createOption(result)
    }
    renderCategories(kinolar)
    function createOption(arr) {
        for (let i = 0; i < arr.length; i++) {
            let janrOption = createTag("option")
            janrOption.textContent = arr[i]
            janrOption.value = arr[i]
            janr.appendChild(janrOption)
        }
    }

    let sortObject = {
        az: function (a, b) {
            if (a.title < b.title) {
                return -1
            } else {
                return 1
            }
        },
        za: function (a, b) {
            if (a.title > b.title) {
                return 1
            } else {
                return -1
            }
        },
        rating: function (a, b) {
            if (a.imdbRating < b.imdbRating) {
                return 1
            } else {
                return -1
            }
        }
    }
    function submit(e) {
        e.preventDefault()
        let inputvalue = inp.value
        let filter = []
        let janrValue = janr.value
        let sortVaule = sort.value
        if (janrValue === "all") {
            filter = kinolar
        }
        else {
            filter = kinolar.filter((item) => item.categories.includes(janrValue))
        }
        let regex = new RegExp(inputvalue, "gi")
        if (inputvalue === "alll") {
            filter = filter
        } else {
            filter = filter.filter((item) => item.title.match(regex))
        }
        filter.sort(sortObject[sortVaule])
        renders(filter)
    }
    form.addEventListener("submit", submit)
    let page = 1
    let limit = 30 / 3
    let max = 30 / 10
    let right = renderElement(".right")
    let left = renderElement(".left")
    function handleRight(e) {
        page++
        if (page >= max) {
            right.disabled = true
            left.disabled = false
        }
        renders(kinolar.slice(limit * (page - 1), (page * limit)))
    }
    right.addEventListener("click", handleRight)
    function handleLeft(e) {
        if (page > 1) {
            page--
            renders(kinolar.slice(limit * (page - 1), (page * limit)))
        }
        else {
            left.disabled = true
            right.disabled = false
        }
    }
    left.addEventListener("click", handleLeft)
    console.log(limit);
    

})