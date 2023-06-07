import React, { useState, useEffect } from 'react';

import EventsTableItem from './EventsTableItem';

function EventsTable({
  selectedItems,
  factor,
  value
}) {

  // console.log(factor+" "+value);
  // let customers=[];
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  
  // basically what we can have ? on submit : idhar category and all 
  // pahunch jayegi !! 

  // now : add category to it !! if not undefined !! 
  useEffect(() => {
    async function fetchData() {
      try {
        // console.log("LeetCode");
        const response = await fetch('http://localhost:3000/events');
        const data = await response.json();
        console.log(data.result);
        const customers= data.result;
        setList(customers);
        // Do something with the data
      } catch (error) {
        console.log('Error:', error);
      }
    }

      fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const searchEventCollections = (f, v) => {
    // Filter the collections based on the search criteria
    const filteredCollections = list.filter((collection) => {
      return collection[f] === v;
    });
  
    // Update the state with the new filtered array
    setList(filteredCollections);
  };

  useEffect(() => {
    async function fetchData2() {
      try {
        // console.log("LeetCode");
        const response = await fetch('http://localhost:3000/events');
        const data = await response.json();
        console.log(data.result);
        const customers= data.result;
        setList(customers);
        // Do something with the data
      } catch (error) {
        console.log('Error:', error);
      }
    }
    async function fetchData() {
      try {
        console.log(factor+" Hello :  "+value);
        if(factor==="None"){
          // do nothing !! 
          fetchData2();
          return;
        }
        searchEventCollections(factor,value);

      } catch (error) {
        console.log('Error:', error);
      }
    }

      fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factor]);



  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">All Events <span className="text-slate-400 font-medium">{list.length}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <span className="sr-only">Favourite</span>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Event Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">No of Participants</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Category</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Location</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Number of Feedbacks</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">More</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                list.map(event => {
                  return (
                    <EventsTableItem
                      key={event._id}
                      _id={event._id}
                      eventName={event.eventName}
                      participants={event.attended}
                      participantsCount={event.attended.length}
                      category={event.category}
                      eventLocation={event.location}
                      registeredCount={event.registered.length}
                      feedbacksCount={event.feedback.length}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(event.sessionId)}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default EventsTable;
