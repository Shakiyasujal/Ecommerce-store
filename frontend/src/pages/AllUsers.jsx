// AllUsers Component
import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })
        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        } else if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const updateUserRoleLocally = (updatedUser) => {
        setAllUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            )
        );
    }

    return (
        <div className='pb-4 bg-white'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUser.map((el, index) => (
                            <tr key={el._id}>
                                <td>{index + 1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                        onClick={() => {
                                            setUpdateUserDetails(el)
                                            setOpenUpdateRole(true)
                                        }}>
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                        onRoleChange={updateUserRoleLocally} // Pass the callback here
                    />
                )
            }
        </div>
    )
}

export default AllUsers
