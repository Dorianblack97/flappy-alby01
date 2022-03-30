export class RankingService {
    #html;
    #http;
    #url;

    constructor(html, http, url) {
        this.#html = html;
        this.#http = http;
        this.#url = url;
    }

    show() {
        this.#http.get(this.#url, this.#print);
    }

    hide() {
        this.#html.innerHTML = '';
    }

    sendScore(stopwatch) {
        var playerName = document.getElementById('overlay-new-score-text').value;
        var playerScore = `${stopwatch.total.getMinutes().round2()}:${stopwatch.total.getSeconds().round2()}:${stopwatch.total.getMilliseconds().round2()}`;
        var jsonString = JSON.stringify({ name: playerName, total: playerScore });
        this.#http.post(this.#url, this.#print, jsonString);
    }

    #print = response => {
        let html = '<ol>';
        for (const player of JSON.parse(response)) {
            html += `<li>${player.name} - ${player.total}</li>`;
        }
        html += '</ol>';

        document.getElementById('ranking').innerHTML = html;
    }
}