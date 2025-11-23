import { useState } from "react"
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
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Produto } from "./columns"
import { api } from "@/lib/api"

async function criarProdutoApi(data) {
  const novo = await api("/produto", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return novo;
}

async function alterarProdutoApi(data) {
  const atualizado = await api(`/produto/${data.id_produto}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
  return atualizado;
}

const getInitialFormData = (produto) => {
  if (produto) {
    return {
      id_produto: produto.id_produto,
      descricao: produto.descricao,
      categoria: produto.categoria,
      qtde_minima: produto.qtde_minima?.toString() ?? "",
      qtde_estoque: produto.qtde_estoque?.toString() ?? "",
      preco_venda: produto.preco_venda?.toString() ?? "",
      preco_compra: produto.preco_compra?.toString() ?? "",
      forn_cnpj: produto.forn_cnpj ?? null,
    }
  }
  return {
    id_produto: "",
    descricao: "",
    categoria: "",
    qtde_minima: "",
    qtde_estoque: "",
    preco_venda: "",
    preco_compra: "",
    forn_cnpj: null,
  }
}

export default function NewProdutoPopup({ open, onClose, produto, isEditing = false }) {
  const [formData, setFormData] = useState(() => getInitialFormData(produto))
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      id_produto: formData.id_produto,
      descricao: formData.descricao,
      categoria: formData.categoria,
      precoVenda: Number(formData.preco_venda),  
      precoCompra: Number(formData.preco_compra),
      qtdeEstoque: Number(formData.qtde_estoque),
      qtdeMinima: Number(formData.qtde_minima),
      fornCnpj: formData.forn_cnpj ?? null,
    }

    console.log(data)

    if (isEditing) {
      await alterarProdutoApi(data)
    } else {
      await criarProdutoApi(data)
    }

    setLoading(false)
    onClose?.()
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
            className="w-full max-w-sm"
          >
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Alterar Produto" : "Novo Produto"}</CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}><X /></Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <form id="form-novo-produto" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">

                    <div className="grid gap-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Input
                        id="descricao"
                        type="text"
                        required
                        value={formData.descricao}
                        onChange={(e) => handleChange("descricao", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="categoria">Categoria</Label>
                      <Input
                        id="categoria"
                        type="text"
                        required
                        value={formData.categoria}
                        onChange={(e) => handleChange("categoria", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="qtde_minima">Quantidade Mínima</Label>
                      <Input
                        id="qtde_minima"
                        type="number"
                        required
                        min="0"
                        value={formData.qtde_minima}
                        onChange={(e) => handleChange("qtde_minima", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="qtde_estoque">Quantidade em Estoque</Label>
                      <Input
                        id="qtde_estoque"
                        type="number"
                        required
                        min="0"
                        value={formData.qtde_estoque}
                        onChange={(e) => handleChange("qtde_estoque", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="preco_venda">Preço de Venda</Label>
                      <Input
                        id="preco_venda"
                        type="number"
                        step="0.01"
                        required
                        min="0"
                        value={formData.preco_venda}
                        onChange={(e) => handleChange("preco_venda", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="preco_compra">Preço de Compra</Label>
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
                  form="form-novo-produto"
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

