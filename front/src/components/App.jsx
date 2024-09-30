import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cesta } from './Cesta';
import { Productos } from './Productos';
import { Home } from './Home';
import { Producto } from './Producto';

const queryClient = new QueryClient();
export const Context = createContext(null); 

export function App() {
    const [estado, setEstado] = useState({
      cesta: []
    });

    return (
        <Context.Provider value={[estado, setEstado]}>  
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}> 
                            <Route index element={<Productos />} />
                            <Route path="*" element={<Productos />} />
                            <Route path="productos" element={<Productos />} />
                            <Route path="productos/:id" element={<Producto />} />
                            <Route path="cesta" element={<Cesta />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Context.Provider>
    );
}
