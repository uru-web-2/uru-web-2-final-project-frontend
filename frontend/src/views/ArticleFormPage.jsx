import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import ArticleForm from "../components/InventoryForms/ArticleForm";
import { menuItems } from "../Services/menuItems";

function ArticleFormPage() {


    return (

        <Layout menuItemsGeneral={menuItems}>
            <Paper elevation={5}>
                <ArticleForm/>
            </Paper>
        </Layout>
    );
}

export default ArticleFormPage;