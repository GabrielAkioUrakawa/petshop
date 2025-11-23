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

export type Fornecedor = {
  cnpj: number
  nome: string
  email: string
  telefone: string
  categoria: string
}

export function deleteFornecedor(cnpj: number) {
  return api(`/fornecedor/${cnpj}`, {
    method: "DELETE",
  });
}

export function createColumns(onEdit?: (fornecedor: Fornecedor) => void): ColumnDef<Fornecedor>[] {
  return [
    {
      accessorKey: "cnpj",
      header: "CNPJ",
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
      accessorKey: "categoria",
      header: "Categoria",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const fornecedor = row.original
 
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
                onClick={() => onEdit?.(fornecedor)}
              >
                Alterar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => deleteFornecedor(fornecedor.cnpj)}><Trash className="text-red-500"></Trash>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()