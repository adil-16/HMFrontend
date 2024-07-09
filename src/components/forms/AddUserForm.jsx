import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../axios";
import SubmitButton from "../../components/buttons/SubmitButtonHotel";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  businessName: yup.string().required("Business Name is required"),
  contactPerson: yup.string().required("Contact Person is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const AddUserForm = ({ onClose, image, setAdded, updateData, role }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (updateData) {
      setValue("businessName", updateData.businessName);
      setValue("contactPerson", updateData.contactPerson);
      setValue("phone", updateData.phone);
      setValue("email", updateData.email);
    }
  }, [updateData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("businessName", data.businessName);
    formData.append("contactPerson", data.contactPerson);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("role", role);

    let url = "";
    if (updateData) {
      url = `/user/updateUser/${updateData.id}`;
      try {
        await axios.put(url, formData);
        setAdded((prev) => !prev);
        toast.success("User updated successfully!");
        onClose();
      } catch (err) {
        setError(err.response?.data?.data?.error || "An error occurred");
        toast.error(err.response?.data?.data?.error || "An error occurred");
      }
    } else {
      url = "/user/addUser";
      try {
        await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setAdded((prev) => !prev);
        toast.success("User added successfully!");
        onClose();
      } catch (err) {
        setError(err.response?.data?.data?.error || "An error occurred");
        toast.error(err.response?.data?.data?.error || "An error occurred");
      }
    }
    setLoading(false);
  };

  return (
    <div className="mx-4 md:ml-14 md:mr-48 h-full overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Business Name
          </label>
          <Controller
            name="businessName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`border border-blue3 text-black bg-white focus:outline-none rounded-md "h-16 placeholder-text-start"
                } p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14'}`}
                placeholder="Business Name"
              />
            )}
          />
          {errors.businessName && (
            <p className="text-orange">{errors.businessName.message}</p>
          )}
        </div>

        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Contact Person
          </label>
          <Controller
            name="contactPerson"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`border border-blue3 text-black bg-white focus:outline-none rounded-md "h-16 placeholder-text-start"
                } p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14'}`}
                placeholder="Contact Person"
              />
            )}
          />
          {errors.contactPerson && (
            <p className="text-orange">{errors.contactPerson.message}</p>
          )}
        </div>

        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`border border-blue3 text-black bg-white focus:outline-none rounded-md "h-16 placeholder-text-start"
                } p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14'}`}
                placeholder="+92 12345 123456"
              />
            )}
          />
          {errors.phone && (
            <p className="text-orange">{errors.phone.message}</p>
          )}
        </div>

        <div className="mt-3">
          <label className="font-Nunitoo font-medium text-orange text-14 py-2">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`border border-blue3 text-black bg-white focus:outline-none rounded-md "h-16 placeholder-text-start"
                } p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14'}`}
                placeholder="John@gmail.com"
              />
            )}
          />
          {errors.email && (
            <p className="text-orange">{errors.email.message}</p>
          )}
        </div>

        {error && <p className="text-orange w-80 mt-2">{error}</p>}

        <div className="flex justify-center my-2 sm:mt-10 sm:mb-14">
          <SubmitButton
            text="Submit"
            submit={handleSubmit(onSubmit)}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
