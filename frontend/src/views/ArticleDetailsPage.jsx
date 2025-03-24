import Layout from "../components/Layout";
import DetailsTemplate from "../components/DetailsTemplate";

function ArticleDetailsPage() {
    
    const articleDetails = {
        title: "The Enigma of Gravitational Waves",
        subtitle1: "Dr. Alojandro Tomas",
        subtitle2: "Scientific Magazine 'Frontiers of the Universe'",
        subtitle3: "2024",
        image: "https://picsum.photos/200/300",
        summary: `This article explains the current advances in the detection of gravitational waves, highlighting the design/format of a better asymmetric part for identification and/or formation. It discusses the union generated for level 3 in the space-time caused by the collision of massive objects and the resulting motions. The article emphasizes the importance of understanding these phenomena to confirm Einstein's general theory of relativity.`,
        details: [
            { keyName: 'Title', value: 'The Enigma of Gravitational Waves' },
            { keyName: 'Source', value: 'Scientific Magazine "Frontiers of the Universe"' },
            { keyName: 'Author', value: 'Dr. Alojandro Tomas' },
            { keyName: 'Categories', value: ['Technology', 'Applied Sciences'] },
            { keyName: 'Pages', value: '50' },
            { keyName: 'Language', value: 'Spanish' },
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
        <Layout>
            <DetailsTemplate {...articleDetails} />
        </Layout>
    );
}

export default ArticleDetailsPage;
