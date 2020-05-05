
module.exports.mergeMatchData = function(data){
    let result = [];
    data.forEach(e => {
        result = result.concat(e.matches);
    });
    return result;
}