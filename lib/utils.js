const Data = require('./Data');

module.exports.mergeMatchData = function(data){
    let result = [];
    data.forEach(e => {
        result = result.concat(e.matches);
    });
    return result.sort((a,b)=>new Date(b.endTime)-new Date(a.endTime));
}

module.exports.resolveData = function(data,type){
    const dataset = Data.get(type);
    if(!dataset) throw new Error("Wrong Type");
    const data1 = new Object();
    data1.id = data;
    const target = dataset.find(d=>d.id == data);
    data1.name = target ? target.name : "UNKNOWN";
    data1.image = target ? target.image : null;
    return data1;
}