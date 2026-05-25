import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getSupabaseKey(): string | undefined {
  const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return publishable || anon;
}

function assertSupabaseConfig(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = getSupabaseKey();

  if (!url || !key) {
    throw new Error(
      "Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (ou NEXT_PUBLIC_SUPABASE_ANON_KEY) no .env.local",
    );
  }

  if (key.includes("...") || key.length < 80) {
    throw new Error(
      "Chave Supabase incompleta no .env.local. Cole a chave inteira do painel (Settings → API Keys), sem reticências.",
    );
  }

  const isPublishable = key.startsWith("sb_publishable_");
  const isLegacyJwt = key.startsWith("eyJ");

  if (!isPublishable && !isLegacyJwt) {
    throw new Error(
      "Chave Supabase inválida. Use a Publishable key (sb_publishable_...) ou a legacy anon key (eyJ...).",
    );
  }

  return { url, key };
}

function createSupabaseClient(): SupabaseClient {
  const { url, key } = assertSupabaseConfig();
  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createSupabaseClient();
  }
  return client;
}

/** Cliente Supabase para uso no browser (login, cadastro, etc.) */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return Reflect.get(getSupabase(), prop);
  },
});
