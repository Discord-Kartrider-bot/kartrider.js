const API = require('./NexonAPI')
const client = function client(token){
    this.token = token;
    this.api = new API(this);
}
module.exports = client;
