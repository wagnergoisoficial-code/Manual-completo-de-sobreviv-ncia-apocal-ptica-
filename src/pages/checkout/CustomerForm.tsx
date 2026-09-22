import React, { useState } from "react";
import { CustomerData } from "./types";

/**
 * Os dados de quem compra.
 *
 * Só o que é preciso para entregar e cobrar: nome, e-mail — para onde vai o acesso — e
 * CPF, que o Banco Central exige para emitir o Pix. O WhatsApp é opcional: cada campo
 * obrigatório a mais é uma chance a mais de a pessoa desistir antes do botão.
 */

interface CustomerFormProps {
  data: CustomerData;
  onChange: (field: keyof CustomerData, value: string) => void;
  errors: Partial<Record<keyof CustomerData, string>>;
  onOpenPrivacy: () => void;
}

const CAMPO =
  "w-full rounded-[10px] border bg-coal px-4 py-3 text-[16px] text-cream " +
  "placeholder:text-faint transition-colors focus:outline-none";

const estadoDoCampo = (erro?: string) =>
  erro ? "border-red-400/70 focus:border-red-400" : "border-cream/12 focus:border-amber";

const Rotulo: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="mb-2 block text-[0.8125rem] font-medium text-cream">
    {children}
  </label>
);

const Erro: React.FC<{ id: string; mensagem?: string }> = ({ id, mensagem }) =>
  mensagem ? (
    <p id={id} role="alert" className="mt-1.5 text-[0.8125rem] text-red-400">
      {mensagem}
    </p>
  ) : null;

export const CustomerForm: React.FC<CustomerFormProps> = ({ data, onChange, errors, onOpenPrivacy }) => {
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  // Máscara para WhatsApp
  const formatPhone = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 11);
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
  };

  // Máscara para CPF
  const formatCpf = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 11);
    if (raw.length <= 3) return raw;
    if (raw.length <= 6) return `${raw.slice(0, 3)}.${raw.slice(3)}`;
    if (raw.length <= 9) return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
  };

  // Um domínio digitado errado é um acesso que nunca chega. Melhor oferecer a correção
  // agora do que descobrir pelo suporte depois.
  const checkEmailTypo = (emailVal: string) => {
    const email = emailVal.trim().toLowerCase();
    const parts = email.split("@");
    if (parts.length !== 2) {
      setEmailSuggestion(null);
      return;
    }

    const [user, domain] = parts;
    const commonTypos: Record<string, string> = {
      "gmial.com": "gmail.com",
      "gmai.com": "gmail.com",
      "gamil.com": "gmail.com",
      "gmail.com.br": "gmail.com",
      "hotmial.com": "hotmail.com",
      "hotmai.com": "hotmail.com",
      "hotmil.com": "hotmail.com",
      "outlok.com": "outlook.com",
      "outloo.com": "outlook.com",
      "yaho.com": "yahoo.com",
    };

    setEmailSuggestion(commonTypos[domain] ? `${user}@${commonTypos[domain]}` : null);
  };

  const applyEmailSuggestion = () => {
    if (emailSuggestion) {
      onChange("email", emailSuggestion);
      setEmailSuggestion(null);
    }
  };

  return (
    <section aria-labelledby="dados-titulo">
      <h2 id="dados-titulo" className="eyebrow text-faint">
        Seus dados
      </h2>

      <div className="mt-5 space-y-4">
        <div>
          <Rotulo htmlFor="customer-name">Nome completo</Rotulo>
          <input
            id="customer-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Como está no seu documento"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "erro-nome" : undefined}
            className={`${CAMPO} ${estadoDoCampo(errors.name)}`}
          />
          <Erro id="erro-nome" mensagem={errors.name} />
        </div>

        <div>
          <Rotulo htmlFor="customer-email">E-mail</Rotulo>
          <input
            id="customer-email"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={data.email}
            onChange={(e) => {
              onChange("email", e.target.value);
              checkEmailTypo(e.target.value);
            }}
            onBlur={() => checkEmailTypo(data.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "erro-email" : "apoio-email"}
            className={`${CAMPO} ${estadoDoCampo(errors.email)}`}
          />
          {emailSuggestion ? (
            <button
              type="button"
              onClick={applyEmailSuggestion}
              className="mt-1.5 text-left text-[0.8125rem] text-amber underline underline-offset-2 hover:text-amber-bright"
            >
              Você quis dizer {emailSuggestion}? Toque para corrigir.
            </button>
          ) : (
            !errors.email && (
              <p id="apoio-email" className="mt-1.5 text-[0.8125rem] text-faint">
                O seu acesso chega neste e-mail.
              </p>
            )
          )}
          <Erro id="erro-email" mensagem={errors.email} />
        </div>

        <div>
          <Rotulo htmlFor="customer-cpf">CPF</Rotulo>
          <input
            id="customer-cpf"
            type="text"
            name="cpf"
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            value={data.document}
            onChange={(e) => onChange("document", formatCpf(e.target.value))}
            aria-invalid={!!errors.document}
            aria-describedby={errors.document ? "erro-cpf" : "apoio-cpf"}
            className={`${CAMPO} ${estadoDoCampo(errors.document)}`}
          />
          {!errors.document && (
            <p id="apoio-cpf" className="mt-1.5 text-[0.8125rem] text-faint">
              Usado só para gerar o seu Pix.
            </p>
          )}
          <Erro id="erro-cpf" mensagem={errors.document} />
        </div>

        <div>
          <Rotulo htmlFor="customer-phone">
            WhatsApp <span className="font-normal text-faint">(opcional)</span>
          </Rotulo>
          <input
            id="customer-phone"
            type="tel"
            name="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            value={data.phone}
            onChange={(e) => onChange("phone", formatPhone(e.target.value))}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "erro-telefone" : undefined}
            className={`${CAMPO} ${estadoDoCampo(errors.phone)}`}
          />
          <Erro id="erro-telefone" mensagem={errors.phone} />
        </div>
      </div>

      <p className="mt-4 text-[0.8125rem] text-faint">
        Seus dados ficam protegidos pela LGPD.{" "}
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="text-mist underline underline-offset-2 hover:text-cream"
        >
          Ver política
        </button>
      </p>
    </section>
  );
};
