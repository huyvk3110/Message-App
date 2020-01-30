import React, { Component } from "react";

class Chat extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="chat container-fluid">
                <div className="row vh-100">
                    <div className="col-sm-5 col-md-3 chat-left py-1">
                        <div className="chat-left-info">
                            <div className="chat-top-info px-2">
                                <div className="d-flex align-items-center">
                                    <button className="btn avatar circle-40 color-gray mr-2">
                                        <i className="fa fa-user"></i>
                                    </button>
                                    <span className="font-weight-bolder">huyvk3110</span>
                                </div>
                                <div>
                                    <button className="btn circle-40 color-gray">
                                        <i className="fa fa-pencil-square-o"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="input-group mb-1 search-bar px-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text font-weight-light" id="basic-addon1"><i className="fa fa-search"></i></span>
                                </div>
                                <input type="text" className="form-control font-weight-light" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="chat-left-list">
                            <div className="d-flex chatroom-item item-active align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                            <div className="d-flex chatroom-item align-items-center p-2">
                                <div className="avatar circle-50 color-gray">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="d-flex flex-column pl-2">
                                    <span className="font-weight-normal chatroom-item-user">huyvk</span>
                                    <span className="font-weight-light text-black-50 chatroom-item-info">Lorem ipsum dolor sit amet consectetur</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7 col-md-9 chat-right py-1">
                        <div className="chat-top-info px-3">
                            <div className="d-flex align-items-center">
                                <button className="btn avatar circle-40 color-gray mr-2">
                                    <i className="fa fa-user"></i>
                                </button>
                                <div className="d-flex flex-column">
                                    <span className="font-weight-bolder">huyvk3110</span>
                                    <span className="font-weight-light text-success">online</span>
                                </div>
                            </div>
                        </div>
                        <div className="row chat-right-content px-4 py-1">
                            <div className="message-item message-friend">
                                <div className="btn avatar circle-40 color-gray mr-2">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="message-list">
                                    <div className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illo maxime voluptas, dolore rerum facere? Et, molestiae! Optio, earum minus aut aliquid iste eum iusto inventore nemo est natus rem?
                                    </div>
                                    <div className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                </div>
                            </div>
                            <div className="message-item message-me">
                                <div className="btn avatar circle-40 color-gray mr-2">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="message-list">
                                    <div className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur illo maxime voluptas, dolore rerum facere? Et, molestiae! Optio, earum minus aut aliquid iste eum iusto inventore nemo est natus rem?
                                    </div>
                                    <div className="message">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;