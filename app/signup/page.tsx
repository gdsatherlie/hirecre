import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="grid" style={{ placeItems: "start" }}>
      <AuthForm mode="signup" />
    </div>
  );
}
