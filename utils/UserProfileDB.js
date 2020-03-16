class UserProfile {
    constructor(user, userConnection){
      this._user = user;
      this._userConnection = userConnection;
    }

    get user() {
      return this._user;
    }
    set user(newUser) {
      this._user = newUser;
    }

    get userConnection(){
      return this._userConnection;
    }
    set userConnection(newUserConnection) {
      this._userConnection = newUserConnection;
    }
}

module.exports = UserProfile;
