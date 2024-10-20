import { useRecoilState } from "recoil";
import { productIdState } from "@/atoms/productIdState";

export default function useIdProduct() {
  const [id, setId] = useRecoilState(productIdState);

  return {
    id,
    setId,
  };
}
