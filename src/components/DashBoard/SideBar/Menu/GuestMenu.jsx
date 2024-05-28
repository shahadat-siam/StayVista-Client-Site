import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from ".//MenuItem";
import useRole from "../../../../hooks/useRole";
import HostModal from "../../DeleteModal/HostRequestModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const GuestMenu = () => {
  const [role] = useRole();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  // const [isOpen, setIsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHundler = async () => {
    console.log("I want to a host");
    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "request",
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      console.log(data) 
      if(data.modifiedCount > 0){
        toast.success('success! Please wait for admin confirmation')
      } else{
        toast.success('Please! wait for admin approval')
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    } finally{
      closeModal();
    }
    
  };
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Bookings"
        address="my-bookings"
      />
      {role === "guest" && (
        <div  onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer">
          <GrUserAdmin className="w-5 h-5" />
          <span className="mx-4 font-medium">Become A Host</span>
        </div>
         
      )}
       <HostModal
         isOpen={isModalOpen}
         closeModal={closeModal}
         modalHundler={modalHundler}
       />
    </>
  );
};

export default GuestMenu;
