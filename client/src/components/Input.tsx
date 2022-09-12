import { Path, UseFormRegister, Validate } from "react-hook-form";

export default function Input<T extends object>({
  register,
  label,
  type,
  name,
  validate,
}: {
  register: UseFormRegister<T>;
  label: string;
  type: string;
  name: keyof T;
  validate?: Validate<string>;
}) {
  return (
    <div className="relative z-0 mb-6 w-full group">
      <input
        type={type}
        id={name as string}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        {...register(name as unknown as Path<T>, {
          required: true,
          validate: validate,
        })}
        required
      />
      <label
        htmlFor={name as string}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {label}
      </label>
    </div>
  );
}
