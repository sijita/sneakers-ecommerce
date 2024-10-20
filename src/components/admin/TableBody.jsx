"use client";
import Image from "next/image";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import useDeleteModal from "@/hooks/admin/useDeleteModal";
import useEditModal from "@/hooks/admin/useEditModal";
import useIdProduct from "@/hooks/useIdProduct";
import useViewModal from "@/hooks/admin/useViewModal";

export default function TableBody({ producto }) {
  const { handleDeleteModal } = useDeleteModal();
  const { setId } = useIdProduct();
  const { handleEditModal } = useEditModal();
  const { handleViewModal } = useViewModal();

  const uniqueSizes = Array.from(
    new Set(producto.productoTallaColor.map(({ talla }) => talla))
  );

  return (
    <tr key={producto.id}>
      <th>{producto.id}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-square rounded w-12 h-12">
              <Image
                src={producto.imagen[0]}
                alt={producto.nombre}
                width={50}
                height={50}
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{producto.nombre}</div>
          </div>
        </div>
      </td>
      <td>{producto.categoria.nombre}</td>
      <td>
        {producto.productoTallaColor.reduce((acc, item) => {
          return acc + item.stock;
        }, 0)}
      </td>
      <td className="flex gap-1">
        {uniqueSizes.map((size, i) => {
          return (
            <p key={i} className="badge badge-sm border-neutral">
              {size}
            </p>
          );
        })}
      </td>
      <td>{producto.precio}</td>
      <td className="flex items-center gap-2 h-28">
        <button
          onClick={() => {
            handleEditModal();
            setId(producto.id);
          }}
          className="btn btn-outline border-neutral w-auto"
        >
          <HiOutlinePencil size={14} />
        </button>
        <button
          onClick={() => {
            setId(producto.id);
            handleViewModal();
          }}
          className="btn btn-outline border-neutral w-auto"
        >
          <HiOutlineEye size={14} />
        </button>
        <button
          onClick={() => {
            handleDeleteModal();
            setId(producto.id);
          }}
          className="btn btn-outline border-neutral w-auto"
        >
          <HiOutlineTrash size={14} />
        </button>
      </td>
    </tr>
  );
}
