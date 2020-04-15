class UserConnection {
    constructor(connection, rsvp){
      this.connection = connection;
      this.rsvp = rsvp;
    }

    get connection() {
      return this.connection;
    }
    set connection(newConnection){
      this.connection = newConnection;
    }

    get rsvp(){
      return this.rsvp;
    }
    set rsvp(newRsvp) {
      this.rsvp = newRsvp;
    }
}


module.exports = UserConnection;
