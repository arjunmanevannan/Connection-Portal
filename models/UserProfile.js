class UserProfile {
    constructor(user, userConnection){
      this.user = user;
      this.userConnection = userConnection;
    }

    get user() {
      return this.user;
    }
    set user(newUser) {
      this.user = newUser;
    }

    get userConnection(){
      return this.userConnection;
    }
    set userConnection(newUserConnection) {
      this.userConnection = newUserConnection;
    }
}

module.exports = UserProfile;
