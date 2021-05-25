import type { rawUserMatchInfo } from '../typings/raw'
import Match from './Match';
export default class UserMatchInfo extends Match{

    constructor(data: rawUserMatchInfo){
    super(data);
    }
}