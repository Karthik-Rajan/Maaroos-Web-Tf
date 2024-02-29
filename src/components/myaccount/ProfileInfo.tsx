import React, { useRef } from "react";
import { Avatar, Input } from "@mui/material";
import { Image } from "react-bootstrap";
import { stringAvatar } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProfileInfo = (props: any) => {
    const profileRef: any = useRef();
    const { profile, wallet } = useSelector((state: any) => state.user);
    const users = profile.data;

    return (
        <div className="border-bottom p-4">
            <div className="osahan-user text-center">
                <div className="osahan-user-media">
                    <Input type="file" className="userProfile" ref={profileRef} name="userProfile" inputProps={{ accept: "image/png,image/jpeg" }} onChange={(event: any) => {
                        props.uploadProfilePic(event.target?.files[0]);
                    }} />
                    {!users.profile_img && <div className="nameAvatar rounded-pill shadow-sm mt-1">
                        <Avatar variant="square" {...stringAvatar(users ? users?.first_name + ' ' + users?.second_name : `?`)} onClick={() => {
                            profileRef?.current.firstChild.click();
                        }} />
                        <i className="icofont-ui-edit cursorPointer" onClick={() => {
                            profileRef?.current.firstChild.click();
                        }}>&nbsp;Upload</i>
                    </div>
                    }

                    {users.profile_img &&
                        <>
                            <Image
                                className="rounded-pill shadow-sm mt-1 cursorPointer"
                                src={users.profile_img + '?' + Date.now()}
                                alt={(users?.first_name || `NoName`) +
                                    " " +
                                    (users?.second_name || `Noname`)}
                                onClick={() => {
                                    profileRef?.current.firstChild.click();
                                }}
                            />
                            <br />
                            <i className="icofont-ui-edit cursorPointer" onClick={() => {
                                profileRef?.current.firstChild.click();
                            }}>&nbsp;Change</i>
                            <br />
                            <br />
                        </>
                    }
                    <div className="osahan-user-media-body">
                        <h6 className="mb-2">
                            {users ? users?.first_name + ' ' + users?.second_name : `NoName NoName`}
                        </h6>
                        <p className="mb-1">{users?.mobile}</p>
                        <p>{users?.email || "No email address configured"}</p>
                        <p className="mb-0 text-black font-weight-bold">
                            <Link
                                to="#"
                                onClick={() => props.setShowEditProfile(true)}
                                className="text-primary mr-3"
                            >
                                <i className="icofont-ui-edit"></i> EDIT INFO
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}