import { data } from "react-router";
import { callPostApis } from "../api/api";
import { getPlatform } from "./getPlatform";

export const trackPlatform = async () => {
  const itemStr = localStorage.getItem("platform_tracked");
  const item = JSON.parse(itemStr);

  const now = new Date();
  const currentTime = Date.now();
  const experyDate = new Date(currentTime + 2 * 24 * 60 * 60 * 1000);

  if (!item) {
    return;
  }

  const isExpired = now.getTime() > new Date(item.expires).getTime();

  if (isExpired) {
    localStorage.removeItem("yourKey");
    return;
  }

  const items = { value: "true", expires: experyDate };
  const alreadyTracked = localStorage.getItem("platform_tracked");

  if (!alreadyTracked) {
    const platform = getPlatform();

    try {
      const res = await callPostApis("/analytics/track-platform", { platform });
      if (res.success) {
        localStorage.setItem("platform_tracked", JSON.stringify(items));
      }
    } catch (error) {
      console.error(error);
    }
  }
};
