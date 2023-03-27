import { addDoc, collection, getDocs } from "@firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../config/Firebase";

const PATH = "thingstodo"

export const getAllThingsToDo = async () => {
  const thingsToDo = [];
  const querySnapshot = await getDocs(collection(db, PATH));
  querySnapshot.forEach((doc) => {
    thingsToDo.push({
      ...doc.data(),
      id : doc.id,
    })
  });

  return thingsToDo;
}

export const postThingToDo = async (thingToDo) => {
  const thingsToDoCollection = collection(db, PATH);
  const { id } = await addDoc(thingsToDoCollection, thingToDo);

  return {...thingToDo, id}
}