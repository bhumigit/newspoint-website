const API_KEY="12f91aa0174747b3a6bc791c8342bccc";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload()
}

async function fetchNews (query){
    const res = await fetch (`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardscontainer= document.getElementById('cards-container');
    const newscardTemplate=document.getElementById('template-news-card');
 cardscontainer.innerHTML='';
 articles.forEach((article)=>{
    if(!article.urlToImage) return;
    const cardClone= newscardTemplate.content.cloneNode(true);
    filldataIncard(cardClone,article);
    cardscontainer.appendChild(cardClone);
 });
}

function filldataIncard(cardClone,article){
    const newsImg= cardClone.querySelector('#news-img');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDesc= cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML= article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name}·${date}`;
cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
});
}

let curSelectedNav=null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelectedNav) {
        curSelectedNav.classList.remove("active");
    }
    curSelectedNav = navItem;
    if (curSelectedNav) {
        curSelectedNav.classList.add("active");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");

    if (searchButton && searchText) {
        searchButton.addEventListener("click", () => {
            const query = searchText.value.trim();
            if (!query) return;
            fetchNews(query);
            if (curSelectedNav) {
                curSelectedNav.classList.remove("active");
            }
            curSelectedNav = null;
        });
    } 
});
