import React from "react";
import { Button } from "./button";
import InputRow from "./InputRow";
import { useForm } from "react-hook-form";
import { useCreateCabins, useEditCabins } from "@/hooks/cabins.hooks";
export const inputClass =
  "rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none";

const CreateCabinForm = ({ cabinToEdit = {}, onCloseModal, closeEditform }) => {
  const { _id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { mutateCreate, isCreating } = useCreateCabins();
  const { mutateEdit, isEditing } = useEditCabins();

  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      const file = data.image?.[0];
      const formData = { ...data, image: file || null };
      mutateEdit(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            closeEditform?.();
          },
        }
      );
    } else {
      const file = data.image[0];
      const formData = { ...data, image: file };
      mutateCreate(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <div className="w-full mx-auto bg-white rounded-xl py-[3.2rem] px-16">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Cabin Name */}
        <InputRow label="Cabin name" id="name" error={errors?.name?.message}>
          <input
            id="name"
            type="text"
            className={`${inputClass} 
              ${
                isWorking
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            {...register("name", { required: "This field is required" })}
            disabled={isWorking}
          />
        </InputRow>

        {/* Maximum capacity */}
        <InputRow
          label="Maximum capacity"
          id="maxCapacity"
          error={errors?.maxCapacity?.message}
        >
          <input
            id="maxCapacity"
            type="number"
            min={0}
            className={inputClass}
            {...register("maxCapacity", {
              required: "This field is required",
              min: { value: 1, message: "Capacity should be atleast 1" },
            })}
            disabled={isWorking}
          />
        </InputRow>

        {/* Regular Price */}
        <InputRow
          label="Regular price"
          id="regularPrice"
          error={errors?.regularPrice?.message}
        >
          <input
            id="regularPrice"
            type="number"
            min={0}
            className={inputClass}
            {...register("regularPrice", {
              required: "This field is required",
              min: { value: 1, message: "Regular price should be atleast 1" },
            })}
            disabled={isWorking}
          />
        </InputRow>

        {/* Discount */}
        <InputRow
          label="Discount"
          id="discount"
          error={errors?.discount?.message}
        >
          <input
            id="discount"
            type="number"
            min={0}
            className={inputClass}
            {...register("discount", {
              validate: (value) =>
                Number(value) <= Number(getValues().regularPrice) ||
                "Discount should be less than regular price.",
            })}
            disabled={isWorking}
          />
        </InputRow>

        {/* Description */}
        <InputRow
          label="Description for website"
          id="description"
          error={errors?.description?.message}
        >
          <textarea
            id="description"
            rows={3}
            className={inputClass}
            {...register("description", {
              required: "Description is required",
            })}
          />
        </InputRow>

        {/* Photo */}
        <InputRow label="Cabin photo" id="image" error={errors?.image?.message}>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="file:bg-black file:text-white file:px-3 file:py-2 file:rounded-2xl 
              rounded-md border border-gray-300 p-2 bg-white focus:ring-2 focus:ring-black"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
            disabled={isWorking}
          />
        </InputRow>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              onCloseModal?.();
              closeEditform?.();
            }}
          >
            Cancel
          </Button>

          <Button disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Creating a new cabin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCabinForm;
