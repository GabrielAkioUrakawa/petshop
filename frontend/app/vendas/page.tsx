"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Venda } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewVendaPopup from "./new-card";

async function getData(): Promise<Venda[]> {
  // Fetch data from your API here.
  return [
    {
      id: "V001",
      data_hora: new Date("2024-12-15T09:30:00"),
      cpf_cliente: 12345678900,
      meio: "Cartão de Crédito",
      parcela: 3,
      status: "Pago",
    },
    {
      id: "V002",
      data_hora: new Date("2024-12-15T14:20:00"),
      cpf_cliente: 98765432100,
      meio: "PIX",
      parcela: 1,
      status: "Pago",
    },
    {
      id: "V003",
      data_hora: new Date("2024-12-16T10:15:00"),
      cpf_cliente: 55544433322,
      meio: "Dinheiro",
      parcela: 1,
      status: "Pendente",
    },
  ];
}

export default function VendasPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Venda[]>([]);
  const [vendaEditando, setVendaEditando] = useState<Venda | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  // Carrega dados quando a página monta
  useEffect(() => {
    getData().then(setData);
  }, []);

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
              <Button className="my-2" onClick={handleNew}>
                <Plus /> Registrar Nova Venda
              </Button>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewVendaPopup 
        key={`${vendaEditando?.id || "new"}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        venda={vendaEditando}
        isEditing={!!vendaEditando}
      />
    </SidebarProvider>
  );
}
