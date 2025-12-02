import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Crear Cuenta</h1>

        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
