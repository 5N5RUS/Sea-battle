import { gameStateType } from "src/pages/battleground/Battleground";
import { shipsType } from "src/pages/placement-ships/PlacementShips";
import { del, get, post } from "src/shared/api/fetcher";

export function getGameState(gameId: number): Promise<gameStateType> {
  return get(`session/${gameId}`);
}

export function deleteSession(sessionId: number): void {
  del(`session/${sessionId}`);
}

export function arrangeShips(gameId: number, shipCoords: shipsType): void {
  post(`session/${gameId}/arrangement`, { shipCoords });
}
