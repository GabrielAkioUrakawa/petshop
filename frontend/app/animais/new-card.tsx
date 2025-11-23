/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Animal } from "./columns"
import { Cliente } from "../clientes/columns"
import { api } from "@/lib/api"

async function criarAnimalApi(data) {
  console.log("Criando animal...", data)
  const response = await api("/animal", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response as any
}

async function alterarAnimalApi(data) {
  const response = await api(`/animal/${data.nome}/${data.dono_cpf}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  return response as any
}

async function buscarClientesApi() {
  const response = await api("/cliente")
  return response as any
}

const getInitialFormData = (animal: Animal | null | undefined) => {
  if (animal) {
    return {
      nome: animal.nome,
      raca: animal.raca,
      especie: animal.especie,
      sexo: animal.sexo,
      peso: animal.peso.toString(),
      data_nascimento: animal.data_nascimento 
        ? new Date(animal.data_nascimento).toISOString().split('T')[0]
        : "",
      dono_cpf: animal.dono_cpf.toString(),
    }
  }
  return {
    nome: "",
    raca: "",
    especie: "",
    sexo: "",
    peso: "",
    data_nascimento: "",
    dono_cpf: "",
  }
}

export default function NewAnimalPopup({ open, onClose, animal, isEditing = false }: { open: boolean; onClose?: () => void; animal?: Animal | null; isEditing?: boolean }) {
  const [formData, setFormData] = useState(() => getInitialFormData(animal))
  const [loading, setLoading] = useState(false)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loadingClientes, setLoadingClientes] = useState(false)

  useEffect(() => {
    if (!open) return

    let cancelled = false

    async function loadClientes() {
      setLoadingClientes(true)
      try {
        const data = await buscarClientesApi()
        if (!cancelled) {
          setClientes(data)
        }
      } finally {
        if (!cancelled) {
          setLoadingClientes(false)
        }
      }
    }

    loadClientes()

    return () => {
      cancelled = true
    }
  }, [open])

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!formData.dono_cpf) {
      return
    }
    
    setLoading(true)

    const data = {
      donoCpf: formData.dono_cpf,
      nome: formData.nome,
      raca: formData.raca,
      especie: formData.especie,
      sexo: formData.sexo,
      peso: Number(formData.peso),
      dataNascimento: new Date(formData.data_nascimento).toISOString(),
    }

    if (isEditing) {
      await alterarAnimalApi(data)
    } else {
      await criarAnimalApi(data)
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
                <CardTitle>{isEditing ? "Alterar Animal" : "Novo Animal"}</CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}><X /></Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <form id="form-novo-animal" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">

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
                      <Label htmlFor="raca">Raça</Label>
                      <Input
                        id="raca"
                        type="text"
                        required
                        value={formData.raca}
                        onChange={(e) => handleChange("raca", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="especie">Espécie</Label>
                      <Input
                        id="especie"
                        type="text"
                        required
                        value={formData.especie}
                        onChange={(e) => handleChange("especie", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sexo">Sexo</Label>
                      <Input
                        id="sexo"
                        type="text"
                        required
                        value={formData.sexo}
                        onChange={(e) => handleChange("sexo", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="peso">Peso (kg)</Label>
                      <Input
                        id="peso"
                        type="number"
                        step="0.1"
                        required
                        value={formData.peso}
                        onChange={(e) => handleChange("peso", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                      <Input
                        id="data_nascimento"
                        type="date"
                        required
                        value={formData.data_nascimento}
                        onChange={(e) => handleChange("data_nascimento", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="dono_cpf">Dono</Label>
                      <Select
                        value={formData.dono_cpf || undefined}
                        onValueChange={(value) => handleChange("dono_cpf", value)}
                        disabled={loadingClientes}
                      >
                        <SelectTrigger id="dono_cpf" className="w-full">
                          <SelectValue placeholder={loadingClientes ? "Carregando clientes..." : "Selecione um cliente"} />
                        </SelectTrigger>
                        <SelectContent>
                          {clientes.map((cliente) => (
                            <SelectItem key={cliente.cpf} value={cliente.cpf.toString()}>
                              {cliente.cpf} - {cliente.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="form-novo-animal"
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

