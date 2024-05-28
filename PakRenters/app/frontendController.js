import axios from "axios";

const API_URL = "http://192.168.1.13:8000/api";

// Register User
const registerUser = async (userData, profilePic) => {
  const formData = new FormData();
  for (const key in userData) {
    formData.append(key, userData[key]);
  }
  formData.append("profilePic", profilePic);

  const response = await axios.post(`${API_URL}/users/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

// Login User
const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    username,
    password
  });
  return response.data;
};

// Verify Email
const verifyEmail = async token => {
  const response = await axios.get(`${API_URL}/users/verify/${token}`);
  return response.data;
};

// Get User Profile
const getUserProfile = async userId => {
  const response = await axios.get(`${API_URL}/users/profile/${userId}`);
  return response.data;
};

// Update Profile Picture
const updateUserProfilePic = async (userId, profilePic) => {
  const formData = new FormData();
  formData.append("profilePic", profilePic);

  const response = await axios.post(
    `${API_URL}/users/updateProfilePic/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};

// Update User Information
const updateUserInfo = async (userId, userInfo) => {
  const response = await axios.post(
    `${API_URL}/users/updateUserInfo/${userId}`,
    userInfo
  );
  return response.data;
};

// Upload CNIC
const uploadCnic = async (userId, idCard) => {
  const formData = new FormData();
  formData.append("idCard", idCard);

  const response = await axios.post(
    `${API_URL}/users/uploadCNIC/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};

// Upload Verification Request
const uploadVerificationRequest = async (
  userId,
  whatsappNumber,
  cnicNumber,
  idCardFile
) => {
  const formData = new FormData();
  formData.append("idCardFile", idCardFile);
  formData.append("userId", userId);
  formData.append("whatsappNumber", whatsappNumber);
  formData.append("cnicNumber", cnicNumber);

  const response = await axios.post(
    `${API_URL}/users/uploadVerificationRequest`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};

export {
  registerUser,
  loginUser,
  verifyEmail,
  getUserProfile,
  updateUserProfilePic,
  updateUserInfo,
  uploadCnic,
  uploadVerificationRequest
};
