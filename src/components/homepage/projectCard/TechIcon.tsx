import Image from 'next/image';

const ProjectCardTechIcon = ({ src, title }: { src: string; title: string }) => (
  <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
    <Image src={src} title={title} alt={title} fill sizes="40px" />
  </div>
);

export default ProjectCardTechIcon;
