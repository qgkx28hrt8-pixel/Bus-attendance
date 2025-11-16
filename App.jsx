
import React, { useState, useEffect } from 'react';

const initialData = {
  saturday: ["احمد ياسر","سيف ياسر","محمود عبدالهادي","معتز احمد","زياد محمد","منه حمزه","نيرة عادل","جنا عيد","اسراء السيد","بسملة علي","حبيبه سلامه","منه عصام","روان علي","شهد سالم","روميساء ايمن","شهد عماد","ايه تامر"],
  sunday: ["عبدالرحمن كرم","يوسف وليد","يوسف الشيمي","مهند محمد","ابراهيم خالد","احمد ياسر","محمد زين","زياد محمد","ندى اشرف","ندى محمود","نيرة عادل","جنا عيد","اسراء السيد","منه عصام","نيسان محمد","نور حسام","شهد سالم","روميساء ايمن"],
  monday: ["عبدالرحمن كرم","يوسف وليد","يوسف الشيمي","مهند محمد","ابراهيم خالد","محمد زين","سيف ياسر","ندى اشرف","ندى محمود","نيرة عادل","جنا عيد","اسراء السيد","بسمله علي","حبيبه سلامه","نيسان محمد","نور حسام","رحمه وليد","لوجينا وليد"],
  tuesday: ["محمود عبدالعظيم","محمد زين","زياد محمد","منه حمزه","نيرة عادل","جنا عيد","اسراء السيد","بسمله علي","حبيبه سلامه","حنين علاء","ندى عبدالهادي","شهد عماد","نيسان محمد","نور حسام","شهد سالم","روميساء ايمن","رحمه وليد","لوجينا وليد"],
  wednesday: ["محمود عبدالعظيم","عبدالرحمن كرم","يوسف وليد","يوسف الشيمي","مهند محمد","ابراهيم خالد","احمد ياسر","محمود عبدالهادي","محمد زين","زياد محمد","ندى اشرف","ندى محمود","منه عصام","روان علي","حنين علاء","ندى عبدالهادي","رحمه وليد","لوجينا وليد"],
  thursday: ["محمود عبدالعظيم","عبدالرحمن كرم","يوسف وليد","يوسف الشيمي","مهند محمد","ابراهيم خالد","احمد ياسر","محمود عبدالهادي","ندى اشرف","ندى محمود","منه عصام","روان علي","حنين علاء","ندى عبدالهادي","شهد عماد","ايه تامر","رحمه وليد","لوجينا وليد"]
};

const stations = ["المدرسة","اول المحور","المول","السنترال","المجمع"];

export default function App() {

  const [day, setDay] = useState("saturday");
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("attend")) || {}
  );

  useEffect(() => {
    localStorage.setItem("attend", JSON.stringify(records));
  }, [records]);

  const updateStatus = (name, value) => {
    setRecords(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [name]: { ...(prev[day]?.[name] || {}), status: value }
      }
    }));
  };

  const updateStation = (name, value) => {
    setRecords(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [name]: { ...(prev[day]?.[name] || {}), station: value }
      }
    }));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Microbus Attendance</h1>

      <select
        value={day}
        onChange={e => setDay(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      >
        <option value="saturday">السبت</option>
        <option value="sunday">الأحد</option>
        <option value="monday">الإثنين</option>
        <option value="tuesday">الثلاثاء</option>
        <option value="wednesday">الأربعاء</option>
        <option value="thursday">الخميس</option>
      </select>

      <div className="bg-white p-4 rounded shadow">
        {initialData[day].map(name => {
          const status = records?.[day]?.[name]?.status || "";
          const station = records?.[day]?.[name]?.station || "";
          return (
            <div key={name} className="border-b py-3">
              <p className="font-bold mb-2">{name}</p>

              <div className="flex gap-2 mb-2">
                <button
                  className={`px-3 py-1 rounded ${status==="yes"?"bg-green-500 text-white":"bg-gray-200"}`}
                  onClick={() => updateStatus(name,"yes")}
                >حاضر</button>

                <button
                  className={`px-3 py-1 rounded ${status==="no"?"bg-red-500 text-white":"bg-gray-200"}`}
                  onClick={() => updateStatus(name,"no")}
                >غايب</button>
              </div>

              {status==="yes" && (
                <select
                  value={station}
                  onChange={e=>updateStation(name,e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">اختار المحطة</option>
                  {stations.map(s => <option key={s}>{s}</option>)}
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
