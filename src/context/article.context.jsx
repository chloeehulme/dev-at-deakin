// Gets all articles from article collection in firestore and returns them as a map in a context.

import React, { createContext, useState, useEffect} from "react";
import { fetchArticleAndDocuments } from "../utilities/firebase";

export const ArticleContext = createContext({
    article: []
})

export const ArticleProvider = ({children}) => {
    const [article, setArticle] = useState([])
    useEffect(() => {
        const fetchArticleMap = async () => {
            const articleMap = await fetchArticleAndDocuments();
            console.log(articleMap)
            setArticle(articleMap)

        }
        fetchArticleMap();
    }, []) 
    const value = {article} 
    return (
        <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
    )
}