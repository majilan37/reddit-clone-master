import { SubmitHandler, useForm } from "react-hook-form";
import { Ring } from "@uiball/loaders";
import { useCreateUserMutation } from "../generated/graphql";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const password = useRef<string | {}>({});
  password.current = watch("password", "");

  // * Mutation
  const [reagisterUser, { loading }] = useCreateUserMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await reagisterUser({
      variables: {
        email: data.email,
        username: data.username,
        password: data.password,
      },
    });

    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center py-5 px-4 h-screen bg-gray-100 space-y-5">
      <img
        className="h-52 object-contain "
        src="https://links.papareact.com/fqy"
        alt=""
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl w-full bg-white px-8 border shadow-sm pb-7 mx-auto"
        action="">
        {errors && (
          <div className="py-5 max-w-3xl mx-auto text-red-600">
            <p> {errors.confirmPassword && errors.confirmPassword.message} </p>
            <p> {errors.email && "Email is required"} </p>
            <p> {errors.username && "Username is required"} </p>
          </div>
        )}
        <Input
          label="Username"
          name="username"
          register={register}
          type="text"
        />
        <Input label="Email" name="email" register={register} type="email" />
        <Input
          label="Password"
          name="password"
          register={register}
          type="password"
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          register={register}
          validate={(value) =>
            value === password.current || "Password do not match"
          }
          type="password"
        />
        <button
          className={`bg-orange-600 flex items-center space-x-2 text-white rounded-sm px-5 py-2 transition-all duration-300 ${
            loading && "bg-gray-300 !text-gray-600  "
          } `}>
          {loading && (
            <Ring
              size={20}
              lineWeight={5}
              speed={2}
              color={!loading ? "#fff" : "gray"}
            />
          )}
          <span>{!loading ? "Submit" : "Loading..."}</span>
        </button>
        <div className=" mt-2">
          Already have an account ?{" "}
          <Link className="text-blue-500 underline" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
