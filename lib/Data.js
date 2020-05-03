class Data {
    constructor() {
      throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

static get(data) {
    if (typeof data === 'string') return datas[data];
    throw new TypeError(`"structure" argument must be a string (received ${typeof data})`);
  }
}

const datas = {
    Kart: require('../data/kart'),
    Pet: require('../data/pet'),
    Track: require('../data/track'),
    MatchType: require('../data/gameType'),
    FlyingPet: require('../data/flyingpet'),
    Character: require('../data/character'),
  };
module.exports = Data;