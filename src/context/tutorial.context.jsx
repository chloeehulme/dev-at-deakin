// Gets all tutorials from tutorial collection in firestore and returns them as a map in a context.

import React, { createContext, useState, useEffect} from "react";
import { fetchTutorialAndDocuments } from "../utilities/firebase";

export const TutorialContext = createContext({
    tutorial: []
})

export const TutorialProvider = ({children}) => {
    const [tutorial, setTutorial] = useState([])
    useEffect(() => {
        const fetchTutorialMap = async () => {
            const tutorialMap = await fetchTutorialAndDocuments();
            console.log(tutorialMap)
            setTutorial(tutorialMap)

        }
        fetchTutorialMap();
    }, []) 
    const value = {tutorial} 
    return (
        <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>
    )
}