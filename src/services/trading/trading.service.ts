import { api } from "../api/client";
import { Candle } from "@/src/types/trading/candle";

export const getCandles = async (
  symbol: string,
  interval: string,
  limit = 500
) => {
  const response = await api.get<Candle[]>("/market/candles", {
    params: {
      symbol,
      interval,
      limit,
    },
  });

  return response.data;
};

export const getPairs = async () => {

    const { data } = await api.get<string[]>("/market/pairs");

    return data;
};