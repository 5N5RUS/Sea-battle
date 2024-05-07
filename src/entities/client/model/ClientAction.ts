import { CompatClient } from "@stomp/stompjs";

export enum CLIENT_TYPE {
  CLIENT_SUCCESS = "CLIENT/SUCCESS",
  CLIENT_ERROR = "CLIENT/ERROR",
}

export type CLIENT_DATA = {
  type: CLIENT_TYPE;
  client: CompatClient;
};