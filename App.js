//import { fchown } from "fs-extra";
import React, { useState } from "react";
import "./index.css";
import "./App.css";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from '@material-ui/icons/Cancel';
///import Todolist from "./Todolist";
import EditIcon from '@material-ui/icons/Edit';
function App() {
  const [InputData,setInputData]=useState('');
  const [Items,setItems]=useState([]);
  const [toggleSubmit,settoggleSubmit]=useState(true);
  const [IsEditItem,setIsEditItem]=useState(null);
  
  
const addItem=()=>{
  if(!InputData){
    
           alert("plz fill input");
  
  }else if(InputData && !toggleSubmit){
    setItems(
      Items.map((el)=>{
        if(el.id==IsEditItem){
          return {...el,name:InputData}
        }
        return el;
      })
    )
    settoggleSubmit(true);
  setInputData('');
 setIsEditItem(null); 

  
  }
  else{
    const allInputData={id: new Date().getTime().toString(), name: InputData} // by doing this we are able to add different with every name you add
    setItems((prev)=>{                      //setItems([...Items,InputData]);
      return [...prev,allInputData];
    });
    setInputData("");
  }
 
}
const deleteItem=(index)=>{
  console.log("deleted");
  setItems((prev)=>{
   return prev.filter((elem)=>{
      return index !==elem.id;

    });
  });

};
const editItem=(id)=>{
 let newEditItem=Items.find((elem)=>{
      return elem.id==id;
 });
  console.log(newEditItem);
  settoggleSubmit(false);
  setInputData(newEditItem.name);
 setIsEditItem(id); 

}


const removeAll=()=>{
  setItems([]);
}


  return (
    <>
      <div className="main_div">
        <div className="child-div">
          <br/>
          <h1>Todo list</h1>
          <br />
         <div className="addItems">

          <input type="text" placeholder="add item" value={InputData} onChange={(e)=>setInputData(e.target.value)} />
        {toggleSubmit?  <button onClick={addItem} title ="Add Item">
            <AddIcon/>
          </button> : <button onClick={addItem}>
             <EditIcon/>
            </button>  }
         
         </div><br/>

          <div className="showItems">
          {Items.map((element,index)=>{
           return (
           <div className="eachItem" key={index}>
           <h3>{element.name}</h3>
           <div className="todo-btn" >

            <button onClick={()=>editItem(element.id)}>
             <EditIcon/>
            </button>
            <button onClick={()=>deleteItem(element.id)} title ="delete Item">
         <CancelIcon/>
       </button>
      </div>
         </div>
            )  } )}

          </div>
            <div className="showItems">
              <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>  CheckList</button>
            </div>
          </div>
      </div>
  
    </>
  );
}
export default App;
