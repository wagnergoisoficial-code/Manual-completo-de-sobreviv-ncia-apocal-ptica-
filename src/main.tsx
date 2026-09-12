import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Checkout from './pages/Checkout.tsx';
import Obrigado from './pages/Obrigado.tsx';
import './index.css';

/**
 * Roteamento pelo caminho da URL, sem biblioteca.
 *
 * São três telas e nenhuma navegação entre elas acontece sem recarregar a página — o
 * comprador vai para o checkout e de lá para o Stripe. Uma biblioteca de rotas aqui
 * seria peso no bundle para resolver um problema que não existe.
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
