import { create } from "zustand";

import { ChartPoint, Drawing, PreviewDrawing, DrawingMode } from "@/src/types/trading/drawing";

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

    selectedDrawingId: string | null;

    hoveredDrawingId: string | null;

    draggingDrawingId: string | null;
    
    dragStartScreen: { x: number; y: number } | null;
    
    setDraggingDrawingId: ( id: string | null ) => void;

    setDragStartScreen( 
        point: {
            x: number;
            y: number;
        } | null,
    ): void;

    setHoveredDrawingId: ( id: string | null ) => void;

    setSelectedDrawingId: ( id: string | null ) => void;

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

    selectedDrawingId: null,

    hoveredDrawingId: null,

    dragStartScreen: null,

    draggingDrawingId: null,

    setHoveredDrawingId: id => set({
        hoveredDrawingId: id,
    }),

    setDraggingDrawingId: draggingDrawingId => set({ draggingDrawingId }),

    setDragStartScreen: dragStartScreen => set({ dragStartScreen }),

    setSelectedDrawingId: id => set({
        selectedDrawingId: id,
    }),

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
