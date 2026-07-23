'use client';

import { useEffect } from 'react';

import { useTradingStore } from '@/src/store/trading.store';

import { binanceSocket } from '../services/trading/binance-websocket.service';

import { mapBinanceKline } from '@/src/mappers/candle.mapper';

export const useLiveCandles = () => {

  const symbol = useTradingStore(s => s.symbol);

  const timeframe = useTradingStore(s => s.timeframe);

  const updateLastCandle = useTradingStore(s => s.updateLastCandle);

  const isLoadingHistory = useTradingStore(s => s.isLoadingHistory);

  useEffect(() => {

    if (isLoadingHistory) return;

    binanceSocket.connect(
      symbol,
      timeframe,
      (kline) => {

        updateLastCandle(
          mapBinanceKline(kline)
        );

      }
    );

    return () => {
      binanceSocket.disconnect();
    };

  }, [symbol, timeframe, isLoadingHistory]);

};