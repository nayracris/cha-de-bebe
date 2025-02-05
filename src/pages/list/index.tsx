import { ConfirmedPresence } from "@/components/ConfirmedPresence";
import { ListMissingItems } from "@/components/ListMissingItems";
import { ListUserItems } from "@/components/ListUserItems";
import { useAuthContext } from "@/context/AuthContext";
import { api, setToken } from "@/services/api";
import { Items } from "@prisma/client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Notes } from "@/components/Notes";

const USER_TOKEN = "CHA_DE_BEBE_TOKEN";

interface ListProps {
  items: Items[];
  userItems: Items[];
}

export default function List({
  items: itemList,
  userItems: userItemsList,
}: ListProps) {
  const { isAuthenticated } = useAuthContext();
  const [items, setItems] = useState<Items[]>(itemList);
  const [userItems, setUserItems] = useState<Items[]>(userItemsList);

  const refreshItems = async () => {
    const LIST_URL = "/api/list/items";
    const USER_LIST_URL = "/api/list/user";
    const token = parseCookies(null)[USER_TOKEN];

    if (!token) {
      window.location.href = "/singIn";
      return;
    }

    setToken(token);

    try {
      const [listResponse, userListResponse] = await Promise.all([
        api.get(LIST_URL, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get(USER_LIST_URL, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setItems(listResponse.data);
      setUserItems(userListResponse.data);
      console.log("Itens atualizados:", listResponse.data);
      console.log("Itens do usuário atualizados:", userListResponse.data);
    } catch (error) {
      console.error("Erro ao recuperar a lista de itens:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshItems();
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <div className="mx-auto py-6 w-full max-w-3xl bg-opaque-600 relative z-40 h-[calc(100vh-112px)] overflow-y-auto scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-900">
          <section className="mx-auto rounded-b-lg flex flex-col items-center justify-center gap-6 max-w-xl p-2 text-zinc-900 relative z-40">
            <Notes />
          </section>

          <section className="h-max relative z-40 py-6">
            <div className="h-max flex flex-col items-center py-2 rounded-lg w-11/12 mx-auto">
              <h2 className="text-zinc-900 font-pacifico text-2xl mb-1">
                Lista de Presentes:
              </h2>
              <ListMissingItems items={items} refreshItems={refreshItems} />
            </div>
          </section>

          <section className="mx-auto rounded-b-lg flex flex-col items-center justify-center gap-6 max-w-xl p-2 text-zinc-900 relative z-40">
            <ConfirmedPresence />
          </section>

          <section className="h-max relative z-40 py-6">
            <div className="h-max flex flex-col items-center py-2 rounded-lg w-11/12 mx-auto">
              <h2 className="text-zinc-900 font-pacifico text-2xl mb-1">
                Meus Presentes:
              </h2>
              <ListUserItems
                userItems={userItems}
                refreshItems={refreshItems}
              />
            </div>
          </section>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-zinc-900 text-xl">Por favor, faça login para acessar a lista.</p>
        </div>
      )}
    </>
  );
}
