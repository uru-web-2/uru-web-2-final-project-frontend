import { Paper, CardMedia } from "@mui/material";
import '../components/CSS/DetailsTemplate.css';

const Item = ({ keyName, value }) => {
    return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span className="item">{keyName}:</span>
            <p>{Array.isArray(value) ? value.join(', ') : value}</p>
        </div>
    );
};

const renderItems = (items) => {
    return items.map((item, index) => (
        <Item key={index} keyName={item.keyName} value={item.value} />
    ));
};

const DetailsTemplate = ({ 
    title,
    subtitle1, 
    subtitle2, 
    subtitle3, 
    image, 
    summary, 
    details, 
    location, 
    formats, 
    keywords 
}) => {
    return (
        <Paper elevation={3} >
            <div className="details-container">
                
                <div className="details-section-1">
                    <div className="details-section-1-image">
                        <CardMedia
                            sx={{ width: 205, height: 345, boxShadow: 10 }}
                            component="img"
                            image={image}
                            alt={title}
                        />
                    </div>

                    <div className="details-section-1-content">
                        <span className="details-title">{title}</span>
                        <p>{Array.isArray(subtitle1) ? subtitle1.join(', ') : subtitle1}</p>
                        <p>{subtitle2}</p>
                        <p>{subtitle3}</p>
                        <span className="details-section-name">Summary</span>
                        <p>{summary}</p>
                    </div>
                </div>

                {keywords.length > 0 && (
                    <div className="details-section-keywords">
                        {renderItems(keywords)}
                    </div>
                )}

                <div className="details-section-2">
                    <span className="details-section-name">Details <div className="line-section"></div></span>
                    <div className="details-section-2-content">
                        {renderItems(details)}
                    </div>
                </div>

                {location.length > 0 && (
                    <div className="details-section-3">
                        <span className="details-section-name">Location <div className="line-section"></div></span>
                        <div className="details-section-3-content">
                            {renderItems(location)}
                        </div>
                    </div>
                )}

                {formats.length > 0 && (
                    <div className="details-section-4">
                        <span className="details-section-name">Format <div className="line-section"></div></span>
                        <div className="details-section-4-content">
                            {renderItems(formats)}
                        </div>
                    </div>
                )}
            </div>
        </Paper>
    );
};

export default DetailsTemplate;
