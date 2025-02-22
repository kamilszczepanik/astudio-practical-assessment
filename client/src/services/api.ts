import axiosInstance from "../utils/axiosInstance";
import { UsersResponse, USER_FIELDS } from "../types/users";

interface UserFilters {
  gender?: "male" | "female";
  limit?: number;
  skip?: number;
}

const api = (() => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  async function get(url: string): Promise<unknown> {
    try {
      const response = await axiosInstance.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  async function post(url: string, body: object = {}): Promise<unknown> {
    try {
      const response = await axiosInstance.post(url, body, { headers });
      return response.data;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  return {
    users: async (filters?: UserFilters): Promise<UsersResponse> => {
      const params = new URLSearchParams();

      params.append("select", USER_FIELDS.join(","));

      if (filters?.limit) {
        params.append("limit", String(filters.limit));
      }
      if (filters?.skip) {
        params.append("skip", String(filters.skip));
      }

      let url = `/users?${params.toString()}`;

      if (filters?.gender) {
        url = `/users/filter?key=gender&value=${
          filters.gender
        }&${params.toString()}`;
      }

      const response = await get(url);
      return response as UsersResponse;
    },
  };
})();

export default api;

// export async function game(gameId: string): Promise<IndexedGame> {
//   const response = await get(`/api/games/${gameId}`);
//   return response as IndexedGame;
// }

// export async function join(game: IndexedGameSpecs, player: User) {
//   return post(`/api/games/${game.id}/join`, { userId: player.id })
//     .then(() => {
//       showMessage(`You have joined the game ${game.name}`);
//     })
//     .catch((error) => {
//       console.error(error);
//       showMessage("Failed to join game");
//     });
// }

// export async function start(game: IndexedGameSpecs) {
//   return post(`/api/games/${game.id}/start`)
//     .then(() => {
//       showMessage(`You have started the game ${game.name}`);
//     })
//     .catch((error) => {
//       console.error(error);
//       showMessage("Failed to start game");
//     });
// }

// export async function pause(game: IndexedGameSpecs) {
//   return post(`/api/games/${game.id}/pause`)
//     .then(() => {
//       showMessage(`You have paused the game ${game.name}`);
//     })
//     .catch((error) => {
//       console.error(error);
//       showMessage("Failed to pause the game" + game.name);
//     });
// }

// export async function resume(game: IndexedGameSpecs) {
//   return post(`/api/games/${game.id}/resume`)
//     .then(() => {
//       showMessage(`You have resume the game ${game.name}`);
//     })
//     .catch((error) => {
//       console.error(error);
//       showMessage("Failed to resume the game" + game.name);
//     });
// }

// export async function leave(game: IndexedGameSpecs, player: User) {
//   return post(`/api/games/${game.id}/leave`, { userId: player.id })
//     .then(() => {
//       if (game.players.length === 1)
//         showMessage(
//           `You have left the game ${game.name}, the game has been deleted since there were no players.`
//         );
//       else showMessage("You have left the game " + game.name);
//     })
//     .catch((error) => {
//       console.error(error);
//       showMessage("Failed to left the game");
//     });
// }

// async function perform_action(action: Action) {
//   return post(`api/games/${action.gameId}/actions`, action);
// }

// export async function draw({
//   gameId,
//   handId,
// }: {
//   gameId: string;
//   handId: string;
// }) {
//   return perform_action({ type: "draw", gameId, handId });
// }

// export async function play({
//   gameId,
//   handId,
//   cardIndex,
//   color,
// }: {
//   gameId: string;
//   handId: string;
//   cardIndex: number;
//   color: Color | undefined;
// }) {
//   return perform_action({ gameId, handId, type: "play", cardIndex, color });
// }

// export async function sayUno({
//   gameId,
//   handId,
//   playerIndex,
// }: {
//   gameId: string;
//   handId: string;
//   playerIndex: number;
// }) {
//   return perform_action({ gameId, handId, type: "say_uno", playerIndex });
// }

// export async function catchUnoFailure({
//   gameId,
//   handId,
//   accused,
//   accuser,
// }: {
//   gameId: string;
//   handId: string;
//   accused: number;
//   accuser: number;
// }) {
//   return perform_action({
//     gameId,
//     handId,
//     type: "catch_uno_failure",
//     accused,
//     accuser,
//   });
// }
