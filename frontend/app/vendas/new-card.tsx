import { useState, useEffect, useCallback } from "react";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Venda } from "./columns";
import { Cliente } from "../clientes/columns";
import { Produto } from "../produtos/columns";
import { Servico } from "../servicos/columns";

async function criarVendaApi(data) {
  console.log("Enviando venda para API...", data);
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

async function alterarVendaApi(data) {
  console.log("Alterando venda na API...", data);
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

async function buscarClientesApi(): Promise<Cliente[]> {
  // TODO: Substituir por chamada real da API
  console.log("Buscando clientes da API...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          cpf: 12345678900,
          nome: "João Silva",
          email: "joao.silva@email.com",
          telefone: "(11) 91234-5678",
          endereco: "Rua das Flores, 123, São Paulo, SP",
          data_cadastro: new Date("2023-11-20"),
        },
        {
          cpf: 98765432100,
          nome: "Maria Oliveira",
          email: "maria.oliveira@email.com",
          telefone: "(21) 99876-5432",
          endereco: "Av. Brasil, 456, Rio de Janeiro, RJ",
          data_cadastro: new Date("2024-01-15"),
        },
        {
          cpf: 55544433322,
          nome: "Carlos Pereira",
          email: "carlos.pereira@email.com",
          telefone: "(31) 93456-7890",
          endereco: "Praça Central, 789, Belo Horizonte, MG",
          data_cadastro: new Date("2024-03-07"),
        },
      ]);
    }, 500);
  });
}

async function buscarProdutosApi(): Promise<Produto[]> {
  // TODO: Substituir por chamada real da API
  console.log("Buscando produtos da API...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          qtde_minima: 10,
          qtde_estoque: 50,
          descricao: "Ração Premium para Cães",
          categoria: "Alimentação",
          preco_venda: 89.9,
        },
        {
          id: 2,
          qtde_minima: 5,
          qtde_estoque: 30,
          descricao: "Shampoo para Gatos",
          categoria: "Higiene",
          preco_venda: 24.9,
        },
        {
          id: 3,
          qtde_minima: 8,
          qtde_estoque: 25,
          descricao: "Brinquedo Interativo",
          categoria: "Brinquedos",
          preco_venda: 45.0,
        },
        {
          id: 4,
          qtde_minima: 3,
          qtde_estoque: 15,
          descricao: "Coleira Ajustável",
          categoria: "Acessórios",
          preco_venda: 35.5,
        },
      ]);
    }, 500);
  });
}

async function buscarServicosApi(): Promise<Servico[]> {
  // TODO: Substituir por chamada real da API
  console.log("Buscando serviços da API...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          funcionario_nome: "João Silva",
          cliente_nome: "Maria Oliveira",
          animal_nome: "Rex",
          data_hora: new Date("2024-01-15T10:00:00"),
          preco: 150.0,
          tipo: "Consulta",
          descricao: "Consulta veterinária completa",
          dono_cpf: 98765432100,
          dono_nome: "Maria Oliveira",
        },
        {
          funcionario_nome: "Carlos Pereira",
          cliente_nome: "João Silva",
          animal_nome: "Luna",
          data_hora: new Date("2024-01-16T14:30:00"),
          preco: 80.0,
          tipo: "Tosa",
          descricao: "Tosa completa",
          dono_cpf: 12345678900,
          dono_nome: "João Silva",
        },
        {
          funcionario_nome: "Ana Costa",
          cliente_nome: "Carlos Pereira",
          animal_nome: "Thor",
          data_hora: new Date("2024-01-17T09:00:00"),
          preco: 120.0,
          tipo: "Banho",
          descricao: "Banho e secagem",
          dono_cpf: 55544433322,
          dono_nome: "Carlos Pereira",
        },
      ]);
    }, 500);
  });
}

// Função para gerar chave única do serviço
function getServicoKey(servico: Servico): string {
  const dataHora =
    servico.data_hora instanceof Date
      ? servico.data_hora.getTime()
      : new Date(servico.data_hora).getTime();
  return `${servico.funcionario_nome}-${servico.cliente_nome}-${servico.animal_nome}-${dataHora}`;
}

