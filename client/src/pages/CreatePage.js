import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

const CreatePage = () => {

    const hostory = useHistory()
    const {token} = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (e) => setLink(() => e.target.value)
    const pressHandler = async (e) => {

        if (e.key === 'Enter') {
            try {
                const data = await request('/api/links/generate','POST',{from: link}, {
                        Authorization: `Bearer ${token}`
                    })
                setLink('')
                hostory.push(`/details/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    console.log('Create page')
    return <div className='row'>
        <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
                <input
                    onKeyPress={pressHandler}
                    onChange={changeHandler}
                    value={link}
                    name='link'
                    placeholder="Add your link"
                    id="link"
                    type="text"
                />
                <label htmlFor="link">Write or add your link</label>
            </div>
        </div>
    </div>
}
export default CreatePage