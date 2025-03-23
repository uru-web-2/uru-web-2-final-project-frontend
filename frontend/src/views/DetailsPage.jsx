import Layout from "../components/Layout";
import DetailsTemplate from "../components/DetailsTemplate";

function DetailsPage() {
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
        keywords: [
            { keyName: 'Keywords', value: ['Macondo', 'Magical Realism', 'Buendía Family'] }
        ]
    };

    return (
        <Layout>
            <DetailsTemplate {...bookDetails} />
        </Layout>
    );
}

export default DetailsPage;
