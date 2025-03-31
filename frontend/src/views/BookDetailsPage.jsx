import Layout from "../components/Layout";
import DetailsTemplate from "../components/DetailsTemplate";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { menuItemsLibrarian } from "../Services/menuItems";


function BookDetailsPage() {

    const {id} = useParams();

    useEffect(() => {
        console.log('Aqui va el fetch de los detalles del libro usando el id de la card');
    });

    const bookDetails = {
        title: "One Hundred Years of Solitude",
        subtitle1: "Gabriel García Márquez",
        subtitle2: "Sudamericana",
        subtitle3: "ISBN: 1234567890",
        image: "https://picsum.photos/200/300",
        summary: `"One Hundred Years of Solitude" by Gabriel García Márquez tells the story of the Buendía family in the fictional town of Macondo...`,
        details: [
            { keyName: 'Publisher', value: 'Sudamericana' },
            { keyName: 'ISBN', value: '1234567890' },
            { keyName: 'Publication Date', value: '1967' },
            { keyName: 'Page Count', value: '417' },
            { keyName: 'Genres', value: ['Fiction', 'Magical Realism'] },
            { keyName: 'Language', value: 'Spanish' }
        ],
        location: [
            { keyName: 'Section', value: 'A32' },
            { keyName: 'Shelf', value: '3564' }
        ],
        formats: [
            { keyName: 'PDF', value: 'Link' },
            { keyName: 'EPUB', value: 'Link' }
        ],
    };

    return (
        <Layout menuItemsGeneral={menuItemsLibrarian}>
            <DetailsTemplate {...bookDetails} />
        </Layout>
    );
}

export default BookDetailsPage;
