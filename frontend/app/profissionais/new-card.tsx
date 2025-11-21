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

async function criarFuncionarioApi(data) {
  console.log("Enviando funcionário para API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

async function alterarFuncionarioApi(data) {
  console.log("Alterando funcionário na API...", data)
  return new Promise((resolve) => setTimeout(resolve, 1500))
}

const getInitialFormData = (funcionario) => {
  if (funcionario) {
    return {
      cpf: funcionario.cpf.toString(),
      nome: funcionario.nome,
      email: funcionario.email,
      telefone: funcionario.telefone,
      endereco: funcionario.endereco,
      especialidade: funcionario.especialidade,
    }
  }
  return {
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    especialidade: "",
  }
}

export default function NewFuncionarioPopup({ open, onClose, funcionario, isEditing = false }) {
  const [formData, setFormData] = useState(() => getInitialFormData(funcionario))
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
      especialidade: formData.especialidade,
    }

    if (isEditing) {
      await alterarFuncionarioApi(data)
    } else {
      await criarFuncionarioApi(data)
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
                <CardTitle>{isEditing ? "Alterar Funcionário" : "Novo Funcionário"}</CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}><X /></Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <form id="form-novo-funcionario" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">

                    <div className="grid gap-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        type="number"
                        required
                        value={formData.cpf}
                        onChange={(e) => handleChange("cpf", e.target.value)}
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
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        type="text"
                        required
                        value={formData.endereco}
                        onChange={(e) => handleChange("endereco", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="especialidade">Especialidade</Label>
                      <Input
                        id="especialidade"
                        type="text"
                        required
                        value={formData.especialidade}
                        onChange={(e) => handleChange("especialidade", e.target.value)}
                      />
                    </div>

                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="form-novo-funcionario"
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
