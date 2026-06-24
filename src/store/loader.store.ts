import { create } from 'zustand'

interface LoaderState {
  count: number

  show: () => void

  hide: () => void

  reset: () => void
}

export const useLoaderStore =
  create<LoaderState>((set) => ({
    
    count: 0,

    show: () =>
      set((state) => ({
        count: state.count + 1,
      })),

    hide: () =>
      set((state) => ({
        count: Math.max(
          0,
          state.count - 1
        ),
      })),

      reset: () => set({ count: 0 }),
}))