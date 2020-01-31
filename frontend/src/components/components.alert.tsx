import React, { Component } from "react";
import { Alert as AlertBootstrap, AlertProps, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { hideAlert } from "../action/action.alert";
import { IStoreAlert } from "../define/define.interface";

export interface IProps {
    alert: IStoreAlert
    hideAlert: Function,
}

interface IState {
    hideAction: any,
}

let hideAction: any = undefined;

class Alert extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            hideAction: undefined,
        }
    }

    setShow(show: boolean) {
        this.props.hideAlert();
    }

    render() {
        const { innerContent, variant, dismissible, show } = this.props.alert;

        if (this.props.alert.show) {
            if (hideAction) clearTimeout(hideAction);
            hideAction = setTimeout(() => {
                this.props.hideAlert();
            }, 3000)
        }

        return (
            <div className="alert-custom">
                <AlertBootstrap variant={variant || 'primary'} show={show} onClose={() => this.setShow(false)} dismissible={dismissible}>
                    {innerContent}
                </AlertBootstrap>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    alert: state.alert
})

const mapDispatchToProps = {
    hideAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
