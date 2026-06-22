import { create } from 'zustand'

interface SessionStore {
  isExpiredModalOpen: boolean

  openExpiredModal: () => void

  closeExpiredModal: () => void
}

export const useSessionStore =
  create<SessionStore>((set) => ({
    isExpiredModalOpen: false,

    openExpiredModal: () =>
        set((state) => {

            if (state.isExpiredModalOpen) {
                return state
            }

            return {
                isExpiredModalOpen: true
            }
        }),

    closeExpiredModal: () =>
      set({
        isExpiredModalOpen: false
      }),
}))