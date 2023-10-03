import React, { useEffect, useRef, useState } from 'react'
import FetchStrapi from '../queries/fetchStrapi/FetchStrapi'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setUser, setJwt } from '../app/slices/userSlice';
import { AiFillEdit } from "react-icons/ai";

export default function Profile(props: { margin?: string }) {
    const navigate = useNavigate()
    const id = useAppSelector(state => state.userSlice.id)
    const jwt = useAppSelector(state => state.userSlice.jwt)
    const strapi = new FetchStrapi()
    const userInfo = strapi.authMe(jwt)
    const userUpload = strapi.uploadUser(jwt, id)
    const imageUpload = strapi.uploadFile(jwt)
    const dispach = useAppDispatch()

    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLFormElement>(null)

    const [image, setImage] = useState(userInfo.data?.url)

    useEffect(() => {
        if (!imageUpload.isLoading && imageUpload.data != undefined) {
            userUpload.trigger({ profilePhoto: imageUpload.data.id })
        }
    }, [imageUpload.isLoading])
    useEffect(() => {
        if (!userInfo.isLoading && userInfo.data?.url != undefined) setImage(userInfo.data?.url)
    }, [userInfo.isLoading])
    const saveButton = () => {
        userUpload.trigger({
            username: usernameRef.current?.value,
            email: emailRef.current?.value
        })
        imageUpload.trigger({ data: imageRef.current! })
        usernameRef.current!.disabled = true
        emailRef.current!.disabled = true
    }

    return (
        <div className='profile' style={props}>
            <div className="profile-header">
                <form className="profile-picture" ref={imageRef}>
                    <label htmlFor="files">
                        <img src={image} alt="" />
                    </label>
                    <input id='files' name='files' type="file" accept='image/*' onChange={(e) => {
                        const reader = new FileReader()
                        reader.readAsDataURL(e.currentTarget.files![0])
                        reader.onloadend = (e) => { setImage(e.target?.result as string) }
                    }} />
                </form>
                <div className="profile-item">
                    <input type='text' disabled defaultValue={userInfo.data?.username} ref={usernameRef} />
                    <button onClick={() => { usernameRef.current!.disabled = !usernameRef.current!.disabled }}><AiFillEdit /></button>
                </div>
                <div className="profile-item">
                    <input type='email' disabled defaultValue={userInfo.data?.email} ref={emailRef} />
                    <button onClick={() => { emailRef.current!.disabled = !emailRef.current!.disabled }}><AiFillEdit /></button>
                </div>
            </div>
            <button className='profile-but save' onClick={saveButton}>Guardar</button>
            <button className='profile-but logout' onClick={() => {
                dispach(setUser(""))
                dispach(setJwt(""))
                navigate("/")
            }}>Logout</button>
        </div>
    )
}
