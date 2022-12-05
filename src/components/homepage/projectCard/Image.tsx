import Image from 'next/image';

const ProjectCardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative h-[200px] w-full sm:h-[300px] lg:h-[350px]">
    <Image src={src} alt={alt} className="object-cover object-center" fill sizes="50vw" />
  </div>
);

export default ProjectCardImage;
