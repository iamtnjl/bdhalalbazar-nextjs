import { action, observable, computed, makeObservable, toJS } from "mobx";

import APIKit from "../common/helpers/APIKit";

class MeStore {
  me_ = null;
  we_ = null;
  profiles = [];

  constructor() {
    makeObservable(this, {
      me_: observable,
      me: computed,
      we_: observable,
      we: computed,

      setMe: action,
      setWe: action,

      logout: action,
    });
  }

  fetch = () => {
    // Call this explicitly when new data from server is needed
    const onSuccess = ({ data }) => {
      this.setMe(data);
    };
    const onFailure = (error) => {};
    return APIKit.me.getMe().then(onSuccess).catch(onFailure);
  };

  fetchWe = () => {
    // Call this explicitly when new data from server is needed
    const onSuccess = ({ data }) => {
      this.setWe(data);
    };
    const onFailure = (error) => {
      if (error?.response) {
        console.warn(error?.response);
      }
    };

    return APIKit.we.organization.getOrganization().then(onSuccess).catch(onFailure);
  };

  // ACTIONS
  setMe = (me) => {
    this.me_ = this.me_ ? Object.assign(this.me_, me) : me;
  };

  setWe = (we) => {
    this.we_ = this.we_ ? Object.assign(this.we_, we) : we;
  };

  // GETTERS
  get me() {
    return toJS(this.me_);
  }

  get we() {
    return toJS(this.we_);
  }

  logout = () => {
    this.me_ = null;
  };
}

export default new MeStore();