const API_KEY = 'YOUR_API_KEY';
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);

        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelectedNav != null)
        curSelectedNav.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

let inp = document.querySelector('input');
inp.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const query1 = searchText.value;
        if (!query1) return;

        fetchNews(query1);
        if (curSelectedNav != null) {
            curSelectedNav.classList.remove('active');
        }
        curSelectedNav = null;
    }
})

searchButton.addEventListener("click", () => {
    const query2 = searchText.value;
    if (!query2) return;

    fetchNews(query2);
    if (curSelectedNav != null) {
        curSelectedNav.classList.remove('active');
    }
    curSelectedNav = null;
});



const icon = document.getElementById("theme-icon");
const logo = document.getElementById("news-logo");

icon.onclick = function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "assets/sun.png";
        logo.src = "assets/newsLogo_DarkTheme.png";
    }

    else {
        icon.src = "assets/moon.png";
        logo.src = "assets/newsLogo_LightTheme.png";
    }

}
