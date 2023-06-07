import React, { useState, useEffect } from 'react';

import EventUserTableItem from './UserTableItem';

function EventUsersTable(props) {

  // let customers=[];
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);

  // props.list !! : "Attend" or "Register"
  console.log(props.list);
  
  // const handleFilterChange = (event) => {
  //   const selectedFilter = event.target.value;
  //   // Logic to update the list or list2 based on the selected filter

  //   // Example logic:
  //   if (selectedFilter === 'filter1') {
  //     setList([...]); // Update list based on filter1
  //     setShowList1(true); // Show list
  //   } else if (selectedFilter === 'filter2') {
  //     setList2([...]); // Update list2 based on filter2
  //     setShowList1(false); // Hide list
  //   }
  // };
  

  useEffect(() => {
        console.log("Hello",props.eventId);
      // /registeredList ispe bhi call karke registerList bhi mangwalo !!
      // also have : only registered and only attended ka funda !! 
      // have a tag against them !! 
        async function fetchData() {
            try {
              const response = await fetch(`http://localhost:3000/events/attendance?eventId=${props.eventId}`);

              const data = await response.json();
              
              const response2 = await fetch(`http://localhost:3000/events/registeredList?eventId=${props.eventId}`);

              const data2 = await response2.json();

            //   console.log(data.result);
              const attendies= data.result;
              const registerations=data2.result;
              setList(attendies);
              setList2(registerations);
              console.log(list2);
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
    return collection.basicDetails[f] === v;
    });
    const filteredCollections2 = list2.filter((collection) => {
      return collection.basicDetails[f] === v;
      });
    
    // Update the state with the new filtered array
    setList(filteredCollections);
    setList2(filteredCollections2);
  };

  useEffect(() => {
    async function fetchData2() {
      try {
        const response = await fetch(`http://localhost:3000/events/attendance?eventId=${props.eventId}`);

        const data = await response.json();
        
        const response2 = await fetch(`http://localhost:3000/events/registeredList?eventId=${props.eventId}`);

        const data2 = await response2.json();

      //   console.log(data.result);
        const attendies= data.result;
        const registerations=data2.result;
        setList(attendies);
        setList2(registerations);
        console.log(list2);
        // Do something with the data
      } catch (error) {
        console.log('Error:', error);
      }
    }
    async function fetchData() {
      try {
        console.log(props.factor+" Hello :  "+props.value);
        if(props.factor==="None"){
          // do nothing !! 
          fetchData2();
          return;
        }
        searchEventCollections(props.factor,props.value);

      } catch (error) {
        console.log('Error:', error);
      }
    }

      fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.factor]);

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
    props.selectedItems(isCheck);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">All Users <span className="text-slate-400 font-medium">{list.length}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th> */}

                <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Age</div>
                </th>
                <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Community</div>
                </th>
                <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Phone Number</div>
                </th>
                <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Primary Language</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {/* <tbody className="text-sm divide-y divide-slate-200">
              {
                (props.list==="Attend")?
                list.map(participant => {
                  return (
                    <EventUserTableItem
                      typeOfEvent="Attend"
                      key={participant._id}
                      _id={participant._id}
                      name={participant.basicDetails.name}
                      age={participant.basicDetails.age}
                      community={participant.basicDetails.Community}
                      phone={participant.basicDetails.PhoneNumber}
                      language={participant.basicDetails.primaryLanguage}
                    />
                  )
                }):list2.map(participant => {
                  return (
                    <EventUserTableItem
                      typeOfEvent="Register"
                      key={participant._id}
                      _id={participant._id}
                      name={participant.basicDetails.name}
                      age={participant.basicDetails.age}
                      community={participant.basicDetails.Community}
                      phone={participant.basicDetails.PhoneNumber}
                      language={participant.basicDetails.primaryLanguage}
                    />
                  )
                })
              }
            </tbody> */}

            <tbody className="text-sm divide-y divide-slate-200">
  {props.list === "Attend"
    ? list.map((participant) => {
        return (
          <EventUserTableItem
            isBoth="No"
            typeOfEvent="Attend"
            key={participant._id}
            _id={participant._id}
            name={participant.basicDetails.name}
            age={participant.basicDetails.age}
            community={participant.basicDetails.Community}
            phone={participant.basicDetails.PhoneNumber}
            language={participant.basicDetails.primaryLanguage}
          />
        );
      })
    : props.list === "Register"
    ? list2.map((participant) => {
        return (
          <EventUserTableItem
            isBoth="No"
            typeOfEvent="Register"
            key={participant._id}
            _id={participant._id}
            name={participant.basicDetails.name}
            age={participant.basicDetails.age}
            community={participant.basicDetails.Community}
            phone={participant.basicDetails.PhoneNumber}
            language={participant.basicDetails.primaryLanguage}
          />
        );
      })
    : (
        <>
          {list.map((participant) => {
            return (
              <EventUserTableItem
                isBoth="Yes"
                typeOfEvent="Attend"
                key={participant._id}
                _id={participant._id}
                name={participant.basicDetails.name}
                age={participant.basicDetails.age}
                community={participant.basicDetails.Community}
                phone={participant.basicDetails.PhoneNumber}
                language={participant.basicDetails.primaryLanguage}
              />
            );
          })}
          {list2.map((participant) => {
            return (
              <EventUserTableItem
                isBoth="Yes"
                typeOfEvent="Register"
                key={participant._id}
                _id={participant._id}
                name={participant.basicDetails.name}
                age={participant.basicDetails.age}
                community={participant.basicDetails.Community}
                phone={participant.basicDetails.PhoneNumber}
                language={participant.basicDetails.primaryLanguage}
              />
            );
          })}
        </>
      )}
    </tbody>


          </table>

        </div>
      </div>
    </div>
  );
}

export default EventUsersTable;
