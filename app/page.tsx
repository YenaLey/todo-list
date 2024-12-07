"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "@/styles/page.module.css";
import List from "@/components/List";
import { addItem, getList } from "@/lib/api";

export default function Main() {
  const [isEdit, setIsEdit] = useState(true);
  const [list, setList] = useState<BaseResponse[]>([]);
  const [text, setText] = useState("");

  const fetchAddItem = async () => {
    try {
      if (!text.trim()) {
        alert("할 일을 입력해주세요.");
        return;
      }

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
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAddItem();
  };

  const removeFromList = (id: number) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const { status, data } = await getList({ page: 1, pageSize: 20 });

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
        console.log("리스트 가져오기 성공");
      }
    };

    if (isEdit) {
      fetchList();
    }
  }, [isEdit]);

  const todoList = list.filter((item) => !item.isCompleted);
  const doneList = list.filter((item) => item.isCompleted);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          placeholder="할 일을 입력해주세요"
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></input>
        <button type="submit">+ 추가하기</button>
      </form>
      <section>
        <div className={styles.todoBox}>
          <h2>TO DO</h2>
          <ul>
            <AnimatePresence>
              {todoList.map((item) => (
                <List
                  key={item.id}
                  item={item}
                  setIsEdit={setIsEdit}
                  onRemove={removeFromList}
                />
              ))}
            </AnimatePresence>
          </ul>
        </div>
        <div className={styles.doneBox}>
          <h2>DONE</h2>
          <ul>
            <AnimatePresence>
              {doneList.map((item) => (
                <List
                  key={item.id}
                  item={item}
                  setIsEdit={setIsEdit}
                  onRemove={removeFromList}
                />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </section>
    </div>
  );
}
