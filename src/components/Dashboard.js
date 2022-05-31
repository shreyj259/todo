import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import InputData from "./InputData";
import Card from "./Card";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const [rawData, setData] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const nameList = doc(db, "tasks", currentUser.uid);
      const unsub = onSnapshot(nameList, (task) => {
        if (task.exists()) {
          if (rawData.length === 0) {
            const temp = task.data().task.map((task) => {
              return {
                ...task,
                disabled: {
                  save: true,
                  update: false,
                  delete: false,
                },
              };
            });
            setData(temp);
          }
        }
      });
      return () => unsub();
    }
  }, []);

  const addHandler = async (e, ref) => {
    e.preventDefault();
    const taskname = ref.current.value;
    const newobj = {
      name: taskname,
      value: 0,
      complete: false,
      disabled: {
        save: true,
        update: false,
        delete: false,
      },
    };
    setData([...rawData, newobj]);

    const nameList = doc(db, "tasks", currentUser.uid);
    try {
      await setDoc(nameList, {
        task: rawData
          ? [
              ...rawData.map((data) => {
                return {
                  name: data.name,
                  value: data.value,
                  complete: data.complete,
                };
              }),
              {
                name: newobj.name,
                value: newobj.value,
                complete: newobj.complete,
              },
            ]
          : [
              {
                name: newobj.name,
                value: newobj.value,
                complete: newobj.complete,
              },
            ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch {}
  };

  const sliderHandler = async (e, index) => {
    const temp = [...rawData];
    const arr = temp[index];
    arr.value = e.target.value;
    temp[index] = arr;
    setData(temp);
  };

  const btnHandler = async (index, type) => {
    const tasks = [...rawData];

    if(type=="save"){
      const nameList = doc(db, "tasks", currentUser.uid);
    console.log(nameList);
    try {
      await updateDoc(nameList, {
        task: tasks.map((data) => {
          return {
            name: data.name,
            value: data.value,
            complete: data.complete,
          };
        }),
      });
    } catch (err) {
      console.log(err);
    }
    }

    if (type == "delete") {
      setData(tasks.filter(data=>data.name!==tasks[index].name));      
      const tasks2=tasks.filter(data=>data.name!==tasks[index].name).map(data=>{
        if(data.name!==tasks[index].name){
          return{
            name:data.name,
            value:data.value,
            complete:data.complete
          }
        }
      })
      console.log(tasks2);
      const nameList = doc(db, "tasks", currentUser.uid);
      try {
        await updateDoc(nameList, {
          task: [...tasks2]
        });
      } catch(err) {
        console.log(err);
      }
      return;
    }

    
    const disable = { ...rawData[index].disabled };
    disable.save = !disable.save;
    disable.update = !disable.update;
    disable.delete = !disable.delete;
    tasks[index].disabled = disable;
    setData(tasks);
  };

  const output = rawData.map((task, index) => (
    <Card
      key={index}
      index={index}
      name={task.name}
      disable={task.disabled}
      value={task.value}
      sliderHandler={(e) => sliderHandler(e, index)}
      btnHandler={btnHandler}
    />
  ));

  return (
    <div>
      <InputData addHandler={addHandler} />
      {output}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
