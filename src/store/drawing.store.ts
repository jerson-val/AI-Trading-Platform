import { create } from "zustand";

import { ChartPoint, Drawing, PreviewDrawing } from "@/src/types/trading/drawing";


export type DrawingMode =
    | "none"
    | "trendline"
    | "rectangle"
    | "horizontal"
    | "arrow"
    | "text";

interface TextEditorState {

    point: ChartPoint;

    screen: {

        x: number;

        y: number;

    };

}


interface DrawingStore {

    drawings: Drawing[];

    mode: DrawingMode;

    previewDrawing: PreviewDrawing;

    textEditor: TextEditorState | null;

    setTextEditor: ( editor: TextEditorState | null ) => void;

    setPreviewDrawing( drawing: PreviewDrawing ): void;

    setDrawings( drawings: Drawing[] ): void;

    setMode( mode: DrawingMode ): void;

    addDrawing( drawing: Drawing): void;

}


export const useDrawingStore =
create<DrawingStore>((set)=>({

    drawings: [],

    textEditor: null,

    mode: "none",

    previewDrawing: null,

    setTextEditor: (text) => set({
        textEditor: text
    }),

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