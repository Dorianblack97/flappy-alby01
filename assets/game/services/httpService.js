export class HttpService {
    #httpFactory;

    constructor() {
        this.#httpFactory = () => new XMLHttpRequest();
    }

    get(url, callback) {
        const httpFactory = this.#httpFactory();

        httpFactory.open('GET', url);
        httpFactory.send();

        httpFactory.onreadystatechange = () => {
            if (httpFactory.readyState === 4) {
                callback(httpFactory.responseText);
            }
        };
    }

    post(url, callback, jsonString) {
        const httpFactory = this.#httpFactory();

        httpFactory.open('POST', url); 
        httpFactory.setRequestHeader('Content-type', 'application/json');
        httpFactory.send(jsonString);

        httpFactory.onreadystatechange = () => {
            if (httpFactory.readyState === 4) {
                callback(httpFactory.responseText);
            }
        };
        
    }
}