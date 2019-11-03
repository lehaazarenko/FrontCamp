import vars from '../vars';

const addSourceSelectOption = (source, selectElement) => {
    const option = document.createElement('option');
    option.value = source.id;
    option.innerHTML = source.name;
    selectElement.append(option);
};

const renderErrorMessage = (type, element) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    element.innerHTML = `<p>${vars.errorMessages[type]}</p>`;
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

export default {
    addSourceSelectOption,
    renderErrorMessage,
    addNewsArticle,
};
