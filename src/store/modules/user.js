import store from '../index';
import $axios from '../../main';
import { getToken, setToken, removeToken } from '../../utils/auth';
const state = {
   tokenExist: !!getToken()
};
const getters={
	loggedIn: state => state.tokenExist,
}
export default {
    namespaced:true,
    getters,
    state,
};
