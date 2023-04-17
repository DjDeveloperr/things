import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";
import { createTodoList } from "@/utils/todos.ts";

export const handler: Handlers<unknown, AccountState> = {
  async POST(request, ctx) {
    const form = await request.formData();
    const name = form.get("name");
    assert(typeof name === "string");
    const list = await createTodoList(ctx.state.supabaseClient, name);
    return new Response(null, {
      headers: {
        location: `/list/${list.id}`,
      },
      status: 302,
    });
  },
};
