import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import ArticleForm from "../components/InventoryForms/ArticleForm";

function ArticleFormPage() {


    return (

        <Layout>
            <Paper elevation={5}>
                <ArticleForm/>
            </Paper>
        </Layout>
    );
}

export default ArticleFormPage;