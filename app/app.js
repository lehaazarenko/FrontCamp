import request from './src/js/requestHandler';
import render from './src/js/render';
import requestLogHandler from './src/js/requestLogHandler';

const init = async () => {
    const articlesContainer = document.getElementById('articles-container');
    const loadButton = document.getElementById('load-news-button');
    const newsSourceSelect = document.getElementById('news-source-select');
    const unauthorizedRequestButton = document.getElementById('unauthorized-request-button');
    const proxy = new Proxy(request, requestLogHandler);
    const newsSources = await proxy.getAllNewsSources();

    const getNews = async () => {
        const articles = await proxy.getNewsAtriclesForSource(newsSourceSelect.value);
        articlesContainer.innerHTML = '';
        render.renderNewsArticles(articles, articlesContainer);
    };

    const makeUnauthorizedRequest = async () => {
        const result = await proxy.makeUnauthorizedRequest();
        console.log(result);
    };

    newsSources.forEach((newsSource) => render.addSourceSelectOption(newsSource, newsSourceSelect));
    loadButton.addEventListener('click', getNews);
    unauthorizedRequestButton.addEventListener('click', makeUnauthorizedRequest);
};

init();
