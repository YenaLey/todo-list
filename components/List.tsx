"use client";

import { editItem } from "@/lib/api";
import { motion } from "framer-motion";

export default function List({
  item,
  setIsEdit,
  onRemove,
}: ListType & { onRemove: (id: number) => void }) {
  const handleCheck = async () => {
    onRemove(item.id);

    try {
      const { status } = await editItem({
        itemId: item.id,
        isCompleted: !item.isCompleted,
      });

      if (status === 200) {
        setIsEdit(true);
      } else {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      }
    } catch (error) {
      console.error("리스트 업데이트 중 오류:", error);
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
      setIsEdit(true);
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={handleCheck}
      ></input>
      <p>{item.name}</p>
    </motion.li>
  );
}
