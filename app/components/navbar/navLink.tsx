import Link from "next/link";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
      <Link href={href} className="text-white hover:text-[#ff0080] transition-colors duration-300">
        {children}
      </Link>
    )
}