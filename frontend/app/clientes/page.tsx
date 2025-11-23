"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CircleAlert, Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { createColumns, Cliente } from "./columns";
import NewClientePopup from "./new-card";
import { api } from "@/lib/api";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";
import ClientesInativosCard from "./details-card";


async function getData(): Promise<Cliente[]> {
  const clientes = await api("/cliente")
  return clientes as Cliente [];
}

export default function ClientePage() {
  const [open, setOpen] = useState(false);
  const [openMinimo, setOpenMinimo] = useState(false);

  const [data, setData] = useState<Cliente[]>([]);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  // Carrega dados quando a página monta
  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleEdit = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClienteEditando(null);
  };

  const handleNew = () => {
    setClienteEditando(null);
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
              <h1 className="text-xl font-bold">Clientes</h1>

              <div className="flex gap-2">
                <Button onClick={handleNew}>
                  <Plus /> Criar Novo
                </Button>

                <Button variant="secondary" onClick={() => setOpenMinimo(true)}>
                  <CircleAlert /> Verificar clientes inativos 
                </Button>
              </div>

              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewClientePopup 
        key={`${clienteEditando?.cpf || "new"}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        cliente={clienteEditando}
        isEditing={!!clienteEditando}
      />

    <Dialog open={openMinimo} onOpenChange={setOpenMinimo}>
        <DialogContent className="max-w-lg">
          <ClientesInativosCard open={openMinimo} />
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
