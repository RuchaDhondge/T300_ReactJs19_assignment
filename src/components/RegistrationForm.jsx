import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  fields: { name: "", email: "", password: "" },
  errors: {},
  success: "",
  submittedUser: null
};

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function registerUserAction(_previousState, formData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const errors = {};

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      fields: { name, email, password },
      errors,
      success: "",
      submittedUser: null
    };
  }

  await wait(2000);

  return {
    fields: { name: "", email: "", password: "" },
    errors: {},
    success: "Registration successful!",
    submittedUser: { name, email }
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="register-button" disabled={pending}>
      {pending ? "Submitting..." : "Register"}
    </button>
  );
}

function RegistrationForm({ onRegisterSuccess }) {
  const [state, formAction, isPending] = useActionState(
    registerUserAction,
    initialState
  );

  useEffect(() => {
    if (state.submittedUser) {
      onRegisterSuccess(state.submittedUser);
    }
  }, [state.submittedUser, onRegisterSuccess]);

  return (
    <form action={formAction} className="register-form">
      <label className="form-field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          defaultValue={state.fields.name}
          aria-invalid={Boolean(state.errors.name)}
        />
        {state.errors.name ? <small className="field-error">{state.errors.name}</small> : null}
      </label>

      <label className="form-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          defaultValue={state.fields.email}
          aria-invalid={Boolean(state.errors.email)}
        />
        {state.errors.email ? (
          <small className="field-error">{state.errors.email}</small>
        ) : null}
      </label>

      <label className="form-field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          defaultValue={state.fields.password}
          aria-invalid={Boolean(state.errors.password)}
        />
        {state.errors.password ? (
          <small className="field-error">{state.errors.password}</small>
        ) : null}
      </label>

      <SubmitButton />

      {isPending ? <p className="form-pending">Submitting registration request...</p> : null}
      {state.success ? <p className="form-success">{state.success}</p> : null}
    </form>
  );
}

export default RegistrationForm;
