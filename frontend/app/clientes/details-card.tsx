/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

async function getClientesInactive(data: string) {
  return api(`/cliente/inactive?dataLimite=${data}`);
}

export default function ClientesInativosCard({ open }: { open: boolean }) {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  async function buscar() {
    if (!date) return;

    setLoading(true);
    const dataFormatada = format(date, "yyyy-MM-dd");

    const res = await getClientesInactive(dataFormatada) as any;
    
    setClientes(res);
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-lg border-0 shadow-none h-100">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Clientes Inativos</CardTitle>
        <CardDescription>Selecione a data a partir da qual você quer visualizar os clientes que não compraram mais.</CardDescription>
      </CardHeader>

      <CardContent className="h-full">

        <div className="flex items-center gap-2 mb-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="data-[empty=true]:text-muted-foreground w-[300px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2" />
                {date ? format(date, "PPP", { locale: ptBR }) : <span>Escolher data</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR}/>
            </PopoverContent>
          </Popover>

          <Button onClick={buscar} disabled={!date || loading}>
            Buscar
          </Button>
        </div>

        {loading && <p>Carregando...</p>}

        {!loading && clientes.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum cliente encontrado para essa data.
          </p>
        )}

        
        <div className="mt-2 h-[calc(90%-5rem)] overflow-y-auto pr-2">
          <AnimatePresence>
            {clientes.map((c) => (
              <motion.div
                key={c.cpf}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 mb-3 border rounded-lg"
              >
                <p><strong>CPF:</strong> {c.cpf_cliente}</p>
                <p><strong>Nome:</strong> {c.nome_cliente}</p>
                <strong>Última compra:</strong>{" "}
                {c.data_ultima_compra
                    ? format(new Date(c.data_ultima_compra), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    : "Não realizou"}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
