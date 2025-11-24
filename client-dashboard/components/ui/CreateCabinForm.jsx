import React from "react";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "@/utils/api";
import toast from "react-hot-toast";

const CreateCabinForm = ({ cabinToEdit = {} }) => {
  const { _id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      toast.success("New cabin successfully added");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const file = data.image[0];

    const formData = {
      ...data,
      image: file,
    };

    mutate(formData);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-xl shadow-md ">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Cabin Name */}
        <div className="grid grid-cols-3 items-start gap-4">
          <label className="text-sm font-medium text-gray-700" htmlFor="name">
            Cabin name
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors?.name?.message && (
            <p className="text-red-700">{errors?.name?.message}</p>
          )}
        </div>

        {/* Maximum Capacity */}
        <div className="grid grid-cols-3 items-start gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="maxCapacity"
          >
            Maximum capacity
          </label>
          <input
            type="number"
            id="maxCapacity"
            min={0}
            className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be atleast 1",
              },
            })}
          />
          {errors?.maxCapacity?.message && (
            <p className="text-red-700">{errors?.maxCapacity?.message}</p>
          )}
        </div>

        {/* Regular Price */}
        <div className="grid grid-cols-3 items-start gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="regularPrice"
          >
            Regular price
          </label>
          <input
            type="number"
            id="regularPrice"
            min={0}
            className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Regular price should be atleast 1",
              },
            })}
          />
          {errors?.regularPrice?.message && (
            <p className="text-red-700">{errors?.regularPrice?.message}</p>
          )}
        </div>

        {/* Discount */}
        <div className="grid grid-cols-3 items-start gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="discount"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            min={0}
            className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                value <= getValues().regularPrice ||
                "Discount should be less than regular price.",
            })}
          />
          {errors?.discount?.message && (
            <p className="text-red-700">{errors?.discount?.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="grid grid-cols-3 items-start gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description for website
          </label>
          <textarea
            id="description"
            rows={3}
            className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors?.description?.message && (
            <p className="text-red-700">{errors?.description?.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div className="grid grid-cols-3 items-start gap-4">
          <label className="text-sm font-medium text-gray-700" htmlFor="image">
            Cabin photo
          </label>
          <input
            id="image"
            accept="image/*"
            type="file"
            className="
            file:bg-black file:text-white file:px-3 file:py-2 file:rounded-2xl file:cursor-pointer file:hover:bg-gray-950
            rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
          {errors?.image?.message && (
            <p className="text-red-700">{errors?.image?.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={() => reset()}>
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isEditSession ? "Edit cabin" : "Creating a new cabin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCabinForm;
