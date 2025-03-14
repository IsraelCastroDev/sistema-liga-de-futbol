import Link from "next/link";
import Home from "@components/icons/admin/Home";
import User from "../icons/admin/User";
import BallFootball from "../icons/admin/BallFootball";
import Team from "../icons/admin/Team";
import News from "../icons/admin/News";

export default function SidebarAdmin() {
  return (
    <aside className="bg-white w-1/4 shadow py-10">
      <div className="px-4">
        <h1 className="text-2xl">Dashboard</h1>
      </div>

      <div className="mt-5">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center gap-x-2 px-4 py-3">
            <Home className="text-gray-400" />
            <Link href={"/"} className="font-medium text-black">
              Home Page
            </Link>
          </li>

          <li className="px-4 py-3">
            <p className="uppercase">Módulos</p>
          </li>

          <li className="flex items-center gap-x-2 px-4 py-3">
            <User className="text-gray-400" />
            <Link href={"/admin/users"}>Usuarios</Link>
          </li>

          <li className="flex items-center gap-x-2 px-4 py-3">
            <BallFootball className="text-gray-400" />
            <Link href={"/admin/players"}>Futbolistas</Link>
          </li>

          <li className="flex items-center gap-x-2 px-4 py-3">
            <Team className="text-gray-400" />
            <Link href={"/admin/teams"}>Equipos</Link>
          </li>

          <li className="flex items-center gap-x-2 px-4 py-3">
            <News className="text-gray-400" />
            <Link href={"/admin/news"}>Noticias</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
