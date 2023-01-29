import { defineStore } from 'pinia'
import { Ui } from './ui'

const UpdateStatus = {
    NoUpdate: 0,
    Updating: 1,
    UpdateReady: 2
};

const useStore = defineStore('main', {
    state: () => ({
        updateStatus: UpdateStatus.NoUpdate,
        language: Ui.initLanguage(),
        isExperimentalMode: false,
        isEasterMode: false,
        currentActressId: 0,
        actressOrder: "default",
    }),
    getters: {
        isCurrentActress: (state) => (id) => {
            return state.currentActressId == id;
        }
    },
    actions: {
        updating() {
            console.log("new-version-updating");
            this.updateStatus = UpdateStatus.Updating;
        },
        updateReady() {
            console.log("new-version-update-ready");
            this.updateStatus = UpdateStatus.UpdateReady;
        },
        initLanguage(lang) {
            this.language = Ui.initLanguage(lang);
        }
    }
})

export { useStore, UpdateStatus };