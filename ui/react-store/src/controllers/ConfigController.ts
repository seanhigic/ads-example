import { Config } from "../../../../shared/models/Config";

export function ConfigController() {
    
    async function getConfig() : Promise<Config> {
        const response = await fetch("/api/config");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const config = await response.json() as Config;
        return config;
    }
  
    return {
      getConfig
    }
  }