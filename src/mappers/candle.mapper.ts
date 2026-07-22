import { UTCTimestamp } from 'lightweight-charts';

export const mapBinanceKline = (k: any) => ({
  time: (k.t / 1000) as UTCTimestamp,

  open: Number(k.o),

  high: Number(k.h),

  low: Number(k.l),

  close: Number(k.c),

  volume: Number(k.v),
});