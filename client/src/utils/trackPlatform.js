import { callPostApis } from "../api/api";
import { getPlatform } from "./getPlatform";

export const trackPlatform = async() => {
    const alreadyTracked  = localStorage.getItem('platform_tracked');

    if (!alreadyTracked) {
        const platform = getPlatform();
      
        
        try {
           const res =  await callPostApis('/analytics/track-platform', {platform});
           if(res.success){
            localStorage.setItem('platform_tracked', 'true');
           }
        } catch (error) {
             console.error(error);
        }

    }
}