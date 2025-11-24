export const getCabins = async () => {

    const res = await fetch("http://192.168.100.31:5000/api/cabins", {
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
    const res = await fetch("http://192.168.100.31:5000/api/cabins", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to Post cabins");
    }
    const result = await res.json();
    return result;
}

export const deleteCabins = async (id) => {

    const res = await fetch(`http://192.168.100.31:5000/api/cabins/${id}`, {
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