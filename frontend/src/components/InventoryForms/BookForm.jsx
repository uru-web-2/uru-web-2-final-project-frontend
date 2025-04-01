import React, { useState, useEffect } from "react";
import CoverImage from "../CoverImage";
import { Box, Typography,Button } from "@mui/material";
import { useForm, useFieldArray, set } from 'react-hook-form';
import { apiService } from "../../Services/Services";
import '../CSS/Form.css';
import Select from 'react-select';
function BookForm() {
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
    const [availabilityType, setAvailabilityType] = useState('');

    const { fields: authors, append: appendAuthor, remove: removeAuthor } = useFieldArray({ control, name: "authors" });
    const { fields: categories, append: appendCategory, remove: removeCategory } = useFieldArray({ control, name: "categories" });
    const { fields: sections, append: appendSection, remove: removeSection } = useFieldArray({ control, name: "sections" });

    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [sectionInput, setSectionInput] = useState('');
    const [languageOptions, setLanguageOptions] = useState([]);
    const [publisherOptions, setPublisherOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);


    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await apiService.getAllPublishers();
                const publishers = response.data.publishers.map((publisher) => ({
                    id: publisher.id,
                    label: publisher.name,
                    value: publisher.name
                }));
                setPublisherOptions(publishers);
            } catch (error) {
                console.error('Error fetching publishers:', error);
            }
        };

        fetchPublishers();
    }, []);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await apiService.getAllTopics();
                const topics = response.data.topics.map((topic) => ({
                    id: topic.id,
                    label: topic.name,
                    value: topic.name
                }));
                setCategoryOptions(topics);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchTopics();
    }, []);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await apiService.getAllLocationSections();
                
                const sections = response.data.location_sections.map((section) => ({
                    id: section.id,
                    label: section.name,
                    value: section.name
                }));
                setSectionOptions(sections);
            } catch (error) {
                console.error('Error fetching sections:', error);
            }
        };

        fetchSections();
    }, []);

    const handleAddAuthor = () => {
        if (authorInput.trim() !== '') {
            appendAuthor({ author: authorInput });
            setAuthorInput('');
        }
    };

    const handleRemoveAuthor = (index) => {
        removeAuthor(index);
    };

    const handleAddCategory = () => {
        if (categoryInput.trim() !== '') {
            appendCategory({ category: categoryInput });
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (index) => {
        removeCategory(index);
    };

    const handleAddSection = () =>{
        if(sectionInput.trim() !== ''){
            appendSection({section: sectionInput});
            setSectionInput('');
        }
    }

    const handleRemoveSection = (index) =>{
        removeSection(index);
    }

    const onSubmit = (data) => {
        console.log('Form data:', data);
    };

    return (
        <div className="form-container">
            <div className="form-top-group">
                <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Book</Typography>
            </div>

            <div className='form-content'>
                <div className="form-left-group">
                    <div className="form-cover-image">
                        <CoverImage image='https://picsum.photos/200/300' />
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
                            options={[{id:1, label: 'mexico'}]}
                            onChange={(selectedOption) => {
                            setValue('language', selectedOption.label);
                            }}
                            isSearchable 
                            placeholder="Select a language"
                        />
                        <input type="hidden" {...register('language', { required: true })} />
                        {errors.language && <span>Este campo es obligatorio</span>}
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
                            type="number"
                            id="isbn"
                            {...register('isbn', {
                                required: 'ISBN is required',
                                valueAsNumber: true,
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
                                setAvailabilityType(selectedOption.label)
                                setValue('section', availabilityType)
                            }}
                            placeholder="Select a format"
                        />
                        <input 
                            type="hidden"
                            name="section"/>
                        {errors.format && <span>Este campo es obligatorio</span>}
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
                        {errors.publisher && <span>Este campo es obligatorio</span>}
                    </div>

                    {/* Field: Description (textarea) */}
                    <div className="form-input">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 500,
                                    message: 'Description must have at least 500 characters',
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
                                <button onClick={handleAddAuthor}>+</button>
                            </Box>
                        </div>
                        {authors.map((field) => (
                            <div className="form-input-list-item" key={field.id}>
                                <input type="text" value={field.author} readOnly />
                                <button onClick={() => handleRemoveAuthor(field.id)}>X</button>
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
                                <input type="hidden" name="category"/>
                                {errors.category && <span>Este campo es obligatorio</span>}

                                <button onClick={handleAddCategory}>+</button>
                            </Box>
                        </div>
                        {categories.map((field) => (
                            <div className="form-input-list-item" key={field.id}>
                                <input type="text" value={field.category} readOnly />
                                <button onClick={() => handleRemoveCategory(field.id)}>X</button>
                            </div>
                        ))}
                    </div>

                    {/*Field: Sections*/}
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
                                        id="section"
                                        name="section"
                                        disabled={availabilityType === 'digital'}
                                    />
                                    {errors.section && <span>Este campo es obligatorio</span>}

                                    <button onClick={handleAddSection}>+</button>
                                </Box>
                            </div>
                            {sections.map((field) => (
                                <div className="form-input-list-item" key={field.id}>
                                    <input type="text" value={field.section} readOnly />
                                    <button onClick={() => handleRemoveSection(field.id)}>X</button>
                                </div>
                            ))}
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
                                        required: true,
                                        valueAsNumber: true,
                                        min: { value: 1, message: 'Must have at least 1 copy' },
                                    }))}
                                    disabled={availabilityType === 'digital'}
                                />
                            </div>

                            {/* Field: File */}
                            <div className={`form-input ${availabilityType === 'physical' ? 'disabled-input' : ''}`}>
                                <label htmlFor="file">File:</label>
                                <input
                                    type="file"
                                    id="file"
                                    {...(availabilityType === 'digital' && register('file', { required: true }))}
                                    disabled={availabilityType === 'physical'}
                                />
                            </div>

                            {/* Field: Link */}
                            <div className={`form-input ${availabilityType === 'physical' ? 'disabled-input' : ''}`}>
                                <label htmlFor="link">Link:</label>
                                <input
                                    type="text"
                                    id="link"
                                    {...(availabilityType === 'digital' && register('link', { required: true }))}
                                    disabled={availabilityType === 'physical'}
                                />
                            </div>
                        </Box>

                            
                        
                    </Box>
                </div>
            </div>

            <div className="form-button">
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Cancel</Button>
            </div>
        </div>
    );
}

export default BookForm;