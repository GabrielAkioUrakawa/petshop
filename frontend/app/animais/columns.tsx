"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { api } from "@/lib/api"

export type Animal = {
  nome: string
  raca: string
  especie: string
  sexo: string
  peso: number
  data_nascimento: Date

  dono_cpf: string
}

export function deleteAnimal(nome: string, dono_cpf: string) {
  return api(`/animal/${nome}/${dono_cpf}`, {
    method: "DELETE",
  })
}

export function createColumns(onEdit?: (animal: Animal) => void,  onViewProducts?: (animal: Animal) => void): ColumnDef<Animal>[] {
  return [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "raca",
      header: "Raça",
    },
    {
      accessorKey: "especie",
      header: "Especie",
    },
    {
      accessorKey: "sexo",
      header: "Sexo",
    },
    {
      accessorKey: "peso",
      header: "Peso",
    },
    {
      accessorKey: "data_nascimento",
      header: "Data de Nascimento",
      cell: (info) =>
        info.getValue()
          ? new Date(info.getValue() as string | Date).toLocaleDateString("pt-BR")
          : "",
    },
    {
      accessorKey: "dono_cpf",
      header: "CPF do Dono",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const animal = row.original
 
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewProducts?.(animal)}>
                Ver Detalhes
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit?.(animal)}
              >
                Alterar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => deleteAnimal(animal.nome, animal.dono_cpf)}><Trash className="text-red-500"></Trash>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()