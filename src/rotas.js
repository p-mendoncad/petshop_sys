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

import ListagemEstoques from './views/listagem-estoques';

import CadastroCaixa from './views/cadastro-caixa';

import ListagemCaixas from './views/listagem-caixas';

import CadastroVenda from './views/cadastro-venda';

import ListagemVendas from './views/listagem-vendas';

import CadastroPet from './views/cadastro-pet';

import ListagemPets from './views/listagem-pets';

import CadastroRaca from './views/cadastro-raca';

import ListagemRacas from './views/listagem-racas';

import CadastroServico from './views/cadastro-servico';

import ListagemServicos from './views/listagem-servicos';

import ListagemCompras from './views/listagem-compras';

import CadastroCompra from './views/cadastro-compra';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
        {/* adicionar declaração de parâmetro */}
                <Route path='/cadastro-cargo/:idParam?' element={<CadastroCargo />} />
                <Route path='/listagem-cargos' element={<ListagemCargos />} />
                
                <Route path='/cadastro-cliente/:idParam?' element={<CadastroCliente />} />
                <Route path='/listagem-clientes' element={<ListagemClientes />} />
                
                <Route path='/cadastro-agendamento/:idParam?' element={<CadastroAgendamento />} />
                <Route path='/listagem-agendamentos/:idParam?' element={<ListagemAgendamentos />} />
                
                <Route path='/cadastro-funcionario/:idParam?' element={<CadastroFuncionario />} />
                <Route path='/listagem-funcionarios/:idParam?' element={<ListagemFuncionarios />} />
                
                <Route path='/cadastro-fornecedor/:idParam?' element={<CadastroFornecedor />} />
                <Route path='/listagem-fornecedores' element={<ListagemFornecedores />} />

                <Route path='/cadastro-produto/:idParam?' element={<CadastroProduto />} />
                <Route path='/listagem-produtos' element={<ListagemProdutos />} />

                <Route path='/cadastro-produto/:idParam?' element={<CadastroCaixa />} />
                <Route path='/listagem-produtos' element={<ListagemCaixas />} />

                <Route path='/cadastro-venda/:idParam?' element={<CadastroVenda/>} />
                <Route path='/listagem-vendas/' element={<ListagemVendas/>} />

                <Route path='/cadastro-pet/:idParam?' element={<CadastroPet/>} />
                <Route path='/listagem-pets/' element={<ListagemPets/>} />

                <Route path='/cadastro-estoque/:idParam?' element={<CadastroEstoque/>} />
                <Route path='/listagem-estoques/' element={<ListagemEstoques/>} />
                
                <Route path='/cadastro-raca/:idParam?' element={<CadastroRaca/>} />
                <Route path='/listagem-racas/' element={<ListagemRacas/>} />

                <Route path='/cadastro-servico/:idParam?' element={<CadastroServico/>} />
                <Route path='/listagem-servicos/' element={<ListagemServicos/>} />

                <Route path='/cadastro-agendamento/:idParam?' element={<CadastroAgendamento/>} />
                <Route path='/listagem-agendamentos/' element={<ListagemAgendamentos/>} />

                <Route path='/cadastro-compra/:idParam?' element={<CadastroCompra />} />
                <Route path='/listagem-compras' element={<ListagemCompras />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;