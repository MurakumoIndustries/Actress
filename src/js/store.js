import Vuex from 'vuex'

const Store = new Vuex.Store({
    state: {
        isExperimentalMode: false,
        isEasterMode: false,
    },
    mutations: {
        setExperimentalMode(state, mode) {
            state.isExperimentalMode = mode;
        },
        setEasterMode(state, mode) {
            state.isEasterMode = mode;
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})


export { Store };
export default Store;