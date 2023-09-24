import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async(data: any) => {
    const response  = await axios.post("http://localhost:8000/register",data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("email", {
              required: "Please Enter Your Email!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter A Valid Email!",
              },
            })}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {typeof errors.email?.message === "string" && (
            <p className="text-red-700">
              {" "}
              {errors?.email?.message ?? ""}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {typeof errors.password?.message === "string" && (
            <p className="text-red-700">
              {" "}
              {errors?.password?.message ?? ""}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("confirmPassword", {
              required: "Please Confirm Your Password",
              validate: (value) =>
                value === watch("password") || "Password does not match!",
            })}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {typeof errors.confirmPassword?.message === "string" && (
            <p className="text-red-700">
              {" "}
              {errors?.confirmPassword?.message ?? ""}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("firstName", { required: true,minLength:{
                value: 3,
                message: "First Name must be at least 3 characters",
              } })}
              type="text"
              name="firstName"
              id="firstName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="firstName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
            {typeof errors.firstName?.message === "string" && (
            <p className="text-red-700">
              {" "}
              {errors?.firstName?.message ?? ""}
            </p>
          )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("lastName", { required: true,minLength:{
                value: 3,
                message: "Last name must be at least 3 characters",
              } })}
              type="text"
              name="lastName"
              id="lastName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="lastName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
            {typeof errors.lastName?.message === "string" && (
            <p className="text-red-700">
              {" "}
              {errors?.lastName?.message ?? ""}
            </p>
          )}
          </div>

        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("phone", {
                required: "Minimum and maximum number of digits required is 10",
                minLength: {
                  value: 10,
                  message: "Minimum number of digits required is 10",
                },
                maxLength: {
                  value: 10,
                  message: "Maximum number of digits required is 10",
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number",
                },
              })}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
            {typeof errors.phone?.message === "string" && (
              <p className="text-red-700">
                {" "}
                {errors?.phone?.message ?? ""}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              {...register("company", {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    "Company name must have 3 characters minimum length.",
                },
              })}
              type="text"
              name="company"
              id="company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Company (Ex. Google)
            </label>
            {typeof errors.company?.message === "string" && (
              <p className="text-red-700">
                {" "}
                {errors?.company?.message ?? ""}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-[crimson] hover:bg-[#a3253e] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-bg-[#a3253e] dark:hover:bg-bg-[#a3253e] dark:focus:ring-bg-[#a3253e]"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUp;
