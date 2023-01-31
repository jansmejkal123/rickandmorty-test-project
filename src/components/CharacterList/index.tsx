import {Character} from "@/types";
import {Col, Row, Stack} from "react-bootstrap";
import CharacterCard from "@/components/CharacterCard";

type CharacterListProps = {
    characters: Character[]
}
const CharacterList = ({characters}: CharacterListProps) => {
  return (<Stack>
      <Row>
          {characters.map((character, i)=> {
              return (<Col xs={12} sm={6} lg={4} xl={3} key={i}><CharacterCard character={character}/></Col>)
          })}

      </Row>

  </Stack>)
}

export default CharacterList
