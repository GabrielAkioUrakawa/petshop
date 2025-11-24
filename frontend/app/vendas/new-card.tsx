/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { api } from "@/lib/api";

async function criarVendaApi(data) {
  const response = await api("/compra", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response as any;
}

async function alterarVendaApi(data) {
  const response = await api(`/compra/${data.idCompra}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response as any;
}

async function buscarClientesApi() {
  const response = await api("/cliente");
  return response as any;
}

async function buscarProdutosApi() {
  const response = await api("/produto");
  return response as any;
}

async function buscarServicosApi() {
  const response = await api("/servico");
  return response as any;
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
  venda
): {
  id_compra: string;
  data_hora: string;
  cpf_cliente: string;
  produtos_keys: string[];
  servicos_keys: string[];
  forma_pagamento: string;
  parcela: string;
  status: string;
} => {
  if (venda) {
    return {
      id_compra: venda.id_compra,
      data_hora: venda.data_hora
        ? new Date(venda.data_hora).toISOString().slice(0, 16)
        : "",
      cpf_cliente: venda.cpf_cliente.toString(),
      produtos_keys: [],
      servicos_keys: [],
      forma_pagamento: venda.forma_pagamento,
      parcela: venda.parcela,
      status: venda.status,
    };
  }
  return {
    id_compra: "",
    data_hora: "",
    cpf_cliente: "",
    produtos_keys: [],
    servicos_keys: [],
    forma_pagamento: "",
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

    if (!formData.cpf_cliente) return;

    setLoading(true);

    // Transformar PRODUTOS para o formato correto do backend
    const produtosFormatados = produtosLista
      .filter((p) => p.id !== null)
      .map((p) => {
        const produto = produtos.find((prod) => prod.id_produto === p.id);
        return {
          idProduto: p.id,
          quantidade: p.quantidade,
          precoUnitario: produto?.preco_venda ?? 0,
        };
      });

    // Transformar SERVICOS (keys → cpf + dataHora)
    const servicosFormatados = servicosLista.map((key) => {
      const servico = servicos.find((s) => getServicoKey(s) === key);

      return {
        idProduto: undefined,
        quantidade: 1,
        precoUnitario: servico?.preco ?? 0,
        servicoCpf: servico?.servico_cpf?.toString(),
        servicoDataHora: servico?.data_hora,
      };
    });

    const data = {
      idCompra: formData.id_compra,
      dataHora: new Date(formData.data_hora).toISOString(),
      meio: formData.forma_pagamento,
      parcela: Number(formData.parcela),
      status: formData.status,
      cpfCliente: formData.cpf_cliente.toString(),
      produtos: [...produtosFormatados, ...servicosFormatados],
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
                                <SelectItem
                                  key={p.id_produto}
                                  value={p.id_produto.toString()}
                                >
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
                      <Label htmlFor="forma_pagamento">Meio de Pagamento</Label>
                      <Input
                        id="forma_pagamento"
                        type="text"
                        required
                        placeholder="Dinheiro, Cartão, PIX..."
                        value={formData.forma_pagamento}
                        onChange={(e) => handleChange("forma_pagamento", e.target.value)}
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
