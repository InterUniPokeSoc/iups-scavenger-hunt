import { reactive } from "vue"

const state = reactive({
    user: null as any,
    username: null as any,
    profilePicUrl: null as any,
    selectedHunt: null as number | null,
    selectedHint: null as number | null
});

const methods = {
    setUser(payload: any) {
        state.user = payload ? payload.user : null
    },

    setSelectedHunt(selected: number | null) {
        state.selectedHunt = selected
    },

    setSelectedHint(selected: number | null) {
        state.selectedHint = selected
    },

    destroySession() {
        state.user = null
    }
}

export default {
    state,
    methods
}