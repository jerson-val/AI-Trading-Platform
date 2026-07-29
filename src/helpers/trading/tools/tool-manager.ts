import { Drawing } from "@/src/types/trading/drawing";
import { rectangleTool, trendLineTool } from "./tool.factory";
import { DrawingTool } from "@/src/types/trading/drawing-tool";

export class ToolManager {

    getTool(mode: string): DrawingTool | null {

        switch (mode) {

            case "trendline":
                return trendLineTool;
            
            case "rectangle":
                return rectangleTool;

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

            case "rectangle":
                return rectangleTool;

            default:
                return null;

        }

    }

}

export const toolManager = new ToolManager();