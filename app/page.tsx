"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // 애니메이션 라이브러리
import { AnimatePresence } from "framer-motion";
import styles from "@/styles/page.module.css";
import List from "@/components/List";
import { addItem, getList } from "@/lib/api";

/**
 * Main 컴포넌트
 * - 할 일 목록을 관리하고 렌더링
 * - 새로운 할 일 추가, 완료 여부 업데이트, 목록 가져오기
 */
export default function Main() {
  const [isEdit, setIsEdit] = useState(true); // 리스트 갱신 상태 관리
  const [list, setList] = useState<BaseResponse[]>([]); // 할 일 리스트 상태
  const [text, setText] = useState(""); // 새로 추가할 할 일 텍스트
  const [isEmpty, setIsEmpty] = useState(false); // 할 일 목록 비어있는지 확인
  const pageSize = 20; // 할 일 최대 개수 제한
  const [isLoading, setLoading] = useState(true); // 로딩 상태 관리

  /**
   * 새 할 일 추가
   * - 텍스트 유효성 검사 및 개수 제한 검사 후 API 요청
   */
  const fetchAddItem = async () => {
    try {
      if (!text.trim()) {
        alert("할 일을 입력해주세요.");
        return;
      }

      if (list.length >= pageSize) {
        alert(`최대 ${pageSize}개의 항목만 작성할 수 있습니다.`);
        return;
      }

      setLoading(true); // 로딩 상태 시작
      const { status } = await addItem({ name: text });

      if (status === 201) {
        setIsEdit(true); // 리스트 갱신 요청
      } else {
        alert("문제가 발생하였습니다. 다음에 시도해주세요.");
      }
    } catch (error) {
      console.error("리스트를 추가하는 중 오류 발생:", error);
      alert("문제가 발생하였습니다. 다음에 시도해주세요.");
    } finally {
      setText(""); // 입력값 초기화
      setLoading(false); // 로딩 상태 종료
    }
  };

  /**
   * 폼 제출 시 새 할 일 추가
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAddItem();
  };

  /**
   * 리스트 데이터 가져오기
   * - isEdit 상태가 변경될 때마다 실행
   */
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        const { status, data } = await getList({ page: 1, pageSize: pageSize });

        if (status === 200) {
          setList([...data]); // 리스트 데이터 업데이트
        } else {
          alert("문제가 발생하였습니다. 다음에 시도해주세요.");
        }
      } catch (error) {
        console.error("리스트를 가져오는 중 오류 발생:", error);
        alert("문제가 발생하였습니다. 다음에 시도해주세요.");
      } finally {
        setIsEdit(false); // 리스트 갱신 상태 초기화
        setLoading(false); // 로딩 상태 종료
      }
    };

    if (isEdit) {
      fetchList();
    }

    setIsEmpty(list.length ? false : true); // 리스트가 비어있는지 확인
  }, [isEdit]);

  // 할 일을 TO DO와 DONE으로 분리
  const todoList = list.filter((item) => !item.isCompleted);
  const doneList = list.filter((item) => item.isCompleted);

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 로딩 중일 때 로딩 이미지 표시 */}
        {isLoading && (
          <img className="loading" src="/images/loading.gif" alt="로딩" />
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            placeholder="할 일을 입력해주세요"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            style={{
              backgroundColor: isEmpty ? "#7c3aed" : "#e2e8f0",
              color: isEmpty ? "white" : "black",
            }}
          >
            <img
              src={
                !isEmpty ? "/images/black_plus.png" : "/images/white_plus.png"
              }
              alt="버튼"
            />
            <span>&nbsp;추가하기</span>
          </button>
        </form>
        <section>
          {/* TO DO 리스트 섹션 */}
          <div className={styles.todoBox}>
            <h2>TO DO</h2>
            {!todoList.length && (
              <div className={styles.noneBox}>
                <img src="/images/todo_background.png" alt="배경" />
                <h3>
                  할 일이 없어요.<br></br>TODO를 새롭게 추가해주세요!
                </h3>
              </div>
            )}
            <ul>
              <AnimatePresence>
                {todoList.map((item) => (
                  <List
                    key={item.id}
                    item={item}
                    setIsEdit={setIsEdit}
                    setLoading={setLoading}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </div>
          {/* DONE 리스트 섹션 */}
          <div className={styles.doneBox}>
            <h2>DONE</h2>
            {!doneList.length && (
              <div className={styles.noneBox}>
                <img src="/images/done_background.png" alt="배경" />
                <h3>
                  아직 다 한 일이 없어요.<br></br>해야 할 일을 체크해보세요!
                </h3>
              </div>
            )}
            <ul>
              <AnimatePresence>
                {doneList.map((item) => (
                  <List
                    key={item.id}
                    item={item}
                    setIsEdit={setIsEdit}
                    setLoading={setLoading}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
