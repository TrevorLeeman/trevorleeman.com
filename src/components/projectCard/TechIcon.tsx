import Image from 'next/image';

const ProjectCardTechIcon = ({ src, title }: { src: string; title: string }) => (
  <div className="relative h-8 w-8">
    <Image src={src} layout="fill" title={title} alt={title} />
  </div>
);

export default ProjectCardTechIcon;
