import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProductAPI } from "../apis";

const CreatePage = () => {
    const [formData, setFormData] = useState({
        name: "",
        quantity: "",
        price: "",
        image: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === "quantity" || name === "price" ? Number(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const { name, quantity, price, image } = formData;

        if (!name || !quantity || !price || !image) {
            toast.error("Please fill out all input fields completely");
            return;
        }

        try {
            setIsLoading(true);
            const payload = {
                name,
                quantity: Number(quantity),
                price: Number(price),
                image
            };
            const response = await createProductAPI(payload);
            toast.success("Product saved successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 text-center">Create a Product</h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    {["name", "quantity", "price", "image"].map((field) => (
                        <div key={field}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === "quantity" || field === "price" ? "number" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:border-blue-200"
                                placeholder={`Enter ${field}`}
                            />
                        </div>
                    ))}
                    {!isLoading && (
                        <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600">
                            Save
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreatePage;
