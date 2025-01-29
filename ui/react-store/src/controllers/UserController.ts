import { User } from "../../../../shared/models/User";

export function UserController() {
    
    async function getCurrentUser() : Promise<User> {
        const response = await fetch("/api/users/current");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const fetchedUser = await response.json() as User;
        return fetchedUser;
    }
  
    return {
      getCurrentUser
    }
  }