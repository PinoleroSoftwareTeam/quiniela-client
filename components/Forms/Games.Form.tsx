import {
  FormControl,
  FormLabel,
  Select,
  Input,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

export function FormGames() {
  return (
    <>
      <main>
        <Box bg={useColorModeValue("white", "gray.700")} p={8}>
          <h1>Games</h1>
          <form>
            <FormControl>
              <FormLabel htmlFor="date">Fecha</FormLabel>
              <Input id="date" type="Date" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="group">Grupo</FormLabel>
              <Select id="group">
                <option value="1">Grupo 1</option>
                <option value="2">Grupo 2</option>
                <option value="3">Grupo 3</option>
                <option value="4">Grupo 4</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="fase">Fase</FormLabel>
              <Select id="fase">
                <option value="1">Fase 1</option>
                <option value="2">Fase 2</option>
                <option value="3">Fase 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="team1">Equipo 1</FormLabel>
              <Select id="team1">
                <option value="1">Equipo 1</option>
                <option value="2">Equipo 2</option>
                <option value="3">Equipo 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pointTeam1">Goles Equipo 1</FormLabel>
              <NumberInput>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormControl>
                <FormLabel htmlFor="team2">Equipo 2</FormLabel>
                <Select id="team2">
                  <option value="1">Equipo 1</option>
                  <option value="2">Equipo 2</option>
                  <option value="3">Equipo 3</option>
                </Select>
              </FormControl>
              <FormLabel htmlFor="pointTeam2">Goles Equipo 2</FormLabel>
              <NumberInput>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </form>
        </Box>
      </main>
    </>
  );
}
