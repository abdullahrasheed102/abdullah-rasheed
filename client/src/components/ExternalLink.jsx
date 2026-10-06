export default function ExternalLink({ href, children, className, ...props }) {
  if (!href) {
    return <span className={`unavailable-link ${className || ''}`.trim()} {...props}>{children}</span>;
  }

  return <a className={className} href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
}
