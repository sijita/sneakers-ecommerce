import { atom } from "recoil";

export const productState = atom({
  key: "productState",
  default: {
    id: 0,
    nombre: "",
    descripcion: "",
    descripcionEng: "",
    precio: 0,
    categoriaId: 0,
    estado: null,
    imagenes: [],
    nuevasImagenes: null,
  },
});
