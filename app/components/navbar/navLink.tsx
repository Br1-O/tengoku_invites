import Link from "next/link";

export default function NavLink({ href, children, onClick, target }: { href: string; children: React.ReactNode; onClick?: () => void; target?: string }) {
    return (
      <Link href={href} className="text-white hover:text-[#ff0080] transition-colors duration-300" onClick={onClick} {...(target ? { target, rel: "noopener noreferrer" } : {})}>
        {children}
      </Link>
    )
}