import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import BookForm from "../components/InventoryForms/BookForm";
import { menuItems } from "../Services/menuItems";

function BookFormPage() {


    return (

        <Layout menuItemsGeneral={menuItems}>
            <Paper elevation={5}>
                <BookForm/>
            </Paper>
        </Layout>
    );
}

export default BookFormPage;