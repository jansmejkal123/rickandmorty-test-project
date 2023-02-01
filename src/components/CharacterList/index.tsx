import {Character} from "@/types";
import {Col, Row, Stack} from "react-bootstrap";
import CharacterCard from "@/components/CharacterCard";

type CharacterListProps = {
    characters: Character[]
}
const CharacterList = ({characters}: CharacterListProps) => {
  return (<div className={'d-flex flex-row flex-wrap'}>
          {characters.map((character, i)=> {
              return (<div className={'p-1'} key={i}>
                  <CharacterCard character={character}/>
              </div>)
          })}

  </div>)
}

export default CharacterList
