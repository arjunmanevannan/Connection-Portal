class User {
    constructor(userID, firstName, lastName, emailAddress, addressLine1, addressLine2, city, state, zip, country){
      this._userID = userID;
      this._firstName = firstName;
      this._lastName = lastName;
      this._emailAddress = emailAddress;
      if(typeof addressLine1 === undefined){
        this._addressLine1 = "";
      }
      else{
        this.addressLine1 = addressLine1;
      }

      if(typeof addressLine2 === undefined){
        this._addressLine2 = "";
      }
      else{
        this.addressLine2 = addressLine2;
      }

      if(typeof city === undefined){
        this._city = "";
      }
      else{
        this._city = city;
      }

      if(typeof state === undefined){
        this._state = "";
      }
      else{
        this._state = state;
      }

      if(typeof zip === undefined){
        this._zip = "";
      }
      else{
        this._zip = zip;
      }

      if(typeof country === undefined){
        this._country = "";
      }
      else{
        this._country = country;
      }
    }

    get userID() {
      return this._userID;
    }

    get firstName(){
      return this._firstName;
    }
    set firstName(newFirstName) {
      this._firstName = newFirstName;
    }

    get lastName(){
      return this._lastName;
    }
    set lastName(newLastName) {
      this._lastName = newLastName;
    }

    get emailAddress(){
      return this._emailAddress;
    }
    set emailAddress(newEmailAddress) {
      this._emailAddress = newEmailAddress;
    }

    get addressLine1(){
      return this._addressLine1;
    }
    set addressLine1(newAddressLine1) {
      this._addressLine1 = newAddressLine1;
    }

    get addressLine2(){
      return this._addressLine2;
    }
    set addressLine2(newAddressLine2) {
      this._addressLine2 = newAddressLine2;
    }

    get city(){
      return this._city;
    }
    set city(newCity) {
      this._city = newCity;
    }

    get state(){
      return this._state;
    }
    set state(newState) {
      this._state = newState;
    }

    get zip(){
      return this._zip;
    }
    set zip(newZip) {
      this._zip = newZip;
    }

    get country(){
      return this._country;
    }
    set country(newCountry) {
      this._country = newCountry;
    }
}

module.exports = User;
