"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isLogin = mode === "login";

  function toggleMode() {
    setMode(isLogin ? "signup" : "login");
    setMessage(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage({ type: "success", text: "Login realizado com sucesso!" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Cadastro realizado! Verifique seu e-mail para confirmar a conta.",
        });
      }
    } catch (err) {
      const text =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden bg-[#0a0f1e] px-4 py-10 sm:px-6">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#2979ff]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#2979ff]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2979ff]/15 ring-1 ring-[#2979ff]/30">
            <svg
              className="h-7 w-7 text-[#2979ff]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            BatePronto <span className="text-[#2979ff]">IA</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin
              ? "Entre na sua conta para continuar"
              : "Crie sua conta e comece agora"}
          </p>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-[#2979ff]/5 backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex rounded-xl bg-[#0a0f1e] p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage(null);
              }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                isLogin
                  ? "bg-[#2979ff] text-white shadow-lg shadow-[#2979ff]/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage(null);
              }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-[#2979ff] text-white shadow-lg shadow-[#2979ff]/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Cadastro
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#2979ff] focus:ring-2 focus:ring-[#2979ff]/30"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-300"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#2979ff] focus:ring-2 focus:ring-[#2979ff]/30"
              />
            </div>

            {message && (
              <div
                role="alert"
                className={`rounded-xl px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                    : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2979ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2979ff]/30 transition hover:bg-[#1c6ae6] focus:outline-none focus:ring-2 focus:ring-[#2979ff]/50 focus:ring-offset-2 focus:ring-offset-[#0a0f1e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Aguarde..."
                : isLogin
                  ? "Entrar"
                  : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-medium text-[#2979ff] transition hover:text-[#5c9dff] hover:underline"
            >
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
