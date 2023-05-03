import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUserMutation, User } from "../generated/graphql";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useStateProvider } from "../context/StateProvider";
import { toast } from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const password = useRef<string | {}>({});
  password.current = watch("password", "");

  const [{}, dispatch] = useStateProvider();

  // * Mutation
  const [loginUser, { loading, data: user, error }] = useLoginUserMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("clicked");
    // dispatch({
    //   type: "SET_LOADING",
    //   payload: loading,
    // });

    console.log("error => ", error);

    await loginUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    })
      .then((res) => {
        if (error) {
          toast.error(error?.message);
          console.log(error);
          return;
        }
        res.data?.login &&
          dispatch({
            type: "SET_USER",
            payload: res.data?.login as User,
          });

        res.data?.login &&
          localStorage.setItem("reddit_user", JSON.stringify(res.data?.login));

        res.data?.login && navigate("/");
      })
      .catch((err) => toast.error(err?.message));
  };

  return (
    <div className="flex flex-col  py-5 px-4 h-[90vh] bg-gray-100 space-y-10">
      <img
        className="h-60 object-contain mt-6"
        src="https://logos-download.com/wp-content/uploads/2016/06/Reddit_logo_full_1.png"
        alt=""
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl w-full bg-white px-8 border shadow-sm pb-7 mx-auto"
        action="">
        {errors && (
          <div className="py-5 max-w-3xl mx-auto text-red-600">
            <p> {errors.email && "Email is required"} </p>
          </div>
        )}

        <Input label="Email" name="email" register={register} type="email" />
        <Input
          label="Password"
          name="password"
          register={register}
          type="password"
        />
        <Button
          type="submit"
          className="bg-orange-600"
          loading={loading}
          text="Login"
        />
        <div className="mt-2">
          don't have an account ?
          <Link className="text-orange-500 underline ml-1" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
