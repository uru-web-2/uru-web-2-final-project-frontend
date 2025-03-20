import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import BookForm from "../components/BookForm";

function BookFormPage() {


    return (

        <Layout>
            <Paper elevation={5}>
                <BookForm/>
            </Paper>
        </Layout>
    );
}

export default BookFormPage;