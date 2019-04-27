import { observable, action } from "mobx";

class Store {
  @observable contract = null;

  @action.bound
  remove() {
    this.contract = null;
  }

  @action.bound
  regist(contractAddress) {
    this.contract = contractAddress;
  }
}

export default new Store();
