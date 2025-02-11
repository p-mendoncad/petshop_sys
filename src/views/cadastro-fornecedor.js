  import React, { useState, useEffect } from 'react';
  import { data, useNavigate, useParams } from 'react-router-dom';

  import Stack from '@mui/material/Stack';

  import Card from '../components/card';
  import FormGroup from '../components/form-group';

  import { mensagemSucesso, mensagemErro } from '../components/toastr';

  // import '../custom.css';

  import axios from 'axios';
  import { BASE_URL } from '../config/axios';

  function CadastroFornecedor() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/fornecedores`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [tipoEstoque, setTipoEstoque] = useState('');
    const [estoqueId, setIdEstoque] = useState('');

    const [dados, setDados] = useState([]);

    function inicializar() {
      if (idParam == null) {
        setId('');
        setNome('');
        setCnpj('');
        setEmail('');
        setCelular('');
        setLogradouro('');
        setNumero('');
        setComplemento('');
        setBairro('');
        setCidade('');
        setEstado('');
        setCep('');
        setDataCadastro('');
        setTipoEstoque('');
        setIdEstoque('');
      } else {
        setId(dados.id);
        setNome(dados.nome);
        setCnpj(dados.cnpj);
        setEmail(dados.email);
        setCelular(dados.celular);
        setLogradouro(dados.logradouro);
        setNumero(dados.numero);
        setComplemento(dados.complemento);
        setBairro(dados.bairro);
        setCidade(dados.cidade);
        setEstado(dados.estado);
        setCep(dados.cep);
        setDataCadastro(dados.dataCadastro);
        setTipoEstoque(dados.tipoEstoque);
        setIdEstoque(dados.estoqueId);
      }
    }

    async function salvar() {
      let data = {
        id,
        nome,
        cnpj,
        email,
        celular,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
        dataCadastro,
        tipoEstoque,
        estoqueId,
      };
      data = JSON.stringify(data);
      if (idParam == null) {
        await axios
          .post(baseURL, data, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => {
            mensagemSucesso(`Fornecedor ${nome} cadastrado com sucesso!`);
            navigate(`/listagem-fornecedores`);
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
            mensagemSucesso(`Fornecedor ${nome} alterado com sucesso!`);
            navigate(`/listagem-fornecedores`);
          })
          .catch((error) => {
            mensagemErro(error.response.data);
          });
      }
    }

    async function buscar() {
      if (idParam != null) {
        await axios.get(`${baseURL}/${idParam}`).then((response) => {
          setDados(response.data);
        });
        setId(dados.id);
        setNome(dados.nome);
        setCnpj(dados.cnpj);
        setEmail(dados.email);
        setCelular(dados.celular);
        setLogradouro(dados.logradouro);
        setNumero(dados.numero);
        setComplemento(dados.complemento);
        setBairro(dados.bairro);
        setCidade(dados.cidade);
        setEstado(dados.estado);
        setCep(dados.cep);
        setDataCadastro(dados.dataCadastro);
        setTipoEstoque(dados.tipoEstoque);
        setIdEstoque(dados.estoqueId);
      }
    }
    
    const [dadosEstoque, setDadosEstoque] = React.useState(null);

    useEffect(() => {
      axios.get(`${BASE_URL}/estoques`).then((response) => {
        setDadosEstoque(response.data);
      });
    }, []);

    useEffect(() => {
      buscar(); // eslint-disable-next-line
    }, [id]);

    if (!dados) return null;

    return (
      <div className='container'>
        <Card title='Cadastro de Fornecedores'>
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
                <FormGroup label='CNPJ: *' htmlFor='inputCnpj'>
                  <input
                    type='text'
                    id='inputCnpj'
                    value={cnpj}
                    className='form-control'
                    name='cnpj'
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Email: *' htmlFor='inputEmail'>
                  <input
                    type='email'
                    id='inputEmail'
                    value={email}
                    className='form-control'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Celular: *' htmlFor='inputCelular'>
                  <input
                    type='text'
                    id='inputCelular'
                    value={celular}
                    className='form-control'
                    name='celular'
                    onChange={(e) => setCelular(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                  <input
                    type='text'
                    id='inputLogradouro'
                    value={logradouro}
                    className='form-control'
                    name='logradouro'
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Número: *' htmlFor='inputNumero'>
                  <input
                    type='text'
                    id='inputNumero'
                    value={numero}
                    className='form-control'
                    name='numero'
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Complemento:' htmlFor='inputComplemento'>
                  <input
                    type='text'
                    id='inputComplemento'
                    value={complemento}
                    className='form-control'
                    name='complemento'
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                  <input
                    type='text'
                    id='inputBairro'
                    value={bairro}
                    className='form-control'
                    name='bairro'
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                  <input
                    type='text'
                    id='inputCidade'
                    value={cidade}
                    className='form-control'
                    name='cidade'
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Estado: *' htmlFor='inputEstado'>
                  <input
                    type='text'
                    id='inputEstado'
                    value={estado}
                    className='form-control'
                    name='estado'
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='CEP: *' htmlFor='inputCep'>
                  <input
                    type='text'
                    id='inputCep'
                    value={cep}
                    className='form-control'
                    name='cep'
                    onChange={(e) => setCep(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Data de Cadastro: *' htmlFor='inputDataCadastro'>
                  <input
                    type='date'
                    id='inputDataCadastro'
                    value={dataCadastro}
                    className='form-control'
                    name='dataCadastro'
                    onChange={(e) => setDataCadastro(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Estoque: *' htmlFor='selectEstoque'>
                  <select
                    className='form-select'
                    id='selectEstoque'
                    name='estoque'
                    value={estoqueId}
                    onChange={(e) => setIdEstoque(e.target.value)}
                  >
                    <option key='0' value='0'>
                      Selecione um setor do estoque
                    </option>
                    {dadosEstoque && dadosEstoque.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.descricao}
                      </option>
                    ))}
                  </select>
                </FormGroup>
                <Stack spacing={1} padding={1} direction='row'>
                  <button
                    onClick={salvar}
                    type='button'
                    className='btn btn-success'
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => navigate('/listagem-fornecedores')}
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

  export default CadastroFornecedor;


