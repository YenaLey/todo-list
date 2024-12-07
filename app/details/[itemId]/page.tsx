"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import styles from "@/styles/details.module.css";
import { getItem, editItem, getImageUrl, deleteItem } from "@/lib/api";

export default function Details() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const itemId = parseInt(params.itemId as string, 10);
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

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const textLength = itemInfo.name.length || 1;
      const averageCharWidth = 14;
      inputRef.current.style.width = `${textLength * averageCharWidth}px`;
    }
  }, [itemInfo.name]);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [itemInfo.memo]);

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

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
        setItemInfo((prev) => ({ ...prev, imageUrl: data.url }));
        console.log("이미지 업로드 성공:", data);
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

  const fetchEditItem = async () => {
    if (itemInfo.name.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const { status } = await editItem(itemInfo);

      if (status === 200) {
        router.push("/");
      } else if (status === 404) {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      } else {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      }
    } catch {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDeleteItem = async () => {
    try {
      setLoading(true);
      const { status } = await deleteItem({ itemId });

      if (status === 200) {
        router.push("/");
      } else if (status === 404) {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      } else {
        alert("문제가 발생했습니다. 다음에 시도해주세요.");
      }
    } catch {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

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
          setInitialItemInfo(fetchedData);
          setItemInfo(fetchedData);
        } else if (status === 404) {
          alert("해당 아이템를 찾을 수 없습니다.");
        } else {
          alert("문제가 발생하였습니다. 다음에 시도해주세요.");
        }
      } catch (error) {
        console.error("아이템 가져오기 중 오류 발생:", error);
        alert("문제가 발생하였습니다. 다음에 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(itemId)) {
      fetchGetItem();
    } else {
      alert("해당 아이템를 찾을 수 없습니다.");
    }
  }, [itemId]);

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
          <img className="loading" src="/images/loading.gif" alt="로딩" />
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
            <img src="/images/black_check.png" alt="버튼" />
            &nbsp;수정 완료
          </button>
          <button onClick={fetchDeleteItem}>
            <img src="/images/white_x.png" alt="버튼" />
            &nbsp;삭제하기
          </button>
        </footer>
      </motion.div>
    </div>
  );
}
