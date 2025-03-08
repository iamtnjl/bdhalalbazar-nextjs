import MeStore from "./me";

class RootStore {
  meStore = MeStore;
}

const rootStore = new RootStore();
export default rootStore;
