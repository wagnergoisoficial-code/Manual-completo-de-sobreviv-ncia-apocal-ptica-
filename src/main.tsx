import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Obrigado from './pages/Obrigado.tsx';
import './index.css';

/**
 * Roteamento pelo caminho da URL, sem biblioteca.
 *
 * O pagamento acontece dentro da própria página de vendas, então sobra uma rota só: a
 * de retorno, para onde o Stripe devolve o comprador depois de pagar. Uma biblioteca
 * de rotas aqui seria peso no bundle para resolver um problema que não existe.
 *
 * O netlify.toml já devolve o index.html para qualquer caminho, então estes endereços
 * funcionam mesmo abertos direto ou recarregados.
 */
function telaDaVez() {
  const caminho = window.location.pathname.replace(/\/+$/, '');

  if (caminho === '/obrigado') return <Obrigado />;
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {telaDaVez()}
  </StrictMode>,
);
