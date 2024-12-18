"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // 애니메이션 라이브러리
import { useParams } from "next/navigation"; // URL 파라미터 접근
import styles from "@/styles/details.module.css";
import { getItem, editItem, getImageUrl, deleteItem } from "@/lib/api"; // API 호출 함수

/**
 * Details 컴포넌트
 * - 특정 아이템의 상세 정보를 보여주고 편집/삭제 기능 제공
 */
export default function Details() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true); // 로딩 상태 관리
  const itemId = parseInt(params.itemId as string, 10); // URL 파라미터로부터 ID 추출

  // 초기 및 현재 아이템 상태 관리
  const [initialItemInfo, setInitialItemInfo] = useState({
    itemId: itemId,
    name: "",
    memo: "",
    imageUrl: "",
    isCompleted: false,
  });
  const [itemInfo, setItemInfo] = useState({
    itemId: itemId,
    name: "",
    memo: "",
    imageUrl: "",
    isCompleted: false,
  });

  // input 및 textarea 참조를 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // input 너비 동적으로 조정
  useEffect(() => {
    if (inputRef.current) {
      const textLength = itemInfo.name.length || 1;
      const averageCharWidth = 14;
      inputRef.current.style.width = `${textLength * averageCharWidth}px`;
    }
  }, [itemInfo.name]);

  // textarea 높이 동적으로 조정
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [itemInfo.memo]);

  /**
   * 이미지 업로드 처리 함수
   * - 파일 조건 검사 후 서버에 업로드
   */
  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    // 파일 이름 및 크기 조건 검사
    const fileNameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!fileNameRegex.test(file.name)) {
      alert("파일 이름은 영어로만 이루어져야 합니다.");
      return;
    }
    if (file.size >= 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    try {
      setLoading(true);
      const { status, data } = await getImageUrl({ imageFile: file });

      if (status === 201) {
        setItemInfo((prev) => ({ ...prev, imageUrl: data.url })); // 성공 시 이미지 URL 업데이트
      } else {
        alert("이미지를 업로드할 수 없습니다. 다시 시도해주세요.");
      }
    } catch (error: any) {
      console.error("이미지 업로드 중 오류 발생:", error);
      if (error.response && error.response.status === 413) {
        alert("파일 크기는 5MB 이하여야 합니다.");
      } else {
        alert("이미지를 업로드할 수 없습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 아이템 수정 요청 처리 함수
   */
  const fetchEditItem = async () => {
    if (itemInfo.name.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const { status } = await editItem(itemInfo);

      if (status === 200) {
        router.push("/"); // 수정 완료 후 메인 페이지로 이동
      } else {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      }
    } catch {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 아이템 삭제 요청 처리 함수
   */
  const fetchDeleteItem = async () => {
    try {
      setLoading(true);
      const { status } = await deleteItem({ itemId });

      if (status === 200) {
        router.push("/"); // 삭제 완료 후 메인 페이지로 이동
      } else {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      }
    } catch {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 아이템 정보 가져오기
  useEffect(() => {
    const fetchGetItem = async () => {
      try {
        setLoading(true);
        const { status, data } = await getItem({ itemId });

        if (status === 200) {
          const { id, name, memo, imageUrl, isCompleted } = data;
          const fetchedData = {
            itemId: id,
            name,
            memo: memo || "",
            imageUrl,
            isCompleted,
          };
          setInitialItemInfo(fetchedData); // 초기 데이터 설정
          setItemInfo(fetchedData); // 현재 데이터 설정
        } else {
          alert("해당 아이템을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("아이템 가져오기 오류:", error);
        alert("문제가 발생하였습니다. 다음에 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(itemId)) {
      fetchGetItem();
    } else {
      alert("유효하지 않은 아이템 ID입니다.");
    }
  }, [itemId]);

  // 변경 여부 확인
  const hasChanges =
    JSON.stringify(initialItemInfo) !== JSON.stringify(itemInfo);

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading && (
          <img className="loading" src="/images/loading.gif" alt="로딩 중" />
        )}
        <header>
          <input
            type="checkbox"
            checked={itemInfo.isCompleted}
            onChange={() =>
              setItemInfo((prev) => ({
                ...prev,
                isCompleted: !itemInfo.isCompleted,
              }))
            }
          />
          <input
            type="text"
            ref={inputRef}
            value={itemInfo.name}
            onChange={(e) =>
              setItemInfo((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </header>
        <section>
          <div
            className={`${styles.imgBox} ${
              itemInfo.imageUrl ? "" : styles.empty
            }`}
          >
            {itemInfo.imageUrl && (
              <img src={itemInfo.imageUrl} alt="이미지 미리보기" />
            )}
            <input type="file" onChange={uploadImg} id="imageUpload" />
            <label htmlFor="imageUpload" />
          </div>
          <div className={styles.memoBox}>
            <h3>Memo</h3>
            <div>
              <textarea
                ref={textareaRef}
                placeholder="메모를 입력해주세요"
                value={itemInfo.memo}
                onChange={(e) => {
                  const textarea = e.target;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                  setItemInfo((prev) => ({ ...prev, memo: textarea.value }));
                }}
              />
            </div>
          </div>
        </section>
        <footer>
          <button
            onClick={fetchEditItem}
            disabled={!hasChanges}
            style={{ backgroundColor: hasChanges ? "#BEF264" : "#e2e8f0" }}
          >
            <img src="/images/black_check.png" alt="수정 완료 버튼" />
            &nbsp;수정 완료
          </button>
          <button onClick={fetchDeleteItem}>
            <img src="/images/white_x.png" alt="삭제 버튼" />
            &nbsp;삭제하기
          </button>
        </footer>
      </motion.div>
    </div>
  );
}
