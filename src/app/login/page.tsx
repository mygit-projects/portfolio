import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in — Portfolio CMS",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
