import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Checkout from './pages/checkout/index.tsx';
import Obrigado from './pages/Obrigado.tsx';
import './index.css';

/**
 * Roteamento pelo caminho da URL, sem biblioteca.
 *
 * São três telas, e ninguém navega entre elas sem recarregar a página: da venda para o
 * checkout, e do checkout para a de retorno. Uma biblioteca de rotas aqui seria peso no
 * bundle para resolver um problema que não existe.
 *
 * O netlify.toml já devolve o index.html para qualquer caminho, então estes endereços
 * funcionam mesmo abertos direto ou recarregados.
 */
function telaDaVez() {
  const caminho = window.location.pathname.replace(/\/+$/, '');

  if (caminho === '/checkout') return <Checkout />;
  if (caminho === '/obrigado') return <Obrigado />;
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {telaDaVez()}
  </StrictMode>,
);
