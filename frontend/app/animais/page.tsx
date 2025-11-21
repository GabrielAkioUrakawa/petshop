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

async function getData(): Promise<Animal[]> {
  // Fetch data from your API here.
  return [
    {
      nome: "Rex",
      raca: "Labrador",
      especie: "Cão",
      sexo: "Macho",
      peso: 25.5,
      data_nascimento: new Date("2020-05-15"),
      dono_cpf: 12345678900,
      dono_nome: "João Silva",
    },
    {
      nome: "Luna",
      raca: "Persa",
      especie: "Gato",
      sexo: "Fêmea",
      peso: 4.2,
      data_nascimento: new Date("2021-08-20"),
      dono_cpf: 98765432100,
      dono_nome: "Maria Oliveira",
    },
  ];
}

export default function AnimaisPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Animal[]>([]);
  const [animalEditando, setAnimalEditando] = useState<Animal | null>(null);
  const [popupKey, setPopupKey] = useState(0);

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
        key={`${animalEditando?.nome || "new"}-${animalEditando?.dono_cpf || ""}-${popupKey}`}
        open={open} 
        onClose={handleClose}
        animal={animalEditando}
        isEditing={!!animalEditando}
      />
    </SidebarProvider>
  );
}
