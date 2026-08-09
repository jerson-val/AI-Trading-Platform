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

        // ----------------------------------------
        // HELPERS
        // ----------------------------------------

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
        // MOUSE DOWN
        // ----------------------------------------

        const handleMouseDown = (
            event: MouseEvent,
        ) => {

            const {
                x,
                y,
            } = getMousePosition(event);

            const store =
                useDrawingStore.getState();

            const drawing =
                hitTestDrawings(
                    x,
                    y,
                );

            // ------------------------------------
            // EXISTING DRAWING -> MOVING
            // ------------------------------------

            if (drawing) {

                /*
                 * IMPORTANT:
                 *
                 * Stop Lightweight Charts from
                 * receiving this mousedown.
                 *
                 * Otherwise the chart starts
                 * panning while we move the drawing.
                 */
                event.preventDefault();
                event.stopPropagation();

                const tool =
                    toolManager.getToolByDrawing(
                        drawing,
                    );

                store.setSelectedDrawingId(
                    drawing.id,
                );

                /*
                 * Store the ORIGINAL mouse
                 * position.
                 */
                store.setDragStartScreen({
                    x,
                    y,
                });

                store.setDraggingDrawingId(
                    drawing.id,
                );

                store.setDrawingInteraction(
                    "moving",
                );

                tool?.onMoveStart?.(
                    x,
                    y,
                    drawing,
                    chart,
                    series,
                );

                container.style.cursor =
                    "grabbing";

                return;
            }

            // ------------------------------------
            // DRAWING CREATION
            // ------------------------------------

            if (mode !== "none") {

                /*
                 * A drawing tool is active.
                 *
                 * The chart must NOT pan while
                 * the user is creating a drawing.
                 */
                event.preventDefault();
                event.stopPropagation();

                store.setDrawingInteraction(
                    "creating",
                );

                store.setSelectedDrawingId(
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

                return;
            }

            // ------------------------------------
            // NORMAL CHART INTERACTION
            // ------------------------------------

            /*
             * mode === "none"
             *
             * Blank space should remain completely
             * available to Lightweight Charts.
             *
             * DO NOT preventDefault().
             * DO NOT stopPropagation().
             */

            store.setSelectedDrawingId(
                null,
            );

            store.setDrawingInteraction(
                "none",
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

            const store =
                useDrawingStore.getState();

            const interaction =
                store.drawingInteraction;

            // ------------------------------------
            // MOVING EXISTING DRAWING
            // ------------------------------------

            if (
                interaction === "moving" &&
                store.draggingDrawingId &&
                store.dragStartScreen
            ) {

                /*
                 * IMPORTANT:
                 *
                 * Prevent Lightweight Charts from
                 * processing this movement.
                 */
                event.preventDefault();
                event.stopPropagation();

                const drawing =
                    store.drawings.find(
                        d =>
                            d.id ===
                            store.draggingDrawingId
                    );

                if (!drawing) {
                    return;
                }

                const tool =
                    toolManager.getToolByDrawing(
                        drawing,
                    );

                if (!tool) {
                    return;
                }

                /*
                 * Give the tool:
                 *
                 * - original mouse position
                 * - current mouse position
                 *
                 * The tool is responsible for
                 * calculating its own movement.
                 */
                tool.onMove?.(
                    drawing,

                    store.dragStartScreen.x,
                    store.dragStartScreen.y,

                    x,
                    y,

                    chart,
                    series,
                );

                container.style.cursor =
                    "grabbing";

                return;
            }

            // ------------------------------------
            // DRAWING CREATION
            // ------------------------------------

            if (
                interaction === "creating"
            ) {

                /*
                 * Prevent chart panning while
                 * creating a drawing.
                 */
                event.preventDefault();
                event.stopPropagation();

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

                container.style.cursor =
                    "crosshair";

                return;
            }

            // ------------------------------------
            // NORMAL HOVER
            // ------------------------------------

            const drawing =
                hitTestDrawings(
                    x,
                    y,
                );

            store.setHoveredDrawingId(
                drawing
                    ? drawing.id
                    : null,
            );

            container.style.cursor =
                drawing
                    ? "pointer"
                    : "default";

            /*
             * Only let the active tool receive
             * mouse movement when we are not
             * currently moving/creating.
             */
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

        // ----------------------------------------
        // MOUSE UP
        // ----------------------------------------

        const handleMouseUp = (
            event: MouseEvent,
        ) => {

            const store =
                useDrawingStore.getState();

            // ------------------------------------
            // FINISH MOVING
            // ------------------------------------

            if (
                store.drawingInteraction === "moving" &&
                store.draggingDrawingId
            ) {

                /*
                 * Do not allow Lightweight Charts
                 * to process this mouseup.
                 */
                event.preventDefault();
                event.stopPropagation();

                const {
                    x,
                    y,
                } = getMousePosition(event);

                const drawing =
                    store.drawings.find(
                        d =>
                            d.id ===
                            store.draggingDrawingId
                    );

                if (drawing) {

                    const tool =
                        toolManager.getToolByDrawing(
                            drawing,
                        );

                    tool?.onMoveEnd?.(
                        x,
                        y,
                        drawing,
                        chart,
                        series,
                    );
                }

                store.setDraggingDrawingId(
                    null,
                );

                store.setDragStartScreen(
                    null,
                );

                store.setDrawingInteraction(
                    "none",
                );

                container.style.cursor =
                    "default";

                return;
            }

            // ------------------------------------
            // FINISH CREATING
            // ------------------------------------

            if (
                store.drawingInteraction === "creating"
            ) {

                /*
                 * Prevent Lightweight Charts from
                 * processing the mouseup.
                 */
                event.preventDefault();
                event.stopPropagation();

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

                store.setDrawingInteraction(
                    "none",
                );

                container.style.cursor =
                    "default";

                return;
            }

            /*
             * mode === "none"
             *
             * Let Lightweight Charts handle
             * the mouseup normally.
             */
        };

        // ----------------------------------------
        // CLICK
        // ----------------------------------------

        const handleClick = (
            event: MouseEvent,
        ) => {

            const store =
                useDrawingStore.getState();

            /*
             * A click generated after moving a
             * drawing should not select/create
             * another drawing.
             */
            if (
                store.drawingInteraction === "moving"
            ) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            const {
                x,
                y,
            } = getMousePosition(event);

            const drawing =
                hitTestDrawings(
                    x,
                    y,
                );

            // ------------------------------------
            // EXISTING DRAWING
            // ------------------------------------

            if (drawing) {

                event.preventDefault();
                event.stopPropagation();

                store.setSelectedDrawingId(
                    drawing.id,
                );

                return;
            }

            // ------------------------------------
            // ACTIVE DRAWING TOOL
            // ------------------------------------

            if (mode !== "none") {

                event.preventDefault();
                event.stopPropagation();

                store.setSelectedDrawingId(
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

                return;
            }

            // ------------------------------------
            // NORMAL CHART CLICK
            // ------------------------------------

            /*
             * mode === "none"
             *
             * Do not block the chart.
             */
            store.setSelectedDrawingId(
                null,
            );
        };

        // ----------------------------------------
        // MOUSE LEAVE
        // ----------------------------------------

        const handleMouseLeave = () => {

            const store =
                useDrawingStore.getState();

            store.setHoveredDrawingId(
                null,
            );

            /*
             * Do not cancel creation or movement.
             */
        };

        // ----------------------------------------
        // EVENTS
        // ----------------------------------------

        /*
         * VERY IMPORTANT:
         *
         * `true` = CAPTURE PHASE.
         *
         * This allows us to intercept the event
         * BEFORE Lightweight Charts receives it.
         */
        container.addEventListener(
            "mousedown",
            handleMouseDown,
            true,
        );

        container.addEventListener(
            "mousemove",
            handleMouseMove,
            true,
        );

        container.addEventListener(
            "mouseup",
            handleMouseUp,
            true,
        );

        container.addEventListener(
            "click",
            handleClick,
            true,
        );

        container.addEventListener(
            "mouseleave",
            handleMouseLeave,
        );

        // ----------------------------------------
        // CLEANUP
        // ----------------------------------------

        return () => {

            container.removeEventListener(
                "mousedown",
                handleMouseDown,
                true,
            );

            container.removeEventListener(
                "mousemove",
                handleMouseMove,
                true,
            );

            container.removeEventListener(
                "mouseup",
                handleMouseUp,
                true,
            );

            container.removeEventListener(
                "click",
                handleClick,
                true,
            );

            container.removeEventListener(
                "mouseleave",
                handleMouseLeave,
            );

            container.style.cursor =
                "default";

            const store =
                useDrawingStore.getState();

            store.setDraggingDrawingId(
                null,
            );

            store.setDragStartScreen(
                null,
            );

            store.setDrawingInteraction(
                "none",
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

            const store =
                useDrawingStore.getState();

            toolManager.cancel(
                mode,
            );

            store.setDraggingDrawingId(
                null,
            );

            store.setDragStartScreen(
                null,
            );

            store.setDrawingInteraction(
                "none",
            );

            store.setHoveredDrawingId(
                null,
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

    }, [
        mode,
    ]);
}