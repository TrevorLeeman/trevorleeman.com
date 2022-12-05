import Image from "next/legacy/image";

const ProjectCardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative h-[200px] w-full sm:h-[300px] lg:h-[350px]">
    <Image src={src} layout="fill" alt={alt} className="object-cover object-center" />
  </div>
);

export default ProjectCardImage;
