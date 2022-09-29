// Gets all questions from question collection in firestore and returns them as a map in a context.

import React, { createContext, useState, useEffect} from "react";
import { fetchQuestionAndDocuments } from "../utilities/firebase";

export const QuestionContext = createContext({
    question: []
})

export const QuestionProvider = ({children}) => {
    const [question, setQuestion] = useState([])
    useEffect(() => {
        const fetchQuestionMap = async () => {
            const questionMap = await fetchQuestionAndDocuments();
            setQuestion(questionMap)
            console.log(questionMap)
        }
        fetchQuestionMap();
    }, []) 
    const value = {question,setQuestion} 
    return (
        <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
    )
}