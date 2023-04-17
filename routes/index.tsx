import { App } from "@/components/App.tsx";
import { type AccountState } from "@/routes/_middleware.ts";
import { type PageProps } from "$fresh/server.ts";
import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers<AccountState, AccountState> = {
  async GET(_request, ctx) {
    await ctx.state.fetchTodoLists();
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<AccountState>) {
  return (
    <App>
      <div>
        <p>
          welcome to things!
        </p>
        <p>
          logged in as: {props.data.session?.user.user_metadata.name}
        </p>
      </div>
    </App>
  );
}
