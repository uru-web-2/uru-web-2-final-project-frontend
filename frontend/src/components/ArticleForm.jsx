import React, {useState} from "react";
import CoverImage from "../components/CoverImage";
import { Box, Typography, Button } from "@mui/material";
import { useForm, useFieldArray } from 'react-hook-form';
import './CSS/Form.css';

function ArticleForm() {

    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const { fields: authors, append: appendAuthor, remove: removeAuthor } = useFieldArray({ control, name: "authors" });
    const { fields: categories, append: appendCategory, remove: removeCategory } = useFieldArray({ control, name: "categories" });
    const { fields: keywords, append: appendKeyword, remove: removeKeyword } = useFieldArray({ control, name: "keywords" });

    const [authorInput, setAuthorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [keywordInput, setKeywordInput] = useState('');

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

    const handleAddKeyword = () => {
        if (keywordInput.trim() !== '') {
            appendKeyword({ keyword: keywordInput });
            setKeywordInput('');
        }
    };

    const handleRemoveKeyword = (index) => {
        removeKeyword(index);
    };

    const onSubmit = (data) => {
        console.log('Form data:', data);
    };

    return (
        <div className="form-container">
            <div className="form-top-group">
                <Typography variant="h4" sx={{ color: '#1A4568', fontWeight: 'bold' }}>Article</Typography>
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
                                required: true,
                                valueAsNumber: true,
                                min: { value: 1, message: 'Must have at least 1 page' },
                            })}
                        />
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
                    </div>

                    {/* Field: Language (Select) */}
                    <div className="form-input">
                        <label htmlFor="language">Language:</label>
                        <select
                            id="language"
                            {...register('language', { required: 'Language is required' })}
                        >
                            <option value="">Select a language</option>
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>

                    {/* Field: Source */}
                    <div className="form-input">
                        <label htmlFor="source">Source:</label>
                        <input
                            type="text"
                            id="source"
                            {...register('source', { required: true })}
                        />
                    </div>

                    {/* Field: Description (textarea) */}
                    <div className="form-input">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            {...register('description', {
                                required: true,
                                minLength: {
                                    value: 500,
                                    message: 'Description must be at least 10 characters long',
                                },
                            })}
                        />
                    </div>
                </div>

                <div className="form-bottom-group">
                    {/* Field: Keywords */}
                    <div className="form-input-list">
                        <div className="form-input">
                            <label htmlFor="keyword">Keywords:</label>
                            <Box display='flex' alignItems='center' gap={1}>
                                <input
                                    type="text"
                                    id="keyword"
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                    required
                                />
                                <button onClick={handleAddKeyword}>+</button>
                            </Box>
                        </div>
                        {keywords.map((field) => (
                            <div className="form-input-list-item" key={field.id}>
                                <input type="text" value={field.keyword} readOnly />
                                <button onClick={() => handleRemoveKeyword(field.id)}>X</button>
                            </div>
                        ))}
                    </div>

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
                                <input
                                    type="text"
                                    id="category"
                                    value={categoryInput}
                                    onChange={(e) => setCategoryInput(e.target.value)}
                                    required
                                />
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
                </div>
            </div>

            <div className="form-button">
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Cancel</Button>
            </div>
        </div>
    );
}

export default ArticleForm;