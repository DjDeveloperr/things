import type { Handlers } from "$fresh/server.ts";
import { assert } from "std/testing/asserts.ts";
import { AccountState } from "@/routes/_middleware.ts";
import { deleteTodoListEntry, updateTodoListEntry } from "@/utils/todos.ts";

export const handler: Handlers<unknown, AccountState> = {
  async DELETE(_request, ctx) {
    const todoId = ctx.params.todo_id;
    const listId = ctx.params.id;
    await deleteTodoListEntry(ctx.state.supabaseClient, todoId);
    return new Response(null, {
      headers: {
        location: `/list/${listId}`,
      },
      status: 302,
    });
  },

  async PATCH(request, ctx) {
    const form = await request.formData();
    const listId = ctx.params.id;
    const todoId = ctx.params.todo_id;
    const name = form.get("name");
    assert(typeof name === "string");
    await updateTodoListEntry(
      ctx.state.supabaseClient,
      todoId,
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
