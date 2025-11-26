const page = () => {
  return (
    <div className="p-10">
      <h1 className="md:text-3xl text-2xl font-bold pb-4">
        Update Hotel Settings
      </h1>
      <div className="w-1/2 bg-white p-8 rounded-xl shadow-md ">
        <form className="space-y-6">
          <div className="grid grid-cols-2 items-start gap-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="min-nights"
            >
              Minimum nights/booking
            </label>
            <input
              type="number"
              id="min-nights"
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 items-start gap-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="min-nights"
            >
              Maximum nights/booking
            </label>
            <input
              type="number"
              id="max-nights"
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 items-start gap-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="max-nights"
            >
              Maximum guests/booking
            </label>
            <input
              type="number"
              id="max-nights"
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
