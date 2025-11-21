"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { createColumns, Cliente } from "./columns";
import NewClientePopup from "./new-card";


async function getData(): Promise<Cliente[]> {
  return [
    {
      cpf: 12345678900,
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "(11) 91234-5678",
      endereco: "Rua das Flores, 123, São Paulo, SP",
      data_cadastro: new Date("2023-11-20"),
    },
    {
      cpf: 98765432100,
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      telefone: "(21) 99876-5432",
      endereco: "Av. Brasil, 456, Rio de Janeiro, RJ",
      data_cadastro: new Date("2024-01-15"),
    },
    {
      cpf: 55544433322,
      nome: "Carlos Pereira",
      email: "carlos.pereira@email.com",
      telefone: "(31) 93456-7890",
      endereco: "Praça Central, 789, Belo Horizonte, MG",
      data_cadastro: new Date("2024-03-07"),
    },
  ];
}

export default function ClientePage() {
  const [open, setOpen] = useState(false);
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

              <Button className="my-2" onClick={handleNew}>
                <Plus /> Criar Novo
              </Button>

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
    </SidebarProvider>
  );
}
