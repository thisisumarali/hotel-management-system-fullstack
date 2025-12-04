// CABINS
export const getCabins = async () => {
  const res = await fetch("http://localhost:5000/api/cabins");
  if (!res.ok) throw new Error("Failed to fetch cabins");
  return res.json();
};

export const createCabins = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  const res = await fetch("http://localhost:5000/api/cabins", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to post cabin");
  return res.json();
};

export const editCabin = async (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  const res = await fetch(`http://localhost:5000/api/cabins/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to edit cabin");
  return res.json();
};

export const deleteCabins = async (id) => {
  const res = await fetch(`http://localhost:5000/api/cabins/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete cabin");
  return res.json();
};

// SETTINGS
export const getSettingsApi = async () => {
  const res = await fetch("http://localhost:5000/api/setting");
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
};

export const updateSettingsApi = async (newSettings) => {
  const res = await fetch("http://localhost:5000/api/setting", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSettings),
  });

  if (!res.ok) throw new Error("Failed to update settings");
  return res.json();
};

// BOOKINGS
export const getBookings = async () => {
  const res = await fetch("http://localhost:5000/api/booking");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

export const createBookings = async (data) => {
  const res = await fetch("http://localhost:5000/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
};

export const deleteBookings = async (id) => {
  const res = await fetch(`http://localhost:5000/api/booking/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete booking");
  return res.json();
};

// GUESTS
export const getGuests = async () => {
  const res = await fetch("http://localhost:5000/api/guest");
  if (!res.ok) throw new Error("Failed to fetch guests");
  return res.json();
};

export const createGuests = async (guests) => {
  const res = await fetch("http://localhost:5000/api/guest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(guests),
  });

  if (!res.ok) throw new Error("Failed to create guest");
  return res.json();
};

export const deleteGuests = async (id) => {
  const res = await fetch(`http://localhost:5000/api/guest/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete guest");
  return res.json();
};
