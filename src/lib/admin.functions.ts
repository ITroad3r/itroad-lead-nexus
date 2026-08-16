import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ALLOWED_ADMIN_DOMAINS = ["itroadgroup.com"];

/**
 * Grants the admin role to signed-in users whose email belongs to the company
 * domain. Safe to call on every back-office load: it is idempotent.
 */
export const ensureAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims["email"] ?? "").toLowerCase();
    const domain = email.split("@")[1];

    if (!domain || !ALLOWED_ADMIN_DOMAINS.includes(domain)) {
      return { isAdmin: false as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert(
        { user_id: context.userId, role: "admin" },
        { onConflict: "user_id,role", ignoreDuplicates: true },
      );

    if (error) {
      console.error("[ensureAdminRole]", error.message);
      return { isAdmin: false as const };
    }

    return { isAdmin: true as const };
  });
