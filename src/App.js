import * as React from 'react';
import Button from '@mui/material/Button';
import 'bootswatch/dist/minty/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Navbar from './components/navbar';
import Rotas from './rotas.js';



function App() {
  return (
    <div className='Menu'>
            <div className='container'>
        <Rotas />
        <Navbar />
      </div>

    </div>
  );
}

export default App;