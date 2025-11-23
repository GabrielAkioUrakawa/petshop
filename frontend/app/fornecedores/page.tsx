"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Fornecedor } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewFornecedorPopup from "./new-card";
import { api } from "@/lib/api";

async function getData(): Promise<Fornecedor[]> {
  const fornecedores = await api("/fornecedor") as Fornecedor[]
  return fornecedores
}

export default function FornecedoresPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Fornecedor[]>([]);
  const [fornecedorEditando, setFornecedorEditando] = useState<Fornecedor | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  // Carrega dados quando a página monta
  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleEdit = (fornecedor: Fornecedor) => {
    setFornecedorEditando(fornecedor);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFornecedorEditando(null);
  };

  const handleNew = () => {
    setFornecedorEditando(null);
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
              <h1 className="text-xl font-bold">Fornecedores</h1>
              <Button className="my-2" onClick={handleNew}>
                <Plus /> Criar Novo
              </Button>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewFornecedorPopup 
        key={`${fornecedorEditando?.cnpj || "new"}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        fornecedor={fornecedorEditando}
        isEditing={!!fornecedorEditando}
      />
    </SidebarProvider>
  );
}
