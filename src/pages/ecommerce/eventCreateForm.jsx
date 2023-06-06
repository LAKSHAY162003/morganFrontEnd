import { React,useState }from "react";
import { useNavigate } from "react-router-dom";

export default function EventForm() {

    const [eventName,setEventName]=useState("");
    const [location,setLocation]=useState("");
    const [category,setEventCategory]=useState("");
    const [eventDuration,setEvenDuration]=useState(0);
    const [eventDetails,setEventDetails]=useState("");
    // duration details 

    const navigate=useNavigate();
    const postData = async (data) => {
      
        try {
          const response = await fetch('http://localhost:3000/events/createEvent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            throw new Error('Request failed');
          }
      
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error(error);
        }
      };


    async function handleSubmit(e){
        e.preventDefault();
        await postData({
            eventName,category,location,eventDetails,eventDuration
        });
        // just navigate !! 
        navigate("/events/AllEvents");
    }
    function handleCancel(){
        navigate("/events/AllEvents");
    }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 mx-12 md:mx-24 lg:mx-40">

        <div className="my-2 border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Event Details</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Add the details Carefully !</p>

          {/* Event name  */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Event Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(event)=>{setEventName(event.target.value)}}
                  type="text"
                  name="first-name"
                  value={eventName}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          {/* Event details */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Event Details
              </label>
              <div className="mt-2">
                <input
                  onChange={(event)=>{setEventDetails(event.target.value)}}
                  type="text"
                  name="first-name"
                  value={eventDetails}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          {/* Event duration */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Event Duration
              </label>
              <div className="mt-2">
                <input
                  onChange={(event)=>{setEvenDuration(event.target.value)}}
                  type="number"
                  name="first-name"
                  value={eventDuration}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

                    {/* Event category */}
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Event category
              </label>
              <div className="mt-2">
                <input
                onChange={(event)=>{setEventCategory(event.target.value)}}
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={category}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

                {/* Location */}
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <input
                onChange={(event)=>{setLocation(event.target.value)}}
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={location}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={handleCancel} type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>

      </div>

    </form>
  )
}
