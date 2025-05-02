import axios from "axios";
import { APIConfig } from "./APIUtils";

export async function Get<T>(relativeURL: string) {
  const fullURL = `${APIConfig.base_url}${relativeURL}`;
  return await axios.get<T>(fullURL).then((res) => res);
}
