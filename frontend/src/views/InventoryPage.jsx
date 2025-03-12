import CardList from "../components/CardList";
import { Paper,Box, Button } from "@mui/material";
import React, { useState } from "react";
import Layout from "../components/Layout";


const generateData = (numItems) => {
    const data = [];
    for (let i = 1; i <= numItems; i++) {
        data.push({
            id: i,
            image: 'https://picsum.photos/200/300',
            title: `Libro ${i}`,
            text1: `Autor ${i}`,
            text2: `Año ${2020 + i}`,
            text3: `ISBN ${Math.floor(Math.random() * 1000000)}`,
            categories: ['No ficción', 'Ciencia'],
        
        });
    }
    return data;
};

const data = generateData(20);

function InventoryPage() {

    return (
        <Layout>
            <Paper elevation={3} sx={{pb: 2}}>
                <CardList data={data}/>
            </Paper>
        </Layout>
    );
}

export default InventoryPage;