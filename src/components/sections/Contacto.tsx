"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, LoaderCircle, Check } from "lucide-react";
import { home } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const { contacto } = home;

type Errors = Partial<Record<"nome" | "email" | "assunto" | "mensagem" | "consent", string>>;
type Status = "idle" | "submitting" | "success";

const inputBase =
  "w-full min-h-11 rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink transition-colors placeholder:text-ink-muted/60 focus:border-brand-blue";

export function Contacto() {
  const [values, setValues] = useState({
    nome: "",
    email: "",
    entidade: "",
    assunto: "",
    mensagem: "",
    consent: false,
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Prefill do assunto via ?assunto= (vindo dos botões de Parcerias/Associados).
  useEffect(() => {
    const assunto = new URLSearchParams(window.location.search).get("assunto");
    if (assunto && (contacto.assuntos as readonly string[]).includes(assunto)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- prefill único a partir da URL, só após montar (evita mismatch de hidratação)
      setValues((v) => ({ ...v, assunto }));
    }
  }, []);

  function validate(): Errors {
    const e: Errors = {};
    if (!values.nome.trim()) e.nome = "Indique o seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Indique um email válido.";
    if (!values.assunto) e.assunto = "Escolha um assunto.";
    if (values.mensagem.trim().length < 10) e.mensagem = "Escreva uma mensagem com mais detalhe.";
    if (!values.consent) e.consent = "É necessário aceitar a Política de Privacidade.";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (values.website) return; // honeypot preenchido → ignora (spam)
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("submitting");
    // TODO: ligar ao route handler /api/contact (Resend). Envio real pendente —
    // destinatários: novactassociacao@gmail.com, mjoaotcarneiro@gmail.com, sofia.cardoso@cauditis.pt
    setTimeout(() => setStatus("success"), 900);
  }

  function update<K extends keyof typeof values>(key: K, val: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  return (
    <section id="contacto" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{contacto.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.25rem)] font-normal leading-tight tracking-tight text-ink text-balance">
            {contacto.title}
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-ink-muted">{contacto.text}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          {/* Formulário */}
          <Reveal>
            {status === "success" ? (
              <div className="flex h-full min-h-[20rem] flex-col items-start justify-center rounded-[18px] bg-surface-muted p-8 ring-1 ring-border">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white">
                  <Check className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">Mensagem registada</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                  Obrigado pelo seu contacto. Responderemos com a maior brevidade. (Envio por email
                  ainda por ativar nesta fase de desenvolvimento.)
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="grid gap-5">
                {/* Honeypot — invisível para humanos, apanha bots */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Não preencher
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => update("website", e.target.value)}
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nome" htmlFor="nome" error={errors.nome}>
                    <input
                      id="nome"
                      type="text"
                      autoComplete="name"
                      value={values.nome}
                      onChange={(e) => update("nome", e.target.value)}
                      aria-invalid={!!errors.nome}
                      aria-describedby={errors.nome ? "nome-err" : undefined}
                      className={cn(inputBase, errors.nome ? "border-red-500" : "border-border")}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-err" : undefined}
                      className={cn(inputBase, errors.email ? "border-red-500" : "border-border")}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Entidade" htmlFor="entidade" optional>
                    <input
                      id="entidade"
                      type="text"
                      autoComplete="organization"
                      value={values.entidade}
                      onChange={(e) => update("entidade", e.target.value)}
                      className={cn(inputBase, "border-border")}
                    />
                  </Field>
                  <Field label="Assunto" htmlFor="assunto" error={errors.assunto}>
                    <select
                      id="assunto"
                      value={values.assunto}
                      onChange={(e) => update("assunto", e.target.value)}
                      aria-invalid={!!errors.assunto}
                      aria-describedby={errors.assunto ? "assunto-err" : undefined}
                      className={cn(
                        inputBase,
                        "appearance-none",
                        errors.assunto ? "border-red-500" : "border-border",
                        values.assunto ? "text-ink" : "text-ink-muted/60"
                      )}
                    >
                      <option value="" disabled>
                        Selecione um assunto
                      </option>
                      {contacto.assuntos.map((a) => (
                        <option key={a} value={a} className="text-ink">
                          {a}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Mensagem" htmlFor="mensagem" error={errors.mensagem}>
                  <textarea
                    id="mensagem"
                    rows={5}
                    value={values.mensagem}
                    onChange={(e) => update("mensagem", e.target.value)}
                    aria-invalid={!!errors.mensagem}
                    aria-describedby={errors.mensagem ? "mensagem-err" : undefined}
                    className={cn(
                      inputBase,
                      "resize-y",
                      errors.mensagem ? "border-red-500" : "border-border"
                    )}
                  />
                </Field>

                <div>
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      aria-invalid={!!errors.consent}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-brand-orange"
                    />
                    <span>
                      Li e aceito a{" "}
                      <Link
                        href={contacto.consentLink.href}
                        className="font-medium text-brand-orange underline underline-offset-2"
                      >
                        {contacto.consentLink.label}
                      </Link>
                      . Os dados recolhidos destinam-se exclusivamente a responder ao seu contacto.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.consent}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(242,100,48,0.9)] transition-[background-color,transform] duration-200 ease-out hover:bg-brand-orange-deep hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none"
                  >
                    {status === "submitting" ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                        A enviar…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Enviar mensagem
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>

          {/* Painel de contactos */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[18px] bg-gradient-brand p-7 text-white">
              {/* Overlay de contraste — obrigatório sob texto branco sobre o gradiente */}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-brand-overlay" />
              {/* Motivo do círculo (assinatura da marca), cortado no canto inferior direito */}
              <svg
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3"
              >
                <circle cx="50" cy="50" r="41" stroke="#fff" strokeWidth="18" opacity="0.22" />
              </svg>
              <div className="relative">
              <h3 className="font-display text-lg">Contactos diretos</h3>
              <ul className="mt-5 space-y-1">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex min-h-11 items-center gap-3 text-sm text-white/85 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex min-h-11 items-center gap-3 text-sm text-white/85 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex gap-3 py-2.5 text-sm text-white/85">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </span>
                </li>
              </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-ink-muted">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-err`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
