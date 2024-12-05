import React from 'react';

import ListagemCargos from './views/listagem-cargos';

import CadastroCargo from './views/cadastro-cargo';

import CadastroCliente from './views/cadastro-cliente';

import ListagemClientes from './views/listagem-clientes';

import CadastroAgendamento from './views/cadastro-agendamento';

import ListagemAgendamentos from './views/listagem-agendamentos';

import CadastroFuncionario from './views/cadastro-funcionario';

import ListagemFuncionarios from './views/listagem-funcionarios';

import CadastroFornecedor from './views/cadastro-fornecedor';

import ListagemFornecedores from './views/listagem-fornecedores';

import CadastroProduto from './views/cadastro-produto';

import ListagemProdutos from './views/listagem-produtos';

import CadastroEstoque from './views/cadastro-estoque';

import ListagemEstoque from './views/listagem-estoque';

import CadastroCaixa from './views/cadastro-caixa';

import ListagemCaixa from './views/listagem-caixa';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/cadastro-cargo/:idParam?' element={<CadastroCargo />} />
                <Route path='/listagem-cargos' element={<ListagemCargos />} />
                
                <Route path='/cadastro-cliente/:idParam?' element={<CadastroCliente />} />
                <Route path='/listagem-clientes' element={<ListagemClientes />} />
                
                <Route path='/cadastro-agendamento/:idParam?' element={<CadastroAgendamento />} />
                <Route path='/listagem-agendamentos' element={<ListagemAgendamentos />} />
                
                <Route path='/cadastro-funcionario/:idParam?' element={<CadastroFuncionario />} />
                <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
                
                <Route path='/cadastro-fornecedor/:idParam?' element={<CadastroFornecedor />} />
                <Route path='/listagem-fornecedores' element={<ListagemFornecedores />} />

                <Route path='/cadastro-produto/:idParam?' element={<CadastroProduto />} />
                <Route path='/listagem-produtos' element={<ListagemProdutos />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;