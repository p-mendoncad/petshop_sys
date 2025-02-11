import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroProduto() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/produtos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [perecibilidade, setPerecibilidade] = useState(false);
  const [dataEntrada, setDataEntrada] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [idSetor, setIdSetor] = useState('');
  const [idProduto, setIdProduto] = useState('');

  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [dadosFornecedores, setDadosFornecedores] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [produtosRes, fornecedoresRes] = await Promise.all([
          axios.get(`${BASE_URL}/produtos`),
          axios.get(`${BASE_URL}/fornecedores`),
        ]);
        setDadosProdutos(produtosRes.data);
        setDadosFornecedores(fornecedoresRes.data);
      } catch (error) {
        mensagemErro("Erro ao carregar dados.");
      }
    }

    carregarDados();
  }, []);

  useEffect(() => {
    async function buscar() {
      if (idParam) {
        try {
          const response = await axios.get(`${baseURL}/${idParam}`);
          const dados = response.data;
          setId(dados.id);
          setNome(dados.nome);
          setQuantidade(dados.quantidade);
          setLote(dados.lote);
          setVencimento(dados.vencimento);
          setPerecibilidade(dados.perecibilidade);
          setDataEntrada(dados.dataEntrada);
          setPrecoCompra(dados.precoCompra);
          setIdFornecedor(dados.idFornecedor);
          setIdSetor(dados.idSetor);
          setIdProduto(dados.idProduto);
        } catch (error) {
          mensagemErro("Erro ao buscar produto.");
        }
      }
    }

    buscar();
  }, [idParam]);

  async function salvar() {
    const data = {
      id,
      nome,
      quantidade,
      lote,
      vencimento,
      perecibilidade,
      dataEntrada,
      precoCompra,
      idFornecedor,
      idSetor,
      idProduto
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Produto ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Produto ${nome} atualizado com sucesso!`);
      }
      navigate('/listagem-produtos');
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar produto.");
    }
  }

  return (
    <div className='container'>
      <Card title='Cadastro de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Produto: *' htmlFor='selectProduto'>
                <select
                  className='form-select'
                  id='selectProduto'
                  value={idProduto}
                  onChange={(e) => setIdProduto(e.target.value)}
                >
                  <option value=''>Selecione um produto</option>
                  {dadosProdutos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Quantidade:' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Lote:' htmlFor='inputLote'>
                <input
                  type='text'
                  id='inputLote'
                  value={lote}
                  className='form-control'
                  onChange={(e) => setLote(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Perecibilidade:' htmlFor='inputPerecibilidade'>
                <input
                  type='checkbox'
                  id='inputPerecibilidade'
                  checked={perecibilidade}
                  onChange={(e) => setPerecibilidade(e.target.checked)}
                />
              </FormGroup>

              <FormGroup label='Data de Vencimento:' htmlFor='inputVencimento'>
                <input
                  type='date'
                  id='inputVencimento'
                  value={vencimento}
                  className='form-control'
                  onChange={(e) => setVencimento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Data de Entrada:' htmlFor='inputDataEntrada'>
                <input
                  type='date'
                  id='inputDataEntrada'
                  value={dataEntrada}
                  className='form-control'
                  onChange={(e) => setDataEntrada(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Preço de Compra:' htmlFor='inputPrecoCompra'>
                <input
                  type='number'
                  id='inputPrecoCompra'
                  value={precoCompra}
                  className='form-control'
                  onChange={(e) => setPrecoCompra(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Fornecedor: *' htmlFor='selectFornecedor'>
                <select
                  className='form-select'
                  id='selectFornecedor'
                  value={idFornecedor}
                  onChange={(e) => setIdFornecedor(e.target.value)}
                >
                  <option value=''>Selecione um fornecedor</option>
                  {dadosFornecedores.map((fornecedor) => (
                    <option key={fornecedor.id} value={fornecedor.id}>
                      {fornecedor.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} className='btn btn-success'>Salvar</button>
                <button onClick={() => navigate('/listagem-produtos')} className='btn btn-danger'>Cancelar</button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroProduto;
