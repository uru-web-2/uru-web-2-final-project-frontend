import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import MagazineForm from "../components/InventoryForms/MagazineForm";
import { menuItemsLibrarian } from "../Services/menuItems";

function MagazineFormPage() {


    return (

        <Layout menuItemsGeneral={menuItemsLibrarian}>
            <Paper elevation={5}>
                <MagazineForm/>
            </Paper>
        </Layout>
    );
}

export default MagazineFormPage;