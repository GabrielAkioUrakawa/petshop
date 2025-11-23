"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Venda } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import NewVendaPopup from "./new-card";
import { api } from "@/lib/api";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

async function getByRange(dataInicio: string, dataFinal: string): Promise<Venda[]> {
  return await api(`/compra/by-date-range?dataInicio=${dataInicio}&dataFinal=${dataFinal}`);
}

export default function VendasPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Venda[]>([]); // começa vazio!
  const [vendaEditando, setVendaEditando] = useState<Venda | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  const [dataInicio, setDataInicio] = useState<Date | undefined>();
  const [dataFinal, setDataFinal] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  const handleEdit = (venda: Venda) => {
    setVendaEditando(venda);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVendaEditando(null);
  };

  const handleNew = () => {
    setVendaEditando(null);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  async function buscar() {
    if (!dataInicio || !dataFinal) return;

    setLoading(true);

    const ini = format(dataInicio, "yyyy-MM-dd");
    const fim = format(dataFinal, "yyyy-MM-dd");

    const res = await getByRange(ini, fim);

    setData(res);
    setLoading(false);
  }

  const columns = createColumns(handleEdit);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 min-h-0 flex-col">
          <div className="@container/main flex flex-1 min-h-0 flex-col gap-2">
            <div className="m-6">
              <h1 className="text-xl font-bold">Vendas</h1>

              {/* Botão Nova Venda */}
              <Button className="my-2" onClick={handleNew}>
                <Plus /> Registrar Nova Venda
              </Button>

              {/* ---- FILTROS ---- */}
              <p className="mt-4 text-sm text-gray-800">Selecione o período desejado:</p>
              <div className="flex items-center gap-3 mt-2">
                
                {/* Data Início */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-fit justify-start text-left font-normal"
                      data-empty={!dataInicio}
                    >
                      <CalendarIcon className="mr-2" />
                      {dataInicio
                        ? format(dataInicio, "PPP", { locale: ptBR })
                        : "Data inicial"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dataInicio}
                      onSelect={setDataInicio}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>

                {/* Data Final */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-fit justify-start text-left font-normal"
                      data-empty={!dataFinal}
                    >
                      <CalendarIcon className="mr-2" />
                      {dataFinal
                        ? format(dataFinal, "PPP", { locale: ptBR })
                        : "Data final"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dataFinal}
                      onSelect={setDataFinal}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>

                {/* BOTÃO BUSCAR */}
                <Button onClick={buscar} disabled={!dataInicio || !dataFinal || loading}>
                  {loading ? "Buscando..." : "Buscar"}
                </Button>
              </div>

              {/* DATA TABLE */}
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewVendaPopup
        key={`${vendaEditando?.id_compra || "new"}-${popupKey}`}
        open={open}
        onClose={handleClose}
        venda={vendaEditando}
        isEditing={!!vendaEditando}
      />
    </SidebarProvider>
  );
}
