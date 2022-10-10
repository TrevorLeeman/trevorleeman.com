import Link from 'next/link';

type ProjectCardLinkProps = {
  children: React.ReactNode;
  href: string | undefined;
};

const ProjectCardLink = ({ children, href }: ProjectCardLinkProps) =>
  href ? (
    <Link href={href}>
      <a
        target="_blank"
        className="block w-fit rounded-lg bg-theme-purple px-4 py-3 text-lg font-semibold text-theme-white hover:brightness-110 dark:bg-theme-pink md:px-6 md:py-4"
      >
        {children}
      </a>
    </Link>
  ) : null;

export default ProjectCardLink;
