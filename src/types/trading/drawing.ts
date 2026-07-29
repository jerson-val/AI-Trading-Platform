import { UTCTimestamp } from "lightweight-charts";

export interface ChartPoint {
    time: UTCTimestamp;
    price: number;
}

export type DrawingType =
    | "trendline"
    | "rectangle";

export interface TrendLineDrawing {
    id: string;
    type: "trendline";
    start: ChartPoint;
    end: ChartPoint;
    color: string;
    width: number;
}

export interface RectangleDrawing {
    id: string;
    type: "rectangle";
    start: ChartPoint;
    end: ChartPoint;
    color: string;
    fillColor: string;
    borderWidth: number;
}

export type Drawing =
    | TrendLineDrawing
    | RectangleDrawing;

export interface PreviewTrendLine {
    type: "trendline";

    start: ChartPoint;

    endScreen: {
        x: number;
        y: number;
    };

    color: string;

    width: number;
}

export interface PreviewRectangle {
    type: "rectangle";
    start: ChartPoint;
    endScreen: {
        x: number;
        y: number;
    };
    color: string;
    fillColor: string;
    borderWidth: number;
}

export type PreviewDrawing =
    | PreviewTrendLine
    | PreviewRectangle
    | null;