export default class UserBO {
  username: string;
  age: number;
  sex: number;

  constructor({
    username,
    age,
    sex = 0,
  }: {
    username: string;
    age: number;
    sex: number;
  }) {
    this.username = username;
    this.age = age;
    this.sex = sex;
  }
}
