import "../src/index.css"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/commonPages/Login";
import EmployeeDashboard from "./pages/employeePages/EmployeeDashboard";
import AssociateDashboard from "./pages/associatePages/AssociateDashboard";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import ViewSingleEmployeeTasks from "./pages/associatePages/ViewSingleEmployeeTasks";
import Charts from "./pages/commonPages/Charts";
import AddEmployee from "./pages/adminPages/AddEmployee";
import UpdateEmployee from "./pages/adminPages/UpdateEmployee";
import ViewMyTask from "./pages/associatePages/ViewMyTask";
import { useState } from "react";
import PageNotFound from "./pages/commonPages/PageNotFound";
import EmployeeCreated from "./pages/adminPages/EmployeeCreated";


function App() {
  const [id,setId]=useState(localStorage.getItem("id"));

  return (
    <div className="bg-gray-900">
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/employeeDashboard" element={id ? <EmployeeDashboard /> : <Login />} />
         <Route path="/associateDashboard" element={id ?<AssociateDashboard /> :  <Login />} />
         <Route path="/adminDashboard" element={id ?<AdminDashboard /> :  <Login />} />
         <Route path="/addtask" element={id ?<AddTask /> : <Login />} />
         <Route path="/success" element={id ?<EmployeeCreated /> : <Login />} />
         <Route path="/update/:id" element={id ?<UpdateTask /> :  <Login />} />
         <Route path="/viewMyTask/:id" element={id ? <ViewMyTask /> :  <Login />} />
         <Route path="/updateEmployee/:id" element={id ? <UpdateEmployee /> :  <Login />} />
         <Route path="/viewSingleEmployeeTask/:id" element={id ? <ViewSingleEmployeeTasks/> :  <Login />} />
         <Route path="/charts/:id" element={id ?<Charts/> :  <Login />} />
         <Route path="/addEmployee" element={id ? <AddEmployee/> :  <Login />} />
         <Route path="/*" element={<PageNotFound />} />
       </Routes>
     </BrowserRouter>
     </div>
  );
}

export default App;



