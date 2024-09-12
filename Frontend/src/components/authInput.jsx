import react from "react";
import { useSelector } from "react-redux";

const Input = ({ type, name, value, handleChange, label, ...rest }) => {
    const { errors } = useSelector((state) => state.auth);

    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                id={name}
                value={value || ""}
                onChange={handleChange}
                className={`block focus:caret-gray-400 font-light w-full px-2 py-2 mt-3 text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-400 peer `}
                required
                autoComplete="off"
                {...rest}
            />
            <label
                htmlFor={name}
                className={`absolute left-2 top-0.5 text-gray-600 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-left peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-indigo-600`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
