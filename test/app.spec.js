const chai = require('chai');
const test = require('../index');
const client = new test.Client("token");

const assert = chai.assert;

describe('getPlayer("코로나행열차")',()=>{
it('Username to userID',function(done){
client.api.getID("코로나행열차").then(data => {assert.equal(data,'2047251563');done();});
});
it('getPlayer(id)',async function(){
    const player= await client.api.getPlayer((await client.api.getID("코로나행열차")));
    assert.equal(player.id,'2047251563');
    assert.equal(player.name,'코로나행열차');
    });
});