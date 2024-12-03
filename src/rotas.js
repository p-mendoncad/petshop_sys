import React from 'react';

import ListagemCargos from './views/listagem-cargos';

import CadastroCargo from './views/cadastro-cargo';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/cadastro-cargo/:idParam?' element={<CadastroCargo />} />
                <Route path='/listagem-cargos' element={<ListagemCargos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;