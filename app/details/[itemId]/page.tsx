"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/details.module.css";
import { getItem, editItem, getImageUrl, deleteItem } from "@/lib/api";

export default function Details() {
  const params = useParams();
  const router = useRouter();
  const itemId = parseInt(params.itemId as string, 10);
  const [itemInfo, setItemInfo] = useState({
    itemId: itemId,
    name: "",
    memo: "",
    imageUrl: "",
    isCompleted: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const textLength = itemInfo.name.length || 1;
      const averageCharWidth = 14;
      inputRef.current.style.width = `${textLength * averageCharWidth}px`;
    }
  }, [itemInfo.name]);

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    // 조건 검사: 파일 이름은 영어로만 구성, 파일 크기 <= 5MB
    const fileNameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!fileNameRegex.test(file.name)) {
      alert("파일 이름은 영어로만 이루어져야 합니다.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    try {
      const { status, data } = await getImageUrl({ imageFile: file });

      if (status === 201) {
        setItemInfo((prev) => ({ ...prev, imageUrl: data.url }));
        console.log(data);
      } else {
        alert("이미지를 업로드할 수 없습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      alert("이미지를 업로드할 수 없습니다.");
    }
  };

  const fetchEditItem = async () => {
    if (itemInfo.name.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    const { status } = await editItem(itemInfo);

    if (status === 200) {
      router.push("/");
    } else if (status === 404) {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    } else {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    }
  };

  const fetchDeleteItem = async () => {
    const { status } = await deleteItem({ itemId });

    if (status === 200) {
      router.push("/");
    } else if (status === 404) {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    } else {
      alert("문제가 발생했습니다. 다음에 시도해주세요.");
    }
  };

  useEffect(() => {
    const fetchGetItem = async () => {
      try {
        const { status, data } = await getItem({ itemId });

        if (status === 200) {
          const { id, name, memo, imageUrl, isCompleted } = data;
          setItemInfo({
            itemId: id,
            name,
            memo: memo || "",
            imageUrl,
            isCompleted,
          });
        } else if (status === 404) {
          alert("해당 아이템를 찾을 수 없습니다.");
        } else {
          alert("문제가 발생하였습니다. 다음에 시도해주세요.");
        }
      } catch (error) {
        console.error("아이템 가져오기 중 오류 발생:", error);
        alert("문제가 발생하였습니다. 다음에 시도해주세요.");
      }
    };

    if (!isNaN(itemId)) {
      fetchGetItem();
    } else {
      alert("해당 아이템를 찾을 수 없습니다.");
    }
  }, [itemId]);

  return (
    <div className={styles.container}>
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
        <button onClick={fetchEditItem}>수정 완료</button>
        <button onClick={fetchDeleteItem}>삭제하기</button>
      </footer>
    </div>
  );
}
