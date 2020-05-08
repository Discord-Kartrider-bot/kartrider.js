class Base{
	constructor(client){
		Object.defineProperty(this,'client',{value:client});
	}
  _clone() {
    return Object.assign(Object.create(this), this);
  }

  _patch(data) {
    return data;
  }

  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }
  _apply(data) {
    return Object.assign(this,data);
  }

  //TODO 나중에 json 출력 방식 생성
 /* toJSON(...props) {
    return Util.flatten(this, ...props);
  }*/

  valueOf() {
    return this.id;
  }
}

module.exports = Base;