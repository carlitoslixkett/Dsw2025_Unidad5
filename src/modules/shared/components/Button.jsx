function Button({ children, type = "button", variant = "default", className = "", ...restProps }) {
  if (!["button", "reset", "submit"].includes(type)) {
    console.warn("type prop not supported");
  }

  const variantStyle = {
    default: "bg-purple-200 hover:bg-purple-300 transition",
    secondary: "bg-gray-100 hover:bg-gray-200 transition",
  };

  return (
    <button
      {...restProps}
      type={type}
      className={`${variantStyle[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
