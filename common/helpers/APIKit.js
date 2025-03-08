import HTTPKit, { client } from "./HTTPKit";

const defaultFileUploadConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

  // Public API's
  public: {},
  tags: {
    getCategoriesList: () => {
      const url = "/public/categories";
      return client.get(url);
    },
    getBrandsList: () => {
      const url = "/public/brands";
      return client.get(url);
    },
    getColorList: () => {
      const url = "/public/colors";
      return client.get(url);
    },
    getMaterialList: () => {
      const url = "/public/materials";
      return client.get(url);
    },
  },

  //Auth API's
  auth: {
    login: (payload) => {
      const url = "auth/token";
      return client.post(url, payload);
    },
    register: (payload) => {
      const url = "auth/registration";
      return client.post(url, payload);
    },
  },

  //Users API's
  me: {
    getProfile: () => {
      const url = `/me`;
      return client.get(url);
    },
  },

  //Admin API's
  we: {},
};

export default APIKit;
