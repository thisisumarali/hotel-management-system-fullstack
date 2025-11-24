import React from "react";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "@/utils/api";
import toast from "react-hot-toast";

const CreateCabinForm = () => {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
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
    mutate(data);
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md ">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Cabin Name */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-sm font-medium text-gray-700" htmlFor="name">
            Cabin name
          </label>
          <input
            type="text"
            id="name"
            className="col-span-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors?.name?.message }
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="maxCapacity"
          >
            Maximum capacity
          </label>
          <input
            type="number"
            id="maxCapacity"
            className="col-span-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be atleast 1",
              },
            })}
          />
        </div>

        {/* Regular Price */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="regularPrice"
          >
            Regular price
          </label>
          <input
            type="number"
            id="regularPrice"
            defaultValue={0}
            min={0}
            className="col-span-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Regular price should be atleast 1",
              },
            })}
          />
        </div>

        {/* Discount */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="discount"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            defaultValue={0}
            className="col-span-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                value <= getValues().regularPrice ||
                "Discount should be less than regular price.",
            })}
          />
        </div>

        {/* Description */}
        <div className="grid grid-cols-3 gap-4">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description for website
          </label>
          <textarea
            id="description"
            rows={3}
            className="col-span-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            {...register("description")}
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="text-sm font-medium text-gray-700" htmlFor="image">
            Cabin photo
          </label>
          <input
            type="text"
            id="image"
            className="col-span-2 rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
            {...register("image")}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button disabled={isCreating}>Add cabin</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCabinForm;
