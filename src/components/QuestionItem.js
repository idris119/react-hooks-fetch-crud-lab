import React from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  async function handleDelete() {
    try {
      await fetch(`http://localhost:4000/questions/${question.id}`, {
        method: "DELETE",
      });
      console.log("Deleted", question);
      onDeleteQuestion(question.id);
    }catch (error) {
      console.log(error);
    }
  }
  async function handleSelectChange(event) {
    const newCorrectIndex = Number(event.target.value);
    const updatedQuestion = {
      ...question,
      correctIndex: newCorrectIndex,
    };
    const updatedQuestions = questions.map((q) =>
    q.id === question.id ? updatedQuestion : q
  );
  setQuestions(updatedQuestions);

  try {
    await fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    });
    console.log("Question updated", updatedQuestion);
  } catch (error) {
    console.log(error);
  }
}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleSelectChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>DELETE </button>
    </li>
  );
}

export default QuestionItem;
