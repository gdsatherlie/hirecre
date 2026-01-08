import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="grid" style={{ placeItems: "start" }}>
      <AuthForm mode="login" />
    </div>
  );
}
