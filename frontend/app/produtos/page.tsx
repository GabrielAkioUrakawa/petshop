"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Produto } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { CircleAlert, Plus } from "lucide-react";

import NewProdutoPopup from "./new-card";
import ProdutosAbaixoMinimoCard from "./details-card";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/lib/api";

async function getData(): Promise<Produto[]> {
  const produtos = await api("/produto")
  return produtos as Produto[];
}

export default function ProdutosPage() {
  const [open, setOpen] = useState(false);
  const [openMinimo, setOpenMinimo] = useState(false);

  const [data, setData] = useState<Produto[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleEdit = (produto: Produto) => {
    setProdutoEditando(produto);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProdutoEditando(null);
  };

  const handleNew = () => {
    setProdutoEditando(null);
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
              <h1 className="text-xl font-bold">Produtos</h1>

              <div className="flex gap-2 my-2">
                <Button onClick={handleNew}>
                  <Plus /> Criar Novo
                </Button>

                <Button variant="secondary" onClick={() => setOpenMinimo(true)}>
                  <CircleAlert /> Verificar produtos abaixo do mínimo
                </Button>
              </div>

              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewProdutoPopup
        key={`${produtoEditando?.id_produto || "new"}-${popupKey}`}
        open={open}
        onClose={handleClose}
        produto={produtoEditando}
        isEditing={!!produtoEditando}
      />

      <Dialog open={openMinimo} onOpenChange={setOpenMinimo}>
        <DialogContent className="max-w-lg">
          <ProdutosAbaixoMinimoCard open={openMinimo} />
        </DialogContent>
      </Dialog>

    </SidebarProvider>
  );
}
