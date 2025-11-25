"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { createColumns, Animal } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewAnimalPopup from "./new-card";
import { api } from "@/lib/api";
import AnimalDetalhes from "./details-card";

async function getData(): Promise<Animal[]> {
  const animais = await api("/animal") 
  return animais as Animal[];
}

export default function AnimaisPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Animal[]>([]);
  const [animalEditando, setAnimalEditando] = useState<Animal | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  const [viewProductsOpen, setViewProductsOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<Animal | null>(null);

  // Carrega dados quando a página monta
  useEffect(() => {
    getData().then(setData);
  }, []);

  const handleEdit = (animal: Animal) => {
    setAnimalEditando(animal);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnimalEditando(null);
  };

  const handleNew = () => {
    setAnimalEditando(null);
    setPopupKey(prev => prev + 1);
    setOpen(true);
  };

  const handleViewProducts = (servico: Animal) => {
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
              <h1 className="text-xl font-bold">Animais</h1>
              <Button className="my-2" onClick={handleNew}>
                <Plus /> Criar Novo
              </Button>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>

      <NewAnimalPopup 
        key={`${animalEditando?.nome || "new"}-${animalEditando?.animal_cpf || ""}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        animal={animalEditando}
        isEditing={!!animalEditando}
      />

      <AnimalDetalhes
        open={viewProductsOpen}
        onClose={() => setViewProductsOpen(false)}
        animalNome={servicoSelecionado?.nome}
        animalCpf={servicoSelecionado?.animal_cpf}
      />
    </SidebarProvider>
  );
}
