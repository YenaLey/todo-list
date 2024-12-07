"use client";

import { editItem } from "@/lib/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function List({ item, setIsEdit, setLoading }: ListType) {
  const router = useRouter();

  const handleCheck = async (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
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
