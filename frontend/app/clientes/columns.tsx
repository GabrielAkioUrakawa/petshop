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

export type Cliente = {
  cpf: number
  nome: string
  email: string
  telefone: string
  endereco: string
  data_cadastro: Date
}

export function deleteCliente(cpf) {
  return api(`/cliente/${cpf}`, {
    method: "DELETE",
  });
}

export function createColumns(onEdit?: (cliente: Cliente) => void): ColumnDef<Cliente>[] {
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
      accessorKey: "data_cadastro",
      header: "Data de Cadastro",
      cell: (info) =>
        info.getValue()
          ? new Date(info.getValue() as string | Date).toLocaleDateString("pt-BR")
          : "",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const cliente = row.original
 
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
                onClick={() => onEdit?.(cliente)}
              >
                Alterar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => deleteCliente(cliente.cpf)}><Trash className="text-red-500"></Trash>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()