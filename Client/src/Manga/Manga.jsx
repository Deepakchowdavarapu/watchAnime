import React, { useEffect, useState } from 'react';

    export default function Manga() {
        const [offset, setOffset] = useState(1);
        const [info, setInfo] = useState([]);
    
        useEffect(() => {
            fetch(`https://api.mangadex.org/manga?limit=10&offset=${10 * (offset - 1)}`)
                .then(response => response.json())
                .then(data => {
                    const newMangaInfo = data.data.map(manga => {
                        const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
                        
                        const coverImageUrl = coverArt
                            ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
                            : 'No Image Available';
    
                        return {
                            title: manga.attributes.title.en || 'No Title Available',
                            image: coverImageUrl,
                            synopsis: manga.attributes.description.en || 'No description available',
                            contentRating: manga.attributes.contentRating || 'Unknown Rating'
                        };
                    });
    
                    setInfo([...info, ...newMangaInfo]); 
                })
                .catch(error => console.error('Error:', error));
        }, [offset]);
    
        return (
            <>
                <button onClick={() => setOffset(offset + 1)}>Load More (Page {offset})</button>
                <div>
                    {info.length > 0 ? (
                        <ul>
                            {info.map((item, index) => (
                                <li key={index}>
                                    <h2>{item.title}</h2>
                                    {item.image !== 'No Image Available' ? (
                                        <img src={item.image} alt={item.title} width="200" />
                                    ) : (
                                        <p>{item.image}</p>
                                    )}
                                    <p>{item.synopsis}</p>
                                    <p><strong>Content Rating:</strong> {item.contentRating}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No manga info available</p>
                    )}
                </div>
            </>
        );
    }
    

