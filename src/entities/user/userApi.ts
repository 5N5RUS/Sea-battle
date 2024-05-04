import { get } from "src/shared/api/fetcher";

export function whoami() {
  return get("users/whoami");
}
