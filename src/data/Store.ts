import { reactive } from "vue"

const state = reactive({
    user: null as any,
    username: null as any
});

const methods = {
    setUser(payload: any) {
        state.user = payload ? payload.user : null
    },

    destroySession() {
        state.user = null
    }
}

export default {
    state,
    methods
}