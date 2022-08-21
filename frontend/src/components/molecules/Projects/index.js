import React, { useState, useEffect } from "react";
import { useProjects } from "../../../providers/project";
import projectService from "./../../../services/project";
import Project from "./../../organisms/Project";

const Projects = () => {
  const { projects, setProjects } = useProjects();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.list();
      setProjects(data);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div>
      {projects && !projects.length && "The project list is empty"}
      {loading && "loading..."}
      {projects &&
        projects.length > 0 &&
        projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
    </div>
  );
};

export default Projects;
