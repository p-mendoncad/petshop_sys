import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';


import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';

const baseURL = `${BASE_URL3}/pets`;

function ListagemPets() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-pets`);
  };

  const editar = (id) => {
    navigate(`/cadastro-pets/${id}`);
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
  //       mensagemSucesso(`Produto excluído com sucesso!`);
  //       setDados(
  //         dados.filter((dado) => {
  //           return dado.id !== id;
  //         })
  //       );
  //     })
  //     .catch(function (error) {
  //       mensagemErro(`Erro ao excluir o produto`);
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
      <Card title='Listagem de Pets'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Pet
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Dt. Nascimento</th>
                    <th scope='col'>Peso(kg)</th>
                    <th scope='col'>Vac. Raiva</th>
                    <th scope='col'>Observações</th>
                    <th scope='col'>Sexo</th>
                    <th scope='col'>Animal</th>
                    <th scope='col'>Raça</th>
                    <th scope='col'>Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.dataNascimento}</td>
                      <td>{dado.peso}</td>
                      <td>{dado.vacinaRaiva}</td>
                      <td>{dado.observacao}</td>
                      <td>{dado.sexo}</td>
                      <td>{dado.animal}</td>
                      <td>{dado.nomeRaca}</td>
                      <td>{dado.cliente}</td>
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

export default ListagemPets;