class Connection {
    constructor(connectionID, name, host, topic, details, date, time){
      this._connectionID = connectionID;
      this._name = name;
      this._host = host;
      this._topic = topic;
      this._details = details;
      this._date = date;
      this._time = time;
    }
    
    get name() {
      return this._name.toUpperCase();
    }
    set name(newName) {
      this._name = newName;
    }

    get host(){
      return this._host;
    }
    set host(newHost) {
      this._host = newHost;
    }

    get topic(){
      return this._topic;
    }
    set topic(newTopic) {
      this._topic = newTopic;
    }

    get details(){
      return this._details;
    }
    set details(newDetails) {
      this._details = newDetails;
    }

    get date(){
      return this._date;
    }
    set date(newDate) {
      this._date = newDate;
    }

    get time(){
      return this._time;
    }
    set time(newTime) {
      this._time = newTime;
    }
}


module.exports = Connection;
