export default {
  getEmployeeInfo(state, employee) {
    state.employee = employee;
  },
  setWebSocket(state,webSocket){
    state.webSocket = webSocket;
  },
  setWebSocketData(state,webSocketData){
    state.webSocketData = webSocketData;
  },
  setDot(state, dot) {
    state.dot = dot;
  }
};