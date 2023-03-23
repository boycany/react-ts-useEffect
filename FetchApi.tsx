import { useState, useEffect } from 'react';
import * as React from 'react';

type Comment = {
  body: string;
  id: number;
  postId: number;
  email: string;
  name: string;
};

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

/** 其實 custom hook 就可以看作是一個 function 罷了，只是其內部會調用 react hook */
function useFetchAPI() {
  const [postId, setPostId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState([] as Comment[]);

  async function fetchComments(id: number) {
    setLoading(true);
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/comments?postId=' + id
      );
      const res_data = (await res.json()) as Comment[];
      console.log('Comments: ', res_data);

      setData(res_data);
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  return [data, error, loading, setPostId] as const;
  //加入這個 as 讓回傳陣列的順序是固定、不會被自動調換的
  //(將游標移到 function 名稱上可以看到 typescript 標記這個 function 會輸出什麼類型)

  //也可以回傳成物件，順序就會是固定的
  //return {data, error, loading, setPostId}
}

const FetchApi: React.FC = () => {
  const [data, error, loading, setPostId] = useFetchAPI();
  // 若是輸出物件的 custom hook
  // const {data, error, loading, setPostId} = useFetchAPI()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data: Todo) => console.log('todo: ', data));
  }, []);

  function clickHandler(id: number) {
    setPostId(id);
  }

  return (
    <div>
      <h1>Fetch</h1>
      <button onClick={() => clickHandler(1)}>ID 1 data</button>
      <button onClick={() => clickHandler(2)}>ID 2 data</button>
      {loading ? (
        <p>Loading...</p>
      ) : error === null ? (
        <p style={{ color: 'green' }}>資料獲取成功</p>
      ) : (
        <p style={{ color: 'red' }}>資料獲取失敗</p>
      )}
      <p>Result:</p>
      {data.length > 0 &&
        data.map((item) => {
          return <p key={item.id}>{item.email}</p>;
        })}
    </div>
  );
};

export default FetchApi;
