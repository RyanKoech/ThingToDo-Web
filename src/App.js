import { useRef, useState } from "react";
import ThingToDo from "./components/ThingToDo";

const THINGS_TO_DO = [
  {
    id : "123456",
    name: "Thing One",
    done : false,
  },
  {
    id : "1233456",
    name: "Thing Two",
    done : true,
  },
  {
    id : "145456",
    name: "Thing Three",
    done : true,
  },
  {
    id : "156456",
    name: "Thing Four",
    done : false,
  },
];

function App() {

  const taskInputRef = useRef();
  const [thingsToDo, setThingsToDo] = useState(THINGS_TO_DO);
  const addThingToDo = (thingToDo) => {
    setThingsToDo([
      ...thingsToDo,
      thingToDo
    ]);
  }

  const removeThingToDo = (thingToDo) => {
    setThingsToDo(
      thingsToDo.filter((element) => {
        return element.id !== thingToDo.id
      })
    )
  }

  const onCheckboxClick = (thingToDoId) => {
    setThingsToDo(
      thingsToDo.map((thingToDo) => {
        if(thingToDo.id === thingToDoId) {
          thingToDo.done = !thingToDo.done
        }
        return thingToDo
      })
    )
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    
    addThingToDo(
      {
        id : Math.random().toString(),
        name : taskInputRef.current.value,
        done : false,
      }
    );
  }

  return (
    <div className="w-[50%] mx-auto">
      <form onSubmit={onFormSubmit}>
        <div className="mb-6">
          <label htmlFor="taskname" className="block mb-2 text-sm font-medium text-gray-900">Task Name</label>
          <input ref={taskInputRef} type="text" id="taskname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Walk the dog" required/>
        </div> 
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>

      <div>
        <ul className="divide-y divide-gray-200">
          {
            (thingsToDo.length > 0) 
            ? thingsToDo.map((thingToDo, index)=> {
                return <ThingToDo key={thingToDo.id} onCheckboxClick={()=>{onCheckboxClick(thingToDo.id)}} taskName={thingToDo.name} done={thingToDo.done} onDeleteClick={() => removeThingToDo(thingToDo)}/>
              })
            : <div className="text-xl3 font-bold text-center">No tasks at the moment</div>
          }
            {
              
              thingsToDo.map((thingToDo, index)=> {
                return <ThingToDo key={thingToDo.id} onCheckboxClick={()=>{onCheckboxClick(thingToDo.id)}} taskName={thingToDo.name} done={thingToDo.done} onDeleteClick={() => removeThingToDo(thingToDo)}/>
              })
            }
        </ul>
      </div>
    </div>
  );
}

export default App;
