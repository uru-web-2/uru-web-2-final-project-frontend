import Layout from "../components/Layout";
import DetailsTemplate from "../components/DetailsTemplate";
import { menuItems } from "../Services/menuItems";

function MagazineDetailsPage() {
    const magazineDetails = {
        title: "Science and Technology Magazine",
        subtitle1: "National University of Technological Innovation",
        subtitle2: "Vol 1. Ed 2",
        subtitle3: "2024",
        image: "https://picsum.photos/200/300",
        summary: `This magazine provides updated information on the latest advances in the technological field, including innovations in artificial intelligence applied to medicine. It presents practices in diagnostics and treatments obtained, highlighting various documents in the scientific technology sector and its impact on the energy industry. The magazine also includes interviews with sector leaders and reviews of the most innovative devices.`,
        details: [
            { keyName: 'Title', value: 'Science and Technology Magazine' },
            { keyName: 'Publisher', value: 'National University of Technological Innovation' },
            { keyName: 'Edition', value: 'Vol 1. Ed 2' },
            { keyName: 'Collection', value: 'asdsa' },
            { keyName: 'Language', value: 'Spanish' },
            { keyName: 'Categories', value: ['Technology', 'Applied Sciences'] },
            { keyName: 'Pages', value: '130' },
            { keyName: 'ISSN', value: '5285-6789' },
            { keyName: 'Frequency', value: 'Monthly' },
            { keyName: 'Editor(s)', value: 'Dr. Carla Hernández' },
            { keyName: 'Publication Date', value: 'February 24, 2024' }
        ],
        formats: [
            { keyName: 'PDF', value: 'Open here' },
            { keyName: 'EPUB', value: 'Open here' }
        ],
        keywords: [
            { keyName: 'Keywords', value: ['Innovation', 'Technology', 'Research', 'Applied Sciences', 'Development'] }
        ]
    };

    return (
        <Layout menuItemsGeneral={menuItems}>
            <DetailsTemplate {...magazineDetails} />
        </Layout>
    );
}

export default MagazineDetailsPage;
