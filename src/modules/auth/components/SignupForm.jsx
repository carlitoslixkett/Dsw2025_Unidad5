import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../services/register";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import { useState } from "react";

function SignupForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
   defaultValues: {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: ""  // <-- AGREGAR ESTE
},

  });

  const onSubmit = async (formData) => {
    const { error } = await registerService(formData);

    if (error) {
      setErrorMessage(error.message || "Error al registrarse");
      return;
    }

    // Registro exitoso
    navigate("/login");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Usuario */}
      <Input
        label="Usuario"
        {...register("username", { required: "Campo obligatorio" })}
        error={errors.username?.message}
      />

      {/* Email */}
      <Input
        label="Email"
        {...register("email", {
          required: "Campo obligatorio",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Email inválido",
          },
        })}
        error={errors.email?.message}
      />

      {/* Contraseña */}
      <Input
        label="Contraseña"
        type="password"
        {...register("password", { required: "Campo obligatorio" })}
        error={errors.password?.message}
      />

      {/* Confirmación */}
      <Input
        label="Confirmar Contraseña"
        type="password"
        {...register("confirmPassword", {
          required: "Campo obligatorio",
          validate: (value) =>
            value === watch("password") || "Las contraseñas no coinciden",
        })}
        error={errors.confirmPassword?.message}
      />

      {/* Botón */}
      <Button type="submit">Crear Cuenta</Button>

      {/* Error */}
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <Button
        variant="secondary"
        onClick={() => navigate("/login")}
        type="button"
      >
        Volver al inicio
      </Button>

      {/* Teléfono */}
<Input
  label="Teléfono"
  {...register("phoneNumber", { required: "Campo obligatorio" })}
  error={errors.phoneNumber?.message}
/>

    </form>
  );
}

export default SignupForm;
