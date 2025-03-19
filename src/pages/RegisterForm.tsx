import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const user = useSelector((state: RootState) => state.auth.user); // Get stored user details

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      loginID: user?.email || "", // Prefill email from Redux (Non-editable)
      strPassword: "cGFzc3dvcmQxMjM=", // Dummy password (hidden)
      role: 1, // Default to Wholesaler (hidden)
      createdOn: new Date().toISOString(), // Auto-generate timestamp
      isActive: true, // Default active
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
        "http://localhost:7237/api/User/registerUser",
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
