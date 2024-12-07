"use client";

import { editItem } from "@/lib/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function List({ item, setIsEdit, onRemove }: ListType) {
  const router = useRouter();

  const handleCheck = async (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();
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
      <div
        onClick={(e) => {
          e.stopPropagation();
          router.push(`details/${item.id}`);
        }}
      >
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={handleCheck}
          onClick={(e) => e.stopPropagation()}
        />
        <p>{item.name}</p>
      </div>
    </motion.li>
  );
}
