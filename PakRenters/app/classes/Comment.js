import axios from "axios";
import { ipAddress } from "../../constants/misc";

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

  submit = async () => {
    try {
      if (this.user === null) {
        return;
      }
      const response = await axios.post(
        `http://${ipAddress}:8000/post/addNewComment/${this.post}`,
        {
          userId: this.user,
          comment: this.comment,
          rating: this.rating
        }
      );
      if (response.status === 200) {
        console.log("success");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default Comment;
