
export const localStorageController = {
    getItem(key: string) {
      // get the parsed value of the given key
      const item = window.localStorage.getItem(key);
      if(item) {
        const result = JSON.parse(item);
        // if the key has value
        if(result){ 
            // if the entry is expired
            // remove the entry and return null
            if(result.expireTime <= Date.now()){
                window.localStorage.removeItem(key);
                return null;
            }  
            // else return the value
            return result.data;
        }
      } 
    
      // if the key does not have value
      return null;
    },
    
    // add an entry
    // default expiry is 3 minutes (in ms)
    setItem(key: string, value: string, maxAge = 3 * 60 * 1000) {
       // store the value as object
       // along with expiry date
        const result  = {
          data: value,
          expireTime: 0
       }
       
       if(maxAge){
         // set the expiry 
         // from the current date
         result.expireTime = Date.now() + maxAge;
       }
       
       // stringify the result
       // and the data in original storage
       window.localStorage.setItem(key, JSON.stringify(result));
    },
    
    // remove the entry with the given key
    removeItem(key: string) {
      window.localStorage.removeItem(key);
    },
    
    // clear the storage
    clear() {
      window.localStorage.clear();
    }
  };