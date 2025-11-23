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

export type Venda = {
  id_compra: string
  data_hora: Date
  cpf_cliente: number
  meio: string
  parcela: number
  status: string
}

export function deleteVenda(id: string) {
  console.log(`Excluindo venda com ID: ${id}`);
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export function createColumns(onEdit?: (venda: Venda) => void): ColumnDef<Venda>[] {
  return [
    {
      accessorKey: "id_compra",
      header: "ID",
    },
    {
      accessorKey: "data_hora",
      header: "Data e Hora",
      cell: (info) =>
        info.getValue()
          ? new Date(info.getValue() as string | Date).toLocaleString("pt-BR")
          : "",
    },
    {
      accessorKey: "cpf_cliente",
      header: "CPF Cliente",
    },
    {
      accessorKey: "nome_cliente",
      header: "Nome Cliente",
    },
    {
      accessorKey: "forma_pagamento",
      header: "Meio de Pagamento",
    },
    {
      accessorKey: "total_produtos_adquiridos",
      header: "Qtde Itens",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const venda = row.original
 
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
                onClick={() => onEdit?.(venda)}
              >
                Alterar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => deleteVenda(venda.id_compra)}><Trash className="text-red-500"></Trash>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()