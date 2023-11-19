
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import { ListScreen } from './screens/ListScreen';
import { ItemsProvider } from './context/ItemsContext';
import { HomeScreen } from './screens/HomeScreen';
import { ItemDescription } from './screens/ItemDescription';

//Encapsulo las rutas especificando que elemento se va a mostrar cuando se acceda a cada una de ellas
//El componente Navbar se va a mostrar en todas las rutas
function App() {
  return (
    <BrowserRouter className="App">
      <ItemsProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/items' element={<ListScreen/>}/>
          <Route path='/items/:itemId' element={<ItemDescription />} />
        </Routes>
      </ItemsProvider>
    </BrowserRouter>
  );
}

export default App;