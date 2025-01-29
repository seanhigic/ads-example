import React, { useLayoutEffect, useRef } from "react";

export type useLayoutRunOnceProps = {
  fn: () => unknown;
  sessionKey?: string;
};

const useLayoutRunOnce: React.FC<useLayoutRunOnceProps> = ({ fn, sessionKey }) => {
  const triggered = useRef<boolean>(false);

  useLayoutEffect(() => {
    const hasBeenTriggered = sessionKey
      ? sessionStorage.getItem(sessionKey)
      : triggered.current;

    if (!hasBeenTriggered) {
      fn();
      triggered.current = true;

      if (sessionKey) {
        sessionStorage.setItem(sessionKey, "true");
      }
    }
  }, [fn, sessionKey]);

  return null;
};

export default useLayoutRunOnce;