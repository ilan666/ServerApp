import { User } from "./User";
import { Gender } from './Gender.enum';

export class UserParams {
  gender: Gender;
  minAge = 18;
  maxAge = 150
  pageNumber = 1
  pageSize = 5

  constructor({gender}: User){
    this.gender = gender === Gender.male ? Gender.female : Gender.male
  }
}
