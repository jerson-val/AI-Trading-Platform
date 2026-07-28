import { create } from "zustand";

import { Drawing } from "@/src/types/trading/drawing";


type DrawingMode =
    | "none"
    | "trendline";


interface DrawingStore {

    drawings: Drawing[];

    mode: DrawingMode;

    previewDrawing: Drawing | null;

    setPreviewDrawing( drawing: Drawing | null ): void;

    setDrawings( drawings: Drawing[] ): void;

    setMode( mode: DrawingMode ): void;

    addDrawing( drawing: Drawing): void;

}


export const useDrawingStore =
create<DrawingStore>((set)=>({

    drawings: [],

    mode: "none",

    previewDrawing: null,

    setPreviewDrawing: (drawing)=> set({
        previewDrawing: drawing
    }),

    setDrawings: (drawings)=>
        set({
            drawings
        }),


    setMode: (mode)=>
        set({
            mode
        }),


    addDrawing: (drawing)=>
        set(state=>({
            drawings:[
                ...state.drawings,
                drawing
            ]
        }))

}));