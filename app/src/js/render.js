import vars from '../vars';

const addSourceSelectOption = (source, selectElement) => {
    const option = document.createElement('option');
    option.value = source.id;
    option.innerHTML = source.name;
    selectElement.append(option);
};

const renderErrorMessage = (message = '', type = 'default', element = document.getElementById('articles-container')) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    element.innerHTML = `
      <div class="error-message-container">
        <div class="error-message-header">Error occured...</div>
        <p class="error-message-text">
          ${message || vars.errorMessages[type]}
        </p>
      <div>`;
};

const addNewsArticle = (newsArticle, element) => {
    const article = document.createElement('article');
    const date = new Date(newsArticle.publishedAt).toLocaleDateString();

    article.innerHTML = `
      <div class="news-title">
        <strong>${newsArticle.title}</strong>
      </div>
      ${newsArticle.urlToImage ? `<img class="news-image" src="${newsArticle.urlToImage}">` : ''}
      <div class="news-description">${newsArticle.description}</div>
      <a class="news-link" href="${newsArticle.url} target="_blank">Go to official news source</a>
      <div class="news-metadata">
        <span>${date}${newsArticle.author ? `, ${newsArticle.author}` : ''} 
      </div>`;

    article.classList.add('news-article');
    element.append(article);
};

const renderNewsArticles = (newsArticles, element) => {
    if (newsArticles && newsArticles.length) {
        newsArticles.forEach((article) => addNewsArticle(article, element));
    } else {
        renderErrorMessage('', 'no-articles-found', element);
    }
};

export default {
    addSourceSelectOption,
    renderErrorMessage,
    renderNewsArticles,
};
