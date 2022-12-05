import Image from "next/legacy/image";

const ProjectCardTechIcon = ({ src, title }: { src: string; title: string }) => (
  <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
    <Image src={src} layout="fill" title={title} alt={title} />
  </div>
);

export default ProjectCardTechIcon;
