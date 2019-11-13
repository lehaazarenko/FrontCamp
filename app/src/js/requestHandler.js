import vars from '../vars';
import errorHandler from './errorHandler';

class RequestCreator {
    constructor() {
        this.apiKey = vars.newsApiKey;
        this.apiUrl = vars.newsApiUrl;
    }

    static getInstance() {
        if (!RequestCreator.instance) {
            RequestCreator.instance = new RequestCreator();
        }
        return RequestCreator.instance;
    }

    async getAllNewsSources() {
        const newsApiResponse = await fetch(`${this.apiUrl}/sources?language=en&apiKey=${this.apiKey}`);
        if (newsApiResponse.ok) {
            const newsApiJsonResponse = await newsApiResponse.json();
            return newsApiJsonResponse.sources;
        }
        errorHandler.handle(`${newsApiResponse.status}: ${newsApiResponse.statusText}`);
        return null;
    }

    async getNewsAtriclesForSource(sourceId) {
        const newsApiResponse = await fetch(`${this.apiUrl}/everything?sources=${sourceId}&apiKey=${this.apiKey}`);
        if (newsApiResponse.ok) {
            const newsApiJsonResponse = await newsApiResponse.json();
            return newsApiJsonResponse.articles;
        }
        errorHandler.handle(`${newsApiResponse.status}: ${newsApiResponse.statusText}`);
        return null;
    }

    async makeUnauthorizedRequest() {
        // I agree that this is not the best way to handle errors (kostyl),
        // but commented out proxy error handling found all over the Internet refused to work
        const newsApiResponse = await fetch(`${this.apiUrl}/sources?language=en&apiKey=${this.apiKey}vottakvot`);
        if (newsApiResponse.ok) {
            const newsApiJsonResponse = await newsApiResponse.json();
            return newsApiJsonResponse.sources;
        }
        errorHandler.handle(`${newsApiResponse.status}: ${newsApiResponse.statusText}`);
        return null;
    }

    // get try() {
    //     return new Proxy(this, {
    //         // Intercept method getter
    //         get(target, prop) {
    //             if (typeof target[prop] === 'function') {
    //                 return new Proxy(target[prop], {
    //                     apply(targ, self, args) {
    //                         try {
    //                             return targ.apply(self, args);
    //                         } catch (error) {
    //                             errorHandler.handle(error.message);
    //                             throw new Error(error);
    //                         }
    //                     },
    //                 });
    //             }
    //             return target[prop];
    //         },
    //     });
    // }
}

const requestInstance = new RequestCreator();
export default requestInstance;
