import requests from './src/js/requestHandler';
import render from './src/js/render';

const init = async () => {
    const articlesContainer = document.getElementById('articles-container');
    const loadButton = document.getElementById('load-news-button');
    const newsSourceSelect = document.getElementById('news-source-select');

    const getNews = async () => {
        const articles = await requests.getNewsAtriclesForSource(newsSourceSelect.value);
        articlesContainer.innerHTML = '';
        if (articles && articles.length) {
            articles.forEach((article) => render.addNewsArticle(article, articlesContainer));
        } else {
            render.renderErrorMessage('no-articles-found', articlesContainer);
        }
    };

    const newsSources = await requests.getAllNewsSources();
    newsSources.forEach((newsSource) => render.addSourceSelectOption(newsSource, newsSourceSelect));
    loadButton.addEventListener('click', getNews);
};

init();
