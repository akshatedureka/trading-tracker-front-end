import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()], // use cookies for production -- follow "Customize Storage" for vuex-persistedstate docs

    state: {
        isInitialized: false,
        authenticated: false,
        user: {
            id: "",
            token: "",
        },
        errors: {}
    },

    getters: {
        errors(state) {
            return state.errors;
        }
    },

    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        },
        setUser(state, userData){
            state.user.id = userData.userId;
            state.user.token = userData.token;
        },
        SET_ERRORS(state, data) {
            state.errors = data;
        }
    },

    actions: {
        setErrors({ commit }, errors) {
            commit("SET_ERRORS", errors);
        }
    }
});