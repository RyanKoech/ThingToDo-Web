import { addDoc, collection, getDocs, setDoc, doc, deleteDoc} from "@firebase/firestore";
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

export const updateThingToDo = async (thingToDo) => {
  const id = thingToDo.id
  delete thingToDo.id
  await setDoc(doc(db, PATH, id), thingToDo);
}

export const deleteThingToDo = async (thingToDo) => {
  await deleteDoc(doc(db, PATH, thingToDo.id));
}