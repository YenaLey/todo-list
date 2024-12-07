"use client";

import { editItem } from "@/lib/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * List 컴포넌트
 * - 리스트 항목 렌더링 및 상태 업데이트 처리
 */
export default function List({ item, setIsEdit, setLoading }: ListType) {
  const router = useRouter();

  /**
   * 체크박스 상태 변경 처리 함수
   */
  const handleCheck = async (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();

    try {
      setLoading(true); // 로딩 활성화
      const { status } = await editItem({
        itemId: item.id,
        isCompleted: !item.isCompleted,
      });

      if (status === 200) {
        setIsEdit(true); // 리스트 상태 갱신
      } else {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      }
    } catch (error) {
      console.error("리스트 업데이트 오류:", error);
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    } finally {
      setLoading(false); // 로딩 해제
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }} // 초기 애니메이션 상태
      animate={{ opacity: 1, x: 0 }} // 활성화 애니메이션
      exit={{ opacity: 0, x: 10 }} // 종료 애니메이션
      whileHover={{
        scale: 1.01,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // 호버 시 효과
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 방지
          router.push(`details/${item.id}`); // 상세 페이지로 이동
        }}
      >
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={handleCheck} // 체크박스 상태 변경 처리
          onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
        />
        <p>{item.name}</p>
      </div>
    </motion.li>
  );
}
