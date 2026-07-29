import { PreviewArrow } from "@/src/types/trading/drawing";
import { IChartApi, ISeriesApi } from "lightweight-charts";
import { chartToScreen } from "../chart-to-screen.helper";

export function renderPreviewArrow(
    ctx: CanvasRenderingContext2D,
    chart: IChartApi,
    series: ISeriesApi<"Candlestick">,
    drawing: PreviewArrow,
) {

    const start = chartToScreen(
        chart,
        series,
        drawing.start.time,
        drawing.start.price,
    );

    if (!start)
        return;

    const end = drawing.endScreen;

    // Draw line
    ctx.beginPath();

    ctx.moveTo(
        start.x,
        start.y,
    );

    ctx.lineTo(
        end.x,
        end.y,
    );

    ctx.strokeStyle = drawing.color;

    ctx.lineWidth = drawing.width;

    ctx.globalAlpha = 0.8;

    ctx.stroke();

    // Draw arrow head
    const angle = Math.atan2(
        end.y - start.y,
        end.x - start.x,
    );

    const arrowSize = Math.max(
        10,
        drawing.width * 4,
    );

    const arrowAngle = Math.PI / 6;

    ctx.beginPath();

    ctx.moveTo(
        end.x,
        end.y,
    );

    ctx.lineTo(
        end.x -
            arrowSize *
                Math.cos(angle - arrowAngle),
        end.y -
            arrowSize *
                Math.sin(angle - arrowAngle),
    );

    ctx.moveTo(
        end.x,
        end.y,
    );

    ctx.lineTo(
        end.x -
            arrowSize *
                Math.cos(angle + arrowAngle),
        end.y -
            arrowSize *
                Math.sin(angle + arrowAngle),
    );

    ctx.stroke();

    ctx.globalAlpha = 1;

}