import Link from "next/link";

export default function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void; }) {
    return (
      <Link href={href} className="text-white hover:text-[#ff0080] transition-colors duration-300" onClick={onClick}>
        {children}
      </Link>
    )
}