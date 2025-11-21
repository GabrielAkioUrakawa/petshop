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
import { Cliente } from "./columns"

async function criarClienteApi(data) {
  console.log("Enviando cliente para API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

async function alterarClienteApi(data) {
  console.log("Alterando cliente na API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

const getInitialFormData = (cliente) => {
  if (cliente) {
    return {
      cpf: cliente.cpf.toString(),
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone || "",
      endereco: cliente.endereco,
    }
  }
  return {
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  }
}

export default function NewClientePopup({ open, onClose, cliente, isEditing = false }) {
  const [formData, setFormData] = useState(() => getInitialFormData(cliente))
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      cpf: Number(formData.cpf),
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      endereco: formData.endereco,
    }

    if (isEditing) {
      await alterarClienteApi(data)
    } else {
      await criarClienteApi(data)
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
                <CardTitle>{isEditing ? "Alterar Cliente" : "Novo Cliente"}</CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}><X /></Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form id="form-novo-cliente" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" type="number" required value={formData.cpf} onChange={(e) => handleChange("cpf", e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" type="text" required value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="exemplo@email.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" type="text" required value={formData.telefone} onChange={(e) => handleChange("telefone", e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input id="endereco" type="text" required value={formData.endereco} onChange={(e) => handleChange("endereco", e.target.value)} />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" form="form-novo-cliente" className="w-full" disabled={loading}>
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
