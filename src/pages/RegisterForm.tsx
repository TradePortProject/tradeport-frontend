import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ENDPOINTS from "../config/apiConfig";

interface RegisterFormData {
  loginID: string;
  userName: string;
  strPassword: string;
  role: number;
  phoneNo: string;
  address: string;
  remarks?: string;
  createdOn: string;
  isActive: boolean;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // Add debug logging to see what's coming from Redux
  console.log("User from Redux:", user);
  console.log("Role from Redux:", user?.role);

  // Brute force mapping function
  const getRoleNumber = (role: string | number | undefined | null): number => {
    // If it's already a number, return it
    if (typeof role === "number") return role;

    // If it's a string, map it
    if (typeof role === "string") {
      if (role === "admin") return 1;
      if (role === "retailer") return 2;
      if (role === "manufacturer") return 3;
      if (role === "delivery") return 4;

      // Try to parse it as a number
      const parsed = parseInt(role, 10);
      if (!isNaN(parsed)) return parsed;
    }

    // Default to retailer
    return 2;
  };

  const userRole = getRoleNumber(user?.role);
  console.log("Mapped role number:", userRole);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      loginID: user?.email || "",
      strPassword: "cGFzc3dvcmQxMjM=",
      role: userRole, // Use our mapped role
      createdOn: new Date().toISOString(),
      isActive: true,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        ...data,
        strPassword: btoa(data.strPassword), // Encode password in Base64
      };

      console.log("Submitting Payload:", payload);

      const response = await axios.post(
        ENDPOINTS.USER.REGISTER,
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Registration Failed", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Complete Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Login ID (Email) - Non-Editable */}
          <div>
            <label className="block font-medium">Email (Login ID)</label>
            <input
              type="email"
              {...register("loginID")}
              readOnly
              className="w-full rounded-md border border-gray-300 bg-gray-200 p-2"
            />
          </div>

          {/* User Name */}
          <div>
            <label className="block font-medium">User Name</label>
            <input
              type="text"
              {...register("userName", { required: "User Name is required" })}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              {...register("phoneNo", { required: "Phone number is required" })}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            {errors.phoneNo && (
              <p className="text-red-500">{errors.phoneNo.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block font-medium">Remarks</label>
            <input
              type="text"
              {...register("remarks")}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Hidden Fields */}
          <input type="hidden" {...register("strPassword")} />
          <input type="hidden" {...register("role")} />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 font-medium text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;