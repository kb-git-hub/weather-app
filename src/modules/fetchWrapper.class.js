export default class fetchWrapper {
    #key

    constructor(baseURL) {
        this.baseURL = baseURL
        this.#key = `9a33e927ccd5fb4a9cca4dd926aece53`
    }

    async get(city) {
        const completeURL = `${this.baseURL}${city}&appid=${this.#key}`
        const response = await fetch(completeURL)
        return await response.json()
    }
}
