//import { Box, Container, Typography } from "@mui/material";

import { Box, Button, TextField } from "@mui/material";
import { collection, doc, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { storage, db } from "../firebase/store";
//import { v4 } from "uuid";

const AddProducts = () => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [productImg, setProductImg] = useState(null);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [error, setError] = useState("");

    const typesImg = ["image/png", "image/jpeg", "image/jpg"];

    const handleImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && typesImg.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError("");
        } else {
            setProductImg(null);
            setError("Please select a valid image type png, jpg or jpeg");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const docRef = collection(db, "products");
        const storageRef = ref(storage, "images/" + productImg.name);
        const uploadImg = uploadBytesResumable(storageRef, productImg);
        uploadImg.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
            (err) => {
                setError(err.message);
            },
            () => {
                getDownloadURL(uploadImg.snapshot.ref).then(async (url) => {
                    try {
                        await addDoc(docRef, {
                            title: productName,
                            category: category,
                            description: description,
                            image: url,
                            price: Number(price),
                            stock: Number(stock),
                        });
                    } catch (err) {
                        setError(err.message);
                    } finally {
                        setProductName("");
                        setCategory("");
                        setDescription("");
                        setProductImg("");
                        setPrice(0);
                        setStock(0);
                        document.getElementById("file").value = "";
                    }
                });
            }
        );
    };

    return (
        <div className="mx-auto flex min-h-screen items-center justify-center px-4">
            <div className=" mx-auto flex w-full flex-wrap items-center justify-center gap-2 rounded-lg bg-slate-100 py-4 px-4 font-semibold shadow-lg sm:w-[55%] md:w-1/2 lg:w-2/5">
                <p className="text-center text-3xl uppercase">
                    Add new product
                </p>
                <form
                    className="grid w-full grid-cols-4 gap-2"
                    onSubmit={handleSubmit}
                >
                    <Box mt={1} className="col-span-2">
                        <TextField
                            type="text"
                            name="title"
                            label="Product Title"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box mt={1} className="col-span-2">
                        <TextField
                            type="text"
                            name="title"
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box mt={1} className="col-span-4">
                        <TextField
                            type="text"
                            name="title"
                            variant="standard"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box mt={1} className="col-span-2">
                        <TextField
                            type="file"
                            id="file"
                            name="title"
                            label="Image"
                            onChange={handleImg}
                            focused
                            fullWidth
                        />
                    </Box>
                    <Box mt={1} className="col-span-1">
                        <TextField
                            type="number"
                            name="title"
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box mt={1} className="col-span-1">
                        <TextField
                            type="number"
                            name="title"
                            label="Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box mt={3} className="col-span-4">
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Save Product
                        </Button>
                    </Box>
                </form>
                {error && <span>{error}</span>}
            </div>
        </div>
    );
};
export default AddProducts;
