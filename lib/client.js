const api = require('./api')
var client = function client(token){
    this.token = token;
}

client.prototype.api = api;
api.token = this.token;
