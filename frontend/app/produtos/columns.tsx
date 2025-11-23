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

export type Produto = {
  id_produto: number
  qtde_minima: number
  qtde_estoque: number
  descricao: string
  categoria: string
  preco_venda: number
}

export function deleteProduto(id_produto: number) {
  return api(`/produto/${id_produto}`, {
    method: "DELETE",
  });
}

export function createColumns(onEdit?: (produto: Produto) => void): ColumnDef<Produto>[] {
  return [
    {
      accessorKey: "id_produto",
      header: "ID",
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
    },
    {
      accessorKey: "categoria",
      header: "Categoria",
    },
    {
      accessorKey: "qtde_minima",
      header: "Qtde Mínima",
    },
    {
      accessorKey: "qtde_estoque",
      header: "Qtde Estoque",
    },
    {
      accessorKey: "preco_venda",
      header: "Preço Venda",
      cell: (info) => {
        const value = info.getValue() as number;
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const produto = row.original
 
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
                onClick={() => onEdit?.(produto)}
              >
                Alterar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => deleteProduto(produto.id_produto)}><Trash className="text-red-500"></Trash>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()