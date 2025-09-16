/**
 * WebSocket connection for realtime updates using react-use-websocket.
 */
import useWebSocket from 'react-use-websocket';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:8000/realtime';

// PUBLIC_INTERFACE
export function useRealtime(onMessage) {
  /**
   * Hook to connect to realtime websocket and receive messages.
   */
  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    onMessage: (msg) => {
      if (onMessage) onMessage(msg);
    }
  });

  return { sendMessage, lastMessage, readyState };
}
