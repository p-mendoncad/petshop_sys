import React from 'react';

import ListagemCargos from './views/listagem-cargos';

import CadastroCargo from './views/cadastro-cargo';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/cadastro-cargos/:idParam?' element={<CadastroCargo />} />
                <Route path='/listagem-cursos' element={<ListagemCursos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;