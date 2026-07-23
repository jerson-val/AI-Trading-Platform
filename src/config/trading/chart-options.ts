import {
  type ChartOptions,
  type DeepPartial,
  ColorType,
  CrosshairMode,
} from "lightweight-charts";

export const chartOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.Solid,
      color: "#111827",
    },
    textColor: "#d1d5db",
  },

  grid: {
    vertLines: {
      color: "#1f2937",
    },
    horzLines: {
      color: "#1f2937",
    },
  },

  crosshair: {
    mode: CrosshairMode.Normal,
  },

  localization: {
    priceFormatter: (price: number) => price.toFixed(2),
  },

  handleScroll: true,
  handleScale: true,
};
