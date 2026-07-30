import { UTCTimestamp } from "lightweight-charts";

export interface ChartPoint {
    time: UTCTimestamp;
    price: number;
}

export type DrawingType =
    | "trendline"
    | "rectangle"
    | "horizontal"
    | "arrow";

export interface TrendLineDrawing {
    id: string;
    type: "trendline";
    start: ChartPoint;
    end: ChartPoint;
    color: string;
    width: number;
}

export interface ArrowDrawing {
    id: string;
    type: "arrow";
    start: ChartPoint;
    end: ChartPoint;
    color: string;
    width: number;
}

export interface HorizontalLineDrawing {
    id: string;
    type: "horizontal";
    price: number;
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

export interface TextDrawing {
    id: string;
    type: "text";
    point: ChartPoint;
    text: string;
    color: string;
    fontSize: number;
}

export type Drawing =
    | TrendLineDrawing
    | RectangleDrawing
    | HorizontalLineDrawing
    | TextDrawing
    | ArrowDrawing;

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

export interface PreviewArrow {
    type: "arrow";
    start: ChartPoint;
    endScreen: {
        x: number;
        y: number;
    };
    color: string;
    width: number;
}

export interface PreviewText {
    type: "text";
    point: ChartPoint;
    text: string;
    color: string;
    fontSize: number;
}

export type PreviewDrawing =
    | PreviewTrendLine
    | PreviewRectangle
    | PreviewArrow
    | PreviewText
    | null;

export type DrawingMode =
    | "none"
    | "trendline"
    | "rectangle"
    | "horizontal"
    | "arrow"
    | "text";