import { create } from "zustand";
import { Drawing } from "@/src/types/trading/drawing";

interface DrawingStore {

    drawings: Drawing[];

    setDrawings: (drawings: Drawing[]) => void;

}

export const useDrawingStore =
create<DrawingStore>((set) => ({

    drawings: [],

    setDrawings: (drawings) =>
        set({
            drawings,
        }),

}));