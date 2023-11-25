import {Character, CharacterLocation} from "@/types";
import {Accordion, Card, useAccordionButton} from "react-bootstrap";
import Image from "next/image";
import React, {MouseEvent, MouseEventHandler, useEffect, useRef, useState} from "react";
import style from './CharacterCard.module.scss'
import Link from "next/link";
import {useTranslation} from "next-i18next";

type CharacterCardProps = {
    character: Character
}

type CustomToggleProps = {
    children: React.ReactNode;
    eventKey: string;
    callback?: MouseEventHandler<HTMLDivElement>
}
const CustomToggle = ({children, eventKey, callback}: CustomToggleProps) => {
    const decoratedOnClick = useAccordionButton(eventKey, (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (callback) {
            callback(e)
        }
    });

    return (
        <div
            onClick={decoratedOnClick}
        >
            {children}
        </div>
    );
}

const CharacterCard = ({character}: CharacterCardProps) => {
    const {t} = useTranslation('character')
    const imageWrapper = useRef<HTMLDivElement>(null)
    const [imageWrapperWidth, setImageWrapperWidth] = useState<number | null>(null)
    const [opened, setOpened] = useState(false)
    useEffect(() => {
        if (!imageWrapper || !imageWrapper.current) return
        setImageWrapperWidth(imageWrapper.current.clientWidth)
    }, [])

    const toggleOpened = () => {
        setOpened(!opened)
    }

    const getLocationString = (location: CharacterLocation): string => {
        const {dimension, name} = location
        const locationString = dimension && name === 'unknown' ? 'unknown location' : name
        const dimensionString = dimension && dimension === 'unknown' ? 'unknown dimension' : dimension
        const filteredOrdered: string[] =  [locationString, dimensionString].filter(item => Boolean(item)) as string[]
        return filteredOrdered.join(', ')
    }


    return (
        <Card className={`d-flex ${opened ? style.cardOpened : style.card}`}>
            <Accordion>
                <CustomToggle eventKey={'main'} callback={toggleOpened}>

                    <div ref={imageWrapper}
                         style={{position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden'}}>
                        <Image src={character.image}
                               alt={character.name}
                               priority={true}
                               fill
                               sizes={imageWrapperWidth ? `${Math.round(imageWrapperWidth)}px` : '100vw'}
                               className={'card-img'}
                        />

                        <div className={`card-img-overlay p-0 d-flex ${style.overlay}`}>
                            <div
                                className={`d-flex flex-column flex-grow-0 align-self-end justify-content-end ${style.cardContentWrapper}`}>
                                <div className={`d-flex flex-column flex-grow-0 ${style.cardContent}`}>
                                    <h3>{character.name}</h3>
                                    <div className={`${style.scrollable}`}>
                                        <Accordion.Collapse eventKey={'main'}>
                                            <div>
                                                {character.gender && <p>
                                                  <b>{t('gender')}</b> {character.gender}
                                                </p>}
                                                {character.type && <p>
                                                  <b>{t('type')}</b> {character.type}
                                                </p>

                                                }
                                                {character.status &&<p>
                                                  <b>{t('status')}</b> {character.status}
                                                </p>}
                                                {character.origin && <p>
                                                  <b>{t('origin')}</b> {getLocationString(character.origin)}
                                                </p>}
                                                <p><b>{t('last-location')}</b> {getLocationString(character.location)}
                                                </p>
                                                <p>{character.episode.map((episode, i) => {
                                                    return (<Link href={`/episodes/${episode.id}`}
                                                                  key={i}>{episode.name}</Link>)
                                                })}</p>
                                                </div>
                                        </Accordion.Collapse>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomToggle>
            </Accordion>
        </Card>
    )
}

export default CharacterCard
