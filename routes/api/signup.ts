import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { type AccountState } from "@/routes/_middleware.ts";

export const handler: Handlers<unknown, AccountState> = {
  async POST(request, ctx) {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("name");
    assert(typeof email === "string");
    assert(typeof password === "string");
    assert(typeof name === "string");

    const headers = new Headers();
    const { error } = await ctx
      .state
      .supabaseClient
      .auth
      .signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

    let redirectUrl = new URL(request.url).searchParams.get("redirect_url") ??
      "/";
    if (error) {
      redirectUrl = `/signup?error=${encodeURIComponent(error.message)}`;
    }

    headers.set("location", redirectUrl);

    return new Response(null, { headers, status: 302 });
  },
};
