export class WebSocketClient {
  private socket: WebSocket | null = null

  connect() {
    this.socket = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL!
    )

    this.socket.onopen = () => {
      console.log('Connected to websocket')
    }

    this.socket.onmessage = (event) => {
      console.log(event.data)
    }
  }
}