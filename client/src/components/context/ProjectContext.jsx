import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { fetchProjects } from "../../services/api";
const ProjectContext = createContext(null);
const initialState = {
  projects: [],
  loading: true,
  error: "",
  selectedProject: null,
};
const reducer = (s, a) =>
  ({
    LOAD_SUCCESS: { ...s, projects: a.payload, loading: false, error: "" },
    LOAD_ERROR: {
      ...s,
      projects: [],
      loading: false,
      error: a.payload,
    },
    SELECT_PROJECT: { ...s, selectedProject: a.payload },
    CLEAR_PROJECT: { ...s, selectedProject: null },
  })[a.type] || s;
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let ok = true;
    fetchProjects()
      .then((data) => {
        if (ok) dispatch({ type: "LOAD_SUCCESS", payload: data || [] });
      })
      .catch((e) => {
        if (ok) dispatch({ type: "LOAD_ERROR", payload: e.message });
      });
    return () => {
      ok = false;
    };
  }, []);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
export const useProjects = () => {
  const c = useContext(ProjectContext);
  if (!c) throw new Error("useProjects must be used inside ProjectProvider");
  return c;
};
