// export default function RecentTable({ files }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Recent Extractions</h2>
//       </div>

//       {files.length === 0 ? (
//         <p className="text-gray-500">No invoices uploaded yet.</p>
//       ) : (
//         <table className="w-full text-left">
//           <thead>
//             <tr className="text-sm text-gray-500">
//               <th className="pb-3">Vendor</th>
//               <th className="pb-3">Status</th>
//               <th className="pb-3">Amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             {files.map((file) => (
//               <tr key={file.id} className="border-t">
//                 <td className="py-3 font-medium">
//                   {file.vendor || file.filename}
//                 </td>

//                 <td className="py-3">
//                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//                     {file.status}
//                   </span>
//                 </td>

//                 <td className="py-3 font-semibold">
//                   ${file.total || 0}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

export default function RecentTable({ files }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Extractions</h2>
      </div>

      {files.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          No invoices uploaded yet.
        </p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 dark:text-gray-300">
              <th className="pb-3">Vendor</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-t">
                <td className="py-3 font-medium">
                  {file.vendor || file.filename}
                </td>

                <td className="py-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {file.status}
                  </span>
                </td>

                <td className="py-3 font-semibold">
                  ${file.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}