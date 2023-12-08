"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged) {
      location.replace("/projects");
    }
  }, []);
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-blue-600"
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/">
            <Image src="/logo.png" width={120} height={120} alt="Logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4 text-white font-bold"
        justify="end"
      >
        <NavbarItem className="hover:text-blue-300 transition-colors">
          <Link color="foreground" href="/about">
            Sobre
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:text-blue-300 transition-colors">
          <Link color="foreground" href="/signup">
            Registrar
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:text-blue-300 transition-colors">
          <Link color="foreground" href="/login">
            Entrar
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
        />
      </NavbarContent>
      <NavbarMenu className="bg-blue-600 text-white font-bold transition">
        <NavbarMenuItem
          className="hover:text-blue-300 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link color="foreground" href="/about">
            Sobre
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          className="hover:text-blue-300 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link color="foreground" href="/signup">
            Registrar
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          className="hover:text-blue-300 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link color="foreground" href="/login">
            Entrar
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
