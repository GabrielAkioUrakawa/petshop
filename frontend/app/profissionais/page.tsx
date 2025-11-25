/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Funcionario } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewFuncionarioPopup from "./new-card";
import { api } from "@/lib/api";

async function getData() {
  // Fetch data from your API here.
  const funcionarios = await api("/funcionario/with-service-count") as any;
  
  return funcionarios;
}

export default function FuncionariosPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Funcionario[]>([]);
  const [funcionarioEditando, setFuncionarioEditando] = useState<Funcionario | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  // Carrega dados quando a página monta
  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleEdit = (funcionario: Funcionario) => {
    setFuncionarioEditando(funcionario);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFuncionarioEditando(null);
  };

  const handleNew = () => {
    setFuncionarioEditando(null);
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
              <h1 className="text-xl font-bold">Funcionários</h1>

              <Button className="my-2" onClick={handleNew}>
                <Plus /> Criar Novo
              </Button>

              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewFuncionarioPopup 
        key={`${funcionarioEditando?.cpf || "new"}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        funcionario={funcionarioEditando}
        isEditing={!!funcionarioEditando}
      />
    </SidebarProvider>
  );
}

