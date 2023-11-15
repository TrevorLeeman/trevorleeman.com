import { PropsWithChildren } from 'react';

const ProjectCard = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col overflow-hidden rounded-xl shadow-lg md:rounded-2xl">{children}</div>
);

export default ProjectCard;
