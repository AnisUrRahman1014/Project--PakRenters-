class User {
  constructor(username, email, password, phoneNo) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNo = phoneNo;
  }

  setProfilePic(image) {
    this.profilePic = image;
  }

  getProfilePic() {
    return this.profilePic;
  }

  setProvince(province) {
    this.province = province;
  }

  getProvince() {
    return this.province;
  }

  setCNIC(cnic) {
    this.cnic = cnic;
  }

  getCNIC() {
    return this.cnic;
  }

  setCity(city) {
    this.city = city;
  }

  updateReputation(reputation) {
    this.reputation = reputation;
  }

  updatePostCount() {
    this.postCount += 1;
  }

  getCity() {
    return this.city;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  getPhoneNo() {
    return this.phoneNo;
  }

  getReputation() {
    return this.reputation;
  }

  getPostCount() {
    return this.postCount;
  }
}
export default User;
