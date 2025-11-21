"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Servico } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewServicoPopup from "./new-card";
import ProdutosUtilizadosNoServicoDialog from "./details-card";

async function getData(): Promise<Servico[]> {
  return [
    {
      servico_cpf: "1AA",
      funcionario_nome: "João Silva",
      cliente_nome: "Maria Santos",
      animal_nome: "Rex",
      data_hora: new Date("2024-12-15T10:00:00"),
      preco: 150.00,
      tipo: "Consulta",
      descricao: "Consulta veterinária de rotina",
      dono_cpf: 12345678900,
      dono_nome: "Maria Santos",
    },
    {
      servico_cpf: "1AB",
      funcionario_nome: "Maria Oliveira",
      cliente_nome: "Carlos Pereira",
      animal_nome: "Luna",
      data_hora: new Date("2024-12-16T14:30:00"),
      preco: 80.00,
      tipo: "Banho",
      descricao: "Banho e tosa",
      dono_cpf: 55544433322,
      dono_nome: "Carlos Pereira",
    },
  ];
}

export default function ServicosPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Servico[]>([]);
  const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  // NOVOS STATES
  const [viewProductsOpen, setViewProductsOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);

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

  // NOVA FUNÇÃO
  const handleViewProducts = (servico: Servico) => {
    setServicoSelecionado(servico);
    setViewProductsOpen(true);
  };

  const columns = createColumns(handleEdit, handleViewProducts);

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
              <Button className="my-2" onClick={handleNew}>
                <Plus /> Agendar Novo
              </Button>
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

      <ProdutosUtilizadosNoServicoDialog
        open={viewProductsOpen}
        onClose={() => setViewProductsOpen(false)}
        servicoId={servicoSelecionado?.dono_cpf}
      />

    </SidebarProvider>
  );
}
