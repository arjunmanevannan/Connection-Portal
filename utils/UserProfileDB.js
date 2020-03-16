const user = require('./../models/User.js')
const userConnection = require('./../models/UserConnection.js')
const userProfile = require('./../models/UserProfile.js')
const connection = require('./../models/Connection.js')

var con1 = new connection('1111','Gestures','Arjun Manevannan','Android','Test', '12-07-2019', '04:12');
var usr1 = new user('1111','Arjun','Manevannan','test@gmail.com');
var uc1 = new userConnection(con1,'Yes');
var up1 = new userProfile(usr1, uc1);

console.log(up1);
