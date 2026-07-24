export class BinanceWebSocketService {
  private socket?: WebSocket;
  private currentStream?: string;

  connect(
    symbol: string,
    interval: string,
    onMessage: (candle: any) => void
  ) {
    const stream = `${symbol.toLowerCase()}@kline_${interval}`;

    if (
        this.socket &&
        this.currentStream === stream
    ) {
        return;
    }

    this.disconnect();

    this.currentStream = stream;

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

    if (
        this.socket &&
        (
            this.socket.readyState === WebSocket.CONNECTING ||
            this.socket.readyState === WebSocket.OPEN
        )
    ) {
        this.socket.close();
    }

    this.socket = undefined;
    this.currentStream = undefined;
  }
}

export const binanceSocket =
  new BinanceWebSocketService();