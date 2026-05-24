"use client";

import { useState } from "react";
import Link from "next/link";

const BARBEARIA = "Barbearia Estilo & Corte";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    active: true,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Agenda",
    href: "#",
    active: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Criar Post",
    href: "/criar-post",
    active: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: "Clientes",
    href: "#",
    active: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    active: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    label: "Configurações",
    href: "#",
    active: false,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.543.94 1.543 3.311 0 4.251a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.543-.94-1.543-3.311 0-4.251a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const statsCards = [
  {
    title: "Agendamentos Hoje",
    value: "8",
    change: "+2 vs ontem",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Clientes Novos",
    value: "3",
    change: "Esta semana",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    title: "Horários Livres",
    value: "4",
    change: "Disponíveis hoje",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Posts Criados",
    value: "12",
    change: "Este mês",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const proximosAgendamentos = [
  { hora: "09:00", cliente: "João Silva", servico: "Corte + Barba", status: "confirmado" },
  { hora: "10:30", cliente: "Pedro Santos", servico: "Corte", status: "confirmado" },
  { hora: "11:00", cliente: "Carlos Mendes", servico: "Barba", status: "pendente" },
  { hora: "14:00", cliente: "Lucas Oliveira", servico: "Corte Degradê", status: "confirmado" },
  { hora: "15:30", cliente: "Rafael Costa", servico: "Corte + Sobrancelha", status: "confirmado" },
  { hora: "17:00", cliente: "André Ferreira", servico: "Corte", status: "pendente" },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2979ff]/15 ring-1 ring-[#2979ff]/30">
        <svg className="h-5 w-5 text-[#2979ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      {!compact && (
        <p className="text-base font-bold tracking-tight text-white">
          BatePronto <span className="text-[#2979ff]">IA</span>
        </p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-white">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0a0f1e] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                item.active
                  ? "bg-[#2979ff] text-white shadow-lg shadow-[#2979ff]/25"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/criar-post"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2979ff] to-[#1565c0] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2979ff]/30 transition hover:from-[#1c6ae6] hover:to-[#0d47a1]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Criar Post com IA
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a0f1e]/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Abrir menu"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden lg:block">
              <Logo />
            </div>

            <div className="hidden h-6 w-px bg-white/10 sm:block" />

            <div>
              <p className="text-sm font-semibold text-white">{BARBEARIA}</p>
              <p className="text-xs capitalize text-slate-400">{hoje}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 sm:block"
            >
              Notificações
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2979ff]/20 text-sm font-bold text-[#2979ff] ring-1 ring-[#2979ff]/30">
              EC
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Olá, bem-vindo de volta!
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Aqui está o resumo do seu dia na {BARBEARIA}.
              </p>
            </div>

            <Link
              href="/criar-post"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2979ff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2979ff]/30 transition hover:bg-[#1c6ae6] sm:shrink-0"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Criar Post com IA
            </Link>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statsCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#2979ff]/30 hover:bg-white/[0.07]"
              >
                <div className="w-fit rounded-xl bg-[#2979ff]/10 p-2.5 text-[#2979ff] ring-1 ring-[#2979ff]/20">
                  {card.icon}
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight">{card.value}</p>
                <p className="mt-1 text-sm font-medium text-white">{card.title}</p>
                <p className="mt-0.5 text-xs text-slate-400">{card.change}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5">
            <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-lg font-semibold">Próximos agendamentos</h2>
                <p className="text-sm text-slate-400">Agenda de hoje</p>
              </div>
              <Link
                href="#"
                className="text-sm font-medium text-[#2979ff] transition hover:text-[#5c9dff]"
              >
                Ver agenda completa →
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {proximosAgendamentos.map((agendamento) => (
                <div
                  key={`${agendamento.hora}-${agendamento.cliente}`}
                  className="flex flex-col gap-3 px-5 py-4 transition hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#2979ff]/10 ring-1 ring-[#2979ff]/20">
                      <span className="text-xs font-bold text-[#2979ff]">
                        {agendamento.hora.split(":")[0]}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        :{agendamento.hora.split(":")[1]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{agendamento.cliente}</p>
                      <p className="text-sm text-slate-400">{agendamento.servico}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${
                      agendamento.status === "confirmado"
                        ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                    }`}
                  >
                    {agendamento.status === "confirmado" ? "Confirmado" : "Pendente"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
