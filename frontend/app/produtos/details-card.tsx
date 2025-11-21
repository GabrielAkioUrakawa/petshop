"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Produto } from "./columns";

async function getProdutosAbaixoDoMinimo() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, descricao: "Ração", categoria: "Alimentos" },
        { id: 2, descricao: "Sabonete", categoria: "Limpeza" },
      ]);
    }, 200)
  );
}

export default function ProdutosAbaixoMinimoCard({ open }: { open: boolean }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelado = false;

    async function load() {
      setLoading(true);
      const data = await getProdutosAbaixoDoMinimo();
      if (!cancelado) {
        setProdutos(data as Produto[]);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelado = true;
    };
  }, [open]);

  return (
    <Card className="w-full max-w-lg border-0 shadow-none h-80"> {/* altura fixa */}
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Estoque Abaixo do Mínimo</CardTitle>
      </CardHeader>

      <CardContent className="h-full">

        {loading && produtos.length === 0 && <p>Carregando...</p>}

        {!loading && produtos.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum produto abaixo do mínimo.
          </p>
        )}

        {/* Área scrollável */}
        <div className="mt-2 h-[calc(100%-2rem)] overflow-y-auto pr-2">
          <AnimatePresence>
            {produtos.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 mb-3 border rounded-lg"
              >
                <p>
                  <strong>ID:</strong> {p.id}
                </p>
                <p>
                  <strong>Descrição:</strong> {p.descricao}
                </p>
                <p>
                  <strong>Categoria:</strong> {p.categoria}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
