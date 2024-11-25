"use client"

import React from 'react';
import { NotionRenderer, useNotionContext } from 'react-notion-x';
import { CollectionViewBlock, CollectionViewPageBlock, ExtendedRecordMap, PageBlock } from 'notion-types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/get-config-value';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code));
// const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then((m) => m.Collection));

const Property = ({ type, data }: { type: string, data: any }) => {
    switch (type) {
        case "Author": {
            const authors = data[0].replace(",", ", ");
            return <span>by {authors}</span>
        }

        case "Tag":
            return data.map((data: string) => <span key={data}>{data}</span>)

        case "Date": {
            const publishDate = data[1]?.[0]?.[1]?.start_date;
            if (publishDate) {
                const formattedDate = new Intl.DateTimeFormat('en-us', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }).format(new Date(publishDate));

                return <span>{formattedDate}</span>;
            }
            return null;
        }

        default:
            return null;
    }
};

const CustomCollection = ({ block }: { block: CollectionViewBlock | CollectionViewPageBlock | PageBlock }) => {
    const { recordMap } = useNotionContext();
    const collectionId = block.parent_id;
    const collection = recordMap.collection[collectionId]?.value;
    const schemas = collection?.schema;

    let propertyIds = Object.keys(schemas).filter((id) => id !== 'title');

    if (collection.format?.property_visibility) {
        propertyIds = propertyIds.filter((id) =>
            collection.format?.property_visibility && collection.format.property_visibility.find(
                ({ property }) => property === id
            )?.visibility !== 'hide');
    }

    if (collection.format?.collection_page_properties) {
        // sort properties based on collection page order
        const idToIndex: any = collection.format?.collection_page_properties.reduce(
            (acc, p, i) => ({
                ...acc,
                [p.property]: i
            }),
            {}
        )

        propertyIds.sort((a, b) => idToIndex[a] - idToIndex[b])
    } else {
        // default to sorting properties alphabetically based on name
        propertyIds.sort((a, b) => schemas[a].name.localeCompare(schemas[b].name))
    }

    let isCol = propertyIds.reduce((acc, propertyId) => {
        const schema = schemas[propertyId];
        const data = (block.properties as any)[propertyId]?.[0];

        if (schema.name === "Tag" && Array.isArray(data)) {
            return data[0].length > 5;
        }
        return acc;
    }, false);

    return (
        <div className="notion-collection-row max-w-full">
            <div className={`flex flex-col ${isCol? 'md:flex-col' : 'md:flex-row'} md:justify-between px-2 gap-2 md:gap-0`}>
                <span>
                    {propertyIds.map((propertyId) => {
                        const schema = schemas[propertyId];
                        const data = (block.properties as any)[propertyId]?.[0];


                        // Render authors with a middle dot separator
                        if (schema.name === "Author") {
                            const authors = data ? data[0].replace(",", ", ") : getSiteConfig("author");
                            return "by " + authors + " · ";
                        }

                        // Render date next to authors
                        if (schema.name === "Date") {
                            const publishDate = data[1]?.[0]?.[1]?.start_date;
                            if (publishDate) {
                                const formattedDate = new Intl.DateTimeFormat('en-us', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                }).format(new Date(publishDate));

                                return formattedDate
                            }
                            return null;
                        }

                        return null;
                    })}
                </span>

                <span>
                    {propertyIds.map((propertyId) => {
                        const schema = schemas[propertyId];
                        const data = (block.properties as Record<string, string[][]>)[propertyId]?.[0];

                        if (schema.name === "Tag" && Array.isArray(data)) {
                            const tags = data[0].split(",");
                            return tags.map((tag) => (
                                `#${tag} `
                            ));
                        }

                        return null;
                    })}
                </span>
            </div>
        </div>
    );
};

const Equation = dynamic(() => import('react-notion-x/build/third-party/equation').then(m => m.Equation));
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then(m => m.Modal), { ssr: false });

const NotionPage = ({ recordMap, isHome }: { recordMap: ExtendedRecordMap, isHome?: boolean }) => {
    const components = React.useMemo(
        () => ({
            Code,
            Collection: CustomCollection,
            Equation,
            Modal,
            nextImage: Image,
            nextLink: Link,
        }),
        []
    );

    return (isHome ? (
        <NotionRenderer
            bodyClassName='!font-maru-buri !m-0 !p-0'
            recordMap={recordMap}
            components={components}
            disableHeader={true}
        />
    ) : (
        <NotionRenderer
            bodyClassName='!font-maru-buri'
            recordMap={recordMap}
            components={components}
            fullPage={true}
            disableHeader={true}
            showTableOfContents={true}
            minTableOfContentsItems={3}
        />
    ));
};

export default NotionPage;
