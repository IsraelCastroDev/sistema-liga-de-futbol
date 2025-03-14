import { Facebook } from "@components/icons/Facebook";
import { Instagram } from "@components/icons/Instagram";
import { YouTube } from "@components/icons/Youtube";
import { Icon } from "@components/header/Icon";
import HeaderAuth from "./HeaderAuth";

export function Header() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="py-3 bg-black text-white">
        <div
          className="flex gap-2 flex-col xl:flex-row items-center xl:justify-between
                    max-w-4xl mx-auto"
        >
          <h2 className="font-semibold">Primera División - Segunda División</h2>

          <div className="flex items-center gap-x-2">
            <Icon href="https://www.facebook.com/profile.php?id=100073997191155">
              <Facebook className="fill-black" />
            </Icon>
            <Icon href="https://www.instagram.com/prensaenlaceinformativo/">
              <Instagram className="fill-black" />
            </Icon>
            <Icon href="https://www.youtube.com/@PrensaEnlaceInformativo">
              <YouTube className="fill-black" />
            </Icon>
          </div>

          <HeaderAuth />
        </div>
      </div>

      <header>
        <div className="flex items-center justify-between px-10 py-5 shadow">
          <h1 className="text-2xl font-semibold">
            Liga Distrital de Monsefú {year}
          </h1>

          <nav>
            <ul className="flex items-center gap-x-4">
              <li>
                <a href="#">Clubes</a>
              </li>
              <li>
                <a href="#">Jugadores</a>
              </li>
              <li>
                <a href="#">Tabla de posiciones</a>
              </li>
              <li>
                <a href="#">Fixture</a>
              </li>
              <li>
                <a href="#">Noticias</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