const getInitialFormData = (
  venda: Venda | null | undefined
): {
  data_hora: string;
  cpf_cliente: string;
  produtos_keys: string[];
  servicos_keys: string[];
  meio: string;
  parcela: string;
  status: string;
} => {
  if (venda) {
    return {
      data_hora: venda.data_hora
        ? new Date(venda.data_hora).toISOString().slice(0, 16)
        : "",
      cpf_cliente: venda.cpf_cliente.toString(),
      produtos_keys: [],
      servicos_keys: [],
      meio: venda.meio,
      parcela: venda.parcela.toString(),
      status: venda.status,
    };
  }
  return {
    data_hora: "",
    cpf_cliente: "",
    produtos_keys: [],
    servicos_keys: [],
    meio: "",
    parcela: "",
    status: "",
  };
};

export default function NewVendaPopup({
  open,
  onClose,
  venda,
  isEditing = false,
}: {
  open: boolean;
  onClose?: () => void;
  venda?: Venda | null;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState(() => getInitialFormData(venda));
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [loadingServicos, setLoadingServicos] = useState(false);

  const [produtosLista, setProdutosLista] = useState<
    { id: number | null; quantidade: number }[]
  >([]);

  const [servicosLista, setServicosLista] = useState<string[]>([]);

  // Carregar dados quando o popup abrir
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function loadData() {
      setLoadingClientes(true);
      setLoadingProdutos(true);
      setLoadingServicos(true);

      try {
        const [clientesData, produtosData, servicosData] = await Promise.all([
          buscarClientesApi(),
          buscarProdutosApi(),
          buscarServicosApi(),
        ]);

        if (!cancelled) {
          setClientes(clientesData);
          setProdutos(produtosData);
          setServicos(servicosData);
        }
      } finally {
        if (!cancelled) {
          setLoadingClientes(false);
          setLoadingProdutos(false);
          setLoadingServicos(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.cpf_cliente) {
      return;
    }

    setLoading(true);

    const data = {
      data_hora: new Date(formData.data_hora),
      cpf_cliente: Number(formData.cpf_cliente),
      produtos_keys: formData.produtos_keys,
      servicos_keys: formData.servicos_keys,
      meio: formData.meio,
      parcela: Number(formData.parcela),
      status: formData.status,
    };

    if (isEditing) {
      await alterarVendaApi(data);
    } else {
      await criarVendaApi(data);
    }

    setLoading(false);
    onClose?.();
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProdutosChange = useCallback((keys: string[]) => {
    setFormData((prev) => ({ ...prev, produtos_keys: keys }));
  }, []);

  const handleServicosChange = useCallback((keys: string[]) => {
    setFormData((prev) => ({ ...prev, servicos_keys: keys }));
  }, []);

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

  function addServico() {
    setServicosLista((prev) => [...prev, ""]);
  }

  function updateServico(index: number, value: string) {
    setServicosLista((prev) => prev.map((v, i) => (i === index ? value : v)));
  }

  function removeServico(index: number) {
    setServicosLista((prev) => prev.filter((_, i) => i !== index));
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
            className="w-full max-w-2xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEditing ? "Alterar Venda" : "Registrar Nova Venda"}
                </CardTitle>
                <CardAction>
                  <Button variant="link" onClick={onClose}>
                    <X />
                  </Button>
                </CardAction>
              </CardHeader>

              <CardContent>
                <form id="form-nova-venda" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
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
                      <Label htmlFor="cpf_cliente">Cliente</Label>
                      <Select
                        value={formData.cpf_cliente || undefined}
                        onValueChange={(value) =>
                          handleChange("cpf_cliente", value)
                        }
                        disabled={loadingClientes}
                      >
                        <SelectTrigger id="cpf_cliente" className="w-full">
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
                                <SelectItem
                                  key={getServicoKey(s)}
                                  value={getServicoKey(s)}
                                >
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

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addServico}
                      >
                        + Adicionar Serviço
                      </Button>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="meio">Meio de Pagamento</Label>
                      <Input
                        id="meio"
                        type="text"
                        required
                        placeholder="Dinheiro, Cartão, PIX..."
                        value={formData.meio}
                        onChange={(e) => handleChange("meio", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="parcela">Número de Parcelas</Label>
                      <Input
                        id="parcela"
                        type="number"
                        required
                        min="1"
                        value={formData.parcela}
                        onChange={(e) =>
                          handleChange("parcela", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Input
                        id="status"
                        type="text"
                        required
                        placeholder="Pendente, Pago, Cancelado..."
                        value={formData.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  form="form-nova-venda"
                  className="w-full"
                  disabled={loading}
                >
                  {loading
                    ? isEditing
                      ? "Alterando..."
                      : "Registrando..."
                    : isEditing
                    ? "Alterar"
                    : "Registrar"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
