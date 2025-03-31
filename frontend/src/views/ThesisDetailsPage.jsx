import Layout from "../components/Layout";
import DetailsTemplate from "../components/DetailsTemplate";
import { menuItemsLibrarian } from "../Services/menuItems";

function ThesisDetailsPage() {
    
    const thesisDetails = {
        title: "Desarrollo de Algoritmos de Machine Learning para la Predicción de Enfermedades",
        subtitle1: "Laura Fernández",
        subtitle2: "Universidad Tecnológica de Caracas",
        subtitle3: "2024",
        image: "https://picsum.photos/200/300",
        summary: `Esta tesis aborda el desarrollo y la implementación de algoritmos de machine learning para la predicción de enfermedades comunes. Se evalúan diferentes modelos y técnicas, así como su precisión y eficiencia en distintos conjuntos de datos médicos. Los resultados muestran una mejora significativa en la capacidad predictiva de los sistemas de salud.`,
        details: [
            { keyName: 'Title', value: 'Desarrollo de Algoritmos de Machine Learning para la Predicción de Enfermedades' },
            { keyName: 'Institution', value: 'Universidad Tecnológica de Caracas' },
            { keyName: 'Author', value: 'Laura Fernández' },
            { keyName: 'Publication Date', value: '24 de febrero, 2024' },
            { keyName: 'Page Count', value: '150' },
            { keyName: 'Categories', value: ['Tecnología', 'Ciencias Aplicadas'] },
            { keyName: 'Type', value: 'Maestría' },
            { keyName: 'Faculty', value: 'Ingeniería' },
            { keyName: 'Language', value: 'Español' }
        ],
        formats: [
            { keyName: 'PDF', value: 'Link' },
            { keyName: 'EPUB', value: 'Link' }
        ],
        keywords: [
            { keyName: 'Keywords', value: ['Innovación', 'Tecnología', 'Investigación', 'Ciencias Aplicadas', 'Desarrollo'] }
        ]
    };

    return (
        <Layout menuItemsGeneral={menuItemsLibrarian}>
            <DetailsTemplate {...thesisDetails} />
        </Layout>
    );
}

export default ThesisDetailsPage;
