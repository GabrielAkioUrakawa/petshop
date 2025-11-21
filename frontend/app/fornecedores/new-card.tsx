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
import { Fornecedor } from "./columns"

async function criarFornecedorApi(data) {
  console.log("Enviando fornecedor para API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

async function alterarFornecedorApi(data) {
  console.log("Alterando fornecedor na API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

const getInitialFormData = (fornecedor) => {
  if (fornecedor) {
    return {
      cnpj: fornecedor.cnpj.toString(),
      nome: fornecedor.nome,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      categoria: fornecedor.categoria,
    }
  }
  return {
    cnpj: "",
    nome: "",
    email: "",
    telefone: "",
    categoria: "",
  }
}

export default function NewFornecedorPopup({ open, onClose, fornecedor, isEditing = false }) {
  const [formData, setFormData] = useState(() => getInitialFormData(fornecedor))
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      cnpj: Number(formData.cnpj),
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      categoria: formData.categoria,
    }

    if (isEditing) {
      await alterarFornecedorApi(data)
    } else {
      await criarFornecedorApi(data)
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
                <CardTitle>{isEditing ? "Alterar Fornecedor" : "Novo Fornecedor"}</CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}><X /></Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <form id="form-novo-fornecedor" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">

                    <div className="grid gap-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        type="number"
                        required
                        value={formData.cnpj}
                        onChange={(e) => handleChange("cnpj", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="exemplo@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        type="text"
                        required
                        value={formData.telefone}
                        onChange={(e) => handleChange("telefone", e.target.value)}
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

                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="form-novo-fornecedor"
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

