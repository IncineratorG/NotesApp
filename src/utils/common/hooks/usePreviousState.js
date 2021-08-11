import {useEffect, useRef} from 'react';

const usePreviousState = ({currentState, updateDelay = 0}) => {
  const currentStateRef = useRef(null);
  const previousStateRef = useRef(null);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      previousStateRef.current = currentStateRef.current;
      currentStateRef.current = {...currentState};
      // previousStateRef.current = {...currentState};
    }, updateDelay);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [currentState, updateDelay]);

  return previousStateRef.current;

  // const currentStateRef = useRef(null);
  // // const [internalCurrentState, setInternalCurrentState] = useState(null);
  // const [previousState, setPreviousState] = useState(null);
  //
  // useEffect(() => {
  //   // const timeoutHandler = setTimeout(() => {}, 1500);
  //   //
  //   // return () => {
  //   //   clearTimeout(timeoutHandler);
  //   // };
  //
  //   currentStateRef.current = currentState;
  // }, [currentState]);
  //
  // // useEffect(() => {
  // //   const timeoutHandler = setTimeout(() => {
  // //     setPreviousState(internalCurrentState);
  // //     setInternalCurrentState(currentState);
  // //   }, 1500);
  // //
  // //   return () => {
  // //     clearTimeout(timeoutHandler);
  // //   };
  // // }, [currentState, internalCurrentState]);
  //
  // return {
  //   previousState,
  // };
};

export default usePreviousState;
