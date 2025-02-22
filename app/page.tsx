"use client"

import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";
import { Product } from "./types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => { setIsModalOpen(false); setEditData([]) };
  const openModal = () => setIsModalOpen(true);
  const [editData, setEditData] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products])

  function handleAddProduct(newProduct: Product) {
    if (newProduct.id) {
      const index = products.findIndex((product) => product.id == newProduct.id)
      const updatedData = products.map((product, i) => { if (i == index) { return newProduct; } else { return product; } });
      setProducts(updatedData);
    } else {
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  }

  function handleDelete(id: number) {
    if (window.confirm("Confirm Delete data ?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  }

  function handleEdit(id: number) {
    setEditData(products.filter((product) => product.id == id));
    setIsModalOpen(true);

  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4 bg-gray-50 h-[100vh]">
        <main className="col-span-12">
          <section className="max-w-7xl mx-auto px-4 py-6">
            <ProductList products={products} onDelete={handleDelete} onEdit={handleEdit} onAdd={openModal} />
          </section>
        </main>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}  >
        <button onClick={closeModal} className=" absolute right-2  top-3 rounded-xl md:rounded-2x p-1 md:p-2">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.1402 14.1221L17.4432 19.4251C17.7246 19.7065 18.1063 19.8646 18.5042 19.8646C18.9022 19.8646 19.2838 19.7065 19.5652 19.4251C19.8466 19.1437 20.0047 18.7621 20.0047 18.3641C20.0047 17.9662 19.8466 17.5845 19.5652 17.3031L14.2602 12.0001L19.5642 6.69711C19.7035 6.55778 19.814 6.39238 19.8893 6.21036C19.9646 6.02834 20.0034 5.83326 20.0033 5.63626C20.0033 5.43926 19.9645 5.2442 19.889 5.06221C19.8136 4.88022 19.7031 4.71488 19.5637 4.57561C19.4244 4.43634 19.259 4.32588 19.077 4.25054C18.895 4.17519 18.6999 4.13644 18.5029 4.13648C18.3059 4.13653 18.1108 4.17538 17.9288 4.25081C17.7468 4.32624 17.5815 4.43678 17.4422 4.57611L12.1402 9.87911L6.83723 4.57611C6.69893 4.43278 6.53346 4.31843 6.35049 4.23973C6.16753 4.16103 5.97072 4.11956 5.77155 4.11774C5.57238 4.11591 5.37485 4.15377 5.19047 4.22911C5.00609 4.30444 4.83856 4.41574 4.69765 4.55652C4.55675 4.69729 4.44529 4.86471 4.36978 5.04902C4.29427 5.23333 4.25623 5.43083 4.25786 5.63C4.2595 5.82917 4.30078 6.02602 4.37931 6.20906C4.45784 6.3921 4.57203 6.55767 4.71523 6.69611L10.0202 12.0001L4.71623 17.3041C4.57303 17.4425 4.45884 17.6081 4.38031 17.7912C4.30179 17.9742 4.2605 18.1711 4.25886 18.3702C4.25723 18.5694 4.29527 18.7669 4.37078 18.9512C4.44629 19.1355 4.55775 19.3029 4.69865 19.4437C4.83956 19.5845 5.00709 19.6958 5.19147 19.7711C5.37585 19.8464 5.57338 19.8843 5.77255 19.8825C5.97172 19.8807 6.16853 19.8392 6.35149 19.7605C6.53446 19.6818 6.69993 19.5674 6.83823 19.4241L12.1402 14.1221Z" fill="#222222" />
          </svg>
        </button>
        <ProductForm onAddProduct={handleAddProduct} data={editData} />
      </Modal>
    </>
  );
}
