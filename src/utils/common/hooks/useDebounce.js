import {useState, useEffect} from 'react';

const useDebounce = ({callback, delay}) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      if (callback) {
        callback();
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export default useDebounce;
