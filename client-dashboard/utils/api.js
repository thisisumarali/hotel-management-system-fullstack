export const getCabins = async () => {

    const res = await fetch("http://localhost:5000/api/cabins", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch cabins");
    }
    const data = await res.json();
    return data;
};

export const createCabins = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    const res = await fetch("http://localhost:5000/api/cabins", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to post cabin");

    return await res.json();
};
export const editCabin = async (id, data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    const res = await fetch(`http://localhost:5000/api/cabins/${id}`, {
        method: "PUT",
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to edit cabin");

    return await res.json();
};


export const deleteCabins = async (id) => {

    const res = await fetch(`http://localhost:5000/api/cabins/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("failed to delete cabin");
    }
    const data = await res.json();
    return data;
};