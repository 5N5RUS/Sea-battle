import { CompatClient } from "@stomp/stompjs";
import { CLIENT_DATA, CLIENT_TYPE } from "src/entities/client/model/ClientAction";

export const CLIENT_REDUCER = "CLIENT_REDUCER";

type clientState = {
  client: CompatClient | null;
  error: boolean;
};

const initState: clientState = {
  client: null,
  error: false,
};

export function clientReducer(state: clientState = initState, action: CLIENT_DATA) {
  switch (action.type) {
    case CLIENT_TYPE.CLIENT_SUCCESS:
      return { ...state, client: action.client, error: false };
    case CLIENT_TYPE.CLIENT_ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
}

export default clientReducer;
