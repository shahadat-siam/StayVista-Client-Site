import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utilis";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useMutation} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  // date range hundler
  const hundleDateRange = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  const {mutateAsync} = useMutation({
    mutationFn: async (roomData) => {
      const {data} = await axiosSecure.post('/room', roomData)
      return data
    },
    onSuccess: () => {
      console.log('data save successfully')
      toast.success("successfully added room");
      navigate('/dashboard/my-listings')
      setLoading(false)
    }
  })

  const hundleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const title = form.title.value;
    const price = form.price.value;
    const guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
    };

    try {
      // upload image  and get image
      const image_url = await imageUpload(image);
      const roomData = {
        location,
        category,
        title,
        price,
        guest,
        bedrooms,
        bathrooms,
        description,
        host,
        image: image_url,
        to,
        from,
      };
      await mutateAsync(roomData) 
      // console.table(roomData)
    } catch (err) {
      toast.error(err.message);
      setLoading(false)
    }
  };

  const hundleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Add Room || Dashboard</title>
      </Helmet>
      <AddRoomForm
        dates={dates}
        hundleDateRange={hundleDateRange}
        hundleFormSubmit={hundleFormSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        hundleImage={hundleImage}
        imageText={imageText}
      />
    </>
  );
};

export default AddRoom;
