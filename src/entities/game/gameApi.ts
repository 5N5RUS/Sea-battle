import { gameStateType } from "@/pages/battleground/Battleground";

export function getGameState(gameId: number): Promise<gameStateType> {
  return fetch(`http://localhost:8080/session/${gameId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
}