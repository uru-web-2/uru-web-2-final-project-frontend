import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import ThesisForm from "../components/InventoryForms/ThesisForm";

function ThesisFormPage() {


    return (

        <Layout>
            <Paper elevation={5}>
                <ThesisForm/>
            </Paper>
        </Layout>
    );
}

export default ThesisFormPage;