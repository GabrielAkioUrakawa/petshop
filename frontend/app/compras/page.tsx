/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Compra } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewCompraPopup from "./new-card";
import { api } from "@/lib/api";

async function getData(){
  const compras = await api("/lote") as any
  return compras
}

export default function ComprasPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Compra[]>([]);
  const [compraEditando, setCompraEditando] = useState<Compra | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  // Carrega dados quando a página monta
  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleEdit = (compra: Compra) => {
    setCompraEditando(compra);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCompraEditando(null);
  };

  const handleNew = () => {
    setCompraEditando(null);
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
              <h1 className="text-xl font-bold">Compras de Produtos</h1>
              <Button className="my-2" onClick={handleNew}>
                <Plus /> Registrar Nova Compra
              </Button>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewCompraPopup 
        key={`${compraEditando?.id_lote || "new"}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        compra={compraEditando}
        isEditing={!!compraEditando}
      />
    </SidebarProvider>
  );
}
