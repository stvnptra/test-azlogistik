"use client"

import { Product } from "../types/product";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";


interface ProductFormProps {
    onAddProduct: (product: Product) => void;
    data?: any;
}

interface FormInput {
    id?: any
    name: string;
    price: number;
    stock: number;
    desc: string;
}

const schema = Yup.object().shape({
    name: Yup.string().min(3, "Nama Produk harus memiliki minimal 3 karakter").required("Nama Produk wajib diisi").matches(/^[a-z\d\-_\s]+$/i, 'Harus berupa huruf'),
    price: Yup.number().typeError('Input harus berupa angka').min(1, "Harga Produk harus lebih dari 0").required("Harga Produk wajib diisi"),
    stock: Yup.number().typeError('Input harus berupa angka').min(1, "Stock Produk harus lebih dari 0").required("Stock Produk wajib diisi"),
    desc: Yup.string().min(10, "Deskipsi harus minimal 10 karakter").required("Deskripsi wajib diisi").matches(/^[a-z\d\-_\s]+$/i, 'Harus berupa huruf'),
});

export default function ProductForm({ onAddProduct, data = {
    id: null,
    name: "",
    price: 0,
    stock: 0,
    desc: "",
} }: ProductFormProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        const newProduct: Product = {
            id: data.id !== "" ? data.id : Date.now(),
            name: data.name,
            price: data.price,
            stock: data.stock,
            desc: data.desc,
        };
        onAddProduct(newProduct);
    }

    useEffect(() => {
        if (data[0] !== undefined) {
            setValue("id", data[0].id);
            setValue("name", data[0].name);
            setValue("price", data[0].price);
            setValue("stock", data[0].stock);
            setValue("desc", data[0].desc);
        } else {
            setValue("name", "");
            setValue("price", 0);
            setValue("stock", 0);
            setValue("desc", "");
        }
    }, [data]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl tracking-tight font-bold">{data[0] == undefined ? "Input Produk" : "Edit Product"}</h1>
                <section className="flex flex-col items-center justify-center gap-4">
                    <input className="w-full hidden" type="text" placeholder="id" {...register("id")} />
                    <div className="w-full flex gap-1 flex-col">
                        <label className="text-sm font-semibold text-gray-800" htmlFor="name">Nama Product</label>
                        <input className="w-full" type="text" placeholder="Nama" {...register("name")} />
                        <span className="text-xs text-red-600 font-medium capitalize">
                            {errors.name && <p>{errors.name.message}</p>}
                        </span>
                    </div>
                    <div className="w-full flex gap-1 flex-col">
                        <label className="text-sm font-semibold text-gray-800" htmlFor="name">Harga Product</label>
                        <input className="w-full" type="number" placeholder="Harga" {...register("price")} />
                        <span className="text-xs text-red-600 font-medium capitalize">
                            {errors.price && <p>{errors.price.message}</p>}
                        </span>
                    </div>
                    <div className="w-full flex gap-1 flex-col">
                        <label className="text-sm font-semibold text-gray-800" htmlFor="name">Stok Product</label>
                        <input className="w-full" type="number" placeholder="Stok" {...register("stock")} />
                        <span className="text-xs text-red-600 font-medium capitalize">
                            {errors.stock && <p>{errors.stock.message}</p>}
                        </span>
                    </div>
                    <div className="w-full flex gap-1 flex-col">
                        <label className="text-sm font-semibold text-gray-800" htmlFor="name">Deskripsi Product</label>
                        <input className="w-full" type="text" placeholder="Desc" {...register("desc")} />
                        <span className="text-xs text-red-600 font-medium capitalize">
                            {errors.desc && <p>{errors.desc.message}</p>}
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-full">
                        {/* <button type="submit" className="bg-blue-500 hover:-translate-x-1 hover;hover:-translate-y-1 hover:cursor-pointer text-white text-sm font-semibold px-4 py-2 rounded-md shadow-lg" >Submit Data</button> */}
                        <button type="submit" className="before:ease relative font-semibold text-sm px-4 py-2 overflow-hidden border border-blue-500 bg-blue-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-500 rounded-md hover:before:-translate-x-40" >Submit Data</button>
                    </div>
                </section>
            </div>
        </form>
    );
}