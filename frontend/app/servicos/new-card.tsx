/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Servico } from "./columns";
import { Funcionario } from "../profissionais/columns";
import { Cliente } from "../clientes/columns";
import { Animal } from "../animais/columns";
import { Produto } from "../produtos/columns";
import { api } from "@/lib/api";

async function criarServicoApi(data) {
  const response = await api("/servico", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response as any
}

async function alterarServicoApi(data) {
  const response = await api(`/servico/${data.servicoCpf}/${data.dataHora}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
  return response as any
}

async function buscarFuncionariosApi() {
  const response = await api("/funcionario")
  return response as any
}
         

async function buscarClientesApi() {
  const response = await api("/cliente")
  return response as any
}

async function buscarAnimaisApi(donoCpf?: string) {
  const response = await api(`/animal/by-cliente/${donoCpf}`)
  return response as any
}

async function buscarProdutosApi(){
  const response = await api("/produto")
  return response as any
}

const getInitialFormData = (servico) => {
  if (servico) {
    return {
      funcionario_cpf: servico.servico_cpf,
      funcionario_nome: servico.funcionario_nome,
      cliente_cpf: servico.animal_cpf,
      cliente_nome: servico.cliente_nome,
      animal_nome: servico.animal_nome,
      produto_id: "",
      data_hora: servico.data_hora
        ? new Date(servico.data_hora).toISOString().slice(0, 16)
        : "",
      preco: servico.preco.toString(),
      tipo: servico.tipo,
      descricao: servico.descricao,
    };
  }
  return {
    funcionario_cpf: "",
    funcionario_nome: "",
    cliente_cpf: "",
    cliente_nome: "",
    animal_nome: "",
    dono_cpf: "",
    produto_id: "",
    data_hora: "",
    preco: "",
    tipo: "",
    descricao: "",
  };
};

export default function NewServicoPopup({
  open,
  onClose,
  servico,
  isEditing = false,
}: {
  open: boolean;
  onClose?: () => void;
  servico?: Servico | null;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState(() => getInitialFormData(servico));
  const [loading, setLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loadingFuncionarios, setLoadingFuncionarios] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [loadingAnimais, setLoadingAnimais] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);

  const [produtosLista, setProdutosLista] = useState<
    { id: number | null; quantidade: number }[]
  >([]);

  function addProduto() {
    setProdutosLista((prev) => [...prev, { id: null, quantidade: 1 }]);
  }

  function removeProduto(index: number) {
    setProdutosLista((prev) => prev.filter((_, i) => i !== index));
  }

  function updateProduto(index: number, field: "id" | "quantidade", value) {
    setProdutosLista((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  // Carregar funcionários, clientes e produtos quando o popup abrir
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function loadData() {
      setLoadingFuncionarios(true);
      setLoadingClientes(true);
      setLoadingProdutos(true);

      try {
        const [funcData, clientesData, produtosData] = await Promise.all([
          buscarFuncionariosApi(),
          buscarClientesApi(),
          buscarProdutosApi(),
        ]);

        if (!cancelled) {
          setFuncionarios(funcData);
          setClientes(clientesData);
          setProdutos(produtosData);
        }
      } finally {
        if (!cancelled) {
          setLoadingFuncionarios(false);
          setLoadingClientes(false);
          setLoadingProdutos(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [open]);

  // Carregar animais quando o cliente for selecionado
  useEffect(() => {
    if (!formData.cliente_cpf || !open) {
      setAnimais([]);
      return;
    }

    let cancelled = false;

    async function loadAnimais() {
      setLoadingAnimais(true);
      try {
        const donoCpf = formData.cliente_cpf;
        const data = await buscarAnimaisApi(donoCpf);
        if (!cancelled) {
          setAnimais(data);
        }
      } finally {
        if (!cancelled) {
          setLoadingAnimais(false);
        }
      }
    }

    loadAnimais();

    return () => {
      cancelled = true;
    };
  }, [formData.cliente_cpf, open]);

  async function handleSubmit(e) {
  e.preventDefault();

  if (
    !formData.funcionario_cpf ||
    !formData.cliente_cpf ||
    !formData.animal_nome
  ) {
    return;
  }

  setLoading(true);

  // Produtos formatados conforme o backend espera
  const produtosFormatados = produtosLista
    .filter((p) => p.id !== null)
    .map((p) => {
      const produto = produtos.find((prod) => prod.id_produto === p.id);

      return {
        idProduto: p.id,
        quantidade: p.quantidade,
        precoUnitario: produto?.preco_venda ?? 0,
        idCompra: 0, 
      };
    });

  const data = {
    servicoCpf: formData.cliente_cpf,                
    funcionarioCpf: formData.funcionario_cpf,        
    dataHora: formData.data_hora.replace("T", " ") + ":00",
    preco: Number(formData.preco),
    tipo: formData.tipo,
    descricao: formData.descricao,
    animalNome: formData.animal_nome,
    animalCpf: formData.cliente_cpf,                
    produtos: produtosFormatados.length > 0 ? produtosFormatados : undefined,
  };

  if (isEditing) {
    await alterarServicoApi(data);
  } else {
    await criarServicoApi(data);
  }

  setLoading(false);
  onClose?.();
}


  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Quando o cliente mudar, limpar o animal selecionado
      if (field === "cliente_cpf") {
        newData.animal_nome = "";
      }

      return newData;
    });
  };

  // Agrupar funcionários por especialidade
  const funcionariosPorEspecialidade = funcionarios.reduce((acc, func) => {
    if (!acc[func.especialidade]) {
      acc[func.especialidade] = [];
    }
    acc[func.especialidade].push(func);
    return acc;
  }, {} as Record<string, Funcionario[]>);

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
            className="w-full max-w-2xl max-h-[90vh]"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEditing ? "Alterar Serviço" : "Agendar Novo Serviço"}
                </CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}>
                    <X />
                  </Button>
                </CardAction>
              </CardHeader>

              <CardContent className="overflow-y-auto max-h-[70vh] pr-2">
                <form id="form-novo-servico" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="funcionario_cpf">Funcionário</Label>
                      <Select
                        value={formData.funcionario_cpf || undefined}
                        onValueChange={(value) =>
                          handleChange("funcionario_cpf", value)
                        }
                        disabled={loadingFuncionarios}
                      >
                        <SelectTrigger id="funcionario_cpf" className="w-full">
                          <SelectValue
                            placeholder={
                              loadingFuncionarios
                                ? "Carregando funcionários..."
                                : "Selecione um funcionário"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(funcionariosPorEspecialidade).map(
                            ([especialidade, funcs]) => (
                              <SelectGroup key={especialidade}>
                                <SelectLabel>{especialidade}</SelectLabel>
                                {funcs.map((func) => (
                                  <SelectItem
                                    key={func.cpf}
                                    value={func.cpf.toString()}
                                  >
                                    {func.nome} - {func.especialidade}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cliente_cpf">Cliente</Label>
                      <Select
                        value={formData.cliente_cpf || undefined}
                        onValueChange={(value) =>
                          handleChange("cliente_cpf", value)
                        }
                        disabled={loadingClientes}
                      >
                        <SelectTrigger id="cliente_cpf" className="w-full">
                          <SelectValue
                            placeholder={
                              loadingClientes
                                ? "Carregando clientes..."
                                : "Selecione um cliente"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {clientes.map((cliente) => (
                            <SelectItem
                              key={cliente.cpf}
                              value={cliente.cpf.toString()}
                            >
                              {cliente.cpf} - {cliente.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="animal_nome">Animal</Label>
                      <Select
                        value={formData.animal_nome || undefined}
                        onValueChange={(value) =>
                          handleChange("animal_nome", value)
                        }
                        disabled={loadingAnimais || !formData.cliente_cpf}
                      >
                        <SelectTrigger id="animal_nome" className="w-full">
                          <SelectValue
                            placeholder={
                              !formData.cliente_cpf
                                ? "Selecione um cliente primeiro"
                                : loadingAnimais
                                ? "Carregando animais..."
                                : "Selecione um animal"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {animais.map((animal) => (
                            <SelectItem
                              key={`${animal.nome}-${animal.dono_cpf}`}
                              value={animal.nome}
                            >
                              {animal.nome} - {animal.raca} ({animal.especie})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="data_hora">Data e Hora</Label>
                      <Input
                        id="data_hora"
                        type="datetime-local"
                        required
                        value={formData.data_hora}
                        onChange={(e) =>
                          handleChange("data_hora", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="preco">Preço</Label>
                      <Input
                        id="preco"
                        type="number"
                        step="0.01"
                        required
                        min="0"
                        value={formData.preco}
                        onChange={(e) => handleChange("preco", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="tipo">Tipo</Label>
                      <Input
                        id="tipo"
                        type="text"
                        required
                        value={formData.tipo}
                        onChange={(e) => handleChange("tipo", e.target.value)}
                      />
                    </div>

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
                                <SelectItem key={p.id_produto} value={p.id_produto.toString()}>
                                  {p.id_produto} - {p.descricao} (R$ {p.preco_venda})
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
                              updateProduto(
                                index,
                                "quantidade",
                                Number(e.target.value)
                              )
                            }
                          />

                          <Trash2
                            className="cursor-pointer text-red-500"
                            onClick={() => removeProduto(index)}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addProduto}
                      >
                        + Adicionar Produto
                      </Button>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Input
                        id="descricao"
                        type="text"
                        required
                        value={formData.descricao}
                        onChange={(e) =>
                          handleChange("descricao", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="form-novo-servico"
                  className="w-full"
                  disabled={loading}
                >
                  {loading
                    ? isEditing
                      ? "Alterando..."
                      : "Agendando..."
                    : isEditing
                    ? "Alterar"
                    : "Agendar"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
