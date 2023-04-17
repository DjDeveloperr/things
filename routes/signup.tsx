import type { PageProps } from "$fresh/server.ts";
import { App } from "@/components/App.tsx";

export default function SignupPage(props: PageProps) {
  const error = props.url.searchParams.get("error");

  return (
    <App
      title="Sign Up - things"
      description="Sign up for a things account to create your own to do lists!"
    >
      <div class="auth-container">
        <form class="signup auth-form" action="/api/signup" method="POST">
          <h2>Sign Up</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p class="notice-error">{error}</p>}
          <p class="notice-secondary">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </App>
  );
}
