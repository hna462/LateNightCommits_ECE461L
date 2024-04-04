import React from 'react'
import Banner from './ProjectBanner';
import ProjectForms from './ProjectForms';
import ProjectOutline from './ProjectOutline';
import ProjectFront from './MyProjectFront';

//todo add one of the components from react folder
const Project = () => {
  return (
    <div>
      <Banner/>
      <ProjectFront/>
      <ProjectOutline/>
    </div>
  )
}

export default Project;