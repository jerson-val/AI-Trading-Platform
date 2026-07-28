import { create } from "zustand";

import { Drawing } from "@/src/types/trading/drawing";


type DrawingMode =
    | "none"
    | "trendline";


interface DrawingStore {

    drawings: Drawing[];

    mode: DrawingMode;

    setDrawings(
        drawings: Drawing[]
    ): void;


    setMode(
        mode: DrawingMode
    ): void;


    addDrawing(
        drawing: Drawing
    ): void;

}


export const useDrawingStore =
create<DrawingStore>((set)=>({

    drawings: [],

    mode: "none",


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