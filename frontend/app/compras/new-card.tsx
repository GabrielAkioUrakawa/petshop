import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
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
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Compra } from "./columns"
import { Produto } from "../produtos/columns"
import { Fornecedor } from "../fornecedores/columns"

async function criarCompraApi(data) {
  console.log("Enviando compra para API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

async function alterarCompraApi(data) {
  console.log("Alterando compra na API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

async function buscarProdutosApi(): Promise<Produto[]> {
  // TODO: Substituir por chamada real da API
  console.log("Buscando produtos da API...")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          qtde_minima: 10,
          qtde_estoque: 50,
          descricao: "Ração Premium para Cães",
          categoria: "Alimentação",
          preco_venda: 89.90,
        },
        {
          id: 2,
          qtde_minima: 5,
          qtde_estoque: 30,
          descricao: "Shampoo para Gatos",
          categoria: "Higiene",
          preco_venda: 24.90,
        },
        {
          id: 3,
          qtde_minima: 8,
          qtde_estoque: 25,
          descricao: "Brinquedo Interativo",
          categoria: "Brinquedos",
          preco_venda: 45.00,
        },
        {
          id: 4,
          qtde_minima: 3,
          qtde_estoque: 15,
          descricao: "Coleira Ajustável",
          categoria: "Acessórios",
          preco_venda: 35.50,
        },
      ])
    }, 500)
  })
}

async function buscarFornecedoresApi(): Promise<Fornecedor[]> {
  // TODO: Substituir por chamada real da API
  console.log("Buscando fornecedores da API...")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          cnpj: 12345678000190,
          nome: "PetShop Supplies LTDA",
          email: "contato@petshopsupplies.com.br",
          telefone: "(11) 3456-7890",
          categoria: "Alimentação",
        },
        {
          cnpj: 98765432000110,
          nome: "Brinquedos Pet S.A.",
          email: "vendas@brinquedospet.com.br",
          telefone: "(21) 2345-6789",
          categoria: "Brinquedos",
        },
        {
          cnpj: 55544433000122,
          nome: "Higiene Animal ME",
          email: "comercial@higieneanimal.com.br",
          telefone: "(31) 3456-7890",
          categoria: "Higiene",
        },
      ])
    }, 500)
  })
}

async function buscarPrecoCompraApi(idProduto: number): Promise<number> {
  // TODO: Substituir por chamada real da API
  console.log(`Buscando preço de compra para produto ${idProduto}...`)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulando preços de compra (geralmente menores que preço de venda)
      const precosCompra: Record<number, number> = {
        1: 65.00,  // Ração Premium
        2: 18.00,  // Shampoo
        3: 32.00,  // Brinquedo
        4: 25.00,  // Coleira
      }
      resolve(precosCompra[idProduto] || 0)
    }, 300)
  })
}

const getInitialFormData = (compra: Compra | null | undefined) => {
  if (compra) {
    return {
      id_produto: compra.id_produto.toString(),
      cnpj_fornecedor: compra.cnpj_fornecedor.toString(),
      quantidade: compra.quantidade.toString(),
      preco_compra: compra.preco_compra.toString(),
    }
  }
  return {
    id_produto: "",
    cnpj_fornecedor: "",
    quantidade: "",
    preco_compra: "",
  }
}

