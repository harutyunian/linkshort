import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import LinkCard from "../components/LinkCard";
import LinksList from "../components/LinksList";
import Loader from "../components/Loader";

const LinksPage = () => {
    const {token} = useContext(AuthContext)
    const [link, setLink] = useState([])
    const {load, request} = useHttp()

    const fetchLink = useCallback(async () => {
        try {
            const fetched = await request('/api/links', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLink(fetched)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchLink()
        console.log('Update')
    }, [fetchLink])


    if (load) {
        return <Loader/>
    }
    return (
        <>
            {!load && <LinksList links={link}/>}
        </>

    )
}

export default LinksPage