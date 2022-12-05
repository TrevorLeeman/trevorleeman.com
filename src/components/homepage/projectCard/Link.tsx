import Link from 'next/link';

type ProjectCardLinkProps = {
  children: React.ReactNode;
  href: string | undefined;
};

const ProjectCardLink = ({ children, href }: ProjectCardLinkProps) =>
  href ? (
    <Link
      href={href}
      className="block w-fit grow rounded-lg bg-theme-purple px-4 py-3 text-center text-lg font-semibold text-theme-white hover:brightness-110 dark:bg-theme-pink lg:px-6 lg:py-4"
    >
      {children}
    </Link>
  ) : null;

export default ProjectCardLink;
