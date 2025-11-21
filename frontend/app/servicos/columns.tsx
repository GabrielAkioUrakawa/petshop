"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, MoreHorizontal, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Produto } from "../produtos/columns"

export type Servico = {
  servico_cpf: string
  funcionario_nome: string
  cliente_nome: string
  animal_nome: string
  data_hora: Date
  preco: number
  tipo: string
  descricao: string

  dono_cpf: number
  dono_nome: string
  produtos?: Produto[]
}

export function deleteServico(funcionario_nome: string, cliente_nome: string, animal_nome: string) {
  console.log(`Excluindo serviço do funcionário ${funcionario_nome} para cliente ${cliente_nome} e animal ${animal_nome}`);
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export function createColumns(
  onEdit?: (servico: Servico) => void,
  onViewProducts?: (servico: Servico) => void
): ColumnDef<Servico>[] {
  return [
    {
      accessorKey: "funcionario_nome",
      header: "Funcionário",
    },
    {
      accessorKey: "cliente_nome",
      header: "Cliente",
    },
    {
      accessorKey: "animal_nome",
      header: "Animal",
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
      accessorKey: "preco",
      header: "Preço",
      cell: (info) => {
        const value = info.getValue() as number;
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
      },
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const servico = row.original
 
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

              <DropdownMenuItem onClick={() => onViewProducts?.(servico)}>
                Ver Produtos
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onEdit?.(servico)}>
                Alterar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-500"
                onClick={() =>
                  deleteServico(
                    servico.funcionario_nome,
                    servico.cliente_nome,
                    servico.animal_nome
                  )
                }
              >
                <Trash className="text-red-500" />
                Excluir
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

export const columns = createColumns()
