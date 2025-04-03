import React, { useState, useEffect } from "react";
import CoverImage from "../CoverImage";
import { Box, Typography, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import { apiService } from "../../Services/Services";
import '../CSS/Form.css';
import Select from 'react-select';

function ArticleForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    
    // Estados para arrays (como en BookForm)
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [Image, setImage] = useState(null);

    // Estados para inputs
    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [keywordInput, setKeywordInput] = useState('');

    // Opciones para selects
    const [languageOptions, setLanguageOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    // Sincronizar arrays con react-hook-form (como en BookForm)
    useEffect(() => {
        setValue('authors', authors.map(a => a.author));
        setValue('categories', categories.map(c => c.category));
        setValue('keywords', keywords.map(k => k.keyword));
    }, [authors, categories, keywords, setValue]);

    // Cargar opciones desde API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [languagesRes, topicsRes] = await Promise.all([
                    apiService.getAllLanguages(),
                    apiService.getAllTopics()
                ]);

                setLanguageOptions(languagesRes.data.languages.map(l => ({
                    id: l.id,
                    label: l.name,
                    value: l.name
                })));

                setCategoryOptions(topicsRes.data.topics.map(t => ({
                    id: t.id,
                    label: t.name,
                    value: t.name
                })));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Funciones para manejar arrays (como en BookForm)
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

    const handleAddKeyword = () => {
        if (keywordInput.trim() !== '') {
            setKeywords([...keywords, { keyword: keywordInput }]);
            setKeywordInput('');
        }
    };

    const handleRemoveKeyword = (index) => {
        setKeywords(keywords.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        try {
            const imageBlob = Image ? new Blob([Image], { type: 'image/jpeg' }) : null;
            
            const response = await apiService.createArticle(
                imageBlob,
                data.title,
                data.description,
                data.publicationDate,
                data.pageCount,
                data.authors,
                data.categories,
                data.keywords,
                data.language,
                data.source
            );

            if (response.status === 'success' || response.status === 200) {
                console.log('Article created successfully:', response);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Función auxiliar para mostrar nombres de categorías
    const findNameById = (id, options) => {
        const found = options.find(option => option.id === id);
        return found ? found.label : id;
    };

    return (
        <div className="form-container">
            <div className="form-top-group">
                <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Article</Typography>
            </div>

            <div className='form-content'>
                <div className="form-left-group">
                    <div className="form-cover-image">
                        <CoverImage imageFile={setImage} />
                    </div>

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
                        {errors.pageCount && <span className="error-message">{errors.pageCount.message}</span>}
                    </div>

                    <div className="form-input">
                        <label htmlFor="publicationDate">Publication date:</label>
                        <input
                            type="date"
                            id="publicationDate"
                            {...register('publicationDate', {
                                required: 'Publication date is required',
                            })}
                        />
                        {errors.publicationDate && <span className="error-message">{errors.publicationDate.message}</span>}
                    </div>
                </div>

                <div className="form-right-group">
                    <div className="form-input">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <span className="error-message">{errors.title.message}</span>}
                    </div>

                    <div className="form-input">
                        <label htmlFor="language">Language:</label>
                        <Select
                            id="language"
                            options={languageOptions}
                            onChange={(selectedOption) => {
                                setValue('language', selectedOption.id);
                            }}
                            isSearchable
                            placeholder="Select a language"
                        />
                        <input type="hidden" {...register('language', { required: 'Language is required' })} />
                        {errors.language && <span className="error-message">{errors.language.message}</span>}
                    </div>

                    <div className="form-input">
                        <label htmlFor="source">Source:</label>
                        <input
                            type="text"
                            id="source"
                            {...register('source', { required: 'Source is required' })}
                        />
                        {errors.source && <span className="error-message">{errors.source.message}</span>}
                    </div>

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
                        {errors.description && <span className="error-message">{errors.description.message}</span>}
                    </div>
                </div>

                <div className="form-bottom-group">
                    {/* Keywords */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="keyword">Keywords:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <input
                                    type="text"
                                    id="keyword"
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                />
                                <button type="button" onClick={handleAddKeyword}>+</button>
                            </Box>
                        </div>
                        {keywords.map((field, index) => (
                            <div className="form-input-list-item" key={index}>
                                <input type="text" value={field.keyword} readOnly />
                                <button type="button" onClick={() => handleRemoveKeyword(index)}>X</button>
                            </div>
                        ))}
                    </div>

                    {/* Authors */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="author">Author:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <input
                                    type="text"
                                    id="author"
                                    value={authorInput}
                                    onChange={(e) => setAuthorInput(e.target.value)}
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

                    {/* Categories */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="category">Category:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <Select
                                    id="category"
                                    options={categoryOptions}
                                    onChange={(selectedOption) => {
                                        setCategoryInput(selectedOption.id);
                                    }}
                                    isSearchable
                                    placeholder="Select a category"
                                    classNamePrefix="form-select"
                                />
                                <button type="button" onClick={handleAddCategory}>+</button>
                            </Box>
                        </div>
                        {categories.map((field, index) => {
                            const categoryName = findNameById(field.category, categoryOptions);
                            return (
                                <div className="form-input-list-item" key={index}>
                                    <input type="text" value={categoryName || field.category} readOnly />
                                    <button type="button" onClick={() => handleRemoveCategory(index)}>X</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="form-button">
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button variant="contained" color="error">Cancel</Button>
            </div>
        </div>
    );
}

export default ArticleForm;