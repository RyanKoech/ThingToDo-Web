import { useEffect, useRef, useState } from "react";
import { deleteThingToDo, getAllThingsToDo, postThingToDo, updateThingToDo } from "./api/ThingToDo";
import Navbar from "./components/Navbar";
import ThingToDo from "./components/ThingToDo";

function App() {

  const taskInputRef = useRef();
  const [thingsToDo, setThingsToDo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(()=> {
    getAllThingsToDo().then(res => {
      setThingsToDo(res);
      setIsError(false);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false)
      setIsError(true)
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
        const targetItem = element.id === thingToDo.id
        if (targetItem) {
          deleteThingToDo(element).then(res => {});
        }
        return !targetItem
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
    setIsError(false);
    postThingToDo({
      name : taskInputRef.current.value,
      done : false,
    }).then(res => {
      addThingToDo(res);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      setIsError(true);
    });
  }
  return (
    <div> 
      <Navbar/>
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
          {
            isError && <div className="flex items-center justify-center">
              <div className="mt-10 text-xl3 font-bold text-center">Something went terribly wrong. Try again later.</div>
            </div>
          }
      
        </form>
        <div>
          <ul className="divide-y divide-gray-200">
            {
              (thingsToDo.length > 0)
              ? thingsToDo.map((thingToDo, index)=> {
                  return <ThingToDo key={thingToDo.id} onCheckboxClick={()=>{onCheckboxClick(thingToDo.id)}} taskName={thingToDo.name} done={thingToDo.done} onDeleteClick={() => removeThingToDo(thingToDo)}/>
                })
              : <div className="mt-10 text-xl3 font-bold text-center">No tasks at the moment</div>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
