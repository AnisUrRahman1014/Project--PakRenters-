class User {
  constructor(username, email, password, phoneNo) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phoneNo = phoneNo;
    this.postCount = 0;
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

  updateReputation() {
    let rep = 0;
    if (this.cnic !== "") {
      rep += 2;
    }
    if (this.city !== "") {
      rep += 0.5;
    }
    if (this.province !== "") {
      rep += 0.5;
    }
    if (this.idCardPDF) {
      rep += 2;
    }
    let repPercentage = rep / 5 * 100;
    this.reputation = repPercentage;
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
