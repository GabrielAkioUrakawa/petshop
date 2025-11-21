"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

type ProdutoServico = {
  id: number;
  nome: string;
  quantidade: number;
};

// --- API FAKE ---
async function getProdutosDoServico(servicoId) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, nome: "Shampoo", quantidade: 1 },
        { id: 2, nome: "Cortador de unhas", quantidade: 1 },
      ]);
    }, 400)
  );
}

export default function ProdutosUtilizadosNoServicoDialog({
  open,
  onClose,
  servicoId,
}: {
  open: boolean;
  onClose: () => void;
  servicoId?: number | null;
}) {
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState<ProdutoServico[]>([]);

  useEffect(() => {
    if (!open || !servicoId) return;

    let cancelado = false;

    async function carregar() {
      setLoading(true);
      const data = await getProdutosDoServico(servicoId);
      if (!cancelado) {
        setProdutos(data as ProdutoServico[]);
        setLoading(false);
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [open, servicoId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Produtos utilizados no serviço</DialogTitle>
        </DialogHeader>

        <Card className="h-[300px] overflow-y-auto p-4 mt-2">
          {loading && produtos.length === 0 && <p>Carregando...</p>}

          {!loading && produtos.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum produto utilizado.
            </p>
          )}

          <AnimatePresence>
            {produtos.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 mb-3 border rounded-md"
              >
                <p>
                  <strong>ID:</strong> {p.id}
                </p>
                <p>
                  <strong>Produto:</strong> {p.nome}
                </p>
                <p>
                  <strong>Quantidade:</strong> {p.quantidade}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
