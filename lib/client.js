const API = require('./NexonAPI')
const client = function client(token){
    if(!token) new Error("Nexon API Token is Required on Client");
    this.token = token;
    this.api = new API(this);
}
module.exports = client;
