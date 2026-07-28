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
}

export type Drawing =
    | TrendLineDrawing
    | RectangleDrawing;