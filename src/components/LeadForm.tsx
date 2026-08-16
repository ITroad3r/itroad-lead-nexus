import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, ShieldCheck, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const leadSchema = z.object({
  full_name: z.string().trim().min(2, "Merci d'indiquer votre nom").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Numéro de téléphone invalide")
    .max(40)
    .regex(/^[0-9+()\s.-]+$/, "Numéro de téléphone invalide"),
  company: z.string().trim().min(2, "Merci d'indiquer votre société").max(150),
  message: z.string().trim().max(2000).optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof leadSchema>, string>>;

export function LeadForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (key: keyof typeof values) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("loading");

    const { error } = await supabase.from("leads").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      message: parsed.data.message || null,
    });

    setStatus(error ? "error" : "success");
  }

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border p-8 text-center shadow-[var(--shadow-elevated)] ${
          isDark
            ? "border-white/20 bg-white/10 backdrop-blur"
            : "border-brand/40 bg-card"
        }`}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
          <CheckCircle2 className="h-7 w-7 text-brand" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">Nous avons bien reçu votre demande</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Merci ! Un consultant IT ROAD GROUP vous contactera dans les <strong>24 heures</strong>{" "}
          pour échanger sur votre besoin et vous proposer un dispositif Nearshore Hybride adapté.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-2xl border p-6 shadow-[var(--shadow-elevated)] sm:p-8 ${
        isDark
          ? "border-white/15 bg-white/10 backdrop-blur"
          : "border-border bg-card"
      }`}
    >
      <h3 className="text-xl font-semibold sm:text-2xl">Être rappel sous 24h</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Remplissez vos coordonnées. Un consultant vous appelle gratuitement.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          id="full_name"
          label="Nom et prénom *"
          placeholder="Nom et prénom"
          value={values.full_name}
          onChange={update("full_name")}
          error={errors.full_name}
          autoComplete="name"
        />
        <Field
          id="company"
          label="Société *"
          placeholder="Société"
          value={values.company}
          onChange={update("company")}
          error={errors.company}
          autoComplete="organization"
        />
        <Field
          id="email"
          label="Email professionnel *"
          type="email"
          placeholder="Email professionnel"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id="phone"
          label="Téléphone *"
          type="tel"
          placeholder="Téléphone"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="message">Décrivez votre besoin (optionnel)</Label>
        <Textarea
          id="message"
          rows={3}
          maxLength={2000}
          placeholder="Décrivez votre besoin"
          value={values.message}
          onChange={(e) => update("message")(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-destructive">
          L'envoi a échoué. Merci de réessayer ou de nous contacter via WhatsApp.
        </p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="xl"
        className="mt-6 w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Être rappel sous 24h
      </Button>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-brand" />
        Données confidentielles, conformes RGPD. Aucun spam.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        {...rest}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
