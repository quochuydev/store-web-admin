import axios from "axios";

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("files", file);
    return new Promise((resolve, reject) => {
      axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/files`,
        method: "post",
        data,
      })
        .then((res) => {
          var resData = res.data;
          resData.default = resData.files[0].url;
          console.log("resData.files[0].url", resData.files[0].url);
          resolve(resData);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  abort() {}
}
