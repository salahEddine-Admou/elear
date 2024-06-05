import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { getUsers, deleteUser } from '../services/UsersService';
import ModifyUserModal from './ModifyUserModal';
import "../styles/table.css"
import Swal from 'sweetalert2';

const UserTable = ({ searchValue , user}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [checkedIndices, setCheckedIndices] = useState(new Set());


  useEffect(() => {
    if (user) { 
      setData(prevData => {
        const exists = prevData.some(u => u.id === user.id);
        if (!exists) {
          const newUser = { ...user, key: user.id }; 
          return [...prevData, newUser];
        }
        return prevData; 
      });
    }
  }, [user]); 
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const response = await getUsers();
        // Vérifiez si la réponse existe et a une propriété length avant de continuer
        if (response && response.length > 0) {
          setData(response.map(user => ({ ...user, key: user.id })));
        } else {
          // Si la réponse est undefined, vide, ou n'a pas de propriété length, définissez data comme un tableau vide
          setData([]);
        }
        console.log("Utilisateurs cochés :", filteredData.filter(user => checkedIndices.has(user.key)));
      } catch (error) {
        console.error("An error occurred while fetching users:", error);
        // Gérer l'erreur comme il convient, par exemple en définissant data à un tableau vide ou en affichant un message d'erreur
        setData([]);
      }
    };
  
    fetchData();
  }, []);
 
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 
  const handleEditClick = (user) => {
    setSelectedUser(user);
    openModal();
  };
 
  const UpdateUser = (id, formData) => {
    Swal.fire({
      title: 'Are you sure you want to update this user?',
      icon: 'question',
      iconColor: 'rgb(226, 78, 14)',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update it',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'sweetalert-popup', 
        confirmButton: 'confirm-button-class', 
    cancelButton: 'cancel-button-class' 
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
    setData(prevData => {
      return prevData.map(user => {
        if (user.id === id) {
         
          return { ...user, ...formData };
        }
        return user;
      });
    });
  }

}); 
  };
  const handleCheckboxChange = (record) => {
    const updatedIndices = new Set(checkedIndices);
    if (updatedIndices.has(record.key)) {
      updatedIndices.delete(record.key);
    } else {
      updatedIndices.add(record.key);
    }
    setCheckedIndices(updatedIndices);
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      icon: 'question',
      iconColor: 'rgb(226, 78, 14)',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
        confirmButton: 'confirm-button-class', // Custom class for the confirm button
    cancelButton: 'cancel-button-class' // Custom class for the cancel button
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setData(data.filter(user => user.id !== userId));
    const response = await deleteUser(userId);
    if (response.status === 'success') {
      
    } else {
      console.error('Deletion failed');
    }

  }

}); 
  };

  const columns = [
    {
      title: 'Select',
      dataIndex: 'select',
      render: (_, record) => (
        <input
          type="checkbox"
          checked={checkedIndices.has(record.key)}
          onChange={() => handleCheckboxChange(record)
          }
        />
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <button   onClick={(e) => {
                      e.preventDefault();
                      handleEditClick(record);
                    }}><svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.675"
              y="0.675"
              width="25.65"
              height="25.65"
              stroke="black"
              stroke-width="1.35"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.4192 9.22091L18.602 8.40318L17.5804 7.38103C17.2939 7.09388 16.8896 6.95726 16.4876 7.01179C16.4762 7.01331 16.4649 7.01499 16.4535 7.01691C16.4162 7.02291 16.3791 7.03039 16.3424 7.03966C16.3053 7.04899 16.2686 7.05982 16.2323 7.07244C16.2319 7.07262 16.2314 7.07275 16.2309 7.07292C16.0467 7.13743 15.8794 7.24276 15.7416 7.38103L8.38661 14.7405L7.53019 17.5633L7.31814 18.2622L7.0192 19.2476C7.01624 19.2574 7.0137 19.2671 7.01144 19.2768C7.01072 19.2799 7.01019 19.283 7.00954 19.286C7.00814 19.2927 7.00682 19.2993 7.00573 19.3059C7.00514 19.3095 7.00467 19.3131 7.00413 19.3168C7.0033 19.3228 7.00253 19.3289 7.00197 19.3349C7.00162 19.3386 7.00133 19.3424 7.00106 19.3461C7.00066 19.352 7.00037 19.3579 7.00021 19.3637C7.00011 19.3674 7.00002 19.371 7 19.3747C7 19.3807 7.00016 19.3867 7.0004 19.3927C7.00053 19.396 7.00061 19.3994 7.00083 19.4028C7.00126 19.4096 7.00194 19.4163 7.00269 19.4231C7.00298 19.4255 7.00314 19.4279 7.00346 19.4303C7.00464 19.4395 7.00611 19.4485 7.00787 19.4574C7.00821 19.4592 7.00867 19.4609 7.00902 19.4626C7.01054 19.4698 7.01222 19.4769 7.01403 19.4839C7.01485 19.487 7.01579 19.49 7.01667 19.493C7.01827 19.4987 7.01998 19.5043 7.02184 19.5099C7.02296 19.5132 7.02416 19.5165 7.02534 19.5197C7.02723 19.525 7.02918 19.5301 7.03126 19.5352C7.03261 19.5386 7.034 19.5418 7.03541 19.5451C7.03762 19.5502 7.03991 19.5551 7.0423 19.5601C7.04382 19.5633 7.04531 19.5664 7.04691 19.5695C7.04954 19.5746 7.05234 19.5797 7.05517 19.5847C7.05669 19.5874 7.05818 19.5902 7.05976 19.5929C7.06339 19.599 7.06723 19.6051 7.07117 19.611C7.07211 19.6125 7.07299 19.6139 7.07397 19.6154C7.07892 19.6227 7.08409 19.6298 7.08947 19.6368C7.09107 19.6389 7.09267 19.6408 7.09427 19.6428C7.09821 19.6477 7.10216 19.6526 7.1063 19.6574C7.10846 19.6599 7.11074 19.6623 7.11294 19.6647C7.11669 19.6689 7.12046 19.6729 7.12435 19.6769C7.12683 19.6794 7.12936 19.6819 7.1319 19.6844C7.13576 19.6881 7.13968 19.6918 7.14368 19.6954C7.14632 19.6978 7.14896 19.7002 7.15168 19.7025C7.15582 19.7061 7.16006 19.7096 7.16435 19.713C7.16702 19.7151 7.16965 19.7172 7.17235 19.7193C7.17715 19.723 7.18195 19.7264 7.18694 19.7299C7.1893 19.7315 7.19158 19.7332 7.19395 19.7348C7.2013 19.7397 7.20877 19.7445 7.21643 19.749C7.21677 19.7492 7.21712 19.7494 7.21747 19.7495C7.2248 19.7538 7.23227 19.7579 7.23987 19.7617C7.24246 19.763 7.24514 19.7642 7.24778 19.7655C7.25317 19.7681 7.25861 19.7706 7.26413 19.773C7.26733 19.7743 7.27045 19.7756 7.2736 19.7769C7.27878 19.779 7.284 19.781 7.28926 19.7829C7.29261 19.7841 7.29597 19.7852 7.29936 19.7863C7.30462 19.788 7.30993 19.7897 7.31528 19.7912C7.31867 19.7922 7.32206 19.7932 7.32549 19.794C7.33112 19.7955 7.33678 19.7968 7.34248 19.798C7.34568 19.7987 7.34888 19.7995 7.35208 19.8001C7.35872 19.8014 7.36544 19.8024 7.37218 19.8034C7.37453 19.8037 7.37683 19.8042 7.37918 19.8045C7.38831 19.8056 7.39752 19.8064 7.4068 19.807C7.40867 19.8071 7.41058 19.8071 7.41245 19.8072C7.41885 19.8075 7.42525 19.8078 7.43178 19.8078C7.43267 19.8078 7.43358 19.8077 7.43448 19.8077C7.44021 19.8077 7.44598 19.8073 7.45176 19.807C7.45629 19.8068 7.4608 19.8067 7.46536 19.8064C7.47139 19.8059 7.47749 19.8051 7.48355 19.8043C7.4879 19.8038 7.49222 19.8035 7.49658 19.8027C7.50331 19.8017 7.5101 19.8003 7.51688 19.799C7.52061 19.7982 7.52434 19.7976 7.52808 19.7968C7.53835 19.7945 7.54865 19.7917 7.55896 19.7886C7.55923 19.7886 7.5595 19.7885 7.55978 19.7884L7.90566 19.6834L9.24306 19.2771L12.0641 18.4201L16.267 14.2147L19.4192 11.0608C19.5999 10.8804 19.7233 10.6506 19.7738 10.4003C19.7753 10.3932 19.7766 10.386 19.778 10.3789C19.7845 10.3438 19.7896 10.3085 19.7932 10.273C19.7936 10.269 19.794 10.265 19.7944 10.2611C19.798 10.2216 19.7999 10.182 19.8 10.1423C19.8 10.1418 19.8 10.1413 19.8 10.1408C19.8005 9.79576 19.6634 9.4647 19.4192 9.22091ZM11.1448 17.5003L11.7435 18.0994L8.92237 18.9563L7.85086 17.8842L8.7073 15.0614L9.306 15.6604L16.661 8.30097L16.9675 8.60761L9.61245 15.9671L10.8383 17.1937L18.1933 9.83419L18.4998 10.1408L11.1448 17.5003Z"
              fill="black"
            />
          </svg></button>
          <button 
          
          onClick={(e) => {
            e.preventDefault(); // Pour empêcher la navigation
              handleDeleteUser(record.key); // Appel à la fonction de suppression si l'utilisateur confirme
            
          }}
          style={{ marginLeft: '10px' }}><svg
            width="28"
            height="27"
            viewBox="0 0 28 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="27"
              height="27"
              transform="translate(0.5)"
              fill="#FF543E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.2863 15.8783C18.5496 16.1418 18.5496 16.5688 18.2863 16.8323L17.3323 17.7863C17.0688 18.0496 16.6418 18.0496 16.3783 17.7863L13.9934 15.4013L11.6084 17.7863C11.3449 18.0496 10.9179 18.0496 10.6544 17.7863L9.70045 16.8323C9.43709 16.5688 9.43709 16.1418 9.70045 15.8783L12.0854 13.4934L9.70045 11.1084C9.43709 10.8449 9.43709 10.4179 9.70045 10.1544L10.6544 9.20045C10.9179 8.93709 11.3449 8.93709 11.6084 9.20045L13.9934 11.5854L16.3783 9.20045C16.6418 8.93709 17.0688 8.93709 17.3323 9.20045L18.2863 10.1544C18.5496 10.4179 18.5496 10.8449 18.2863 11.1084L15.9013 13.4934L18.2863 15.8783Z"
              fill="white"
            />
          </svg></button>
        </>
      ),
    },
  ];

  const filteredData = searchValue.trim().length > 0
  ? data.filter(user =>
      user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()) 
    )
  : data;


  return (
    <div className='w-[95%] m-auto'>
      <Table
        columns={columns}
        className="custom-table"
        dataSource={filteredData}
        rowClassName={(record) => checkedIndices.has(record.key) ? 'table-row-selected' : '' 
        
      }
      />
      {selectedUser && (
        <ModifyUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          user={selectedUser}
          Update={UpdateUser}
        />
      )}
    </div>
  );
};

export default UserTable;
