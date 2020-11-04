// Singleton engine class.

var userData = null

const engine = {
    async requestFeed(callback) {
        // Temporarily surround with category as the api has not added that functionality yet
        const response = await fetch('http://localhost:8000/api/recentarticles');
        const data = await response.json()
        if (response.ok) {
            callback(data)
        } else {
            console.log ("Something bad happend in engine.requestFeed().")
        }
    }, 
    async requestArticle(articleID, callback) {
        const response = await fetch('http://localhost:8000/api/article/' + articleID)
        const data = await response.json()
        if (response.ok) {
            callback(data)
        } else {
            console.log("Something bad happened in engine.request")
        }
    },
    setUserData(user) {
        console.log("user" + String(user))
        userData = user
    },
    getUserData() {
        console.log(userData)
        return userData
    }
}

Object.freeze(engine)
export default engine