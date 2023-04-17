import type { PageProps } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";

export default function LoginPage(props: PageProps) {
  const error = props.url.searchParams.get("error");

  return (
    <App
      title="Login - things"
      description="Log in to your things account to create your own to do lists!"
    >
      <div class="auth-container">
        <form class="login auth-form" action="/api/login" method="POST">
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          {error && <p class="notice-error">{error}</p>}
          <p class="notice-secondary">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </App>
  );
}
