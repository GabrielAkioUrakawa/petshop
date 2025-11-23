/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

async function getFornecedores() {
  return await api("/fornecedor");
}

async function getServicosFornecedor(nomeFornecedor: string) {
  return api(`/servico/by-fornecedor/${nomeFornecedor}`);
}

export default function ProdutoFornecedor({ open }: { open: boolean }) {
  const [fornecedores, setFornecedores] = useState<any[]>([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState<string | null>(
    null
  );
  const [servicos, setServicos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await getFornecedores() as any;
      setFornecedores(res);
    }
    load();
  }, []);

  async function buscar() {
    if (!selectedFornecedor) return;

    setLoading(true);
    const res = await getServicosFornecedor(selectedFornecedor) as any;
    setServicos(res);
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-lg border-0 shadow-none max-h-150">
      <CardHeader>
        <CardTitle>Produtos por Fornecedor</CardTitle>
        <CardDescription>
          Selecione o fornecedor para visualizar os produtos usados em
          serviços.
        </CardDescription>
      </CardHeader>

      <CardContent>

        <div className="flex items-center gap-2 mb-3">
          <Select onValueChange={(v) => setSelectedFornecedor(v)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione um fornecedor" />
            </SelectTrigger>

            <SelectContent>
              {fornecedores.map((f) => (
                <SelectItem key={f.nome} value={f.nome}>
                  {f.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={buscar} disabled={!selectedFornecedor || loading}>
            Buscar
          </Button>
        </div>

        {loading && <p>Carregando...</p>}

        {!loading && servicos.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum serviço encontrado para esse fornecedor.
          </p>
        )}

        <div className="mt-2 h-[calc(90%-5rem)] max-h-100 overflow-y-auto pr-2">
          <AnimatePresence>
            {servicos.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 mb-3 border rounded-lg"
              >
                <p>
                  <strong>Fornecedor:</strong> {s.nome_fornecedor}
                </p>
                <p>
                  <strong>Produto:</strong> {s.nome_produto}
                </p>
                <p>
                  <strong>Tipo de serviço:</strong> {s.tipo_servico}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(s.data_hora).toLocaleString("pt-BR")}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
