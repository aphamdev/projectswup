import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "./Auth";



function PickupForm(props) {
    // Allows us to get and use the token for auth
    const [submitted, setSubmitted] = useState(false);
    const { token } = useAuthContext();

    ///// This chunk of code handles the submit//////
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.trash_type = trash_type;
        data.description = description;
        data.picture_url = picture_url;
        data.hazards = hazards;
        data.size = size;
        data.weight = parseInt(weight);

        const swoopsUrl = "http://localhost:8080/pickups"; // The endpoint we want to post to
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Authorizes via token which allows us to post to the endpoint
            },
        };

        const response = await fetch(swoopsUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            setTrashType("");
            setDescription("");
            setPictureURL("");
            setHazards("");
            setSize("");
            setWeight("");
            setSubmitted(true);
        }
    }
    //sets the values of the states depending on the value in our respective inputs///////////////////////////////////////////////////////////////////////////
        const [trash_type, setTrashType] = useState('');
        const handleTrashTypeChange = (event) => {
            const value = event.target.value;
            setTrashType(value);
        }

        const [description, setDescription] = useState('');
        const handleDescriptionChange = (event) => {
            const value = event.target.value;
            setDescription(value);
        }

        const [picture_url, setPictureURL] = useState('');
        const handlePictureURLChange = (event) => {
            const value = event.target.value;
            setPictureURL(value);
        }

        const [hazards, setHazards] = useState('');
        const handleHazardsChange = (event) => {
            const value = event.target.value;
            setHazards(value);
        }

        const [size, setSize] = useState('');
        const handleSizeChange = (event) => {
            const value = event.target.value;
            setSize(value);
        }

        const [weight, setWeight] = useState('');
        const handleWeightChange = (event) => {
            const value = event.target.value;
            setWeight(value);
        }
    //our jsx///////////////////////////////////////////////////////////////////////////
    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Schedule a Pickup!</h1>
                <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="mb-3">
                    <select value={trash_type} onChange={handleTrashTypeChange} placeholder="Trash Type" required type="text" name="trashType" id="trashType" className="form-control">
                        <option value="">Choose a Garbage Category</option>
                        <option value="Large Appliance">Large Appliance</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Compost">Compost</option>
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input value={description} onChange={handleDescriptionChange} placeholder="Description" required type="text" name="description" id="description" className="form-control"/>
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={picture_url} onChange={handlePictureURLChange} placeholder="Picture URL" required type="text" name="pictureURL" id="pictureURL" className="form-control"/>
                    <label htmlFor="pictureURL">Picture URL</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={hazards} onChange={handleHazardsChange} placeholder="Hazards" required type="text" name="hazards" id="hazards" className="form-control"/>
                    <label htmlFor="hazards">Hazards (Optional)</label>
                </div>
                <div className="mb-3">
                    <select value={size} onChange={handleSizeChange} placeholder="Size" required type="text" name="size" id="size" className="form-control">
                        <option value="">Choose a Size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="XM">XM</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input value={weight} onChange={handleWeightChange} placeholder="Weight" required type="number" name="weight" id="weight" className="form-control"/>
                    <label htmlFor="weight">Weight (lbs)</label>
                </div>
                <button className="btn btn-primary">Submit</button>
                </form>
                {submitted && (
						<div
							className="alert alert-success mb-0 p-4 mt-4"
							id="success-message">
							Your pick up has been scheduled!
						</div>
					)}
            </div>
            </div>
        </div>
    )
}

export default PickupForm
