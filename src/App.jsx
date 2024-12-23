import { useState } from 'react';
import Navbar from './Navbar';
import Search from './components/Search';
import PaperButton from './components/PaperButton';
import { BiSearch } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import './App.css';

function App() {
  const papers = [
    { id: 1, title: 'CBSE 2024 PYQ' },
    { id: 2, title: 'ICSE 2023 PYQ'},
    { id: 3, title: 'CBSE 2022 PYQ'},
  ];

  const [statuses, setStatuses] = useState(papers.map(() => ""));

  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = newStatus;
    setStatuses(updatedStatuses);
  };
  return (
    <>
      <Navbar />
      <div className="mt-20 p-8">
        <h2 className="font-bold text-2xl text-gray-600">Choose your paper for evaluation</h2>
        <div className="w-4/5 flex justify-between">
          <Search placeholdertext="Search by year" />
          <select className="bg-white px-6 py-2 h-full rounded-xl border border-gray-400 focus:outline-none focus:ring-2 text-gray-500 focus:ring-gray-400">
            <option value="" disabled selected hidden>Filters</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="w-4/5 mt-10">
          <table className="w-full">
            <colgroup>
              <col span="1" className="w-[60%]" />
              <col span="1" />
              <col span="1" className="w-[10%]" />
              <col span="1" className="w-[10%]" />
            </colgroup>
            <thead className="text-left">
              <tr>
                <th>Title</th>
                <th></th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper, index) => (
                <tr key={paper.id} className="bg-white shadow-md">
                  <td>{paper.title}</td>
                  <td>
                    <BsEye size={25} />
                  </td>
                  <td className="capitalize font-semibold">{statuses[index]}</td>
                  <td>
                    <PaperButton
                      status={statuses[index]}
                      onClick={() => handleStatusChange(index, statuses[index] === "completed" ? "" : "completed")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
