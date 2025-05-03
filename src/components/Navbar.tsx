import { NavLink } from "@/components/NavLink";

import {navLinks} from "@/utils/navigations";

export function Navbar() {
    return (
        <nav className="w-full">
            <ul className=" flex-col hidden lg:flex gap-4 md:flex-row md:items-center">
                {navLinks.map(({ href, name }) => (
                    <NavLink key={href} href={href} >
                        {name}
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}
