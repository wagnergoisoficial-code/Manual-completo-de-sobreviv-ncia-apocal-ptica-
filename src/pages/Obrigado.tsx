import React from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

/**
 * A página de retorno depois do pagamento.
 *
 * Ela NÃO decide nada e NÃO libera nada. Quem libera o acesso é o webhook do Stripe,
 * no servidor — e é assim que tem de ser: o comprador pode fechar o navegador antes de
 * chegar aqui, e mesmo assim receber o acesso. Confiar nesta tela para liberar conta
 * seria confiar em algo que pode simplesmente não acontecer.
 *
 * Pelo mesmo motivo o Purchase também não é disparado daqui: ele já saiu do webhook,
 * com o id da sessão como chave. Disparar de novo aqui contaria a mesma venda duas vezes.
 *
 * O que esta página faz é uma coisa só: dizer à pessoa o que vai acontecer agora.
 */
export default function Obrigado() {
  return (
    <div className="grain flex min-h-screen flex-col bg-night text-cream">
      <main className="mx-auto flex w-full max-w-[640px] flex-1 flex-col justify-center px-6 py-20">
        <CheckCircle2 className="h-10 w-10 text-amber" strokeWidth={1.75} />

        <h1 className="mt-8 text-section text-cream">Pagamento recebido</h1>

        <p className="mt-6 text-lead text-mist">
          Em instantes você recebe um e-mail com o seu login e a senha de acesso à
          plataforma. Se pagou por Pix, a confirmação costuma levar alguns minutos.
        </p>

        <p className="mt-8 flex items-start gap-3 border-t border-cream/10 pt-8 text-small text-mist">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-faint" strokeWidth={2} />
          <span>
            Não chegou em 15 minutos? Verifique o spam e a lixeira — o e-mail vem com a
            senha e alguns provedores separam. Se ainda assim não achar, é só responder
            a este e-mail que a gente resolve.
          </span>
        </p>

        <a
          href="https://appmanualcompleto.com"
          className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-amber px-8 py-4 text-[0.9375rem] font-semibold text-night transition-colors hover:bg-amber-bright sm:w-auto sm:self-start"
        >
          Ir para a plataforma
        </a>
      </main>
    </div>
  );
}
