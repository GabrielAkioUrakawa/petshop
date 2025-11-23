/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { api } from "@/lib/api";

async function getAlergia(animalNome, animalCpf) {
  const res = (await api(
    `/animal-alergia/by-animal/?animalNome=${animalNome}&animalCpf=${animalCpf}`
  )) as any;
  return res;
}

export default function AnimalDetalhes({
  open,
  onClose,
  animalNome,
  animalCpf,
}: {
  open: boolean;
  onClose: () => void;
  animalNome?: string | null;
  animalCpf?: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState<any>([]);

  useEffect(() => {
    if (!open || !animalNome) return;

    let cancelado = false;

    async function carregar() {
      setLoading(true);
      const data = await getAlergia(animalNome, animalCpf);
      if (!cancelado) {
        setProdutos(data as any);
        setLoading(false);
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [open, animalNome, animalCpf]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes do(a) {animalNome}</DialogTitle>
        </DialogHeader>

        <Card className="h-[300px] overflow-y-auto p-4 mt-2">
          {loading && produtos.length === 0 && <p>Carregando...</p>}

          <AnimatePresence>
            {produtos.length > 0 && (<><p>
              <strong>Nome do Dono:</strong> {produtos[0].dono_nome}
              </p>
              <p>
              <strong>Espécie:</strong> {produtos[0].especie}
              </p>
              <p>
              <strong>Raça:</strong> {produtos[0].raca}
            </p></>)}
            <p><strong>Alergias:</strong></p>
            {produtos.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                  - {p.alergia}
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
