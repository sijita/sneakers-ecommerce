import { useRecoilState } from "recoil";
import {
  chooseQuantityState,
  chooseSizeState,
  chooseColorState,
} from "@/atoms/ProductOptionsState";

export default function useQuantitySize() {
  const [quantity, setQuantity] = useRecoilState(chooseQuantityState);
  const [size, setSize] = useRecoilState(chooseSizeState);
  const [color, setColor] = useRecoilState(chooseColorState);

  const handleSetSize = (e) => {
    setSize(e.target.value);
  };

  const handleSetColor = (e) => {
    setColor(e.target.value);
  };

  const handleIncrementQuantity = () => {
    setQuantity((prev) => prev + 1);

    if (quantity === 10) {
      setQuantity(10);
    }
  };

  const handleDecrementQuantity = () => {
    setQuantity((prev) => prev - 1);

    if (quantity === 1) {
      setQuantity(1);
    }
  };

  return {
    quantity,
    size,
    handleSetSize,
    handleIncrementQuantity,
    handleDecrementQuantity,
    setQuantity,
    setSize,
    handleSetColor,
    color,
    setColor,
  };
}
