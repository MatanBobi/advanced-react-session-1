import { useEffect, useReducer } from "react";
function dataReducer(state: any, action: { type: string; data?: any }): any {
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCHED":
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    default:
      return state;
  }
}
export function useData<T>(url: string): { isLoading: boolean; data: T } {
  const [state, dispatch] = useReducer(dataReducer, {
    data: [],
    isLoading: false,
  });
  useEffect(() => {
    let ignore = false;
    dispatch({ type: "FETCHING" });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          dispatch({ type: "FETCHED", data });
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return state;
}
