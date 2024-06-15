import { Metadata } from "next";
import { Login } from "../components/Login";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In",
};

export default function SignInPage() {
  return (
    <main>
      <Login />
    </main>
  );
}
