import { IChartApi, ISeriesApi } from "lightweight-charts";
import { create } from "zustand";

interface ChartStore {

    chart: IChartApi | null;

    series: ISeriesApi<'Candlestick'> | null;

    setChart: (
        chart: IChartApi,
        series: ISeriesApi<'Candlestick'>
    ) => void;

    clearChart: () => void;

    pendingScrollOffset: number;

    setPendingScrollOffset: (value:number)=>void;

    clearPendingScrollOffset: ()=>void;

}

export const useChartStore = create<ChartStore>((set) => ({
    chart: null,
    series: null,

    pendingScrollOffset:0,

    setPendingScrollOffset:(value)=>
        set({
            pendingScrollOffset:value
        }),

    clearPendingScrollOffset:()=>
        set({
            pendingScrollOffset:0
        }),

    setChart: (chart, series) => set({
        chart,
        series,
    }),
    clearChart: () => set({
        chart: null,
        series: null,
    }),
}));