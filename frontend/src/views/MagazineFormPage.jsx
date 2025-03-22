import React from "react";
import Layout from "../components/Layout";
import {Paper} from "@mui/material";
import MagazineForm from "../components/InventoryForms/MagazineForm";

function MagazineFormPage() {


    return (

        <Layout>
            <Paper elevation={5}>
                <MagazineForm/>
            </Paper>
        </Layout>
    );
}

export default MagazineFormPage;