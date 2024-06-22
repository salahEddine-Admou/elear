import React, {useState} from "react";
import NavBar from "../components/Navbar";

function FormationInput(){
    const [TrainingValue, setTrainingValue] = useState('');
    const [DescriptionValue, setDescriptionValue] = useState('');


const handleTrainingInputChange = (event) => {
    setTrainingValue(event.target.value); };
const handleDescriptionInputChange = (event) => {
    setDescriptionValue(event.target.value);
};


return (
    <>
    <NavBar />
<div className=" bg-grey-300 ">
<form className="flex flex-col mt-20">
    <label>Training Name</label>
    <input
    type="text"
    value={TrainingValue}
    onChange={handleTrainingInputChange}
    className="p-1 w-44 border-2 border-grey-500"
    />
    <label>
        Description
    </label>
    <input
    type="text"
    value={DescriptionValue}
    onChange={handleDescriptionInputChange}
    className="w-28 p-24 border-2 border-grey-500"
    />
</form>
<button type="submit"Submit/>

</div>
</>
);
};
export default FormationInput;