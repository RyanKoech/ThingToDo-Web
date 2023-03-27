const ThingToDo = ({onCheckboxClick, taskName, done, onDeleteClick}) => {

  return(
    <li className="py-3 sm:py-4" >
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {taskName}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 mr-4">
          <input onClick={onCheckboxClick} id="checked-checkbox" readOnly={true} checked={done} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
        </div>
        <div>
          <span className="text-xl3 cursor-pointer" onClick={onDeleteClick}>X</span>
        </div>
      </div>
    </li>
  );
}

export default ThingToDo;