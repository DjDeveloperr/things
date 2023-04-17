import { App } from "@/components/App.tsx";
import { type AccountState } from "@/routes/_middleware.ts";
import { type PageProps } from "$fresh/server.ts";
import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers<AccountState, AccountState> = {
  async GET(_request, ctx) {
    await ctx.state.fetchTodoListEntries(ctx.params.id);
    return ctx.render(ctx.state);
  },
};

export default function List(props: PageProps<AccountState>) {
  return (
    <App>
      <div>
        <p>
          welcome to things!
        </p>
        <p>
          logged in as: {props.data.session?.user.user_metadata.name}
        </p>
        <form action={`/api/list/${props.params.id}`} method="POST">
          <input type="text" name="name" placeholder="Item Name" required />
          <button type="submit">Add Item</button>
        </form>
        <ul>
          {props.data.todoListEntries!.map((entry) => (
            <li>
              {entry.name} -{" "}
              {entry.completed_at ? "completed" : "not completed"}
              ({entry.created_at})
            </li>
          ))}
        </ul>
      </div>
    </App>
  );
}
