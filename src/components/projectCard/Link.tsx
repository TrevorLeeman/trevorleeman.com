import Link from 'next/link';

type ProjectCardLinkProps = {
  children: React.ReactNode;
  href: string;
};

const ProjectCardLink = ({ children, href }: ProjectCardLinkProps) =>
  href ? (
    <Link href={href}>
      <a
        target="_blank"
        className="block w-fit rounded-full bg-theme-purple p-6 py-4 font-semibold text-theme-white hover:brightness-110 dark:bg-theme-pink"
      >
        {children}
      </a>
    </Link>
  ) : null;

export default ProjectCardLink;
