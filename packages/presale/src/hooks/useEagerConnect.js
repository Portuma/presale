import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

const useEagerConnect = (injected) => {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  // intentionally only running on mount (make sure it's only mounted once :))
  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate, injected]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export default useEagerConnect;