import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';


import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/produtos`;

function ListagemCompras() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-compra`);
  };

  const editar = (id) => {
    navigate(`/cadastro-compra/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  // async function excluir(id) {
  //   let data = JSON.stringify({ id });
  //   //let url = `${baseURL}/${id}`;
  //   console.log(url);
  //  // await axios
  //     .delete(url, data, {
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     .then(function (response) {
  //       mensagemSucesso(`Compra excluído com sucesso!`);
  //       setDados(
  //         dados.filter((dado) => {
  //           return dado.id !== id;
  //         })
  //       );
  //     })
  //     .catch(function (error) {
  //       mensagemErro(`Erro ao excluir a compra`);
  //     });
  // }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Compras'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Compra
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Produto</th>
                    <th scope='col'>Lote</th>
                    <th scope='col'>Quantidade</th>
                    <th scope='col'>Vencimento</th>
                    <th scope='col'>Entrada</th>
                    <th scope='col'>Valor Unitário</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.lote}</td>
                      <td>{dado.quantidade}</td>
                      <td>{dado.vencimento}</td>
                      <td>{dado.dataEntrada}</td>
                      <td>{dado.precoCompra}</td>
                      <td> 
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                           // onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemCompras;