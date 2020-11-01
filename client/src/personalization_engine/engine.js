import text from './tmp_data'; // Relative path to your File

export default class engine {
    // constructor() {
    //     // Dive into some blockstack stuff later
    //     // Some variables may need storage
    // }
   async requestFeed(callback) {
        // Temporarily surround with category as the api has not added that functionality yet
        const response = await fetch('http://localhost:8000/api/recentarticles');
        const data = await response.json()
        if (response.ok) {
            callback(data)
        } else {
            console.log ("Something bad happend in engine.requestFeed().")
            // callback("Err");
        }
        return text;
    }
    async requestArticle(articleID, callback) {
        const response = await fetch('http://localhost:8000/api/article/' + articleID)
        const data = await response.json()
        if (response.ok) {
            callback(data)
        } else {
            console.log("Something bad happened in engine.request")
        }
    }
}
