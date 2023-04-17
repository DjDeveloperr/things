import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async POST(request, ctx) {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    assert(typeof email === "string");
    assert(typeof password === "string");

    const headers = new Headers();
    const { error } = await ctx.state.supabaseClient
      .auth.signInWithPassword({
        email,
        password,
      });

    let redirectUrl = new URL(request.url).searchParams.get("redirect_url") ??
      "/";
    if (error) {
      redirectUrl = `/login?error=${encodeURIComponent(error.message)}`;
    }

    headers.set("location", redirectUrl);
    return new Response(null, { headers, status: 302 });
  },
};
