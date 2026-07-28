import { IChartApi, ISeriesApi, UTCTimestamp, } from "lightweight-charts"; 

export function screenToChart(
    chart: IChartApi, 
    series: ISeriesApi<"Candlestick">, 
    x: number, 
    y: number
) { 
    const time = chart.timeScale().coordinateToTime(x) as UTCTimestamp; 
    const price = series.coordinateToPrice(y); 
    
    if (time == null || price == null)  return null;  
    
    return { time, price, }; 
}