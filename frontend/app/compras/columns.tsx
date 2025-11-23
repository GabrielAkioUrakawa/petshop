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

export type Compra = {
  id_lote: number
  id_produto: number
  nome_produto: string
  cnpj_fornecedor: number
  nome_fornecedor: string
  quantidade: number
  preco_compra: number
}

export function deleteCompra(id_lote: number) {
  console.log(`Excluindo compra com ID lote: ${id_lote}`);
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export function createColumns(onEdit?: (compra: Compra) => void): ColumnDef<Compra>[] {
  return [
    {
      accessorKey: "id_lote",
      header: "ID",
    },
    {
      accessorKey: "id_produto",
      header: "ID Produto",
    },
    {
      accessorKey: "descricao",
      header: "Nome Produto",
    },
    {
      accessorKey: "cnpj",
      header: "CNPJ Fornecedor",
    },
    {
      accessorKey: "nome_fornecedor",
      header: "Nome Fornecedor",
    },
    {
      accessorKey: "preco_compra",
      header: "Preço Unitário",
      cell: (info) => {
        const value = info.getValue() as number;
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
      },
    },
    {
      accessorKey: "quantidade",
      header: "Quantidade",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const compra = row.original
 
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
                onClick={() => onEdit?.(compra)}
              >
                Alterar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => deleteCompra(compra.id_lote)}><Trash className="text-red-500"></Trash>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()