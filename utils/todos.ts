import { type SupabaseClient } from "@/utils/supabase.ts";

export interface TodoList {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface TodoListEntry {
  id: string;
  list_id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export async function getTodoLists(client: SupabaseClient) {
  const { data } = await client
    .from("things_lists")
    .select("id, name, user_id, created_at")
    .order("created_at", { ascending: false })
    .throwOnError();
  return (data ?? []) as TodoList[];
}

export async function createTodoList(
  client: SupabaseClient,
  name: string,
) {
  const { data } = await client
    .from("things_lists")
    .insert({ name })
    .select()
    .single()
    .throwOnError();
  return data as TodoList;
}

export async function deleteTodoList(
  client: SupabaseClient,
  listId: string,
) {
  await client
    .from("things_lists")
    .delete()
    .eq("id", listId)
    .throwOnError();
}

export async function renameTodoList(
  client: SupabaseClient,
  listId: string,
  name: string,
) {
  await client
    .from("things_lists")
    .update({ name })
    .eq("id", listId)
    .throwOnError();
}

export async function getTodoListEntries(
  client: SupabaseClient,
  listId: string,
) {
  const { data } = await client
    .from("things_list_entries")
    .select("id, list_id, user_id, name, created_at, updated_at, completed_at")
    .eq("list_id", listId)
    .order("created_at", { ascending: false })
    .throwOnError();
  return (data ?? []) as TodoListEntry[];
}

export async function createTodoListEntry(
  client: SupabaseClient,
  listId: string,
  name: string,
) {
  const { data } = await client
    .from("things_list_entries")
    .insert({ list_id: listId, name })
    .select()
    .single()
    .throwOnError();
  return data as TodoListEntry;
}

export async function updateTodoListEntry(
  client: SupabaseClient,
  id: string,
  name: string,
) {
  const { data } = await client
    .from("things_list_entries")
    .update({ name, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
    .throwOnError();
  return data as TodoListEntry;
}

export async function deleteTodoListEntry(
  client: SupabaseClient,
  id: string,
) {
  await client
    .from("things_list_entries")
    .delete()
    .eq("id", id)
    .throwOnError();
}

export async function completeTodoListEntry(
  client: SupabaseClient,
  id: string,
) {
  const completed_at = new Date().toISOString();
  const { data } = await client
    .from("things_list_entries")
    .update({ completed_at, updated_at: completed_at })
    .eq("id", id)
    .select()
    .single()
    .throwOnError();
  return data as TodoListEntry;
}
