import { RefObject, useEffect, useRef } from "react";

import { useChartStore } from "@/src/store/chart-store.store";
import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "@/src/helpers/trading/screen-to-chart.helper";


export function useDrawingInteraction(
    canvasRef: RefObject<HTMLCanvasElement | null>
){

    const startPoint = useRef<any>(null);
    const mode = useDrawingStore( s=> s.mode);
    const addDrawing = useDrawingStore( s=>s.addDrawing );
    const chart = useChartStore( s=>s.chart );
    const series = useChartStore( s=>s.series );
    const setPreviewDrawing = useDrawingStore( s => s.setPreviewDrawing );

    useEffect(()=>{

        const canvas = canvasRef.current;

        if(!canvas 
            || !chart
            || !series
        ) return;

        const click = (event:MouseEvent)=>{

            if(mode !== "trendline") return;

            const rect = canvas.getBoundingClientRect();

            const x = event.clientX - rect.left;

            const y = event.clientY - rect.top;

            const point = screenToChart( chart, series, x, y );

            if(!point) return;

            if(!startPoint.current){
                startPoint.current = point;
                return;
            }

            addDrawing({
                id: crypto.randomUUID(),
                type: "trendline",
                start: startPoint.current,
                end: point,
                color: "#3b82f6",
                width: 2,
            });

            setPreviewDrawing(null);

            startPoint.current = null;
        };

        const move = (
            event: MouseEvent
        ) => {

            if (mode !== "trendline" || !startPoint.current) return;

            const rect = canvas.getBoundingClientRect();

            const x = event.clientX - rect.left;

            const y = event.clientY - rect.top;

            setPreviewDrawing({
                type: "trendline",
                start: startPoint.current,
                endScreen: { x, y },
                color: "#3b82f6",
                width: 2,
            });

        };

        canvas.addEventListener( "click", click );
        canvas.addEventListener( "mousemove", move );

        return ()=>{
            canvas.removeEventListener( "mousemove", move );
            canvas.removeEventListener( "click", click );
        };

    },[
        canvasRef,
        chart,
        series,
        mode
    ]);

}