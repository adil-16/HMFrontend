import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const passengerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").positive().integer(),
  gender: yup.string().required("Gender is required"),
  nationality: yup.string().required("Nationality is required"),
  passportNumber: yup.string().required("Passport number is required"),
});

const PassengerForm = () => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const handleAddPassenger = () => {
    append({
      name: "",
      age: 0,
      gender: "male",
      nationality: "",
      passportNumber: "",
    });
  };

  return (
    <div className="mt-5">
      <h3 className="font-Nunitoo font-medium text-orange text-14 py-2">
        Add Passengers
      </h3>
      <div className="max-h-64 overflow-y-auto">
        {fields.map((field, index) => (
          <div key={field.id} className="mt-3">
            <p className="text-white mb-2 font-Nunitoo font-semibold">{`Passenger ${
              index + 1
            }`}</p>
            <div>
              <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                Passenger Name
              </label>
              <input
                {...register(`passengers.${index}.name`)}
                className="bg-white border border-gray text-black ml-2 py-2 mb-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                placeholder="Passenger Name"
              />
              {errors.passengers?.[index]?.name && (
                <p className="text-red-500">
                  {errors.passengers[index].name.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                Passenger Age
              </label>
              <input
                type="number"
                {...register(`passengers.${index}.age`)}
                className="bg-white border border-gray text-black ml-2 py-2 px-4 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                placeholder="Passenger Age"
              />
              {errors.passengers?.[index]?.age && (
                <p className="text-red-500">
                  {errors.passengers[index].age.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                Passenger Gender
              </label>
              <select
                {...register(`passengers.${index}.gender`)}
                className="bg-white border border-gray text-black ml-2 py-2 px-4 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.passengers?.[index]?.gender && (
                <p className="text-red-500">
                  {errors.passengers[index].gender.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                Passenger Nationality
              </label>
              <input
                {...register(`passengers.${index}.nationality`)}
                className="bg-white border border-gray text-black ml-2 py-2 px-4 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                placeholder="Nationality"
              />
              {errors.passengers?.[index]?.nationality && (
                <p className="text-red-500">
                  {errors.passengers[index].nationality.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-Nunitoo font-medium text-orange text-14 py-2">
                Passenger Passport Number
              </label>
              <input
                {...register(`passengers.${index}.passportNumber`)}
                className="bg-white border border-gray text-black ml-2 py-2 px-4 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                placeholder="Passport Number"
              />
              {errors.passengers?.[index]?.passportNumber && (
                <p className="text-red-500">
                  {errors.passengers[index].passportNumber.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 bg-red-500 text-white py-1 px-2 rounded focus:outline-none"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddPassenger}
        className="mt-3 bg-orange text-white py-2 px-4 rounded"
      >
        Add Passenger
      </button>
    </div>
  );
};

export default PassengerForm;
