import type { Handlers } from "$fresh/server.ts";
import { type AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async GET(_request, ctx) {
    const headers = new Headers({ location: "/" });
    const { error } = await ctx.state.supabaseClient
      .auth.signOut();
    if (error) throw error;
    return new Response(null, { headers, status: 302 });
  },
};
