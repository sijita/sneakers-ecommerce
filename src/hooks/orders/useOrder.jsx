import { orderState } from "@/atoms/orderState";
import { useRecoilState } from "recoil";

export default function useOrder() {
  const [order, setOrder] = useRecoilState(orderState);
  return { order, setOrder };
}
