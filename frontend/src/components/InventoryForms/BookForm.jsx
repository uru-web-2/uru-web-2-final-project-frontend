import React, { useState, useEffect } from "react";
import CoverImage from "../CoverImage";
import { Box, Typography, Button } from "@mui/material";
import { set, useForm } from 'react-hook-form';
import { apiService } from "../../Services/Services";
import '../CSS/Form.css';
import Select from 'react-select';

function BookForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [availabilityType, setAvailabilityType] = useState('');
    const [Image, setImage] = useState(null);

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sections, setSections] = useState([]);

    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [sectionInput, setSectionInput] = useState('');

    const [languageOptions, setLanguageOptions] = useState([]);
    const [publisherOptions, setPublisherOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);


    const findNameById = (id, options) => {
        const found = options.find(option => option.id === id);
        return found ? found.label : id;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [publishersRes, topicsRes, languagesRes, sectionsRes] = await Promise.all([
                    apiService.getAllPublishers(),
                    apiService.getAllTopics(),
                    apiService.getAllLanguages(),
                    apiService.getAllLocationSections()
                ]);
    
                setPublisherOptions(publishersRes.data.publishers.map(p => ({
                    id: p.id,
                    label: p.name,
                    value: p.name
                })));
    
                setCategoryOptions(topicsRes.data.topics.map(t => ({
                    id: t.id,
                    label: t.name,
                    value: t.name
                })));
    
                setLanguageOptions(languagesRes.data.languages.map(l => ({
                    id: l.id,
                    label: l.name,
                    value: l.name
                })));
    
                setSectionOptions(sectionsRes.data.location_sections.map(s => ({
                    id: s.id,
                    label: s.name,
                    value: s.name
                })));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);


    useEffect(() => {
        setValue('authors', authors.map(a => a.author));
        setValue('categories', categories.map(c => c.category));
        setValue('sections', sections.map(s => s.section));
    }, [authors, categories, sections, setValue]);
    

    const handleAddAuthor = () => {
        if (authorInput.trim() !== '') {
            setAuthors([...authors, { author: authorInput }]);
            setAuthorInput('');
        }
    };

    const handleRemoveAuthor = (index) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };

    const handleAddCategory = () => {
        if (categoryInput.trim() !== '') {
            setCategories([...categories, { category: categoryInput }]);
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const handleAddSection = () => {
        if (sectionInput.trim() !== '') {
            setSections([...sections, { section: sectionInput }]);
            setSectionInput('');
        }
    };

    const handleRemoveSection = (index) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {

        console.log(data, "data");
        
        const fileBlob = new Blob([data.file], { type: 'application/pdf' });
        const imageBlob = new Blob([Image], { type: 'image/jpeg' });
        
        try{
            const response = await apiService.createBook(
                fileBlob,
                [imageBlob],
                data.title, 
                data.description, 
                data.publicationDate, 
                data.pageCount, 
                data.authors, 
                data.categories, 
                data.sections, 
                data.languages,
                data.isbn, 
                data.publisher);

                console.log(response, "response");
                
            if (response.status === 'success' || response.status === 200) {
                console.log('Book created successfully:', response);
            }
        }catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-top-group">
                <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Book</Typography>
            </div>

            <div className='form-content'>
                <div className="form-left-group">
                    <div className="form-cover-image">
                        <CoverImage imageFile={setImage}/>
                    </div>

                    {/* Field: Number of pages */}
                    <div className="form-input">
                        <label htmlFor="pageCount">Number of pages:</label>
                        <input
                            type="number"
                            id="pageCount"
                            {...register('pageCount', {
                                required: 'Number of pages is required',
                                valueAsNumber: true,
                                min: { value: 1, message: 'Must have at least 1 page' },
                            })}
                        />
                        {errors.pageCount && <span>{errors.pageCount.message}</span>}
                    </div>

                    {/* Field: Publication date */}
                    <div className="form-input">
                        <label htmlFor="publicationDate">Publication date:</label>
                        <input
                            type="date"
                            id="publicationDate"
                            {...register('publicationDate', {
                                required: 'Publication date is required',
                            })}
                        />
                        {errors.publicationDate && <span>{errors.publicationDate.message}</span>}
                    </div>

                    {/* Field: Language (Select) */}
                    <div className="form-input">
                        <label htmlFor="language">Language:</label>
                        <Select
                            id="language"
                            options={languageOptions}
                            onChange={(selectedOption) => {
                                setValue('language', selectedOption.label);
                            }}
                            isSearchable 
                            placeholder="Select a language"
                        />
                        <input type="hidden" {...register('language', { required: true })} />
                        {errors.language && <span>This field is required</span>}
                    </div>
                </div>

                <div className="form-right-group">
                    {/* Field: Title */}
                    <div className="form-input">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </div>

                    {/* Field: ISBN */}
                    <div className="form-input">
                        <label htmlFor="isbn">ISBN:</label>
                        <input
                            type="text"
                            id="isbn"
                            {...register('isbn', {
                                required: 'ISBN is required',
                            })}
                        />
                        {errors.isbn && <span>{errors.isbn.message}</span>}
                    </div>

                    {/* Field: Format */}
                    <div className="form-input">
                        <label htmlFor="format">Format:</label>
                        <Select
                            id="format"
                            options={[{id:1,label:'physical'}, {id:2, label:'digital' }]}
                            onChange={(selectedOption) => {
                                setAvailabilityType(selectedOption.label);
                                setValue('format', selectedOption.label);
                            }}
                            placeholder="Select a format"
                        />
                        <input type="hidden" {...register('format', { required: true })} />
                        {errors.format && <span>This field is required</span>}
                    </div>

                    {/* Field: Publisher */}
                    <div className="form-input">
                        <label htmlFor="publisher">Publisher:</label>
                        <Select
                            id="publisher"
                            options={publisherOptions}
                            onChange={(selectedOption) => {
                                setValue('publisher', selectedOption.id);
                            }}
                            isSearchable 
                            placeholder="Select a publisher"
                        />
                        <input type="hidden" {...register('publisher', { required: true })} />
                        {errors.publisher && <span>This field is required</span>}
                    </div>

                    {/* Field: Description (textarea) */}
                    <div className="form-input">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 100,
                                    message: 'Description must have at least 100 characters',
                                },
                            })}
                        />
                        {errors.description && <span>{errors.description.message}</span>}
                    </div>
                </div>

                <div className="form-bottom-group">
                    {/* Field: Authors */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="author">Author:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <input
                                    type="text"
                                    id="author"
                                    value={authorInput}
                                    onChange={(e) => setAuthorInput(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={handleAddAuthor}>+</button>
                            </Box>
                        </div>
                        {authors.map((field, index) => (
                            <div className="form-input-list-item" key={index}>
                                <input type="text" value={field.author} readOnly />
                                <button type="button" onClick={() => handleRemoveAuthor(index)}>X</button>
                            </div>
                        ))}
                    </div>

                    {/* Field: Categories */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="category">Category:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <Select
                                    id="category"
                                    options={categoryOptions}
                                    onChange={(selectedOption) => {
                                        setValue('category', selectedOption.id);
                                        setCategoryInput(selectedOption.id);
                                    }}
                                    isSearchable 
                                    placeholder="Select a category"
                                    classNamePrefix="form-select"
                                />
                                <input type="hidden" {...register('category', { required: true })} />
                                {errors.category && <span>This field is required</span>}

                                <button type="button" onClick={handleAddCategory}>+</button>
                            </Box>
                        </div>
                        {categories.map((field, index) => {
                            const categoryName = findNameById(field.category, categoryOptions);
                            return (
                                <div className="form-input-list-item" key={index}>
                                    <input type="text" value={categoryName} readOnly />
                                    <button type="button" onClick={() => handleRemoveCategory(index)}>X</button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Field: Sections */}
                    <div className="form-input-list">
                        <div className={`form-input ${availabilityType === 'digital' ? 'disabled-input' : ''}`}>
                            <label htmlFor="section">Section:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <Select
                                    id="section"
                                    options={sectionOptions}
                                    onChange={(selectedOption) => {
                                        setValue('section', selectedOption.id);
                                        setSectionInput(selectedOption.id);
                                    }}
                                    isSearchable 
                                    placeholder="Select a section"
                                    classNamePrefix="form-select"
                                    isDisabled={availabilityType ==='digital'}
                                />
                                <input 
                                    type="hidden" 
                                    {...register('section', { required: availabilityType !== 'digital' })}
                                    disabled={availabilityType === 'digital'}
                                />
                                {errors.section && <span>This field is required</span>}

                                <button type="button" onClick={handleAddSection}>+</button>
                            </Box>
                        </div>
                        {sections.map((field, index) => {
                            const sectionName = findNameById(field.section, sectionOptions);
                            return (
                                <div className="form-input-list-item" key={index}>
                                    <input type="text" value={sectionName} readOnly />
                                    <button type="button" onClick={() => handleRemoveSection(index)}>X</button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="form-bottom-group-2">
                    <Box display='flex' gap={26.5} marginTop={5}>
                        <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Availability</Typography>
                    </Box>
                    <Box display='grid' gap={2}>
                        <Box display='flex' justifyContent={'space-between'} marginRight={3}>

                            {/* Field: Number of copies */}
                            <div className={`form-input ${availabilityType === 'digital' ? 'disabled-input' : ''}`}>
                                <label htmlFor="copyCount">Number of copies:</label>
                                <input
                                    type="number"
                                    id="copyCount"
                                    {...(availabilityType === 'physical' && register('copyCount', {
                                        required: 'Number of copies is required',
                                        valueAsNumber: true,
                                        min: { value: 1, message: 'Must have at least 1 copy' },
                                    }))}
                                    disabled={availabilityType === 'digital'}
                                />
                                {errors.copyCount && <span>{errors.copyCount.message}</span>}
                            </div>

                            {/* Field: File */}
                            <div className={`form-input ${availabilityType === 'physical' ? 'disabled-input' : ''}`}>
                                <label htmlFor="file">File:</label>
                                <input
                                    type="file"
                                    name="file"
                                    {...(availabilityType === 'digital' && register('file', { 
                                        required: 'File is required for digital format' 
                                    }))}
                                    disabled={availabilityType === 'physical'}
                                />
                                {errors.file && <span>{errors.file.message}</span>}
                            </div>

                            {/* Field: Link */}
                            <div className={`form-input ${availabilityType === 'physical' ? 'disabled-input' : ''}`}>
                                <label htmlFor="link">Link:</label>
                                <input
                                    type="text"
                                    id="link"
                                    {...(availabilityType === 'digital' && register('link', { 
                                        required: 'Link is required for digital format' 
                                    }))}
                                    disabled={availabilityType === 'physical'}
                                />
                                {errors.link && <span>{errors.link.message}</span>}
                            </div>
                        </Box>
                    </Box>
                </div>
            </div>

            <div className="form-button">
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button variant="contained" color="error">Cancel</Button>
            </div>
        </div>
    );
}

export default BookForm;