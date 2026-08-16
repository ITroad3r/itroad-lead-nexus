import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Download, LogOut, RefreshCw, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ensureAdminRole } from "@/lib/admin.functions";

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  message: string | null;
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Leads Nearshore — Back-office IT ROAD GROUP" },
      {
        name: "description",
        content:
          "Consultez et exportez les demandes de contact reçues via la landing page Nearshore.",
      },
      { property: "og:title", content: "Leads Nearshore — Back-office IT ROAD GROUP" },
      {
        property: "og:description",
        content: "Suivi et export des leads Nearshore IT ROAD GROUP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const claimAdmin = useServerFn(ensureAdminRole);
  const [state, setState] = useState<"loading" | "ready" | "denied">("loading");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      void navigate({ to: "/auth" });
      return;
    }

    await claimAdmin({ data: undefined }).catch(() => undefined);

    const { data, error } = await supabase
      .from("leads")
      .select("id, full_name, email, phone, company, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setState("denied");
      return;
    }

    setLeads((data ?? []) as Lead[]);
    setState("ready");
  }, [claimAdmin, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;
    const to = dateTo ? new Date(`${dateTo}T23:59:59.999`) : null;

    return leads.filter((l) => {
      const created = new Date(l.created_at);
      if (from && created < from) return false;
      if (to && created > to) return false;
      if (!q) return true;
      return [l.full_name, l.email, l.phone, l.company, l.message ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, query, dateFrom, dateTo]);

  async function exportExcel() {
    const writeXlsxFile = (await import("write-excel-file/browser")).default;

    const headerStyle = {
      fontWeight: "bold" as const,
      backgroundColor: "#12263F",
      color: "#FFFFFF",
    };

    const data = [
      [
        { value: "Date de réception", ...headerStyle },
        { value: "Heure", ...headerStyle },
        { value: "Nom et prénom", ...headerStyle },
        { value: "Société", ...headerStyle },
        { value: "Email", ...headerStyle },
        { value: "Téléphone", ...headerStyle },
        { value: "Besoin exprimé", ...headerStyle },
      ],
      ...filtered.map((l) => {
        const d = new Date(l.created_at);
        return [
          { type: String, value: d.toLocaleDateString("fr-FR") },
          { type: String, value: d.toLocaleTimeString("fr-FR") },
          { type: String, value: l.full_name },
          { type: String, value: l.company },
          { type: String, value: l.email },
          { type: String, value: l.phone },
          { type: String, value: l.message ?? "" },
        ];
      }),
    ];

    const suffix =
      dateFrom || dateTo
        ? `${dateFrom || "debut"}_${dateTo || "aujourdhui"}`
        : new Date().toISOString().slice(0, 10);

    await writeXlsxFile(data as unknown as import("write-excel-file/browser").SheetData, {
      columns: [
        { width: 16 },
        { width: 12 },
        { width: 24 },
        { width: 24 },
        { width: 30 },
        { width: 18 },
        { width: 60 },
      ],
      sheet: "Leads",
      fileName: `leads-itroad-${suffix}.xlsx`,
    });
  }


  async function signOut() {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  }

  if (state === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center text-muted-foreground">
        Chargement du back-office…
      </main>
    );
  }

  if (state === "denied") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold">Accès non autorisé</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Votre compte n'a pas les droits d'accès aux leads. Connectez-vous avec une adresse
          @itroadgroup.com.{error ? ` (${error})` : ""}
        </p>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="h-4 w-4" /> Se déconnecter
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">Leads Nearshore</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-brand" />
              {leads.length} demande{leads.length > 1 ? "s" : ""} enregistrée
              {leads.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => void load()}>
              <RefreshCw className="h-4 w-4" /> Actualiser
            </Button>
            <Button variant="brand" onClick={() => void exportExcel()} disabled={filtered.length === 0}>
              <Download className="h-4 w-4" /> Exporter Excel
            </Button>
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" /> Déconnexion
            </Button>
          </div>
        </header>

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <div className="relative max-w-sm flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Rechercher un lead…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="date-from">
              Du
            </label>
            <Input
              id="date-from"
              type="date"
              className="w-[170px]"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground" htmlFor="date-to">
              Au
            </label>
            <Input
              id="date-to"
              type="date"
              className="w-[170px]"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          {(dateFrom || dateTo) && (
            <Button
              variant="ghost"
              onClick={() => {
                setDateFrom("");
                setDateTo("");
              }}
            >
              Réinitialiser
            </Button>
          )}
          <p className="ml-auto text-sm text-muted-foreground">
            {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Société</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Besoin</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border/60 last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 font-medium">{lead.full_name}</td>
                  <td className="px-4 py-3">{lead.company}</td>
                  <td className="px-4 py-3">
                    <a className="text-brand underline" href={`mailto:${lead.email}`}>
                      {lead.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a className="text-brand underline" href={`tel:${lead.phone}`}>
                      {lead.phone}
                    </a>
                  </td>
                  <td className="max-w-sm px-4 py-3 text-muted-foreground">{lead.message ?? "—"}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                    Aucun lead pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
