const API = require('./NexonAPI')

const Client = function client(token) {
    if (!token) new Error('Nexon API Token is Required on Client')
    this.token = token
    this.api = new API(this)
}
module.exports = Client
