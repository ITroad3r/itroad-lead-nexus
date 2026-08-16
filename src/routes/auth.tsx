import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion back-office — IT ROAD GROUP" },
      {
        name: "description",
        content:
          "Espace réservé aux équipes IT ROAD GROUP pour consulter les demandes de contact Nearshore.",
      },
      { property: "og:title", content: "Connexion back-office — IT ROAD GROUP" },
      {
        property: "og:description",
        content: "Accès sécurisé au suivi des leads Nearshore IT ROAD GROUP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return setError(error.message);
      void navigate({ to: "/admin" });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);
    if (error) return setError(error.message);
    setInfo(
      "Compte créé. Si une confirmation par email est demandée, validez-la puis connectez-vous.",
    );
    setMode("signin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elevated)]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15">
          <LockKeyhole className="h-6 w-6 text-brand" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">Back-office IT ROAD GROUP</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accès réservé aux collaborateurs (adresse @itroadgroup.com).
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email professionnel</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        {info && <p className="mt-4 text-sm text-brand">{info}</p>}

        <Button type="submit" variant="brand" size="xl" className="mt-6 w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "signin" ? "Se connecter" : "Créer mon compte"}
        </Button>

        <button
          type="button"
          className="mt-4 w-full text-center text-sm text-muted-foreground underline"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setInfo(null);
          }}
        >
          {mode === "signin"
            ? "Première connexion ? Créer un compte"
            : "J'ai déjà un compte — se connecter"}
        </button>
      </form>
    </main>
  );
}
