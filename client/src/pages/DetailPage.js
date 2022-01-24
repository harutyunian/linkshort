import {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";


const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, load} = useHttp()
    const [link, setLink] = useState()
    const {id} = useParams()
    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/links/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setLink(()=>fetched)
        } catch (e) {
        }
    }, [token, id, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (load) {
        return <Loader/>
    }

    return (
        <>
            {!load && link && <LinkCard link={link}/>}
        </>
    )
}
export default DetailPage