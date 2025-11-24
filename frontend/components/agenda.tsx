/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

async function getAgenda(data: string) {
  return api(`/servico/by-date?dataEspecifica=${data}`);
}

export default function AgendaDiariaCard() {
  const [agenda, setAgenda] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  async function buscar() {
    if (!date) return;

    setLoading(true);

    const dataFormatada = format(date, "yyyy-MM-dd");
    const res = (await getAgenda(dataFormatada)) as any[];

    setAgenda(res ?? []);
    setLoading(false);
  }

  return (
    <Card className="w-full border-0 shadow-none h-full">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Agenda</CardTitle>
      </CardHeader>

      <CardContent className="h-full">

        {/* DatePicker + Botão */}
        <div className="flex items-center gap-2 mb-4">
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <Button onClick={buscar} disabled={!date || loading}>
            Buscar
          </Button>
        </div>

        {loading && <p>Carregando agenda...</p>}

        {!loading && agenda.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhum serviço encontrado.</p>
        )}

        <div className="mt-2 h-[calc(100%-5rem)] overflow-y-auto pr-2 space-y-3">
          <AnimatePresence>
            {agenda.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border rounded-xl p-4 shadow-sm bg-white"
              >
                <p>
                  <strong>Horário:</strong>{" "}
                  {format(new Date(item.data_hora), "HH:mm", { locale: ptBR })}
                </p>

                <p>
                  <strong>Profissional:</strong> {item.nome_funcionario} — {item.especialidade}
                </p>

                <p>
                  <strong>Serviço:</strong> {item.tipo_servico}
                </p>

                <p>
                  <strong>Animal:</strong> {item.nome_animal} 
                </p>

                <p>
                  <strong>Dono:</strong> {item.dono_animal}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
