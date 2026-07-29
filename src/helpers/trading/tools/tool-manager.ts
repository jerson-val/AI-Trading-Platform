import { Drawing } from "@/src/types/trading/drawing";
import { arrowTool, horizontalLineTool, rectangleTool, trendLineTool } from "./tool.factory";
import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { DrawingMode } from "@/src/store/drawing.store";

export class ToolManager {

    getTool(mode: string): DrawingTool | null {

        switch (mode) {

            case "trendline":
                return trendLineTool;
            
            case "rectangle":
                return rectangleTool;

            case "horizontal":
                return horizontalLineTool;
            
            case "arrow":
                return arrowTool;

            default:
                return null;

        }

    }

    cancel(mode: DrawingMode) {

        const tool = this.getTool(mode);

        if (!tool) return;

        tool.onCancel();

    }

    getToolByDrawing(
        drawing: Drawing
    ): DrawingTool | null {

        switch (drawing.type) {

            case "trendline":
                return trendLineTool;

            case "rectangle":
                return rectangleTool;
            
            case "horizontal":
                return horizontalLineTool;

            case "arrow":
                return arrowTool;

            default:
                return null;

        }

    }

}

export const toolManager = new ToolManager();