import { NavLink } from "@/components/NavLink";
import {navLinks} from "@/utils/navigations-and_other_sets";


export function Navbar() {
    return (
        <nav className="w-full">
            <ul className=" ml-auto flex-col hidden lg:flex gap-4 md:flex-row md:items-center">
                {navLinks.map(({ href, name }) => (
                    <NavLink key={href} href={href} >
                        {name}
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}
