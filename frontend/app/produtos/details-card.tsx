/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Produto } from "./columns";
import { api } from "@/lib/api";

async function getProdutosAbaixoDoMinimo() {
  const produtos = await api("/produto/low-stock")
  return produtos
}

export default function ProdutosAbaixoMinimoCard({ open }: { open: boolean }) {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelado = false;

    async function load() {
      setLoading(true);
      const data = await getProdutosAbaixoDoMinimo();
      if (!cancelado) {
        setProdutos(data as any);
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
        <CardDescription>Produtos que a quantidade em estoque está abaixo do mínimo.</CardDescription>
      </CardHeader>

      <CardContent className="h-full">

        {loading && produtos.length === 0 && <p>Carregando...</p>}

        {!loading && produtos.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum produto abaixo do mínimo.
          </p>
        )}

        {/* Área scrollável */}
        <div className="mt-2 h-[calc(90%-2rem)] overflow-y-auto pr-2">
          <AnimatePresence>
            {produtos.map((p) => (
              <motion.div
                key={p.id_produto}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 mb-3 border rounded-lg"
              >
                <p>
                  <strong>Nome:</strong> {p.nome_produto}
                </p>
                <p>
                  <strong>Categoria:</strong> {p.categoria}
                </p>
                <p>
                  <strong>Fornecedor:</strong> {p.nome_fornecedor}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
