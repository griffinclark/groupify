import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import Tag from '../atoms/Tag';

interface Props{
    tags: string[]
}
export default function TagSelector({tags}: Props){
    const [selectedTags, setSelectedTags] = useState([])


    const addTag = (tag: string)=>{
        setSelectedTags((tag)=> [...selectedTags, tag])
    }

    const tagRow = (titles: string[])=>{
        titles.forEach((title: string)=>{
            return(
                <Tag title={title} setSelectedTags={setSelectedTags} />
            )
        })
    }

    return(
        <View>
            <Tag title={"hello world"} setSelectedTags={setSelectedTags} />
        </View>
    )
}

//             setContacts((contacts) => [...contacts, dataPoint]);
