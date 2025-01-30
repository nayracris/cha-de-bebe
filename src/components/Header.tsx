import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export function Header() {
  const router = useRouter();
  const [aName, setAName] = useState("");
  const [name, setName] = useState("");

  const { user, isAuthenticated, logout } = useAuthContext();

  const isSingUp = router.pathname === "/singUp";
  const isHome = router.pathname === "/home";
  const showSingButton = router.pathname !== "/list";
  const isList = !showSingButton;

  const getUserName = useCallback(() => {
    if (isList && user?.name) {
      const [firstName] = user.name.split(" ");
      setName(firstName);
    }
  }, [isList, user]);

  useEffect(() => {
    setAName(process.env.NEXT_PUBLIC_A_NAME as string);
    getUserName();
  }, [getUserName]);

  return (
    <header
      className="w-full h-36 py-6 flex items-center justify-between flex-col gap-2 relative z-50 bg-white"
    >
      {isList && isAuthenticated && (
        <>
          <div className="absolute text-zinc-800 text-base left-3 bottom-3">
            <p>Seja bem-vindo(a)</p>
            <p className="font-semibold italic text-blue-500">{name}!</p>
          </div>
          <div className="absolute text-zinc-800 text-sm right-4 top-4">
            <button
              className="border font-semibold border-blue-600 rounded-sm px-2 hover:bg-blue-600 hover:text-zinc-900 transition-colors duration-300"
              onClick={logout}
            >
              Sair
            </button>
          </div>
        </>
      )}
      <h1 className="text-6xl text-blue-400 italic font-playwriteIN tracking-wide">
        Chá de Bebê
      </h1>
      <div className="w-full flex justify-center mt-0">
        {showSingButton && !isAuthenticated ? (
          <Link
            className="flex justify-center items-center text-zinc-900 font-semibold border border-blue-400 hover:bg-blue-400 hover:text-zinc-800 transition-colors duration-300 rounded-sm mr-2 mt-2"
            href={isSingUp || isHome ? "/singIn" : "/singUp"}
          >
            <span className="animate-pulse w-full h-full py-0.5 px-1 hover:animate-none">
              {isSingUp || isHome ? "Entrar" : "Registrar"}
            </span>
          </Link>
        ) : (
          <span className="flex justify-end text-transparent text-lg font-semibold italic mr-2">
            {aName}
          </span>
        )}
        {isHome && (
          <Link
            className="flex justify-center items-center text-zinc-800 font-semibold border border-blue-400 hover:bg-blue-400 hover:text-zinc-900 transition-colors duration-300 rounded-sm mr-2 mt-2"
            href="/singUp"
          >
            <span className="animate-pulse w-full h-full py-0.5 px-1 hover:animate-none">
              Registrar
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}

