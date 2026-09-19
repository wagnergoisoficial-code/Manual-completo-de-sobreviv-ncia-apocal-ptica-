/**
 * Os tipos da página de checkout.
 *
 * O desenho veio de um protótipo feito sobre o Mercado Pago; quem processa o pagamento
 * aqui é o Stripe, que é onde está ligada a liberação de acesso à plataforma. As duas
 * marcas dessa troca ficaram nos nomes abaixo, e só nelas.
 */

export interface OfferInfo {
  id: string;
  name: string;
  bonus: string;
  items: string[];
  price: number;
  paymentType: string;
  guaranteeDays: number;
  deliveryText: string;
}

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  document: string; // CPF
}

export interface TrackingData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  _fbp?: string;
  _fbc?: string;
  eventId?: string;
}

export interface PaymentTransaction {
  /** O id do PaymentIntent do Stripe (pi_...). É também o pedido mostrado na tela. */
  id: string;
  /** O segredo do PaymentIntent, usado para perguntar ao Stripe se o Pix já caiu. */
  clientSecret?: string;
  status: "approved" | "pending" | "rejected" | "in_process";
  paymentMethod: "pix" | "credit_card";
  total: number;
  customer: CustomerData;
  tracking: TrackingData;
  /**
   * A chave de desduplicação do Meta. É o mesmo id do PaymentIntent que o webhook
   * manda na Conversions API — assim a venda conta uma vez só, venha do navegador ou
   * do servidor.
   */
  eventId: string;
  /** O Pix "copia e cola". */
  qrCode?: string;
  /** A imagem do QR Code. O Stripe entrega uma URL, não base64. */
  qrCodeImageUrl?: string;
  expirationDate?: string;
  rejectionMessage?: string;
  createdAt: string;
}
