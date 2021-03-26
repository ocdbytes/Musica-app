let a = ['eminem', 'drake', 'maroon5', 'markul', 'timati', 'stromae', 'atif aslam', 'miyagi'];
let num = Math.floor(Math.random() * a.length) + 1
console.log(num);
querySearch(a[num]);

let loader = document.querySelector('.loader');
function showLoader() {
    loader.style.display = "block";
}
function hideLoader() {
    loader.style.display = "none";
}

function querySearch(input) {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${input}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "39584ae1d8msh109b4feeeb7316fp19f961jsn3d3d24264c3a",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }).then(response => {
        return response.json()
    }).then((data) => {
        console.log(data)
        showHero(data)
        let herocards = document.querySelectorAll('.hero-card');
        herocards.forEach((card) => {
            let a = card.childNodes[3].childNodes[3]
            let id = card.id;
            let m = data['data'][id]['preview']
            let aud = new Audio(m);
            a.addEventListener('click', () => {
                if (aud.paused) {
                    a.style.border = "2px dotted #e63946";
                    aud.play();
                } else {
                    aud.pause();
                    a.style.border = "none";
                    aud.currentTime = 0;
                }
            })
        })
    }).catch(err => {
        console.error(err);
    });
}

function showHero(data) {
    let cardsHero = document.querySelector('.hero-cards');
    var str = '';

    let heroTitle = document.querySelector('.hero-title');
    heroTitle.innerHTML = data.data[1]['artist']['name'];

    let heroImage = document.querySelector('.image-hero');
    heroImage.innerHTML = `<img src=${data.data[1]['artist']['picture_big']} alt=""></img>`;

    for (let i = 0; i < data.data.length; i++) {
        const element = data.data[i];
        let html = `<div class="hero-card" id=${i}>
                    <img src=${element['album']['cover_big']} alt="" width="100px" height="100px" class="hero-card-image">
                    <div class="hidd">
                        <h2 class="hero-card-title">${element['album']['title']}</h2>
                        <button class="playbtn"><img src="./images/play.png" alt=""></button>
                    </div>
                </div>`;
        str += html
    }
    cardsHero.innerHTML = str;
}


function querySearchResults(input) {
    showLoader();
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${input}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "39584ae1d8msh109b4feeeb7316fp19f961jsn3d3d24264c3a",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }).then(response => {
        return response.json()
    }).then((dataR) => {
        hideLoader();
        showSearchResults(dataR)
        let resultcards = document.querySelectorAll('.result-card');
        resultcards.forEach((card) => {
            let a = card.childNodes[3].childNodes[3]
            let id = card.id;
            console.log(id);
            let m = dataR['data'][id - 100]['preview']
            console.log(m);
            let aud = new Audio(m);
            a.addEventListener('click', () => {
                if (aud.paused) {
                    a.style.border = "2px dotted #e63946";
                    aud.play();
                } else {
                    aud.pause();
                    a.style.border = "none";
                    aud.currentTime = 0;
                }
            })
        })
    }).catch(err => {
        console.error(err);
    });
}
let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-artist');

searchBtn.addEventListener('click', () => {
    let val = searchInput.value;
    if (val != '') {
        querySearchResults(val);
        searchInput.value = '';
    }
})

function showSearchResults(data) {
    let results = document.querySelector('.results');
    var str = '';
    str += `<h1 id="after">${data.data[0]['artist']['name']} Search <span style="color: #e63946;">RESULTS..</span>..</h1>`;
    for (let i = 0; i < data.data.length; i++) {
        const element = data.data[i];
        let html = `<div class="result-card" id=${i + 100}>
                        <img src=${element['album']['cover_big']} alt="" width="100px" height="100px" class="hero-card-image">
                        <div class="hidd">
                            <h2 class="hero-card-title">${element['album']['title']}</h2>
                            <button class="playbtn"><img src="./images/play.png" alt=""></button>
                        </div>
                    </div>`;
        str += html;
    }
    results.innerHTML = str;
}

let landing = document.querySelector('#artist');
let nav = document.querySelector('.nav');
function navigationDes() {
    if (window.pageYOffset >= landing.offsetTop) {
        nav.style.filter = "invert(1)";
    } else {
        nav.style.filter = "invert(0)";
    }
}

let navItems = document.getElementById('items-nav');
let navbarToggle = document.getElementById('menu-toggle');

if (screen.width <= 550) {
    navItems.style.display = "none";
}

console.log(navItems, navbarToggle);
navbarToggle.addEventListener('click', () => {
    console.log('click');
    if (navItems.style.display == "none") {
        navItems.style.display = "flex";
        navbarToggle.style.transform = 'rotate(180deg)';
    }
    else if (navItems.style.display == "flex") {
        navItems.style.display = "none";
        navbarToggle.style.transform = 'rotate(0deg)';
    }
});
