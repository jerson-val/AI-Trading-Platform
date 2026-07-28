import { Drawing } from "@/src/types/trading/drawing";
import { trendLineTool } from "./tool.factory";
import { DrawingTool } from "@/src/types/trading/drawing-tool";

export class ToolManager {

    getTool(mode: string): DrawingTool | null {

        switch (mode) {

            case "trendline":
                return trendLineTool;

            default:
                return null;

        }

    }

    getToolByDrawing(
        drawing: Drawing
    ): DrawingTool | null {

        switch (drawing.type) {

            case "trendline":
                return trendLineTool;

            default:
                return null;

        }

    }

}

export const toolManager = new ToolManager();