export default function NewCompraPopup({ open, onClose, compra, isEditing = false }: { open: boolean; onClose?: () => void; compra?: Compra | null; isEditing?: boolean }) {
  const [formData, setFormData] = useState(() => getInitialFormData(compra))
  const [loading, setLoading] = useState(false)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [loadingProdutos, setLoadingProdutos] = useState(false)
  const [loadingFornecedores, setLoadingFornecedores] = useState(false)

  // Carregar produtos e fornecedores quando o popup abrir
  useEffect(() => {
    if (!open) return

    let cancelled = false

    async function loadData() {
      setLoadingProdutos(true)
      setLoadingFornecedores(true)
      
      try {
        const [produtosData, fornecedoresData] = await Promise.all([
          buscarProdutosApi(),
          buscarFornecedoresApi(),
        ])
        
        if (!cancelled) {
          setProdutos(produtosData)
          setFornecedores(fornecedoresData)
        }
      } finally {
        if (!cancelled) {
          setLoadingProdutos(false)
          setLoadingFornecedores(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [open])

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!formData.id_produto || !formData.cnpj_fornecedor) {
      return
    }
    
    setLoading(true)

    const data = {
      id_produto: Number(formData.id_produto),
      cnpj_fornecedor: Number(formData.cnpj_fornecedor),
      quantidade: Number(formData.quantidade),
      preco_compra: Number(formData.preco_compra),
    }

    if (isEditing) {
      await alterarCompraApi(data)
    } else {
      await criarCompraApi(data)
    }

    setLoading(false)
    onClose?.()
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Preencher preço de compra automaticamente quando um produto for selecionado
  useEffect(() => {
    if (!formData.id_produto) return

    let cancelled = false

    async function loadPrecoCompra() {
      const idProduto = Number(formData.id_produto)
      if (!idProduto) return

      try {
        const preco = await buscarPrecoCompraApi(idProduto)
        if (!cancelled && preco > 0) {
          setFormData(prev => ({ ...prev, preco_compra: preco.toFixed(2) }))
        }
      } catch (error) {
        console.error("Erro ao buscar preço de compra:", error)
      }
    }

    loadPrecoCompra()

    return () => {
      cancelled = true
    }
  }, [formData.id_produto])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Alterar Compra" : "Registrar Nova Compra"}</CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}><X /></Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <form id="form-nova-compra" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">

                    <div className="grid gap-2">
                      <Label htmlFor="id_produto">Produto</Label>
                      <Select
                        value={formData.id_produto || undefined}
                        onValueChange={(value) => handleChange("id_produto", value)}
                        disabled={loadingProdutos}
                      >
                        <SelectTrigger id="id_produto" className="w-full">
                          <SelectValue placeholder={loadingProdutos ? "Carregando produtos..." : "Selecione um produto"} />
                        </SelectTrigger>
                        <SelectContent>
                          {produtos.map((produto) => (
                            <SelectItem key={produto.id} value={produto.id.toString()}>
                              {produto.id} - {produto.descricao} ({produto.categoria})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cnpj_fornecedor">Fornecedor</Label>
                      <Select
                        value={formData.cnpj_fornecedor || undefined}
                        onValueChange={(value) => handleChange("cnpj_fornecedor", value)}
                        disabled={loadingFornecedores}
                      >
                        <SelectTrigger id="cnpj_fornecedor" className="w-full">
                          <SelectValue placeholder={loadingFornecedores ? "Carregando fornecedores..." : "Selecione um fornecedor"} />
                        </SelectTrigger>
                        <SelectContent>
                          {fornecedores.map((fornecedor) => (
                            <SelectItem key={fornecedor.cnpj} value={fornecedor.cnpj.toString()}>
                              {fornecedor.cnpj} - {fornecedor.nome} ({fornecedor.categoria})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="quantidade">Quantidade</Label>
                      <Input
                        id="quantidade"
                        type="number"
                        required
                        min="1"
                        value={formData.quantidade}
                        onChange={(e) => handleChange("quantidade", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="preco_compra">Preço Unitário</Label>
                      <Input
                        id="preco_compra"
                        type="number"
                        step="0.01"
                        required
                        min="0"
                        value={formData.preco_compra}
                        onChange={(e) => handleChange("preco_compra", e.target.value)}
                      />
                    </div>

                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="form-nova-compra"
                  className="w-full"
                  disabled={loading}
                >
                  {loading 
                    ? (isEditing ? "Alterando..." : "Registrando...") 
                    : (isEditing ? "Alterar" : "Registrar")
                  }
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

