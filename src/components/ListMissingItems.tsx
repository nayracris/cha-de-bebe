import { Items } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { SetItemCheckbox } from "./SetItemCheckbox";

interface ListMissingItemsProps {
  items: Items[];
  refreshItems?: () => void;
}

export function ListMissingItems({
  items,
  refreshItems,
}: ListMissingItemsProps) {
  const router = useRouter();
  const isList = router.pathname === "/list";

  console.log("Itens recebidos no ListMissingItems:", items); // Log dos itens recebidos

  return (
    <div className="max-w-3xl w-full mx-auto border-2 border-zinc-200 rounded-lg relative z-40 h-[500px]">
      {/* Cabeçalho com azul claro bebê */}
      <div className="bg-custom-paleBlue rounded-t-lg text-xl h-7 flex justify-center items-center text-zinc-900">
        <span className="flex items-center justify-center font-semibold w-[70%]">
          Presente
        </span>
        {isList && (
          <span className="flex items-center justify-center w-[39%] font-semibold">
            Selecionar
          </span>
        )}
      </div>
      {/* Corpo da lista */}
      <div className="bg-opaque-500 overflow-y-auto h-[calc(100%-28px)] w-full scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-900">
        {items && items.length > 0 ? (
          items.map(({ id, item }, index) => (
            <div
              key={id}
              className={`flex justify-center items-center h-max hover:bg-blue-300 cursor-pointer ${
                index % 2 === 0 ? "bg-blue-100" : "bg-custom-softGray"
              } py-2`}
            >
              <label
                htmlFor={`${id}`}
                className="cursor-pointer text-zinc-900 flex items-center justify-center h-full text-center text-lg font-medium px-1 py-0.5 w-[61%]">
                {item}
              </label>
              {isList && (
                <span className="flex items-center justify-center w-[39%] h-full text-center text-lg px-1 py-0.5">
                  <SetItemCheckbox
                    itemId={id}
                    changeItem={refreshItems!}
                    labelId={`${id}`}
                  />
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="gap-4 flex flex-col justify-center items-center h-full text-center font-pacifico text-lg">
            Não há mais presentes disponíveis!
            <br />
            Agradeço pela sua participação!
            <Image
              src="/baby_elephant_thanks.png"
              width={0}
              height={0}
              sizes="100vw"
              alt="Elefante agradecendo"
              className="opacity-70 w-[200px] h-[200px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}