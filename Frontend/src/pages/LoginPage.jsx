import AuthCard from "../components/common/AuthCard";
import LoginForm from "../components/common/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C8102E] to-[#a00e25] relative">
      <div className="absolute inset-0 bg-center bg-cover opacity-20"
        style={{ backgroundImage: "url('/bg-logo.png')" }}></div>
      <AuthCard title="Crimson Event Hub">
        <p className="text-gray-600 mb-5">Login to your Account</p>
        <LoginForm />
      </AuthCard>
    </div>
  );
}
