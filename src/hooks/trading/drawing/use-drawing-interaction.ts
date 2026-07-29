import { RefObject, useEffect } from "react";
import { useChartStore } from "@/src/store/chart-store.store";
import { useDrawingStore } from "@/src/store/drawing.store";
import { trendLineTool } from "@/src/helpers/trading/tools/tool.factory";
import { toolManager } from "@/src/helpers/trading/tools/tool-manager";


export function useDrawingInteraction(
    canvasRef: RefObject<HTMLCanvasElement | null>
){

    const mode = useDrawingStore( s=> s.mode);
    const chart = useChartStore( s=>s.chart );
    const series = useChartStore( s=>s.series );

    useEffect(()=>{

        const canvas = canvasRef.current;

        if(!canvas 
            || !chart
            || !series
        ) return;

        const click = (event:MouseEvent)=>{

            const tool = toolManager.getTool(mode);

            if (!tool) return;
            
            const rect = canvas.getBoundingClientRect();
            
            const x = event.clientX - rect.left;
            
            const y = event.clientY - rect.top;
            
            tool.onClick(
                x,
                y,
                chart,
                series,
            );
          

        };

        const move = (
            event: MouseEvent
        ) => {

            const tool = toolManager.getTool(mode);

            if (!tool) return;

            const rect = canvas.getBoundingClientRect();

            const x = event.clientX - rect.left;

            const y = event.clientY - rect.top;

            tool.onMouseMove(
                x,
                y,
                chart,
                series,
            );

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

    useEffect(() => {

        const key = (
            event: KeyboardEvent
        ) => {

            if (event.key !== "Escape")
                return;

            trendLineTool.onCancel();

        };

        window.addEventListener(
            "keydown",
            key,
        );

        return () =>
            window.removeEventListener(
                "keydown",
                key,
            );

    }, []);

}