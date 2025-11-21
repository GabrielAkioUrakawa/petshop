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


export type Funcionario = {
  cpf: number
  nome: string
  email: string
  telefone: string
  endereco: string
  especialidade: string

  qtd_servicos: number
}

export function deleteFuncionario(cpf) {
  console.log(`Excluindo funcionário com CPF: ${cpf}`);
  return new Promise((resolve) => setTimeout(resolve, 800));
}


export function createColumns(onEdit?: (funcionario: Funcionario) => void): ColumnDef<Funcionario>[] {
  return [
    {
      accessorKey: "cpf",
      header: "CPF",
    },
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
    },
    {
      accessorKey: "endereco",
      header: "Endereço",
    },
    {
      accessorKey: "qtd_servicos",
      header: "Serviços Realizados",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const funcionario = row.original
 
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit?.(funcionario)}
              >
                Alterar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => deleteFuncionario(funcionario.cpf)}><Trash className="text-red-500"></Trash>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()