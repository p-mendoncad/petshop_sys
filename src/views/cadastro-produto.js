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
  const baseURL = `${BASE_URL}/Produtos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantMin, setQuantMin] = useState('');
  const [quantMax, setQuantMax] = useState('');
  // const [lote, setLote] = useState('');
  // const [vencimento, setVencimento] = useState('');
  const [codigo, setCodigo] = useState('');
  const [perecibilidade, setPerecibilidade] = useState(false);
  const [dataEntrada, setDataEntrada] = useState('');
  const [uniMedida, setUniMedida] = useState('');
  // const [precoCompra, setPrecoCompra] = useState('');
  const [codBarras, setCodBarras] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [idSetor, setIdSetor] = useState('');

  async function salvar() {
    const data = {
      id,
      nome,
      precoVenda,
      quantidade,
      descricao,
      quantMin,
      quantMax,
      // lote,
      // vencimento,
      codigo,
      perecibilidade,
      dataEntrada,
      uniMedida,
      // precoCompra,
      codBarras,
      idFornecedor,
      idSetor,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data);
        mensagemSucesso(`Produto "${nome}" cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso(`Produto "${nome}" atualizado com sucesso!`);
      }
      navigate('/listagem-produtos');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar o produto.');
    }
  }

  async function buscarProduto() {
    if (idParam != null) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const produto = response.data;
        setId(produto.id);
        setNome(produto.nome);
        setPrecoVenda(produto.precoVenda);
        setQuantidade(produto.quantidade);
        setDescricao(produto.descricao);
        setQuantMin(produto.quantMin);
        setQuantMax(produto.quantMax);
        // setLote(produto.lote);
        // setVencimento(produto.vencimento);
        setCodigo(produto.codigo);
        setPerecibilidade(produto.perecibilidade);
        setDataEntrada(produto.dataEntrada);
        setUniMedida(produto.uniMedida);
        // setPrecoCompra(produto.precoCompra);
        setCodBarras(produto.codBarras);  
        setIdFornecedor(produto.idFornecedor);
        setIdSetor(produto.idSetor);
      } catch (error) {
        mensagemErro('Erro ao buscar o produto.');
      }
    }
  }

  const [dadosFornecedores, setDadosFornecedores] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/fornecedores`).then((response) => {
      setDadosFornecedores(response.data);
    });
  }, []);
  const [dadosEstoques, setDadosEstoques] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/estoques`).then((response) => {
      setDadosEstoques(response.data);
    });
  }, []);

  useEffect(() => {
    buscarProduto();
  }, [idParam]);

  return (
    <div className='container'>
      <Card title='Cadastro de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome:' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Preço de Venda:' htmlFor='inputPrecoVenda'>
                <input
                  type='number'
                  id='inputPrecoVenda'
                  value={precoVenda}
                  className='form-control'
                  onChange={(e) => setPrecoVenda(e.target.value)}
                />
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

              <FormGroup label='Descrição:' htmlFor='inputDescricao'>
                <textarea
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Quantidade Mínima:' htmlFor='inputQuantMin'>
                <input
                  type='number'
                  id='inputQuantMin'
                  value={quantMin}
                  className='form-control'
                  onChange={(e) => setQuantMin(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Quantidade Máxima:' htmlFor='inputQuantMax'>
                <input
                  type='number'
                  id='inputQuantMax'
                  value={quantMax}
                  className='form-control'
                  onChange={(e) => setQuantMax(e.target.value)}
                />
              </FormGroup>

              {/* <FormGroup label='Lote:' htmlFor='inputLote'>
                <input
                  type='text'
                  id='inputLote'
                  value={lote}
                  className='form-control'
                  onChange={(e) => setLote(e.target.value)}
                />
              </FormGroup> */}

              {/* <FormGroup label='Data de Vencimento:' htmlFor='inputVencimento'>
                <input
                  type='date'
                  id='inputVencimento'
                  value={vencimento}
                  className='form-control'
                  onChange={(e) => setVencimento(e.target.value)}
                />
              </FormGroup> */}

              {/* <FormGroup label='Código:' htmlFor='inputCodigo'>
                <input
                  type='text'
                  id='inputCodigo'
                  value={codigo}
                  className='form-control'
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </FormGroup> */}

              <FormGroup label='Perecibilidade:' htmlFor='inputPerecibilidade'>
                <input
                  type='checkbox'
                  id='inputPerecibilidade'
                  checked={perecibilidade}
                  onChange={(e) => setPerecibilidade(e.target.checked)}
                />
              </FormGroup>

              {/* <FormGroup label='Data de Entrada:' htmlFor='inputDataEntrada'>
                <input
                  type='date'
                  id='inputDataEntrada'
                  value={dataEntrada}
                  className='form-control'
                  onChange={(e) => setDataEntrada(e.target.value)}
                />
              </FormGroup> */}

              <FormGroup label='Unidade de Medida:' htmlFor='inputUniMedida'>
                <input
                  type='text'
                  id='inputUniMedida'
                  value={uniMedida}
                  className='form-control'
                  onChange={(e) => setUniMedida(e.target.value)}
                />
              </FormGroup>

              {/* <FormGroup label='Preço de Compra:' htmlFor='inputPrecoCompra'>
                <input
                  type='number'
                  id='inputPrecoCompra'
                  value={precoCompra}
                  className='form-control'
                  onChange={(e) => setPrecoCompra(e.target.value)}
                />
              </FormGroup> */}

              <FormGroup label='Código de Barras:' htmlFor='inputCodBarras'>
                <input
                  type='text'
                  id='inputCodBarras'
                  value={codBarras}
                  className='form-control'
                  onChange={(e) => setCodBarras(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Fornecedor: *' htmlFor='selectFornecedor'>
                <select
                  className='form-select'
                  id='selectFornecedor'
                  name='fornecedor'
                  value={idFornecedor}
                  onChange={(e) => setDadosFornecedores(e.target.value)}  // Use 'setServico' aqui
                >
                  <option key='0' value='0'>
                    Selecione um fornecedor
                  </option>
                  {dadosFornecedores && dadosFornecedores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Setor: *' htmlFor='selectSetor'>
                <select
                  className='form-select'
                  id='selectSetor'
                  name='setor'
                  value={idSetor}
                  onChange={(e) => setDadosEstoques(e.target.value)}  // Use 'setServico' aqui
                >
                  <option key='0' value='0'>
                    Selecione um setor
                  </option>
                  {dadosEstoques && dadosEstoques.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.descricao}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <Stack spacing={2} direction='row'>
                <button onClick={salvar} className='btn btn-success'>
                  Salvar
                </button>
                <button
                  onClick={() => navigate('/listagem-produtos')}
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroProduto;
