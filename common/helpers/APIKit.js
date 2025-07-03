import HTTPKit, { client } from "./HTTPKit";

const defaultFileUploadConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

  // Public API's
  public: {
    getProducts: (params) => {
      const url = "/public/products";
      return client.get(url, { params });
    },
    getProductDetails: (id) => {
      const url = `/public/products/${id}`;
      return client.get(url);
    },
    getCart: (params) => {
      const url = `/public/cart`;
      return client.get(url, { params });
    },
    cart: (payload) => {
      const url = `/public/cart`;
      return client.post(url, payload);
    },
    deleteCart: (deviceId, productId) => {
      const url = `/public/cart/${deviceId}/product/${productId}`;
      return client.delete(url);
    },
    placeOrder: (payload) => {
      const url = `/public/order`;
      return client.post(url, payload);
    },
  },
  tags: {
    getCategoriesList: (params) => {
      const url = "/public/categories";
      return client.get(url, { params });
    },
    getSubCategoriesList: (params) => {
      const url = "/public/sub-categories";
      return client.get(url, { params });
    },
    createCategory: (payload) => {
      const url = "/we/categories";
      return client.post(url, payload);
    },
    createTags: (payload) => {
      const url = "/we/tags";
      return client.post(url, payload);
    },
    createSubCategory: (payload) => {
      const url = "/we/sub-categories";
      return client.post(url, payload);
    },
    getBrandsList: (params) => {
      const url = "/public/brands";
      return client.get(url, { params });
    },
    createBrand: (payload) => {
      const url = "/we/brands";
      return client.post(url, payload);
    },
    getColorList: (params) => {
      const url = "/public/colors";
      return client.get(url, { params });
    },
    createColor: (payload) => {
      const url = "/we/colors";
      return client.post(url, payload);
    },
    getMaterialList: (params) => {
      const url = "/public/materials";
      return client.get(url, { params });
    },
    createMaterial: (payload) => {
      const url = "/we/materials";
      return client.post(url, payload);
    },
    getTags: () => {
      const url = "/we/tags-option";
      return client.get(url);
    },
  },

  //Auth API's
  auth: {
    login: (payload) => {
      const url = "/auth/token";
      return client.post(url, payload);
    },
    register: (payload) => {
      const url = "/auth/register";
      return client.post(url, payload);
    },
    SetupPassword: (payload) => {
      const url = "/auth/setup-password";
      return client.post(url, payload);
    },
  },
  facebook: {
    track: (payload) => {
      const url = "/facebook/track";
      return client.post(url, payload, { withCredentials: true });
    },
  },

  //Users API's
  me: {
    getProfile: () => {
      const url = `/me`;
      return client.get(url);
    },
    getPublicProfile: (token) => {
      const url = `/me`;
      return client.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    patchProfile: (payload) => {
      const url = `/me`;
      return client.patch(url, payload);
    },
    getAddresses: () => {
      const url = `/me/addresses`;
      return client.get(url);
    },
    postAddresses: (payload) => {
      const url = `/me/addresses`;
      return client.post(url, payload);
    },
    getOrders: (params) => {
      const url = `/me/orders`;
      return client.get(url, { params });
    },
    getOrderDetails: (id) => {
      const url = `/me/orders/${id}`;
      return client.get(url);
    },
    postFcmToken: (payload) => {
      const url = `/me/save-fcm-token`;
      return client.post(url, payload);
    },
  },

  //Admin API's
  we: {
    orders: {
      getDashboard: () => {
        const url = `/we/dashboard/`;
        return client.get(url);
      },
      getOrders: (params) => {
        const url = `/we/orders/`;
        return client.get(url, { params });
      },
      getOrderDetails: (id) => {
        const url = `/we/orders/${id}`;
        return client.get(url);
      },
      updateOrderStatus: (id, payload) => {
        const url = `/we/orders/${id}`;
        return client.patch(url, payload);
      },
      editOrder: (id, payload) => {
        const url = `/we/orders/${id}/edit`;
        return client.put(url, payload);
      },
      getAdminOrder: (params) => {
        const url = `/we/cart`;
        return client.get(url, { params });
      },
      createAdminOrder: (payload) => {
        const url = `/we/cart`;
        return client.post(url, payload);
      },
    },
    tags: {
      createTag: (payload) => {
        const url = `/we/tag`;
        return client.post(url, payload);
      },
      getTag: () => {
        const url = `/we/tags`;
        return client.get(url);
      },
      getTagDetail: (id) => {
        const url = `/we/tag/${id}`;
        return client.get(url);
      },
      updateTag: (id, payload) => {
        const url = `/we/tag/${id}`;
        return client.patch(url, payload);
      },
      deleteTag: (id) => {
        const url = `/we/tag/${id}`;
        return client.delete(url);
      },
    },
    products: {
      getAllProduct: (params) => {
        const url = `/we/products`;
        return client.get(url, { params });
      },
      getProductDetails: (id) => {
        const url = `/we/products/${id}`;
        return client.get(url);
      },
      createProduct: (payload) => {
        const url = `/we/products`;
        return client.post(url, payload, defaultFileUploadConfig);
      },
      updateProduct: (id, payload) => {
        const url = `/we/product/${id}`;
        return client.patch(url, payload, defaultFileUploadConfig);
      },
      updateProductVisibility: (id, payload) => {
        const url = `/we/product/${id}/publish`;
        return client.patch(url, payload);
      },
      deleteProduct: (id) => {
        const url = `/we/product/${id}`;
        return client.delete(url);
      },
    },
    settings: {
      getSettings: () => {
        const url = `/we/settings`;
        return client.get(url);
      },
      updateSettings: (payload) => {
        const url = `/we/settings`;
        return client.put(url, payload);
      },
    },
    customers: {
      getAllCustomers: (params) => {
        const url = `/we/customers-orders`;
        return client.get(url, { params });
      },
      getCustomerDetails: (id) => {
        const url = `/we/users/${id}`;
        return client.get(url);
      },
    },
    carts: {
      getAllCart: (params) => {
        const url = `/we/carts`;
        return client.get(url, { params });
      },
    },
  },
};

export default APIKit;
