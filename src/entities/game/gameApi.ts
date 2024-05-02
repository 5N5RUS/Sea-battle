import { shipsType } from "src/pages/placement-ships/PlacementShips";

import { gameStateType } from "@/pages/battleground/Battleground";

export function getGameState(gameId: number): Promise<gameStateType> {
  return fetch(`http://localhost:8080/session/${gameId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
}

export function deleteSession(sessionId: number): void {
  fetch(`http://localhost:8080/session/${sessionId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

export function arrangeShips(
  gameId: number,
  playerId: number,
  shipCoords: shipsType,
): void {
  fetch(`http://localhost:8080/session/${gameId}/arrangement/${playerId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipCoords }),
  });
}
