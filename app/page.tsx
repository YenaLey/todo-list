"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import styles from "@/styles/page.module.css";
import List from "@/components/List";
import { addItem, getList } from "@/lib/api";

export default function Main() {
  const [isEdit, setIsEdit] = useState(true);
  const [list, setList] = useState<BaseResponse[]>([]);
  const [text, setText] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const pageSize = 20;
  const [isLoading, setLoading] = useState(true);

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

      setLoading(true);
      const { status } = await addItem({ name: text });

      if (status === 201) {
        setIsEdit(true);
      } else {
        alert("문제가 발생하였습니다. 다음에 시도해주세요.");
      }
    } catch (error) {
      console.error("리스트를 추가하는 중 오류 발생:", error);
      alert("문제가 발생하였습니다. 다음에 시도해주세요.");
    } finally {
      setText("");
      console.log("리스트 추가 성공");
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAddItem();
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const { status, data } = await getList({ page: 1, pageSize: pageSize });

        if (status === 200) {
          setList([...data]);
        } else {
          alert("문제가 발생하였습니다. 다음에 시도해주세요.");
        }
      } catch (error) {
        console.error("리스트를 가져오는 중 오류 발생:", error);
        alert("문제가 발생하였습니다. 다음에 시도해주세요.");
      } finally {
        setIsEdit(false);
        setLoading(false);
        console.log("리스트 가져오기 성공");
      }
    };

    if (isEdit) {
      fetchList();
    }

    setIsEmpty(list.length ? false : true);
  }, [isEdit]);

  const todoList = list.filter((item) => !item.isCompleted);
  const doneList = list.filter((item) => item.isCompleted);

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
