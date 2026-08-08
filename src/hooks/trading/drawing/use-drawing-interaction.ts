import { RefObject, useEffect } from "react";

import { useChartStore } from "@/src/store/chart-store.store";
import { useDrawingStore } from "@/src/store/drawing.store";

import { toolManager } from "@/src/helpers/trading/tools/tool-manager";

export function useDrawingInteraction(
    containerRef: RefObject<HTMLDivElement | null>,
    canvasRef: RefObject<HTMLCanvasElement | null>,
) {

    const mode = useDrawingStore(
        (s) => s.mode
    );

    const chart = useChartStore(
        (s) => s.chart
    );

    const series = useChartStore(
        (s) => s.series
    );

    useEffect(() => {

        const container =
            containerRef.current;

        const canvas =
            canvasRef.current;

        if (
            !container ||
            !canvas ||
            !chart ||
            !series
        ) {
            return;
        }

        const getMousePosition = (
            event: MouseEvent,
        ) => {

            const rect =
                container.getBoundingClientRect();

            return {
                x:
                    event.clientX -
                    rect.left,

                y:
                    event.clientY -
                    rect.top,
            };

        };

        const hitTestDrawings = (
            x: number,
            y: number,
        ) => {

            const drawings =
                useDrawingStore
                    .getState()
                    .drawings;

            for (
                let i = drawings.length - 1;
                i >= 0;
                i--
            ) {

                const drawing =
                    drawings[i];

                const tool =
                    toolManager.getToolByDrawing(
                        drawing,
                    );

                if (!tool) {
                    continue;
                }

                if (
                    tool.hitTest(
                        x,
                        y,
                        drawing,
                        chart,
                        series,
                    )
                ) {
                    return drawing;
                }

            }

            return null;
        };

        // ----------------------------------------
        // CLICK
        // ----------------------------------------

        const handleClick = (
            event: MouseEvent,
        ) => {

            const {
                x,
                y,
            } = getMousePosition(event);

            const drawing =
                hitTestDrawings(
                    x,
                    y,
                );

            if (drawing) {

                useDrawingStore
                    .getState()
                    .setSelectedDrawingId(
                        drawing.id,
                    );

                return;
            }

            useDrawingStore
                .getState()
                .setSelectedDrawingId(
                    null,
                );

            const tool =
                toolManager.getTool(
                    mode,
                );

            tool?.onClick?.(
                x,
                y,
                chart,
                series,
            );
        };

        // ----------------------------------------
        // MOUSE DOWN
        // ----------------------------------------

        const handleMouseDown = (
            event: MouseEvent,
        ) => {

            const {
                x,
                y,
            } = getMousePosition(event);

            const drawing =
                hitTestDrawings(
                    x,
                    y,
                );

            if (drawing) {

                const store =
                    useDrawingStore.getState();

                store.setSelectedDrawingId(
                    drawing.id,
                );

                store.setDraggingDrawingId(
                    drawing.id,
                );

                store.setDragStartScreen({
                    x,
                    y,
                });

                return;
            }

            useDrawingStore
                .getState()
                .setSelectedDrawingId(
                    null,
                );

            const tool =
                toolManager.getTool(
                    mode,
                );

            tool?.onMouseDown?.(
                x,
                y,
                chart,
                series,
            );
        };

        // ----------------------------------------
        // MOUSE UP
        // ----------------------------------------

        const handleMouseUp = (
            event: MouseEvent,
        ) => {

            const store =
                useDrawingStore.getState();

            /*
             * If we are dragging an existing
             * drawing, don't pass the event
             * to the active drawing tool.
             */
            if (
                store.draggingDrawingId
            ) {

                store.setDraggingDrawingId(
                    null,
                );

                store.setDragStartScreen(
                    null,
                );

                return;
            }

            const {
                x,
                y,
            } = getMousePosition(event);

            const tool =
                toolManager.getTool(
                    mode,
                );

            tool?.onMouseUp?.(
                x,
                y,
                chart,
                series,
            );
        };

        // ----------------------------------------
        // MOUSE MOVE
        // ----------------------------------------

        const handleMouseMove = (
            event: MouseEvent,
        ) => {

            const {
                x,
                y,
            } = getMousePosition(event);

            const drawing =
                hitTestDrawings(
                    x,
                    y,
                );

            const store =
                useDrawingStore.getState();

            store.setHoveredDrawingId(
                drawing
                    ? drawing.id
                    : null,
            );

            /*
             * IMPORTANT:
             *
             * We do NOT change pointer-events.
             *
             * The chart remains interactive.
             */
            container.style.cursor =
                drawing
                    ? "pointer"
                    : "default";

            const tool =
                toolManager.getTool(
                    mode,
                );

            tool?.onMouseMove?.(
                x,
                y,
                chart,
                series,
            );
        };

        container.addEventListener(
            "click",
            handleClick,
        );

        container.addEventListener(
            "mousedown",
            handleMouseDown,
        );

        container.addEventListener(
            "mouseup",
            handleMouseUp,
        );

        container.addEventListener(
            "mousemove",
            handleMouseMove,
        );

        return () => {

            container.removeEventListener(
                "click",
                handleClick,
            );

            container.removeEventListener(
                "mousedown",
                handleMouseDown,
            );

            container.removeEventListener(
                "mouseup",
                handleMouseUp,
            );

            container.removeEventListener(
                "mousemove",
                handleMouseMove,
            );

        };

    }, [
        containerRef,
        canvasRef,
        chart,
        series,
        mode,
    ]);

    // ----------------------------------------
    // ESCAPE
    // ----------------------------------------

    useEffect(() => {

        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }

            toolManager.cancel(
                mode,
            );
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );

        };

    }, [mode]);

}