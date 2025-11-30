import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h1>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
