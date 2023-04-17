import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";
import {
  createTodoListEntry,
  deleteTodoList,
  renameTodoList,
} from "@/utils/todos.ts";

export const handler: Handlers<unknown, AccountState> = {
  async POST(request, ctx) {
    const listId = ctx.params.id;
    const form = await request.formData();
    const name = form.get("name");
    assert(typeof name === "string");
    const list = await createTodoListEntry(
      ctx.state.supabaseClient,
      listId,
      name,
    );
    return new Response(null, {
      headers: {
        location: `/list/${list.id}`,
      },
      status: 302,
    });
  },

  async DELETE(_request, ctx) {
    const listId = ctx.params.id;
    await deleteTodoList(ctx.state.supabaseClient, listId);
    return new Response(null, {
      headers: {
        location: "/",
      },
      status: 302,
    });
  },

  async PATCH(request, ctx) {
    const form = await request.formData();
    const listId = ctx.params.id;
    const name = form.get("name");
    assert(typeof name === "string");
    await renameTodoList(
      ctx.state.supabaseClient,
      listId,
      name,
    );
    return new Response(null, {
      headers: {
        location: `/list/${listId}`,
      },
      status: 302,
    });
  },
};
