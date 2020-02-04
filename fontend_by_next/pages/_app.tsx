import { Provider } from "react-redux";
import Alert from "../components/components.alert";
import React from "react";
import App from "next/app";
import Head from "next/head";
import store from "../store";
import "../css/bootstrap.min.css"
import "../css/style_login.css"
import "../css/style_message.css"
import "../css/style.css"

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <title>Message</title>
                    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
                </Head>
                <Provider store={store}>
                    <Alert />
                    <Component {...pageProps} />
                </Provider>
            </>
        )
    }
}