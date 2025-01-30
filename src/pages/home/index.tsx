import { GetServerSideProps } from "next";
import { Items } from "@prisma/client";
import React from "react";
import { ListMissingItems } from "../../components/ListMissingItems";
import { api } from "@/services/api";
import { parseCookies } from "nookies";

const USER_TOKEN = "CHA_DE_BEBE_TOKEN";

interface HomeProps {
  items: Items[];
}

export default function Home({ items }: HomeProps) {
  return (
    <section className="flex flex-col justify-start items-center h-[calc(100vh-112px)] overflow-y-auto relative z-40">
    
      <p className="text-lg font-palatino text-zinc-800 text-center max-w-2xl px-4 mt-5">
        Estamos muito felizes em compartilhar esse momento especial com você! 
        Confira abaixo a lista de presentes remanescentes, logue e escolha aquele que desejar contribuir. 
        Sua presença e carinho já são um presente enorme para nós!
      </p>
      {/* Lista de Presentes */}
      <div className="flex flex-col items-center w-full mt-6">
        <div className="text-3xl italic font-pacifico text-blue-400 px-2 py-1 rounded-lg">
        
        </div>
        <div className="w-11/12 max-w-4xl bg-white rounded-lg shadow-lg p-4 mt-4">
          <ListMissingItems items={items} />
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const URL = "/api/list/items";
  const response = await api.get(URL);
  const items = response.data;

  const token = parseCookies(ctx)[USER_TOKEN];
  if (token) {
    return {
      redirect: {
        destination: "/list",
        permanent: false,
      },
    };
  }

  return {
    props: {
      items,
    },
  };
};
