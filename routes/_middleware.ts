// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createSupabaseClient, SupabaseClient } from "@/utils/supabase.ts";
import {
  getTodoListEntries,
  getTodoLists,
  TodoList,
  TodoListEntry,
} from "@/utils/todos.ts";

export type Session = Awaited<
  ReturnType<SupabaseClient["auth"]["getSession"]>
>["data"]["session"];

export interface AccountState {
  supabaseClient: SupabaseClient;
  session: Session;
  todoLists?: TodoList[];
  todoListEntries?: TodoListEntry[];
  fetchTodoLists: () => Promise<void>;
  fetchTodoListEntries: (listId: string) => Promise<void>;
}

export async function handler(
  request: Request,
  ctx: MiddlewareHandlerContext<AccountState>,
) {
  const headers = new Headers();
  const supabaseClient = createSupabaseClient(request.headers, headers);

  const { data: { session } } = await supabaseClient.auth.getSession();

  const url = new URL(request.url);
  if (
    !session && !url.pathname.startsWith("/api") &&
    !url.pathname.startsWith("/login") && !url.pathname.startsWith("/signup") &&
    !url.pathname.startsWith("/logout")
  ) {
    headers.set("location", "/login");
    return new Response(null, { headers, status: 302 });
  }

  ctx.state.session = session;
  ctx.state.supabaseClient = supabaseClient;

  ctx.state.fetchTodoLists = async () => {
    ctx.state.todoLists = await getTodoLists(supabaseClient);
  };

  ctx.state.fetchTodoListEntries = async (listId) => {
    ctx.state.todoListEntries = await getTodoListEntries(
      supabaseClient,
      listId,
    );
  };

  const response = await ctx.next();
  headers.forEach((value, key) => response.headers.set(key, value));

  return response;
}
