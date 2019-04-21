import { observable, action } from 'mobx'

class Store {
    @observable loginStatus = false;
    @observable user = new Object();

    @action.bound
    logout() {
        this.loginStatus = false;
        this.user = new Object();
    }

    @action.bound
    login(user) {
        this.loginStatus = true;
        this.user = Object.assign({}, user);
    }
}

export default new Store();

