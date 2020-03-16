class UserConnection {
    constructor(connection, rsvp){
      this._connection = connection;
      this._rsvp = rsvp;
    }

    get connection() {
      return this._connection;
    }
    set connection(newConnection){
      this._connection = newConnection;
    }

    get rsvp(){
      return this._rsvp;
    }
    set rsvp(newRsvp) {
      this._rsvp = newRsvp;
    }
}


module.exports = UserConnection;
