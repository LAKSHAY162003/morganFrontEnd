// import React, { useState, useEffect } from 'react';
// import SuggestedUserTableItem from './suggestedUserTableItem';

// function SuggestedUser(props) {

//   // let customers=[];
//   const [list, setList] = useState([]);
//   useEffect(() => {
//     console.log(props.eventId);
//     const fetchData = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/user/filter/name?name=${props.name}`);
//           const data = await response.json();
//           // console.log(data);
//           if(data.hasOwnProperty('result')){
//               setList(data.result);
//           }
//           else{
//             setList([]);
//           }
//           // console.log(list);
//         } catch (error) {
//           console.log("No user Found !!");
//         }
//       };
  
//       if (props.name) {
//         fetchData();
//       }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.name]);



//   return (
//     <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
//       <header className="px-5 py-4">
//         <h2 className="font-semibold text-slate-800">All Users <span className="text-slate-400 font-medium">{list.length}</span></h2>
//       </header>
//       <div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full">
//             {/* Table header */}
//             <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
//               <tr>

//                 <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
//                   <div className="font-semibold text-left">Name</div>
//                 </th>
//                 <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
//                   <div className="font-semibold text-left">Age</div>
//                 </th>
//                 <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
//                   <div className="font-semibold text-left">Community</div>
//                 </th>
//                 <th className="px-12 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
//                   <div className="font-semibold">Phone Number</div>
//                 </th>
//               </tr>
//             </thead>
//             {/* Table body */}
//             <tbody className="text-sm divide-y divide-slate-200">
//               { list.length>0 && 
//                 list.map(participant => {
//                   return (
//                     <SuggestedUserTableItem
//                       eventId={props.eventId}
//                       key={participant._id}
//                       _id={participant._id}
//                       name={participant.basicDetails.name}
//                       age={participant.basicDetails.age}
//                       community={participant.basicDetails.Community}
//                       phone={participant.basicDetails.PhoneNumber}
//                       language={participant.basicDetails.primaryLanguage}
//                     />
//                   )
//                 })
//               }
//             </tbody>
//           </table>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default SuggestedUser;
