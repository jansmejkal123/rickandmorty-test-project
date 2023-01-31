import {Character} from "@/types";
import {Accordion, Card, useAccordionButton} from "react-bootstrap";
import Image from "next/image";
import React from "react";
import style from './CharacterCard.module.css'
type CharacterCardProps = {
    character: Character
}

type CustomToggleProps = {
    children: React.ReactNode;
    eventKey: string
}
const CustomToggle = ({children, eventKey}: CustomToggleProps) => {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <div
            onClick={decoratedOnClick}
        >
            {children}
        </div>
    );
}

const CharacterCard = ({character}: CharacterCardProps) => {

    return (<Accordion>
        <Card style={{maxWidth: '300px'}}>

            <CustomToggle eventKey={'main'}>

                <div style={{position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden'}}>
                    <Image src={character.image} alt={character.name} fill
                           className={'card-img'}/>

                        <div className={`card-img-overlay p-0 d-flex `}>
                            <div className={'d-flex flex-column flex-grow-0 align-self-end justify-content-end'}
                                 style={{maxWidth: '100%', width: '100%', height: '100%', maxHeight:'100%',}}>
                                <div style={{background: 'rgba(200, 200, 200, .7)'}}>
                                <h3 style={{background: 'rgba(230, 230, 230, .7)', margin: 0}}
                                    className={'ps-2'}>{character.name}</h3>
                                <Accordion.Collapse eventKey={'main'} style={{overflow: 'scroll'}}>
                                    <div>
                                        <p><b>gender:</b> {character.gender}</p>
                                        <p><b>type:</b> {character.type}</p>
                                        <p><b>status:</b> {character.status}</p>
                                        <p><b>origin:</b> {character.origin.name}, {character.origin.dimension}</p>
                                        <p><b>last knonw location:</b> {character.location.name}, {character.location.dimension}</p>
                                    </div>
                                </Accordion.Collapse>
                                </div>
                            </div>
                        </div>
                </div>
            </CustomToggle>

        </Card>
    </Accordion>
    )}

export default CharacterCard
