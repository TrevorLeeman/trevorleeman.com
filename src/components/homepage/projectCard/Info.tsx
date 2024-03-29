import ProjectCardLink from './Link';

type ProjectCardInfoProps = {
  purpose: string;
  title: string;
  description: string;
  liveLink?: string;
  codeLink?: string;
  techIcons: React.ReactNode[];
};

const ProjectCardInfo = ({ purpose, title, description, liveLink, codeLink, techIcons }: ProjectCardInfoProps) => {
  return (
    <div className="flex flex-grow flex-col justify-between bg-theme-white p-6 dark:bg-theme-light-blue-gray dark:text-theme-black">
      <div className="grow">
        <p className="text-sm font-semibold sm:text-lg">{purpose}</p>
        <h3 className="pb-2 text-2xl font-bold text-theme-purple dark:text-theme-pink sm:text-3xl">{title}</h3>
        <p className="pb-2 sm:text-lg">{description}</p>
      </div>
      <div>
        <p className="text-sm font-semibold sm:text-lg">Technologies Used</p>
        <div className="mb-4 flex w-fit flex-wrap gap-1 rounded p-1">{techIcons}</div>
        <div className="flex flex-wrap justify-center gap-4">
          <ProjectCardLink href={liveLink}>Visit Site</ProjectCardLink>
          <ProjectCardLink href={codeLink}>View Source</ProjectCardLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardInfo;
