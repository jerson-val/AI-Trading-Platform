export class BinanceWebSocketService {
  private socket?: WebSocket;

  connect(
    symbol: string,
    interval: string,
    onMessage: (candle: any) => void
  ) {
    this.disconnect();

    const stream =
      `${symbol.toLowerCase()}@kline_${interval}`;

    this.socket =
      new WebSocket(
        `wss://stream.binance.com:9443/ws/${stream}`
      );

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      onMessage(data.k);
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = undefined;
  }
}

export const binanceSocket =
  new BinanceWebSocketService();