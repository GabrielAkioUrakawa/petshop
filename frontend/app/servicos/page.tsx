"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Servico } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus, Store } from "lucide-react";
import NewServicoPopup from "./new-card";
import { api } from "@/lib/api";

import ProdutoFornecedor from "./details-card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

async function getData(): Promise<Servico[]> {
  const res = await api("/servico")
  return res as Servico[]
}

export default function ServicosPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Servico[]>([]);
  const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);
  const [popupKey, setPopupKey] = useState(0);
  const [openMinimo, setOpenMinimo] = useState(false);

  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleEdit = (servico: Servico) => {
    setServicoEditando(servico);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setServicoEditando(null);
  };

  const handleNew = () => {
    setServicoEditando(null);
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
              <h1 className="text-xl font-bold">Serviços</h1>
              <div className="flex gap-2">
                <Button onClick={handleNew}>
                  <Plus /> Criar Novo
                </Button>

                <Button variant="secondary" onClick={() => setOpenMinimo(true)}>
                  <Store /> Verificar produtos utilizados nos serviços 
                </Button>
              </div>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewServicoPopup 
        key={`${servicoEditando?.funcionario_nome || "new"}-${servicoEditando?.cliente_nome || ""}-${servicoEditando?.animal_nome || ""}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        servico={servicoEditando}
        isEditing={!!servicoEditando}
      />

      <Dialog open={openMinimo} onOpenChange={setOpenMinimo}>
        <DialogContent className="max-w-lg">
          <ProdutoFornecedor open={openMinimo} />
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
