
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';

//Encapsulo las rutas especificando que elemento se va a mostrar cuando se acceda a cada una de ellas
//El componente Navbar se va a mostrar en todas las rutas
function App() {
  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<div>HOME</div>}/>
        <Route path='/items' element={<div>LIST ITEMS</div>}/>
          <Route path='/items/:itemId' element={<div>ITEM ID</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;