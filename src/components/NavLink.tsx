import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    exact?: boolean;
};

export function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    // console.log({href})
    const isActive =
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <li>
            <div className="group relative cursor-pointer py-2">
                <Link
                    href={href}
                    className={cn(
                        "pb-3 align-middle text-[14px] font-semibold leading-6 antialiased transition-colors text-black dark:text-darkText-200",
                        "hover:text-brand hover:border-b-2 hover:border-brand active:border-brand",
                        isActive && "text-brand border-b-2 border-brand"
                    )}
                >
                    {children}
                </Link>
            </div>
        </li>
    );
}
