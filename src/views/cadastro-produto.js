import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

// import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroProduto() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/Produto`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantMin, setQuantMin] = useState('');
  const [quantMax, setQuantMax] = useState('');
  const [lote, setLote] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [codigo, setCodigo] = useState('');
  const [perecibilidade, setPerecibilidade] = useState(false);
  const [dataEntrada, setDataEntrada] = useState('');
  const [uniMedida, setUniMedida] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [codBarras, setCodBarras] = useState('');
  const [idFornecedor, setIdFornecedor] = useState('');
  const [idSetor, setIdSetor] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setPrecoVenda('');
      setQuantidade('');
      setDescricao('');
      setQuantMin('');
      setQuantMax('');
      setLote('');
      setVencimento('');
      setCodigo('');
      setPerecibilidade(false);
      setDataEntrada('');
      setUniMedida('');
      setPrecoCompra('');
      setCodBarras('');
      setIdFornecedor('');
      setIdSetor('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setPrecoVenda(dados.precoVenda);
      setQuantidade(dados.quantidade);
      setDescricao(dados.descricao);
      setQuantMin(dados.quantMin);
      setQuantMax(dados.quantMax);
      setLote(dados.lote);
      setVencimento(dados.vencimento);
      setCodigo(dados.codigo);
      setPerecibilidade(dados.perecibilidade);
      setDataEntrada(dados.dataEntrada);
      setUniMedida(dados.uniMedida);
      setPrecoCompra(dados.precoCompra);
      setCodBarras(dados.codBarras);
      setIdFornecedor(dados.idFornecedor);
      setIdSetor(dados.idSetor);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      precoVenda,
      quantidade,
      descricao,
      quantMin,
      quantMax,
      lote,
      vencimento,
      codigo,
      perecibilidade,
      dataEntrada,
      uniMedida,
      precoCompra,
      codBarras,
      idFornecedor,
      idSetor,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Produto ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-produtos`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          mensagemSucesso(`Produto ${nome} alterado com sucesso!`);
          navigate(`/listagem-produtos`);
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setPrecoVenda(dados.precoVenda);
      setQuantidade(dados.quantidade);
      setDescricao(dados.descricao);
      setQuantMin(dados.quantMin);
      setQuantMax(dados.quantMax);
      setLote(dados.lote);
      setVencimento(dados.vencimento);
      setCodigo(dados.codigo);
      setPerecibilidade(dados.perecibilidade);
      setDataEntrada(dados.dataEntrada);
      setUniMedida(dados.uniMedida);
      setPrecoCompra(dados.precoCompra);
      setCodBarras(dados.codBarras);
      setIdFornecedor(dados.idFornecedor);
      setIdSetor(dados.idSetor);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Produtos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Preço de Venda: *' htmlFor='inputPrecoVenda'>
                <input
                  type='number'
                  id='inputPrecoVenda'
                  value={precoVenda}
                  className='form-control'
                  name='precoVenda'
                  onChange={(e) => setPrecoVenda(e.target.value)}
                />
              </FormGroup>
              {/* Adicione os outros campos similares, como quantidade, descrição, lote, etc. */}
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
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
