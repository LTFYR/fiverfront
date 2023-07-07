import axios from "axios";

const uploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dvaw4cock/image/upload",
      data
    );

    const { url } = res.data;

    return url;
  } catch (error) {
    console.log(error);
  }
};

export default uploadFile;
