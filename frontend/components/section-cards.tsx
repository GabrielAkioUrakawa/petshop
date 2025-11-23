/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  const [receita, setReceita] = useState<any>(null);
  const [clientes, setClientes] = useState<any>(null);
  const [animais, setAnimais] = useState<any>(null);
  const [servicos, setServicos] = useState<any>(null);
  const [produto, setProduto] = useState<any>(null);
  const [profissional, setProfissional] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const receitaRes = await api("/servico/revenue-by-month?mes=11&ano=2024");
        setReceita(receitaRes);

        const clientesRes = await api("/cliente/count");
        setClientes(clientesRes);

        const animaisRes = await api("/animal/count");
        setAnimais(animaisRes);

        const servicosRes = await api("/servico/count");
        setServicos(servicosRes);

        const produtoRes = await api("/produto/best-sellers") as any;
        setProduto(produtoRes[0] ?? null);

        const profissionalRes = await api("/funcionario/with-service-count") as any;
        setProfissional(profissionalRes[0] ?? null); 
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    load();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        { receita && (<Card className="@container/card">
          <CardHeader>
            <CardDescription>Receita Total</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              R$ {receita.faturamento_total}
            </CardTitle>
          </CardHeader>
        </Card>)}

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Clientes</CardDescription>
            <CardTitle className="text-2xl font-semibold">{clientes}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Animais</CardDescription>
            <CardTitle className="text-2xl font-semibold">{animais}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Serviços</CardDescription>
            <CardTitle className="text-2xl font-semibold">{servicos}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 my-4 sm:grid-cols-2 lg:px-6">
        {produto && (
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Produto Mais Vendido</CardDescription>
              <CardTitle>
                <h3 className="text-xl font-semibold">
                  {produto.nome_produto}
                </h3>
                <p className="text-sm text-gray-500">
                  {produto.categoria} – R$ {produto.preco_venda}/un.
                </p>
              </CardTitle>
            </CardHeader>
          </Card>
        )}

        {profissional && (<Card className="@container/card">
          <CardHeader>
            <CardDescription>Profissional Destaque</CardDescription>
            <CardTitle>
              <h3 className="text-xl font-semibold">{profissional.funcionario_nome}</h3>
              <p className="text-sm text-gray-500">
                {profissional.especialidade} – {profissional.total_servicos} serviços
              </p>
            </CardTitle>
          </CardHeader>
        </Card>)}
      </div>
    </div>
  );
}
