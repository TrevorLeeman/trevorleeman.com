import ProjectCardLink from './Link';

type ProjectCardInfoProps = {
  purpose: string;
  title: string;
  description: string;
  liveLink: string;
  codeLink: string;
  techIcons: React.ReactNode[];
};

const ProjectCardInfo = ({ purpose, title, description, liveLink, codeLink, techIcons }: ProjectCardInfoProps) => {
  return (
    <div className="flex-grow bg-theme-white p-6 dark:bg-zinc-900">
      <p className="text-sm font-semibold">{purpose}</p>
      <h3 className="pb-2 text-2xl font-bold text-theme-purple dark:text-theme-pink">{title}</h3>
      <p className="pb-2">{description}</p>
      <p className="text-sm font-semibold">Technologies Used</p>
      <div className="flex gap-1 pb-4">{techIcons}</div>
      <div className="flex gap-4">
        <ProjectCardLink href={liveLink}>Live Link</ProjectCardLink>
        <ProjectCardLink href={codeLink}>Code</ProjectCardLink>
      </div>
    </div>
  );
};

export default ProjectCardInfo;
