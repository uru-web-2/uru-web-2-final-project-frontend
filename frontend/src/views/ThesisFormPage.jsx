import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import ThesisForm from "../components/InventoryForms/ThesisForm";
import { menuItems } from "../Services/menuItems";

function ThesisFormPage() {


    return (

        <Layout menuItemsGeneral={menuItems}>
            <Paper elevation={5}>
                <ThesisForm/>
            </Paper>
        </Layout>
    );
}

export default ThesisFormPage;