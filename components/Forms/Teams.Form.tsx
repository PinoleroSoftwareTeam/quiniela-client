import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

export function FormTeams() {
  return (
    <>
      <main>
        <Box bg={useColorModeValue("white", "gray.700")} p={8}>
          <form>
            <FormControl>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Input id="name" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Descripcion</FormLabel>
              <Textarea placeholder="Descripcion del equipo" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pointTeam2">Logo</FormLabel>
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
