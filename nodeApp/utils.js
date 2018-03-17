class Utils {
  constructor(){}
  static makeSignature (data, password){
    const md5 = require('md5');
    const sha1 = require('sha1');
    return sha1(md5(data + password));
  }
  static generateId(){
    return Math.random().toString(36).slice(2);
  }
}
module.exports = Utils;
