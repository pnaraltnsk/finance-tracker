import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
const NavBar = () =>{

    return (
    <Menubar className="rounded-none border-b px-4 py-6 flex justify-between">
        <h1 className="font-bold text-lg">Finance Tracker</h1>
        <MenubarMenu>
            <Link to= "/create">
                <MenubarTrigger className="rounded-md px-4 py-2">Create</MenubarTrigger>
            </Link>
        </MenubarMenu>
    </Menubar>
    )

}

export default NavBar;