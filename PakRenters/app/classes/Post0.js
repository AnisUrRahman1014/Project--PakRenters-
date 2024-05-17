class Post {
  constructor(user, title, description, category, location, rent) {
    this.user = user;
    this.postId = this.generatePostId();
    this.title = title;
    this.category = category;
    this.location = location;
    this.description = description;
    this.rent = rent;
  }

  getPostId() {
    return this.postId;
  }

  generatePostId() {
    let postId = this.user.getUsername().concat("#" + this.user.getPostCount());
    return postId;
  }

  isFeatured() {
    return this.featured;
  }

  setFeatured(featured) {
    this.featured = featured;
  }

  setVehicle(vehicle) {
    this.vehicle = vehicle;
  }

  getVehicle() {
    return this.vehicle;
  }

  getRent() {
    return this.rent;
  }

  getUser() {
    return this.user;
  }

  getPostCategory() {
    return this.category;
  }
}

export default Post;
