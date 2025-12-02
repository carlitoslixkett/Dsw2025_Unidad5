import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Iniciar Sesión</h1>

        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
