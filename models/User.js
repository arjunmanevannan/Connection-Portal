class User {
    constructor(firstName, lastName, emailAddress, password, addressLine1, addressLine2, city, state, zip, country){
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAddress;
      this.password = password;
      if(typeof addressLine1 === 'undefined'){
        this.addressLine1 = "";
      }
      else{
        this.addressLine1 = addressLine1;
      }

      if(typeof addressLine2 === 'undefined'){
        this.addressLine2 = "";
      }
      else{
        this.addressLine2 = addressLine2;
      }

      if(typeof city === 'undefined'){
        this.city = "";
      }
      else{
        this.city = city;
      }

      if(typeof state === 'undefined'){
        this.state = "";
      }
      else{
        this.state = state;
      }

      if(typeof zip === 'undefined'){
        this.zip = "";
      }
      else{
        this.zip = zip;
      }

      if(typeof country === 'undefined'){
        this.country = "";
      }
      else{
        this.country = country;
      }
    }

    // get isHost(){
    //   return this._isHost;
    // }
    // set isHost(newIsHost) {
    //   this._isHost = newIsHost;
    // }
    //
    // get firstName(){
    //   return this._firstName;
    // }
    // set firstName(newFirstName) {
    //   this._firstName = newFirstName;
    // }
    //
    // get lastName(){
    //   return this._lastName;
    // }
    // set lastName(newLastName) {
    //   this._lastName = newLastName;
    // }
    //
    // get emailAddress(){
    //   return this._emailAddress;
    // }
    // set emailAddress(newEmailAddress) {
    //   this._emailAddress = newEmailAddress;
    // }
    //
    // get addressLine1(){
    //   return this._addressLine1;
    // }
    // set addressLine1(newAddressLine1) {
    //   this._addressLine1 = newAddressLine1;
    // }
    //
    // get addressLine2(){
    //   return this._addressLine2;
    // }
    // set addressLine2(newAddressLine2) {
    //   this._addressLine2 = newAddressLine2;
    // }
    //
    // get city(){
    //   return this._city;
    // }
    // set city(newCity) {
    //   this._city = newCity;
    // }
    //
    // get state(){
    //   return this._state;
    // }
    // set state(newState) {
    //   this._state = newState;
    // }
    //
    // get zip(){
    //   return this._zip;
    // }
    // set zip(newZip) {
    //   this._zip = newZip;
    // }
    //
    // get country(){
    //   return this._country;
    // }
    // set country(newCountry) {
    //   this._country = newCountry;
    // }
}

module.exports = User;
