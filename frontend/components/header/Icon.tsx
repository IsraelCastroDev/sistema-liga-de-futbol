interface IconProps {
  href?: string;
  children: React.ReactNode;
}

export function Icon({ href, children }: IconProps) {
  return (
    <div className="p-1 rounded-full bg-white">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  );
}
