import { ImSpinner9 } from "react-icons/im";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <ImSpinner9 className="text-4xl animate-spin" />
    </div>
  );
};
