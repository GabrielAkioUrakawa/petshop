"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeftCircle, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import { Cliente } from "../../clientes/columns"
import { Produto } from "../../produtos/columns"
import { Servico } from "../../servicos/columns"

async function criarVendaApi(data) {
  console.log("Enviando venda para API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

async function buscarClientesApi(): Promise<Cliente[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { cpf: 123, nome: "João", email: "", telefone: "", endereco: "", data_cadastro: new Date() },
        { cpf: 987, nome: "Maria", email: "", telefone: "", endereco: "", data_cadastro: new Date() },
      ])
    }, 500)
  )
}

async function buscarProdutosApi(): Promise<Produto[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, descricao: "Ração Premium", preco_venda: 89.9, qtde_minima: 10, qtde_estoque: 50, categoria: "Alimentação" },
        { id: 2, descricao: "Shampoo Gatos", preco_venda: 24.9, qtde_minima: 5, qtde_estoque: 30, categoria: "Higiene" },
      ])
    }, 500)
  )
}

async function buscarServicosApi(): Promise<Servico[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          servico_cpf: "12A",
          funcionario_nome: "Ana Costa",
          cliente_nome: "Maria",
          animal_nome: "Rex",
          data_hora: new Date(),
          preco: 150,
          tipo: "Consulta",
          descricao: "Consulta completa",
          dono_cpf: 987,
          dono_nome: "Maria Oliveira",
        },
      ])
    }, 500)
  )
}

function getServicoKey(s: Servico) {
  const data = s.data_hora instanceof Date ? s.data_hora : new Date(s.data_hora)
  return `${s.funcionario_nome}-${s.cliente_nome}-${s.animal_nome}-${data.getTime()}`
}

export default function NovaVendaPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    data_hora: "",
    cpf_cliente: "",
    meio: "",
    parcela: "1",
    status: "",
  })

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])

  const [loading, setLoading] = useState(false)

  // LISTAS DINÂMICAS
  const [produtosLista, setProdutosLista] = useState<
    { id: number | null; quantidade: number }[]
  >([])

  const [servicosLista, setServicosLista] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      const [c, p, s] = await Promise.all([
        buscarClientesApi(),
        buscarProdutosApi(),
        buscarServicosApi(),
      ])
      setClientes(c)
      setProdutos(p)
      setServicos(s)
    }
    load()
  }, [])

  function addProduto() {
    setProdutosLista((prev) => [...prev, { id: null, quantidade: 1 }])
  }

  function removeProduto(index: number) {
    setProdutosLista((prev) => prev.filter((_, i) => i !== index))
  }

  function updateProduto(index: number, field: "id" | "quantidade", value) {
    setProdutosLista((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    )
  }

  function addServico() {
    setServicosLista((prev) => [...prev, ""])
  }

  function updateServico(index: number, value: string) {
    setServicosLista((prev) => prev.map((v, i) => (i === index ? value : v)))
  }

  function removeServico(index: number) {
    setServicosLista((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await criarVendaApi({
      ...formData,
      cpf_cliente: Number(formData.cpf_cliente),
      data_hora: new Date(formData.data_hora),
      parcela: Number(formData.parcela),

      produtos: produtosLista
        .filter((p) => p.id !== null)
        .map((p) => ({ id: p.id, quantidade: p.quantidade })),

      servicos: servicosLista.filter((x) => x !== ""),
    })

    router.push("/vendas")
  }

  return (
    <div className="w-full flex justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <div
              className="flex items-center gap-2 text-sm cursor-pointer mb-3 text-muted-foreground"
              onClick={() => router.push("/vendas")}
            >
              <ArrowLeftCircle size={18} />
              Voltar
            </div>
            <CardTitle>Registrar Nova Venda</CardTitle>
          </CardHeader>

          <CardContent>
            <form id="form-venda" onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Data e Hora</Label>
                <Input
                  type="datetime-local"
                  value={formData.data_hora}
                  onChange={(e) =>
                    setFormData({ ...formData, data_hora: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Cliente</Label>
                <Select
                  value={formData.cpf_cliente}
                  onValueChange={(v) => setFormData({ ...formData, cpf_cliente: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map((c) => (
                      <SelectItem key={c.cpf} value={c.cpf.toString()}>
                        {c.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ---------------- PRODUTOS ---------------- */}
              <div className="flex flex-col gap-3">
                <Label>Produtos</Label>

                {produtosLista.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Select
                      value={item.id?.toString()}
                      onValueChange={(v) =>
                        updateProduto(index, "id", Number(v))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {produtos.map((p) => (
                          <SelectItem key={p.id} value={p.id.toString()}>
                            {p.descricao} (R$ {p.preco_venda})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      className="w-20"
                      min={1}
                      value={item.quantidade}
                      onChange={(e) =>
                        updateProduto(index, "quantidade", Number(e.target.value))
                      }
                    />

                    <Trash2
                      className="cursor-pointer text-red-500"
                      onClick={() => removeProduto(index)}
                    />
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addProduto}>
                  + Adicionar Produto
                </Button>
              </div>

              {/* ---------------- SERVIÇOS ---------------- */}
              <div className="flex flex-col gap-3">
                <Label>Serviços</Label>

                {servicosLista.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Select
                      value={item}
                      onValueChange={(v) => updateServico(index, v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {servicos.map((s) => (
                          <SelectItem key={getServicoKey(s)} value={getServicoKey(s)}>
                            {s.tipo} - {s.animal_nome} (R$ {s.preco})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Trash2
                      className="cursor-pointer text-red-500"
                      onClick={() => removeServico(index)}
                    />
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addServico}>
                  + Adicionar Serviço
                </Button>
              </div>

              {/* ---------------- OUTROS CAMPOS ---------------- */}
              <div className="grid gap-2">
                <Label>Meio de Pagamento</Label>
                <Input
                  value={formData.meio}
                  onChange={(e) => setFormData({ ...formData, meio: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Parcelas</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.parcela}
                  onChange={(e) => setFormData({ ...formData, parcela: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Input
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                />
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              form="form-venda"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Venda"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
