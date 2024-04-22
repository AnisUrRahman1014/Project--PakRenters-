class Post {
  constructor(postID, user, title, description, location) {
    this.postID = postID;
    this.user = user;
    this.title = title;
    this.location = location;
    this.description = description;
  }

  isFeatured() {
    return this.featured;
  }

  setFeatured(featured) {
    this.featured = featured;
  }
}

export default Post;
