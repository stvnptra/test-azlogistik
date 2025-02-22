"use clients"
import React, { useState } from "react";
import { Product } from "../types/product";
import { useTable, useSortBy, Column, } from 'react-table';


interface ProductListProps {
    products: Product[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onAdd?: any;

}
export default function ProductList({ products, onDelete, onEdit, onAdd }: ProductListProps) {
    const [searchTerms, setSearchTerms] = useState("");

    const filteredProducts = React.useMemo(
        () => products.filter((product) =>
            product.name.toLowerCase().includes(searchTerms)
        ),
        [products, searchTerms]
    );

    const columns = React.useMemo<Column<Product>[]>(
        () => [
            {
                Header: 'Nama Produk',
                accessor: 'name'
            },
            {
                Header: 'Harga Produk',
                accessor: 'price'
            },
            {
                Header: 'Stok Produk',
                accessor: 'stock'
            },
            {
                Header: 'Aksi',
                accessor: 'id',
                Cell: ({ value }: { value: number }) => (
                    <div className="flex gap-2 items-center justify-start">
                        <button onClick={() => onEdit(value)} className="bg-[#FFEFD9] p-2 hover:cursor-pointer rounded-md before:ease relative font-semibold text-sm  overflow-hidden  text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-500 hover:before:-translate-x-40"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4137_6712)">
                                <path d="M4.8105 12.0001L12.417 4.39356L11.3565 3.33306L3.75 10.9396V12.0001H4.8105ZM5.43225 13.5001H2.25V10.3178L10.8263 1.74156C10.9669 1.60096 11.1576 1.52197 11.3565 1.52197C11.5554 1.52197 11.7461 1.60096 11.8868 1.74156L14.0085 3.86331C14.1491 4.00396 14.2281 4.19469 14.2281 4.39356C14.2281 4.59244 14.1491 4.78317 14.0085 4.92381L5.43225 13.5001ZM2.25 15.0001H15.75V16.5001H2.25V15.0001Z" fill="#FFAF43" />
                            </g>
                            <defs>
                                <clipPath id="clip0_4137_6712">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        </button>
                        <button onClick={() => onDelete(value)} className="bg-[#FBDDDD] p-2 hover:cursor-pointer rounded-md before:ease relative font-semibold text-sm  overflow-hidden  text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-500 hover:before:-translate-x-40"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4137_6721)">
                                <path d="M12.75 4.5H16.5V6H15V15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5H3.75C3.55109 16.5 3.36032 16.421 3.21967 16.2803C3.07902 16.1397 3 15.9489 3 15.75V6H1.5V4.5H5.25V2.25C5.25 2.05109 5.32902 1.86032 5.46967 1.71967C5.61032 1.57902 5.80109 1.5 6 1.5H12C12.1989 1.5 12.3897 1.57902 12.5303 1.71967C12.671 1.86032 12.75 2.05109 12.75 2.25V4.5ZM13.5 6H4.5V15H13.5V6ZM6.75 8.25H8.25V12.75H6.75V8.25ZM9.75 8.25H11.25V12.75H9.75V8.25ZM6.75 3V4.5H11.25V3H6.75Z" fill="#ED5555" />
                            </g>
                            <defs>
                                <clipPath id="clip0_4137_6721">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        </button>
                    </div>
                ),
            },


        ],
        [onDelete]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: filteredProducts }, useSortBy);

    return (
        <section className="border bg-white  p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-2xl tracking-tighter  ">List Produk</h1>
                <button className="before:ease relative font-semibold text-sm px-4 py-2 overflow-hidden border border-blue-500 bg-blue-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-500 rounded-md hover:before:-translate-x-40" onClick={onAdd}>Add Data</button>
            </div>
            <div className="flex w-full items-center justify-start mb-4">
                <input
                    className="w-full md:w-1/3 mt-2"
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                />
            </div>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead >
                    {headerGroups.map((headerGroup: any) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            className="border-y-2 border-gray-100"
                        >
                            {headerGroup.headers.map((column: any) => (
                                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="p-3 rounded-y-lg text-gray-500 text-xs font-semibold uppercase tracking-tight text-left"
                                >
                                    <div >
                                        {column.render('Header')}

                                        <span   >
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ""}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr  {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
                                {row.cells.map((cell: any) => (
                                    <td
                                        key={cell.id}
                                        {...cell.getCellProps()}
                                        className="font-semibold text-sm py-2 px-2"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );


}