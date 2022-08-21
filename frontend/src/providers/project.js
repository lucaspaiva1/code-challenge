import React, { useState } from "react";

export const ProjectsContext = React.createContext({});

export const ProjectProvider = (props) => {
  const [projects, setProjects] = useState(null);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {props.children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => React.useContext(ProjectsContext);
