import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((data) => setQuestions(data));
}, []);


function handleAddQuestion(postedQuestion) {
  console.log("From App:", postedQuestion);
  const updatedQuestions = [postedQuestion, ...questions]
  setQuestions(updatedQuestions)
}

function onDeleteQuestion(id){
  const updatedQuestions = questions.filter((question) => question.id !== id )
  setQuestions(updatedQuestions);
  console.log("From App", id)
}


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion} setQuestions={setQuestions} />}
    </main>
  );
}

export default App;
