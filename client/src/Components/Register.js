import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);

  // Connect yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  // Redirect after successful registration
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  // Submit handler
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="login">
      <h2>Create Your Account</h2>

      {error && <div className="msg">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" {...register("name")} />
          <p style={{ color: "red" }}>{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" {...register("email")} />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input type="text" placeholder="Enter your address" {...register("address")} />
          <p style={{ color: "red" }}>{errors.address?.message}</p>
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Create a password" {...register("password")} />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role</label>
          <select {...register("role")}>
            <option value="">Select role</option>
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
          </select>
          <p style={{ color: "red" }}>{errors.role?.message}</p>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
