import User from "../classes/User";
class Post {
  constructor(user, title, description, category, location, rent) {
    this.user = user;
    this.generateNewPostId();
    this.title = title;
    this.category = category;
    this.location = location;
    this.description = description;
    this.rent = rent;
  }

  generateNewPostId() {
    this.id = this.generatePostId();
  }

  isFeatured() {
    return this.featured;
  }

  setFeatured(featured) {
    this.featured = featured;
  }

  setServices(services) {
    this.services = services;
  }

  setVehicle(vehicle) {
    this.vehicle = vehicle;
  }
  getPostId() {
    return this.id;
  }

  generatePostId() {
    let postId = this.user
      .getUsername()
      .concat("#" + parseInt(this.user.getPostCount() + 1));
    return postId;
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

  getServices() {
    return this.services.map(service => ({
      label: service.label,
      isEnabled: service.isEnabled
    }));
  }
}

export default Post;
