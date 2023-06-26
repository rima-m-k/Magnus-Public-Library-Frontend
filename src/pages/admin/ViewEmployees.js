import React, { useEffect, useState } from 'react'
import { getEmployeeData, updateEmployeeStatus } from '../../services/adminServiceHelpers'
import DataTable from 'react-data-table-component'
import Spinner from '../../components/Spinner'
import { BiBlock, BiEdit, FiEdit } from 'react-icons/bi';
import { CgUnblock } from 'react-icons/cg';
import { toast } from "react-toastify";


function ViewEmployees() {
  const [Employees, setEmployees] = useState([])
  const [error, setError] = useState('')
  const [isLoasing, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState([])
  


  useEffect(() => {
    setIsLoading(true)
    getEmployeeData()
      .then((res) => {
        // console.log(res);
        setEmployees(res.data);
        setFilteredData(res.data)
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      })
      .finally(() => setIsLoading(false))
  }, []);
  useEffect(() => {
    const result = Employees.filter(employee => employee.firstName.toLowerCase().match(search.toLowerCase()))
    setFilteredData(result)
 
  }, [search])


  function BlockUnblock(ID,status) {
    updateEmployeeStatus({ID,status})
    .then(res =>{
      console.log(res.data.employees.isBlocked)
      setFilteredData((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee._id === ID ? { ...employee, isBlocked: res.data.employees.isBlocked } : employee
      )
    );
    })
    .catch(err =>{
      console.log(err)

      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      wrap: true,
      sortable: true,
      width: '200px',
      style: { fontSize: '16px' }
    },
    {
      name: "Designation",
      selector: (row) => row.designationID.designation,
      wrap: true,
      sortable: true,
      width: '200px',
      style: { fontSize: '16px' }
    },
    {
      name: "email",
      selector: (row) => row.email,
      wrap: true,
      sortable: true,
      width: '300px',
      style: { fontSize: '16px' }
    },
    {
      name: "status",
  selector: (row) => `${row.isBlocked ? "Blocked" : "Unblocked"}`,
      wrap: true,
      sortable: true,
      width: '200px',
      style: { fontSize: '16px' }
    },
    {
      name: "Actions",
      cell: (row) => (
        <>

          {
            (row.designationID.designation === 'Librarian') ? null : (
              <button
                title={row.isBlocked ? "unblock employee" : "block employee"}
                onClick={() => BlockUnblock(row._id,row.isBlocked)}
                className={`bg-${row.isBlocked ? 'blue-900' : 'red-600'} p-2 hover:bg-${row.isBlocked ? 'blue-800' : 'red-900'} text-white rounded mx-2`}
              >
                {row.isBlocked ? <CgUnblock /> : <BiBlock />}
              </button>


            )}
        </>
      )
    }

  ]
  console.log(filteredData)
  return (
    <>
      <div className="mt-4 overflow-x-auto">
        {!isLoasing ?

          <DataTable
            title="Employee Data"
            columns={columns}
            data={filteredData}
            pagination
            fixedHeader
            theme="solarized"
            highlightOnHover
            actions={
              <button className="px-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
                EXPORT
              </button>
            }
            subHeader
            subHeaderComponent={
              <input
                type="search"
                placeholder="Search Here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-blue-800 bg-  gray-100 border-b-2 block w-25 rounded py-2 px-3 mb-1"
              />
            }
            responsive

          /> :
          <div className='bg-white min-h-fit'>
            <Spinner isUser={false} />
          </div>
        }

      </div>

    </>
  )
}

export default ViewEmployees
