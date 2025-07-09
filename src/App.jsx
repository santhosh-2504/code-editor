import  { useEffect, useState } from "react";
import MonacoPlayer from "./MonacoPlayer";
import MonacoRecorder from "./MonacoRecorder";

export default function App() {
  const [lessonData, setLessonData] = useState(null);

  useEffect(() => {
    fetch("/input.json")
      .then((res) => res.json())
      .then((data) => {
        setLessonData(data);
      })
      .catch((err) => {
        console.error("Failed to load lesson:", err);
      });
  }, []);

  return (
    <div className="width-full min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="">Lesson Recorder</h1>
      {/* Toggle between Recorder and Player */}
      <MonacoRecorder /> 

       {lessonData ? (
        <MonacoPlayer jsonData={lessonData} />
      ) : (
        <p className="">Loading lesson...</p>
      )}
    </div>
  );
}
