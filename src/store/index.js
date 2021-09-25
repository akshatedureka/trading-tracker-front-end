import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isInitialized: false,
        authenticated: false,
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