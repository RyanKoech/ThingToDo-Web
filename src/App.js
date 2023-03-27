import { useEffect, useRef, useState } from "react";
import { getAllThingsToDo, postThingToDo, updateThingToDo } from "./api/ThingToDo";
import ThingToDo from "./components/ThingToDo";

function App() {

  const taskInputRef = useRef();
  const [thingsToDo, setThingsToDo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    getAllThingsToDo().then(res => {
      setThingsToDo(res);
      setIsLoading(false);
    })
  }, []);

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
          updateThingToDo({...thingToDo}).then((res)=>{});
        }
        return thingToDo
      })
    )
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    postThingToDo({
      name : taskInputRef.current.value,
      done : false,
    }).then(res => {
      addThingToDo(res);
      setIsLoading(false);
    });
  }

  return (
    <div className="w-[50%] mx-auto">
      <form onSubmit={onFormSubmit}>
        <div className="mb-6">
          <label htmlFor="taskname" className="block mb-2 text-sm font-medium text-gray-900">Task Name</label>
          <input ref={taskInputRef} type="text" id="taskname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Walk the dog" required/>
        </div> 
        {
          isLoading 
          ? <div className="flex items-center justify-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span
                >
              </div>
            </div>

          : <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        }
        
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
        </ul>
      </div>
    </div>
  );
}

export default App;
