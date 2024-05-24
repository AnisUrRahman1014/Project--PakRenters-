class Comment {
  constructor(post, user, comment, rating) {
    this.post = post;
    this.user = user;
    this.comment = comment;
    this.rating = rating;
  }

  getComment() {
    return this.comment;
  }

  getUser() {
    return this.user;
  }

  getRating() {
    return this.rating;
  }

  getPost() {
    return this.post;
  }
}

export default Comment;
